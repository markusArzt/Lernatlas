// Lernatlas – Spaced-Repetition-Engine
// Gradabhängige Planung (FSRS-nah), Bewertungen 0–5, tagesgenau. Wird von Wissen und allen Flashcard-Decks genutzt.
//
// Wichtige Regeln (Details: ERWEITERUNG.md → „Spaced Repetition“):
//  • Fälligkeit zählt in Kalendertagen: Eine Karte, die heute „in 1 Tag“ fällig wird, ist morgen ab 00:00 fällig.
//  • Der Grad bestimmt das Intervall SCHON beim ersten Mal: Gut → 1 Tag, Sicher → 3 Tage, Perfekt → 7 Tage.
//    So entsteht ein echtes Spektrum statt nur „morgen“. (Das war vorher das Problem: erste Antwort immer 1 Tag.)
//  • Bei jeder weiteren Wiederholung wächst das Intervall = altes Intervall × Leichtigkeit (EF) × Grad-Faktor
//    (Gut 0,8 · Sicher 1,0 · Perfekt 1,3) – besser gekonnt heißt also spürbar längerer Abstand.
//  • Bewertung < 3 = vergessen: Intervall zurück auf 1 Tag, EF −0,2, Karte kommt in derselben Sitzung nochmal.
//    (Im Wissen-Modul bedeuten 0–2 ohnehin „falsch beantwortet“.)
//  • Bewertung ≥ 3 bei einer noch nicht fälligen Karte (Freies Üben) ändert den Plan nicht.
//  • EF (Leichtigkeit) wird nach SM-2-Formel angepasst und bleibt zwischen 1,3 und 3,0.

(function (root) {
    'use strict';

    const DAY = 86400000;
    const EF_START = 2.5;
    const EF_MIN = 1.3;
    const EF_MAX = 3.0;
    const LAPSE_EF_PENALTY = 0.2;
    const MATURE_DAYS = 21;     // ab diesem Intervall gilt eine Karte als „bekannt“
    const RELEARN_GAP = 4;      // vergessene Karte kommt nach so vielen anderen Karten wieder

    // Erst-Intervall je Grad (Tage) – was eine frische Karte nach EINER Antwort bekommt
    const INIT_STABILITY = { 3: 1, 4: 3, 5: 7 };
    // Zuwachs-Faktor je Grad bei weiteren Wiederholungen (relativ zur Leichtigkeit)
    const GRADE_FACTOR = { 3: 0.8, 4: 1.0, 5: 1.3 };

    // ── Zeit-Helfer ──────────────────────────────────────────────────
    function startOfDay(ts) {
        const d = new Date(ts);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    }

    // Sommer-/Winterzeit-sicher (setDate statt + n·24h)
    function addDays(ts, n) {
        const d = new Date(startOfDay(ts));
        d.setDate(d.getDate() + n);
        return d.getTime();
    }

    function daysBetween(fromTs, toTs) {
        return Math.round((startOfDay(toTs) - startOfDay(fromTs)) / DAY);
    }

    function clampEf(ef) {
        return Math.max(EF_MIN, Math.min(EF_MAX, ef));
    }

    // Alte Speicherstände (nextReview mit Uhrzeit) → tagesgenau, fehlende Felder ergänzen
    function normalize(s) {
        if (!s || typeof s !== 'object') return null;
        const interval = Number.isFinite(s.interval) && s.interval >= 0 ? s.interval : 0;
        const repetitions = Number.isFinite(s.repetitions) && s.repetitions >= 0 ? s.repetitions : 0;
        const ef = clampEf(Number.isFinite(s.ef) ? s.ef : EF_START);
        const next = Number.isFinite(s.nextReview) ? s.nextReview : 0;
        return {
            interval,
            repetitions,
            ef,
            lapses: Number.isFinite(s.lapses) ? s.lapses : 0,
            lastRating: Number.isFinite(s.lastRating) ? s.lastRating : null,
            lastReview: Number.isFinite(s.lastReview) ? s.lastReview : null,
            nextReview: startOfDay(next)
        };
    }

    // ── Kartenzustand ────────────────────────────────────────────────
    // 'new' | 'due' | 'learning' | 'mature'
    function classify(state, now) {
        if (!state) return 'new';
        if (state.nextReview <= now) return 'due';
        return state.interval >= MATURE_DAYS ? 'mature' : 'learning';
    }

    // Reine Funktion: berechnet den Zustand nach einer Bewertung (verändert nichts)
    // → { state, changed, days, again }
    function schedule(prev, rating, now) {
        const isNew = !prev;
        const due = isNew || prev.nextReview <= now;

        // Zu früh wiederholt und gewusst → Plan bleibt, wie er ist
        if (rating >= 3 && !due) {
            return { state: prev, changed: false, days: daysBetween(now, prev.nextReview), again: false };
        }

        let { interval = 0, repetitions = 0, ef = EF_START, lapses = 0 } = prev || {};
        let again = false;

        if (rating < 3) {
            if (repetitions > 0) {          // echte Vergessens-Lücke bei einer gelernten Karte
                lapses += 1;
                ef = clampEf(ef - LAPSE_EF_PENALTY);
            }
            repetitions = 0;
            interval = 1;
            again = true;
        } else {
            // Leichtigkeit zuerst anpassen, dann Intervall daraus bestimmen
            const q = 5 - rating;
            ef = clampEf(ef + 0.1 - q * (0.08 + q * 0.02));
            if (repetitions === 0) {
                interval = INIT_STABILITY[rating];                       // gradabhängiges Erst-Intervall
            } else {
                interval = Math.max(interval + 1, Math.round(interval * ef * GRADE_FACTOR[rating]));
            }
            repetitions += 1;
        }

        return {
            state: {
                interval,
                repetitions,
                ef,
                lapses,
                lastRating: rating,
                lastReview: now,
                nextReview: addDays(now, interval)
            },
            changed: true,
            days: interval,
            again
        };
    }

    // ── Speicher (localStorage o. ä.) ────────────────────────────────
    function memoryStorage() {
        const m = {};
        return {
            getItem: k => (k in m ? m[k] : null),
            setItem: (k, v) => { m[k] = String(v); },
            removeItem: k => { delete m[k]; }
        };
    }

    function createStore(storage, key) {
        let data = {};

        function load() {
            data = {};
            try {
                const raw = JSON.parse(storage.getItem(key) || '{}');
                Object.keys(raw).forEach(id => {
                    const s = normalize(raw[id]);
                    if (s) data[id] = s;
                });
            } catch (e) { data = {}; }
        }
        function save() {
            try { storage.setItem(key, JSON.stringify(data)); } catch (e) { /* Speicher voll/gesperrt */ }
        }
        load();

        return {
            get: id => data[id] || null,
            set(id, state) { data[id] = state; save(); },
            has: id => Object.prototype.hasOwnProperty.call(data, id),
            clear() { data = {}; save(); },
            reload: load
        };
    }

    // ── Auswertung für Dashboards ────────────────────────────────────
    function counts(store, ids, now) {
        const c = { new: 0, due: 0, learning: 0, mature: 0 };
        ids.forEach(id => { c[classify(store.get(id), now)]++; });
        return c;
    }

    // Wie viele Tage bis zur nächsten (noch nicht fälligen) Karte? null = keine geplant
    function daysToNextDue(store, ids, now) {
        let next = Infinity;
        ids.forEach(id => {
            const s = store.get(id);
            if (s && s.nextReview > now) next = Math.min(next, s.nextReview);
        });
        return next === Infinity ? null : Math.max(1, daysBetween(now, next));
    }

    function fmtDays(days) {
        if (days <= 0) return 'heute';
        if (days === 1) return 'morgen';
        if (days < 60) return 'in ' + days + ' Tagen';
        if (days < 365) return 'in ' + Math.round(days / 30.4) + ' Monaten';
        const y = Math.round(days / 36.5) / 10;
        return 'in ' + String(y).replace('.', ',') + ' Jahren';
    }

    // ── Sitzung: Warteschlange mit Wiederholung vergessener Karten ───
    // opts: { ids: [...], store, now: () => ms }
    function createSession(opts) {
        const queue = opts.ids.slice();
        const relearn = new Set();
        const store = opts.store;
        const clock = opts.now || Date.now;

        function requeue(id) {
            queue.splice(Math.min(RELEARN_GAP, queue.length), 0, id);
        }

        return {
            peek: () => (queue.length ? queue[0] : null),
            remaining: () => queue.length,
            isRelearning: id => relearn.has(id),

            // Vorschau für die Bewertungs-Buttons: { days, again }
            preview(id, rating) {
                if (relearn.has(id)) return { days: 1, again: rating < 3 };
                const r = schedule(store.get(id), rating, clock());
                return { days: r.days, again: r.again };
            },

            // Bewertet die aktuelle (vorderste) Karte → { days, again, changed, relearned? }
            grade(id, rating) {
                if (queue[0] !== id) throw new Error('grade: ' + id + ' ist nicht die aktuelle Karte');
                queue.shift();

                if (relearn.has(id)) {
                    // Schon heute vergessen: Plan steht (morgen), hier zählt nur noch das Wiedererkennen
                    if (rating >= 3) relearn.delete(id);
                    else requeue(id);
                    return { days: 1, again: rating < 3, changed: false, relearned: rating >= 3 };
                }

                const r = schedule(store.get(id), rating, clock());
                if (r.changed) store.set(id, r.state);
                if (r.again) { relearn.add(id); requeue(id); }
                return { days: r.days, again: r.again, changed: r.changed };
            },

            // Überspringen ohne Bewertung: Karte ans Ende
            defer(id) {
                if (queue[0] !== id) return;
                queue.push(queue.shift());
            }
        };
    }

    // ── Sonstiges ────────────────────────────────────────────────────
    function shuffle(arr, rng) {
        const a = arr.slice();
        const rand = rng || Math.random;
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Stabiler Kurz-Hash (FNV-1a) → Schlüssel, die nicht von der Position in der Datei abhängen
    function hashKey(str) {
        let h = 0x811c9dc5;
        for (let i = 0; i < str.length; i++) {
            h ^= str.charCodeAt(i);
            h = Math.imul(h, 0x01000193);
        }
        return (h >>> 0).toString(36);
    }

    const api = {
        DAY, EF_START, EF_MIN, EF_MAX, MATURE_DAYS, RELEARN_GAP,
        startOfDay, addDays, daysBetween,
        normalize, classify, schedule,
        memoryStorage, createStore,
        counts, daysToNextDue, fmtDays,
        createSession, shuffle, hashKey
    };

    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.SRS = api;
})(typeof window !== 'undefined' ? window : globalThis);
