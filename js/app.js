// Lernatlas – App-Logik (Navigation, Module, Flashcard-Decks)

// ============================================================
// START-PRÜFUNG
// Fehlt auf dem Server eine Datei (z. B. nach einem unvollständigen Upload), startet die App trotzdem,
// zeigt oben eine Meldung mit den fehlenden Dateien und lässt die übrigen Bereiche weiter laufen.
// ============================================================
const REQUIRED_FILES = [
    { name: 'SRS',                    file: 'js/srs.js' },
    { name: 'wordFluencyWords',       file: 'data/aufnahmetest/wortfluessigkeit.js', fallback: { short: [], medium: [], long: [] } },
    { name: 'zahlenfolgenAufgaben',   file: 'data/aufnahmetest/zahlenfolgen.js',     fallback: [] },
    { name: 'wissenFragen',           file: 'data/aufnahmetest/wissen.js',           fallback: { biologie: [], chemie: [], physik: [], mathematik: [] } },
    { name: 'flashcardsData',         file: 'data/aufnahmetest/flashcards.js',       fallback: [] },
    { name: 'block2KnochenCards',     file: 'data/block2/knochen.js',                fallback: [] },
    { name: 'block2KnochenDirLabels', file: 'data/block2/knochen.js',                fallback: {} },
];
const MISSING_FILES = [];
(function checkRequiredFiles() {
    const exists = name => { try { new Function('return ' + name)(); return true; } catch (e) { return false; } };
    REQUIRED_FILES.forEach(r => {
        if (exists(r.name)) return;
        if (!MISSING_FILES.includes(r.file)) MISSING_FILES.push(r.file);
        if ('fallback' in r) window[r.name] = r.fallback;
    });
    if (!getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()) MISSING_FILES.push('css/style.css');

    const box = document.getElementById('data-warning');
    if (!box || MISSING_FILES.length === 0) return;
    const title = document.createElement('strong');
    title.textContent = 'Auf dem Server fehlen Dateien';
    const list = document.createElement('ul');
    MISSING_FILES.forEach(f => { const li = document.createElement('li'); const c = document.createElement('code'); c.textContent = f; li.appendChild(c); list.appendChild(li); });
    const hint = document.createElement('p');
    hint.textContent = 'Lade sie mit genau diesem Ordner und Dateinamen ins Repository hoch und öffne die Seite danach neu. Die betroffenen Bereiche bleiben bis dahin leer.';
    box.append(title, list, hint);
    box.hidden = false;
})();

// Ein Fehler in einem Bereich darf Menü und andere Bereiche nicht blockieren
function safe(fn) { try { return fn(); } catch (e) { console.error(e); } }

// ============================================================
// DATEN
// ============================================================
        // ── Daten extern geladen via data_*.js ──






// ============================================================
// GLOBALER ZUSTAND
// ============================================================
let currentModule = 'wortfluessigkeit';

// localStorage, mit Rückfall auf Arbeitsspeicher (z. B. privater Modus), damit die App immer läuft
const safeStorage = (() => {
    try { localStorage.setItem('__medat_t', '1'); localStorage.removeItem('__medat_t'); return localStorage; }
    catch (e) { return SRS.memoryStorage(); }
})();

// Wortflüssigkeit
let currentDifficulty = 'all';
let currentWordData = null;
let selectedAnswer = null;
let correctCount = 0;
let totalCount = 0;
let currentAnswerOptions = [];
const allWordFluencyWords = [
    ...wordFluencyWords.short,
    ...wordFluencyWords.medium,
    ...wordFluencyWords.long
];

// Zahlenfolgen
let zfCurrent = null;
let zfSelected = null;
let zfCorrectCount = 0;
let zfTotalCount = 0;
let zfUsed = new Set();

// Wissen
let wissenSubject = 'all';
let wissenCurrent = null;
let wissenSelected = null;
let wissenCorrect = 0;
let wissenTotal = 0;
let wissenUsed = new Set();
const subjectNames = { all:'Alle', biologie:'Biologie', chemie:'Chemie', physik:'Physik', mathematik:'Mathematik' };

// ============================================================
// WORTFLÜSSIGKEIT
// ============================================================
function getWordsByDifficulty() {
    switch(currentDifficulty) {
        case 'short': return wordFluencyWords.short;
        case 'medium': return wordFluencyWords.medium;
        case 'long': return wordFluencyWords.long;
        default: return allWordFluencyWords;
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    let attempts = 0, isShuffled = false;
    do {
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        isShuffled = !shuffled.every((l, i) => l === array[i]);
        attempts++;
        if (attempts > 50) break;
    } while (!isShuffled && array.length > 1);
    return shuffled;
}

// Wortflüssigkeit – Tracking: je Schwierigkeit eigener Set
const wfUsed = { all: new Set(), short: new Set(), medium: new Set(), long: new Set() };

function generateNewWord() {
    const words = getWordsByDifficulty();
    const key = currentDifficulty;

    // Alle durch? → Set zurücksetzen
    if (wfUsed[key].size >= words.length) wfUsed[key].clear();

    // Noch nicht gezeigte Wörter
    const available = words.filter((_, i) => !wfUsed[key].has(i));
    const idx = Math.floor(Math.random() * available.length);
    const globalIdx = words.indexOf(available[idx]);
    wfUsed[key].add(globalIdx);
    currentWordData = words[globalIdx];

    // Buchstaben anzeigen (geshuffled)
    const shuffled = shuffleArray([...currentWordData.letters]);
    const container = document.getElementById('letters-container');
    container.innerHTML = '';
    shuffled.forEach((letter, i) => {
        const el = document.createElement('div');
        el.className = 'single-letter';
        el.textContent = letter;
        el.style.animationDelay = (i * 0.1) + 's';
        container.appendChild(el);
    });

    // Antwortoptionen: correctLetter + 3 andere Buchstaben AUS DEM ANAGRAMM
    const correctLetter = currentWordData.startLetter;
    // Alle einzigartigen Buchstaben des Wortes außer dem korrekten
    const otherLetters = [...new Set(currentWordData.letters.filter(l => l !== correctLetter))];
    // Fülle auf mit anderen Buchstaben des Wortes (shuffled)
    shuffleArray(otherLetters);
    const distractors = otherLetters.slice(0, 3);
    // Falls das Wort zu wenige verschiedene Buchstaben hat, ergänze mit Nachbarn im Alphabet
    if (distractors.length < 3) {
        const code = correctLetter.charCodeAt(0);
        for (let offset = 1; distractors.length < 3; offset++) {
            const c1 = String.fromCharCode(code + offset);
            const c2 = String.fromCharCode(code - offset);
            if (c1 >= 'A' && c1 <= 'Z' && c1 !== correctLetter && !distractors.includes(c1)) distractors.push(c1);
            if (distractors.length < 3 && c2 >= 'A' && c2 <= 'Z' && c2 !== correctLetter && !distractors.includes(c2)) distractors.push(c2);
        }
    }

    // Mische korrekte + 3 Distraktoren
    const options = shuffleArray([correctLetter, ...distractors.slice(0, 3)]);
    currentAnswerOptions = options;
    document.getElementById('option-a-letter').textContent = 'Anfangsbuchstabe: ' + options[0];
    document.getElementById('option-b-letter').textContent = 'Anfangsbuchstabe: ' + options[1];
    document.getElementById('option-c-letter').textContent = 'Anfangsbuchstabe: ' + options[2];
    document.getElementById('option-d-letter').textContent = 'Anfangsbuchstabe: ' + options[3];

    // Fortschrittsanzeige
    const total = words.length;
    const done = wfUsed[key].size;
    const diffEl = document.getElementById('current-difficulty');
    const names = { all:'Alle', short:'Kurz', medium:'Mittel', long:'Lang' };
    diffEl.textContent = names[key] + ' · ' + done + '/' + total;

    // Reset UI
    selectedAnswer = null;
    document.querySelectorAll('#letter-options .letter-option').forEach(o => {
        o.classList.remove('selected', 'correct', 'incorrect');
    });
    const fb = document.getElementById('feedback');
    fb.className = 'feedback hidden';
    fb.textContent = '';
}

function selectAnswer(option) {
    selectedAnswer = option;
    document.querySelectorAll('#letter-options .letter-option').forEach(o => {
        o.classList.toggle('selected', o.dataset.option === option);
    });
}

function checkAnswer() {
    if (!selectedAnswer || !currentWordData) {
        showFeedback('Bitte wähle eine Antwort aus!', false);
        return;
    }
    totalCount++;
    let isCorrect = false;
    const correctLetter = currentWordData.startLetter;
    if (selectedAnswer === 'E') {
        if (!currentAnswerOptions.includes(correctLetter)) {
            correctCount++; isCorrect = true;
            showFeedback('Richtig! Das Wort "' + currentWordData.word + '" beginnt mit "' + correctLetter + '" – nicht in A-D.', true);
        } else {
            showFeedback('Falsch! Das Wort "' + currentWordData.word + '" beginnt mit "' + correctLetter + '".', false);
        }
    } else {
        const sel = currentAnswerOptions[selectedAnswer.charCodeAt(0) - 65];
        if (sel === correctLetter) {
            correctCount++; isCorrect = true;
            showFeedback('Richtig! Das Wort "' + currentWordData.word + '" beginnt mit "' + correctLetter + '".', true);
        } else {
            showFeedback('Falsch! Das Wort "' + currentWordData.word + '" beginnt mit "' + correctLetter + '", nicht "' + sel + '".', false);
        }
    }
    // Markiere Optionen
    document.querySelectorAll('#letter-options .letter-option').forEach(o => {
        const ol = o.dataset.option;
        if (selectedAnswer === 'E' && ol === 'E') {
            o.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (ol !== 'E') {
            const c = currentAnswerOptions[ol.charCodeAt(0) - 65];
            if (c === correctLetter) o.classList.add('correct');
            else if (ol === selectedAnswer) o.classList.add('incorrect');
        }
    });
    updateStats();
    setTimeout(generateNewWord, 3000);
}

function showWord() {
    showFeedback('Das gesuchte Wort ist: "' + currentWordData.word + '" (beginnt mit "' + currentWordData.startLetter + '")', true);
    const correctLetter = currentWordData.startLetter;
    document.querySelectorAll('#letter-options .letter-option').forEach(o => {
        const ol = o.dataset.option;
        if (ol !== 'E') {
            const c = currentAnswerOptions[ol.charCodeAt(0) - 65];
            if (c === correctLetter) o.classList.add('correct');
        } else if (!currentAnswerOptions.includes(correctLetter)) {
            o.classList.add('correct');
        }
    });
    totalCount++;
    updateStats();
    setTimeout(generateNewWord, 4000);
}

function showFeedback(msg, isCorrect) {
    const fb = document.getElementById('feedback');
    fb.textContent = msg;
    fb.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
}

function updateStats() {
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('total-count').textContent = totalCount;
    const rate = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    document.getElementById('success-rate').textContent = rate + '%';
}

function setDifficulty(d) {
    currentDifficulty = d;
    document.querySelectorAll('.difficulty-btn[data-difficulty]').forEach(b => {
        b.classList.toggle('active', b.dataset.difficulty === d);
    });
    generateNewWord();
}

// ============================================================
// ZAHLENFOLGEN
// ============================================================
function generateNewZahlenfolge() {
    let avail = zahlenfolgenAufgaben.map((_, i) => i).filter(i => !zfUsed.has(i));
    if (avail.length === 0) {
        zfUsed.clear();
        avail = zahlenfolgenAufgaben.map((_, i) => i);
    }
    const idx = avail[Math.floor(Math.random() * avail.length)];
    zfUsed.add(idx);
    zfCurrent = zahlenfolgenAufgaben[idx];
    zfSelected = null;

    const seqEl = document.getElementById('zf-sequence');
    seqEl.innerHTML = '';
    zfCurrent.sequence.forEach((num, i) => {
        const el = document.createElement('div');
        el.className = 'zf-number' + (num === '?' ? ' unknown' : '');
        el.textContent = num;
        el.style.animationDelay = (i * 0.08) + 's';
        seqEl.appendChild(el);
    });

    const opts = zfCurrent.options;
    document.getElementById('zf-option-a').textContent = opts.A[0] + ' / ' + opts.A[1];
    document.getElementById('zf-option-b').textContent = opts.B[0] + ' / ' + opts.B[1];
    document.getElementById('zf-option-c').textContent = opts.C[0] + ' / ' + opts.C[1];
    document.getElementById('zf-option-d').textContent = opts.D[0] + ' / ' + opts.D[1];

    document.querySelectorAll('#zf-options .letter-option').forEach(o => {
        o.classList.remove('selected', 'correct', 'incorrect');
    });
    const fb = document.getElementById('zf-feedback');
    fb.className = 'feedback hidden';
    fb.textContent = '';
}

function selectZfAnswer(option) {
    zfSelected = option;
    document.querySelectorAll('#zf-options .letter-option').forEach(o => {
        o.classList.toggle('selected', o.dataset.option === option);
    });
}

function checkZfAnswer() {
    if (!zfSelected || !zfCurrent) {
        const fb = document.getElementById('zf-feedback');
        fb.textContent = 'Bitte wähle eine Antwort aus!';
        fb.className = 'feedback incorrect';
        return;
    }
    zfTotalCount++;
    const correct = zfCurrent.correct;
    const isCorrect = zfSelected === correct;
    if (isCorrect) zfCorrectCount++;

    document.querySelectorAll('#zf-options .letter-option').forEach(o => {
        if (o.dataset.option === correct) o.classList.add('correct');
        else if (o.dataset.option === zfSelected && !isCorrect) o.classList.add('incorrect');
    });

    const correctText = correct === 'E'
        ? 'Keine der Antwortmöglichkeiten ist richtig'
        : correct + ': ' + zfCurrent.options[correct][0] + ' / ' + zfCurrent.options[correct][1];

    const fb = document.getElementById('zf-feedback');
    fb.textContent = isCorrect
        ? '✓ Richtig! Regel: ' + zfCurrent.rule
        : '✗ Falsch. Richtige Antwort: ' + correctText + '. Regel: ' + zfCurrent.rule;
    fb.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');

    updateZfStats();
    setTimeout(generateNewZahlenfolge, 3500);
}

function showZfSolution() {
    const correct = zfCurrent.correct;
    const text = correct === 'E'
        ? 'Keine der Antwortmöglichkeiten ist richtig'
        : correct + ': ' + zfCurrent.options[correct][0] + ' / ' + zfCurrent.options[correct][1];
    const fb = document.getElementById('zf-feedback');
    fb.textContent = 'Lösung: ' + text + '. Regel: ' + zfCurrent.rule;
    fb.className = 'feedback correct';
    document.querySelectorAll('#zf-options .letter-option').forEach(o => {
        if (o.dataset.option === correct) o.classList.add('correct');
    });
    zfTotalCount++;
    updateZfStats();
    setTimeout(generateNewZahlenfolge, 4000);
}

function updateZfStats() {
    document.getElementById('zf-correct-count').textContent = zfCorrectCount;
    document.getElementById('zf-total-count').textContent = zfTotalCount;
    const rate = zfTotalCount > 0 ? Math.round((zfCorrectCount / zfTotalCount) * 100) : 0;
    document.getElementById('zf-success-rate').textContent = rate + '%';
}

// ============================================================
// WISSEN
// ============================================================
function getWissenPool() {
    const all = getAllWissenPool();
    return wissenSubject === 'all' ? all : all.filter(q => q.subj === wissenSubject);
}

function resetWissenAnswerUi() {
    wissenPhase = 'question';
    wissenSelected = null;
    document.querySelectorAll('#wissen-options .letter-option').forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
    document.getElementById('srs-rating').style.display = 'none';
    document.getElementById('wissen-check-btn').disabled = false;
    document.getElementById('wissen-new-btn').disabled = false;
    const fb = document.getElementById('wissen-feedback');
    fb.className = 'feedback hidden';
    fb.textContent = '';
}

// Zeigt eine Frage an (Antwortoptionen werden bei jeder Anzeige neu gemischt)
function renderWissenQuestion(q, badgeSuffix) {
    wissenCurrent = q;
    resetWissenAnswerUi();

    const levelLabel = { leicht:'Leicht', mittel:'Mittel', schwer:'Schwer' }[q.level] || 'Eigene Frage';
    const badge = document.getElementById('wissen-subject-badge');
    badge.textContent = subjectNames[q.subj] + ', ' + levelLabel + (badgeSuffix || '');
    badge.dataset.level = q.level || 'eigene';
    document.getElementById('wissen-question').textContent = q.q;

    const numOpts = q.opts.length;
    const optEls = ['a','b','c','d','e'];
    const eRow = document.getElementById('wissen-option-e-row');
    if (eRow) eRow.style.display = numOpts >= 5 ? '' : 'none';

    const indices = SRS.shuffle(Array.from({ length: numOpts }, (_, i) => i));
    indices.forEach((origIdx, newPos) => {
        const el = document.getElementById('wissen-option-' + optEls[newPos]);
        if (el) el.textContent = q.opts[origIdx];
        if (origIdx === q.correct) q._shuffledCorrect = newPos;
    });
}

function generateNewWissenFrage() {
    const pool = getWissenPool();
    let avail = pool.map((_, i) => i).filter(i => !wissenUsed.has(wissenSubject + '_' + i));
    if (avail.length === 0) {
        pool.forEach((_, i) => wissenUsed.delete(wissenSubject + '_' + i));
        avail = pool.map((_, i) => i);
    }
    const idx = avail[Math.floor(Math.random() * avail.length)];
    wissenUsed.add(wissenSubject + '_' + idx);
    renderWissenQuestion({ ...pool[idx] });
}

// „Neue Frage“ / Escape: nur solange noch nicht geprüft wurde; beendet eine laufende Fällig-Sitzung
function wissenSkip() {
    if (wissenPhase !== 'question') return;
    srsMode = false;
    srsSession = null;
    generateNewWissenFrage();
}

function selectWissenAnswer(option) {
    if (wissenPhase !== 'question' || !wissenCurrent) return;
    wissenSelected = option;
    document.querySelectorAll('#wissen-options .letter-option').forEach(o => {
        o.classList.toggle('selected', o.dataset.option === option);
    });
}

function checkWissenAnswer() {
    if (wissenPhase !== 'question' || !wissenCurrent) return;
    if (!wissenSelected) {
        const fb = document.getElementById('wissen-feedback');
        fb.textContent = 'Bitte wähle eine Antwort aus!';
        fb.className = 'feedback incorrect';
        return;
    }
    wissenPhase = 'answered';
    wissenTotal++;
    const correctOpt = ['A','B','C','D','E'][wissenCurrent._shuffledCorrect];
    const isCorrect = wissenSelected === correctOpt;
    wissenLastCorrect = isCorrect;
    if (isCorrect) wissenCorrect++;

    document.querySelectorAll('#wissen-options .letter-option').forEach(o => {
        if (o.dataset.option === correctOpt) o.classList.add('correct');
        else if (o.dataset.option === wissenSelected && !isCorrect) o.classList.add('incorrect');
    });

    const optEl = document.getElementById('wissen-option-' + correctOpt.toLowerCase());
    const correctText = optEl ? optEl.textContent : '(Option ' + correctOpt + ')';
    const fb = document.getElementById('wissen-feedback');
    fb.textContent = isCorrect ? '✓ Richtig!' : '✗ Falsch. Richtige Antwort: ' + correctText;
    fb.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');

    updateWissenStats();

    // SRS: Wer falsch geantwortet hat, kann sich nicht „sicher“ gewesen sein → nur 0–2 anbieten
    document.querySelectorAll('#srs-rating .srs-btn').forEach(b => {
        b.style.display = (isCorrect || parseInt(b.dataset.rating) <= 2) ? '' : 'none';
    });
    document.getElementById('srs-rating').style.display = 'block';
    document.getElementById('wissen-check-btn').disabled = true;
    document.getElementById('wissen-new-btn').disabled = true;
}

function setWissenSubject(s) {
    wissenSubject = s;
    srsMode = false;
    srsSession = null;
    document.querySelectorAll('[data-subject]').forEach(b => {
        b.classList.toggle('active', b.dataset.subject === s);
    });
    document.getElementById('wissen-subject-stat').textContent = subjectNames[s];
    generateNewWissenFrage();
}

function updateWissenStats() {
    document.getElementById('wissen-correct-count').textContent = wissenCorrect;
    document.getElementById('wissen-total-count').textContent = wissenTotal;
    const rate = wissenTotal > 0 ? Math.round((wissenCorrect / wissenTotal) * 100) : 0;
    document.getElementById('wissen-success-rate').textContent = rate + '%';
}

// =============================================
// WISSEN – SPACED REPETITION (Engine: srs.js)
// =============================================
// Schlüssel = Fach + Hash des Fragetexts → bleibt stabil, auch wenn Fragen eingefügt/umsortiert werden.
// (Früher: Fach + Position in der Datei – das verschob den Lernstand beim Erweitern.)
const WISSEN_SRS_KEY = 'medat_srs_v3';
const WISSEN_SRS_KEY_V2 = 'medat_srs_v2';
const wissenStore = SRS.createStore(safeStorage, WISSEN_SRS_KEY);
let srsMode = false;
let srsSession = null;
let wissenPhase = 'question';      // 'question' → 'answered' (Antwort geprüft, Bewertung offen) → 'transition'
let wissenLastCorrect = false;
let _wissenPool = null;
let _wissenByKey = null;

function getAllWissenPool() {
    if (_wissenPool) return _wissenPool;
    const seen = {};
    _wissenPool = Object.entries(wissenFragen).flatMap(([s, qs]) => qs.map(q => {
        let key = s + ':' + SRS.hashKey(q.q);
        seen[key] = (seen[key] || 0) + 1;
        if (seen[key] > 1) key += '#' + seen[key];   // identischer Fragetext im selben Fach
        return { ...q, subj: s, _key: key };
    }));
    _wissenByKey = new Map(_wissenPool.map(q => [q._key, q]));
    return _wissenPool;
}

// Einmalig: Lernstand aus dem alten Positions-Format übernehmen (v2 bleibt unverändert als Sicherung liegen)
function wissenMigrateV2() {
    try {
        if (safeStorage.getItem(WISSEN_SRS_KEY) !== null) return;
        const raw = safeStorage.getItem(WISSEN_SRS_KEY_V2);
        if (!raw) return;
        const old = JSON.parse(raw);
        const pool = getAllWissenPool();
        Object.keys(old).forEach(k => {
            const m = /^([a-z]+)_(\d+)$/.exec(k);
            const q = m && pool[+m[2]];
            const s = q && q.subj === m[1] ? SRS.normalize(old[k]) : null;
            if (s) wissenStore.set(q._key, s);
        });
    } catch (e) { /* alter Stand unlesbar → neu beginnen */ }
}

function srsCounts() {
    const ids = getAllWissenPool().map(q => q._key);
    const c = SRS.counts(wissenStore, ids, Date.now());
    return { due: c.due, learning: c.learning, known: c.mature, unseen: c.new };
}

function srsUpdateDisplay() {
    const { due, learning, known, unseen } = srsCounts();
    document.getElementById('srs-due-count').textContent = due;
    document.getElementById('srs-learning-count').textContent = learning;
    document.getElementById('srs-known-count').textContent = known;
    document.getElementById('srs-new-count').textContent = unseen;
    const btn = document.getElementById('srs-due-btn');
    const info = document.getElementById('srs-next-info');
    if (due > 0) {
        btn.textContent = due + ' fällige Karte' + (due !== 1 ? 'n' : '') + ' üben';
        btn.style.opacity = '1';
        info.textContent = '';
    } else {
        btn.textContent = 'Alles erledigt';
        btn.style.opacity = '0.6';
        const next = SRS.daysToNextDue(wissenStore, getAllWissenPool().map(q => q._key), Date.now());
        info.textContent = next ? 'Nächste Wiederholung: ' + SRS.fmtDays(next) : 'Alle Karten bekannt';
    }
}

function srsStartDueSession() {
    const now = Date.now();
    const dueKeys = getAllWissenPool()
        .filter(q => SRS.classify(wissenStore.get(q._key), now) === 'due')
        .map(q => q._key);
    if (dueKeys.length === 0) {
        const next = SRS.daysToNextDue(wissenStore, getAllWissenPool().map(q => q._key), now);
        alert('Keine fälligen Karten! ' + (next ? 'Nächste Wiederholung: ' + SRS.fmtDays(next) : 'Alle bekannt.'));
        return;
    }
    srsSession = SRS.createSession({ ids: SRS.shuffle(dueKeys), store: wissenStore, now: Date.now });
    srsMode = true;
    if (currentModule !== 'wissen') switchModule('wissen');
    generateNextSrsCard();
}

function generateNextSrsCard() {
    const key = srsSession ? srsSession.peek() : null;
    if (key === null) {
        srsMode = false;
        srsSession = null;
        srsUpdateDisplay();
        resetWissenAnswerUi();
        const fb = document.getElementById('wissen-feedback');
        fb.textContent = 'Alle fälligen Karten sind erledigt.';
        fb.className = 'feedback correct';
        return;
    }
    getAllWissenPool();
    renderWissenQuestion({ ..._wissenByKey.get(key) },
        ', noch ' + srsSession.remaining() + (srsSession.isRelearning(key) ? ' ↻' : ''));
}

function handleSrsRating(rating) {
    if (!wissenCurrent || wissenPhase !== 'answered') return;     // nur direkt nach dem Prüfen, nur einmal pro Frage
    if (!wissenLastCorrect && rating > 2) return;                 // falsch beantwortet → nicht „sicher“
    wissenPhase = 'transition';
    const key = wissenCurrent._key;
    if (srsMode && srsSession && srsSession.peek() === key) {
        srsSession.grade(key, rating);
    } else {
        // Freies Üben: gewusst + noch nicht fällig → Plan bleibt; vergessen → zurück auf morgen
        const r = SRS.schedule(wissenStore.get(key), rating, Date.now());
        if (r.changed) wissenStore.set(key, r.state);
    }
    srsUpdateDisplay();
    document.getElementById('srs-rating').style.display = 'none';
    setTimeout(srsMode ? generateNextSrsCard : generateNewWissenFrage, 400);
}

// ============================================================
// FLASHCARD-DECKS
// Jedes Deck (Aufnahmetest-Flashcards, Block-Decks …) ist eine Instanz von FlashDeck mit eigenem
// Speicher. Neues Deck = Datendatei + ein Eintrag in DECK_CONFIGS + ein Eintrag in AREAS (siehe ERWEITERUNG.md).
// Ablauf: „Lernen“ = fällige Karten + neue Karten (Tageslimit) · „Freies Üben“ = alle Karten gemischt.
// ============================================================
const RATING_LABELS = ['Gar nicht', 'Kaum', 'Unsicher', 'Gut', 'Sicher', 'Perfekt'];
const NEW_LIMIT_OPTIONS = [5, 10, 20, 30, 50, 100];

class FlashDeck {
    constructor(cfg) {
        this.cfg = cfg;
        this.cards = cfg.cards;
        this.byId = new Map(this.cards.map(c => [String(c.id), c]));
        this.store = SRS.createStore(safeStorage, cfg.storageKey);
        this.metaKey = cfg.storageKey + '_meta';
        const order = cfg.topicOrder || [];
        this.topics = [...new Set(this.cards.map(c => c.topic))]
            .sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));   // stabil: Rest bleibt in Dateireihenfolge
        this.hasDirs = this.cards.some(c => c.dir);
        this.dirLabels = cfg.dirLabels || {};
        this.mode = 'learn';
        this.session = null;
        this.current = null;
        this.flipped = false;
        this.busy = false;
        this.builtDay = 0;
        this.loadMeta();

        this.root = document.createElement('div');
        this.root.id = cfg.moduleId + '-module';
        this.root.className = 'module';
        document.querySelector('.game-container').appendChild(this.root);
        this.build();
        this.begin('learn');
    }

    // ── Einstellungen & Tageszähler ──────────────────────────
    loadMeta() {
        let m = {};
        try { m = JSON.parse(safeStorage.getItem(this.metaKey) || '{}') || {}; } catch (e) { m = {}; }
        const p = m.prefs || {};
        this.prefs = {
            topic: this.topics.includes(p.topic) ? p.topic : 'all',
            dir: ['la-de', 'de-la', 'both'].includes(p.dir) ? p.dir : (this.cfg.defaultDir || 'both'),
            newLimit: NEW_LIMIT_OPTIONS.includes(p.newLimit) ? p.newLimit : (this.cfg.defaultNewLimit || 20)
        };
        this.newDay = Number.isFinite(m.newDay) ? m.newDay : 0;
        this.newCount = Number.isFinite(m.newCount) ? m.newCount : 0;
    }
    saveMeta() {
        try {
            safeStorage.setItem(this.metaKey, JSON.stringify({ prefs: this.prefs, newDay: this.newDay, newCount: this.newCount }));
        } catch (e) { /* ignorieren */ }
    }
    introducedToday() {
        return this.newDay === SRS.startOfDay(Date.now()) ? this.newCount : 0;
    }
    countNewToday() {
        const today = SRS.startOfDay(Date.now());
        if (this.newDay !== today) { this.newDay = today; this.newCount = 0; }
        this.newCount++;
        this.saveMeta();
    }

    // ── Karten-Auswahl ───────────────────────────────────────
    pool() {
        const { topic, dir } = this.prefs;
        return this.cards.filter(c =>
            (topic === 'all' || c.topic === topic) &&
            (!this.hasDirs || dir === 'both' || !c.dir || c.dir === dir));
    }
    ids() { return this.pool().map(c => String(c.id)); }

    // Überblick für die Startseite: Zähler über ALLE Karten des Decks (unabhängig vom Filter)
    overview() {
        const now = Date.now();
        const ids = this.cards.map(c => String(c.id));
        const c = SRS.counts(this.store, ids, now);
        const left = Math.max(0, this.prefs.newLimit - this.introducedToday());
        return { due: c.due, learning: c.learning, known: c.mature, unseen: c.new, newAvail: Math.min(left, c.new) };
    }

    // ── Aufbau der Oberfläche ────────────────────────────────
    build() {
        const rating = RATING_LABELS.map((label, i) =>
            `<button class="fc-rate-btn r${i}" data-rating="${i}"><span>${label}</span><span class="fc-rate-sub"></span><span class="rate-key">${i + 1}</span></button>`
        ).join('');
        const limits = NEW_LIMIT_OPTIONS.map(n => `<option value="${n}">${n}</option>`).join('');
        this.root.innerHTML = `
            <section class="deck">
                <div class="fc-filters" data-ref="filters"></div>
                <div class="fc-card" data-ref="card" title="Antwort anzeigen">
                    <div class="fc-badge" data-ref="badge"></div>
                    <div class="fc-count" data-ref="count"></div>
                    <div data-ref="front">
                        <p class="fc-label" data-ref="frontLabel">Frage</p>
                        <p class="fc-q" data-ref="q"></p>
                    </div>
                    <div class="fc-back" data-ref="back" style="display:none;">
                        <p class="fc-label">Antwort</p>
                        <div class="fc-a" data-ref="a"></div>
                    </div>
                    <p class="fc-hint" data-ref="hint">Tippen oder Leertaste zeigt die Antwort</p>
                </div>
                <div class="fc-done" data-ref="done" style="display:none;">
                    <div class="fc-done-title" data-ref="doneTitle"></div>
                    <div class="fc-done-text" data-ref="doneText"></div>
                </div>
                <div class="fc-rating" data-ref="rating" style="display:none;">
                    <p class="fc-rating-prompt">Wie gut wusstest du es?</p>
                    <div class="fc-rating-grid">${rating}</div>
                </div>
                <div class="fc-actions">
                    <button class="btn btn-quiet" data-ref="skip">Überspringen</button>
                    <button class="btn btn-secondary" data-ref="mode"></button>
                </div>
                <div class="fc-feedback" data-ref="feedback" aria-live="polite"></div>
            </section>
            <section class="panel fc-dash">
                <h3>Lernstand</h3>
                <div class="stats">
                    <div class="stat-item is-due"><span class="stat-value" data-ref="cDue">0</span><span class="stat-label">Fällig</span></div>
                    <div class="stat-item is-learning"><span class="stat-value" data-ref="cLearning">0</span><span class="stat-label">In Lernung</span></div>
                    <div class="stat-item is-known"><span class="stat-value" data-ref="cMature">0</span><span class="stat-label">Bekannt</span></div>
                    <div class="stat-item is-new"><span class="stat-value" data-ref="cNew">0</span><span class="stat-label">Neu</span></div>
                </div>
                <p class="panel-note" data-ref="info"></p>
                <div class="fc-settings">
                    <label>Neue Karten pro Tag<select class="fc-select" data-ref="limit">${limits}</select></label>
                    <span data-ref="newToday"></span>
                </div>
                <div class="panel-actions">
                    <button class="btn btn-quiet" data-ref="reset">Lernstand zurücksetzen</button>
                </div>
            </section>`;
        this.ref = {};
        this.root.querySelectorAll('[data-ref]').forEach(el => { this.ref[el.dataset.ref] = el; });

        this.ref.card.addEventListener('click', () => this.flip());
        this.ref.skip.addEventListener('click', e => { e.currentTarget.blur(); this.skip(); });
        this.ref.mode.addEventListener('click', e => {
            e.currentTarget.blur();
            this.begin(this.mode === 'learn' ? 'practice' : 'learn');
        });
        this.ref.reset.addEventListener('click', () => this.reset());
        this.ref.limit.value = String(this.prefs.newLimit);
        this.ref.limit.addEventListener('change', () => {
            this.prefs.newLimit = parseInt(this.ref.limit.value);
            this.saveMeta();
            this.begin(this.mode);
        });
        this.root.querySelectorAll('.fc-rate-btn').forEach(b => {
            b.addEventListener('click', e => { e.currentTarget.blur(); this.rate(parseInt(b.dataset.rating)); });
        });
        this.buildFilters();
    }

    buildFilters() {
        const f = this.ref.filters;
        f.innerHTML = '';
        const colors = this.cfg.topicColors || {};

        if (this.topics.length > 1) {
            if (this.topics.length <= 4) {
                const row = document.createElement('div');
                row.className = 'fc-pills';
                [['all', 'Alle'], ...this.topics.map(t => [t, t])].forEach(([value, label]) => {
                    row.appendChild(this.pill(label, 'topic', value, colors[value]));
                });
                f.appendChild(row);
            } else {
                const sel = document.createElement('select');
                sel.className = 'fc-select';
                sel.setAttribute('aria-label', 'Thema');
                [['all', 'Alle Themen'], ...this.topics.map(t => [t, t])].forEach(([value, label]) => {
                    const o = document.createElement('option');
                    o.value = value;
                    o.textContent = label;
                    sel.appendChild(o);
                });
                sel.value = this.prefs.topic;
                sel.addEventListener('change', () => this.setPref('topic', sel.value));
                f.appendChild(sel);
            }
        }
        if (this.hasDirs) {
            const row = document.createElement('div');
            row.className = 'fc-pills';
            [['la-de', this.dirLabels['la-de'] || 'Latein → Deutsch'],
             ['de-la', this.dirLabels['de-la'] || 'Deutsch → Latein'],
             ['both', 'Beide']].forEach(([value, label]) => row.appendChild(this.pill(label, 'dir', value)));
            f.appendChild(row);
        }
    }

    pill(label, key, value, color) {
        const b = document.createElement('button');
        b.className = 'fc-pill' + (this.prefs[key] === value ? ' active' : '');
        b.textContent = label;
        b.dataset.pref = key;
        b.dataset.value = value;
        if (color) b.style.setProperty('--pill-color', color);
        b.addEventListener('click', e => { e.currentTarget.blur(); this.setPref(key, value); });
        return b;
    }

    setPref(key, value) {
        this.prefs[key] = value;
        this.saveMeta();
        this.root.querySelectorAll('.fc-pill[data-pref="' + key + '"]').forEach(b => {
            b.classList.toggle('active', b.dataset.value === value);
        });
        this.begin(this.mode);
    }

    // ── Sitzung ──────────────────────────────────────────────
    begin(mode) {
        this.mode = mode;
        this.busy = false;
        const now = Date.now();
        const pool = this.pool();
        let ids;
        if (mode === 'learn') {
            const due = [];
            const fresh = [];
            pool.forEach(c => {
                const k = SRS.classify(this.store.get(String(c.id)), now);
                if (k === 'due') due.push(String(c.id));
                else if (k === 'new') fresh.push(c);
            });
            const left = Math.max(0, this.prefs.newLimit - this.introducedToday());
            let news = fresh.slice(0, left);
            if (this.hasDirs && this.prefs.dir === 'both') {
                // Hin- und Rückrichtung derselben Vokabel nicht direkt hintereinander
                news = [...news.filter(c => c.dir !== 'de-la'), ...news.filter(c => c.dir === 'de-la')];
            }
            ids = [...SRS.shuffle(due), ...news.map(c => String(c.id))];
        } else {
            ids = SRS.shuffle(pool.map(c => String(c.id)));
        }
        this.session = SRS.createSession({ ids, store: this.store, now: Date.now });
        this.builtDay = SRS.startOfDay(now);
        this.ref.mode.textContent = mode === 'learn' ? 'Freies Üben' : 'Zurück zum Lernen';
        this.ref.mode.title = mode === 'learn'
            ? 'Alle Karten gemischt üben – der Lernplan ändert sich nur, wenn du etwas vergessen hast'
            : 'Fällige und neue Karten lernen';
        this.ref.feedback.textContent = '';
        this.updateDashboard();
        this.showNext();
    }

    showNext() {
        const id = this.session.peek();
        if (id === null) { this.showDone(); return; }
        this.showCard(this.byId.get(id));
    }

    showCard(card) {
        const r = this.ref;
        this.current = card;
        this.flipped = false;
        this.busy = false;
        r.done.style.display = 'none';
        r.card.style.display = '';
        r.card.classList.remove('flipped');
        r.front.style.display = '';
        r.back.style.display = 'none';
        r.hint.style.display = '';
        r.rating.style.display = 'none';
        r.skip.style.display = '';

        r.frontLabel.textContent = (card.dir && this.dirLabels[card.dir]) || 'Frage';
        r.q.textContent = card.q;
        r.q.classList.toggle('is-long', card.q.length > 60);

        // Antwort: erste Zeile groß, weitere Zeilen (Genitiv, Beispiel …) als Zusatz
        const [main, ...meta] = card.a.split('\n');
        const mainEl = document.createElement('div');
        mainEl.className = 'fc-a-main' + (main.length > 80 ? ' is-long' : '');
        mainEl.textContent = main;
        const nodes = [mainEl];
        if (meta.length) {
            const metaEl = document.createElement('div');
            metaEl.className = 'fc-a-meta';
            metaEl.textContent = meta.join('\n');
            nodes.push(metaEl);
        }
        r.a.replaceChildren(...nodes);

        const colors = this.cfg.topicColors || {};
        r.badge.textContent = card.topic;
        if (colors[card.topic]) r.badge.style.setProperty('--topic-color', colors[card.topic]);
        else r.badge.style.removeProperty('--topic-color');
        r.count.textContent = (this.session.isRelearning(String(card.id)) ? '↻ ' : '') + 'Noch ' + this.session.remaining();
        r.feedback.textContent = '';
    }

    showDone() {
        const r = this.ref;
        this.current = null;
        this.flipped = false;
        r.card.style.display = 'none';
        r.rating.style.display = 'none';
        r.skip.style.display = 'none';
        r.done.style.display = '';

        const ids = this.ids();
        const c = SRS.counts(this.store, ids, Date.now());
        const next = SRS.daysToNextDue(this.store, ids, Date.now());
        const lines = [];
        if (ids.length === 0) {
            r.doneTitle.textContent = 'Keine Karten';
            lines.push('In dieser Auswahl gibt es keine Karten.');
        } else if (this.mode === 'practice') {
            r.doneTitle.textContent = 'Alle Karten durchgegangen';
            lines.push('Mit „Zurück zum Lernen“ geht es mit dem Lernplan weiter.');
        } else {
            r.doneTitle.textContent = 'Für heute geschafft';
            if (c.new > 0) lines.push('Noch ' + c.new + ' neue Karten warten – Tageslimit (' + this.prefs.newLimit + ') erreicht. Du kannst es unten erhöhen.');
            if (next) lines.push('Nächste Wiederholung: ' + SRS.fmtDays(next));
            else if (c.new === 0) lines.push('Alle Karten gelernt.');
        }
        r.doneText.textContent = lines.join('\n');
        this.updateDashboard();
    }

    flip() {
        if (!this.current || this.flipped || this.busy) return;
        const r = this.ref;
        this.flipped = true;
        r.card.classList.add('flipped');
        r.back.style.display = '';
        r.hint.style.display = 'none';
        r.rating.style.display = 'block';
        const id = String(this.current.id);
        r.rating.querySelectorAll('.fc-rate-btn').forEach(btn => {
            const p = this.session.preview(id, parseInt(btn.dataset.rating));
            btn.querySelector('.fc-rate-sub').textContent = p.again ? 'gleich nochmal' : SRS.fmtDays(p.days);
        });
    }

    rate(rating) {
        if (!this.current || !this.flipped || this.busy) return;   // nur nach dem Umdrehen, nur einmal pro Karte
        this.busy = true;
        const id = String(this.current.id);
        const wasNew = !this.store.has(id);
        const res = this.session.grade(id, rating);
        if (wasNew && this.store.has(id)) this.countNewToday();

        this.ref.rating.style.display = 'none';
        this.ref.feedback.textContent = res.again ? '↻ Kommt gleich nochmal'
            : res.relearned ? '✓ Wieder gewusst – morgen noch einmal'
            : res.changed ? '✓ Nächste Wiederholung: ' + SRS.fmtDays(res.days)
            : 'Plan unverändert – nächste Wiederholung ' + SRS.fmtDays(res.days);
        this.updateDashboard();
        setTimeout(() => { if (this.busy) this.showNext(); }, 550);
    }

    skip() {
        if (!this.current || this.busy) return;
        this.session.defer(String(this.current.id));
        this.showNext();
    }

    reset() {
        if (!confirm('SRS-Fortschritt für dieses Deck zurücksetzen?')) return;
        this.store.clear();
        this.newDay = 0;
        this.newCount = 0;
        this.saveMeta();
        this.begin(this.mode);
    }

    // Beim Öffnen des Tabs: neuer Tag → Warteschlange neu aufbauen
    activate() {
        if (this.builtDay !== SRS.startOfDay(Date.now())) this.begin(this.mode);
        else this.updateDashboard();
    }

    updateDashboard() {
        const r = this.ref;
        const now = Date.now();
        const ids = this.ids();
        const c = SRS.counts(this.store, ids, now);
        r.cDue.textContent = c.due;
        r.cLearning.textContent = c.learning;
        r.cMature.textContent = c.mature;
        r.cNew.textContent = c.new;
        const next = SRS.daysToNextDue(this.store, ids, now);
        r.info.textContent = c.due > 0
            ? c.due + ' Karte' + (c.due !== 1 ? 'n' : '') + ' fällig!'
            : next ? 'Nächste Wiederholung: ' + SRS.fmtDays(next)
            : c.new > 0 ? '' : 'Alle Karten bekannt';
        r.newToday.textContent = 'Heute neu gelernt: ' + this.introducedToday() + ' / ' + this.prefs.newLimit;
    }

    handleKey(e) {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this.flip(); }
        else if (e.key === 'Escape') this.skip();
        else if (e.key >= '1' && e.key <= '6') this.rate(parseInt(e.key) - 1);
    }
}

// Decks: Datendatei laden (<script> oben) und hier eintragen
const DECK_CONFIGS = [
    { moduleId: 'flashcards', storageKey: 'medat_fc_srs_v1', cards: flashcardsData,
      topicOrder: ['Biologie', 'Chemie'],
      topicColors: { Biologie: 'var(--lymph)', Chemie: 'var(--blue)' },
      defaultNewLimit: 20 },
    { moduleId: 'b2knochen', storageKey: 'medat_srs_b2_knochen_v1', cards: block2KnochenCards,
      dirLabels: block2KnochenDirLabels, defaultDir: 'la-de', defaultNewLimit: 20 },
];
const decks = {};

// ============================================================
// NAVIGATION: Bereich (oben) → Kategorie (darunter)
// Neuer Block = neuer Eintrag in AREAS.
// ============================================================
const AREAS = [
    { id: 'aufnahmetest', label: 'Aufnahmetest', modules: [
        { id: 'wortfluessigkeit', label: 'Wortflüssigkeit' },
        { id: 'zahlenfolgen',     label: 'Zahlenfolgen' },
        { id: 'wissen',           label: 'Wissen' },
        { id: 'flashcards',       label: 'Flashcards' },
    ] },
    { id: 'block2', label: 'Block 2', modules: [
        { id: 'b2knochen', label: 'Knochen- und Bandpraktikum' },
    ] },
];
const NAV_KEY = 'medat_nav_v1';
let currentArea = null;
let navMemory = {};

function areaOfModule(name) {
    return AREAS.find(a => a.modules.some(m => m.id === name)) || AREAS[0];
}

// Anzeige-Reihenfolge: neueste Blöcke zuerst (AREAS ist von alt → neu angelegt)
function areasNewestFirst() {
    return AREAS.slice().reverse();
}

function loadNav() {
    try { navMemory = JSON.parse(safeStorage.getItem(NAV_KEY) || '{}') || {}; } catch (e) { navMemory = {}; }
}
function saveNav() {
    try { safeStorage.setItem(NAV_KEY, JSON.stringify(navMemory)); } catch (e) { /* ignorieren */ }
}

function renderNav() {
    const onHome = currentModule === 'home';
    const areaTabs = document.getElementById('area-tabs');
    areaTabs.innerHTML = '';

    const startBtn = document.createElement('button');
    startBtn.className = 'area-tab' + (onHome ? ' active' : '');
    startBtn.textContent = 'Start';
    startBtn.addEventListener('click', goHome);
    areaTabs.appendChild(startBtn);

    areasNewestFirst().forEach(a => {
        const b = document.createElement('button');
        b.className = 'area-tab' + (!onHome && a.id === currentArea.id ? ' active' : '');
        b.textContent = a.label;
        b.addEventListener('click', () => switchArea(a.id));
        areaTabs.appendChild(b);
    });
    const modTabs = document.getElementById('module-tabs');
    modTabs.innerHTML = '';
    if (onHome) return;
    currentArea.modules.forEach(m => {
        const b = document.createElement('button');
        b.className = 'nav-tab' + (m.id === currentModule ? ' active' : '');
        b.dataset.module = m.id;
        b.textContent = m.label;
        b.addEventListener('click', () => switchModule(m.id));
        modTabs.appendChild(b);
    });
}

function switchArea(areaId) {
    const area = AREAS.find(a => a.id === areaId) || AREAS[0];
    const remembered = navMemory[area.id];
    const target = area.modules.some(m => m.id === remembered) ? remembered : area.modules[0].id;
    switchModule(target);
}

function switchModule(name) {
    currentModule = name;
    currentArea = areaOfModule(name);
    navMemory.area = currentArea.id;
    navMemory[currentArea.id] = name;
    saveNav();
    renderNav();
    document.querySelectorAll('.module').forEach(m => {
        m.classList.toggle('active', m.id === name + '-module');
    });
    if (name === 'wortfluessigkeit' && !currentWordData) safe(generateNewWord);
    if (name === 'zahlenfolgen' && !zfCurrent) safe(generateNewZahlenfolge);
    if (name === 'wissen' && !wissenCurrent) safe(generateNewWissenFrage);
    if (decks[name]) safe(() => decks[name].activate());
    window.scrollTo(0, 0);
}

// ============================================================
// STARTSEITE (Home)
// ============================================================
function goHome() {
    currentModule = 'home';
    navMemory.area = 'home';
    saveNav();
    document.querySelectorAll('.module').forEach(m => m.classList.toggle('active', m.id === 'home-module'));
    renderNav();
    renderHome();
    window.scrollTo(0, 0);
}

// ── Aktiv/Inaktiv: Lektionen und ganze Blöcke pausieren ──────────
// Pausierte zählen nicht in „Heute“ und werden gedämpft dargestellt. Nichts hier
// gespeichert = aktiv (Standard). Der Lernfortschritt bleibt beim Pausieren erhalten.
const ACTIVE_KEY = 'medat_active_v1';
let activeState = { areas: {}, modules: {} };
function loadActive() {
    try {
        const s = JSON.parse(safeStorage.getItem(ACTIVE_KEY) || '{}') || {};
        activeState = { areas: s.areas || {}, modules: s.modules || {} };
    } catch (e) { activeState = { areas: {}, modules: {} }; }
}
function saveActive() {
    try { safeStorage.setItem(ACTIVE_KEY, JSON.stringify(activeState)); } catch (e) { /* ignorieren */ }
}
function areaActive(id) { return activeState.areas[id] !== false; }
function moduleFlag(id) { return activeState.modules[id] !== false; }           // eigener Schalter der Lektion
function moduleActive(id) { return areaActive(areaOfModule(id).id) && moduleFlag(id); }  // tatsächlich aktiv (Block zählt mit)
function toggleArea(id)   { activeState.areas[id] = !areaActive(id); saveActive(); renderHome(); }
function toggleModule(id) { activeState.modules[id] = !moduleFlag(id); saveActive(); renderHome(); }

// Status einer Kategorie für die Startseite
function moduleStatus(id) {
    if (id === 'wissen') {
        const { due, unseen } = srsCounts();
        if (due > 0)   return { due, tone: 'due',  label: due + ' fällig' };
        if (unseen > 0) return { due: 0, tone: 'new', label: 'neue Fragen' };
        return { due: 0, tone: 'done', label: 'erledigt' };
    }
    if (decks[id]) {
        const o = decks[id].overview();
        if (o.due > 0)      return { due: o.due, tone: 'due',  label: o.due + ' fällig' };
        if (o.newAvail > 0) return { due: 0, tone: 'new', label: o.newAvail + ' neu' };
        if (o.unseen > 0)   return { due: 0, tone: 'new', label: 'neue Karten' };
        return { due: 0, tone: 'done', label: 'erledigt' };
    }
    return { due: 0, tone: 'practice', label: 'Übung' };
}

// Deck/Fach mit den meisten fälligen Karten – Ziel für „Jetzt wiederholen“ (nur aktive)
function bestDueTarget() {
    let best = null;
    const consider = (id, due) => { if (due > 0 && moduleActive(id) && (!best || due > best.due)) best = { id, due }; };
    consider('wissen', srsCounts().due);
    Object.keys(decks).forEach(id => consider(id, decks[id].overview().due));
    return best;
}

function startDue(id) {
    switchModule(id);
    if (id === 'wissen') safe(srsStartDueSession);
    else if (decks[id]) safe(() => decks[id].begin('learn'));
}

function renderHome() {
    const el = document.getElementById('home-module');
    if (!el) return;

    // Aggregat: fällig & neu verfügbar – nur aktive Lektionen zählen
    let totalDue = 0, totalNew = 0;
    if (moduleActive('wissen')) totalDue += srsCounts().due;
    Object.keys(decks).forEach(id => {
        if (!moduleActive(id)) return;
        const o = decks[id].overview();
        totalDue += o.due; totalNew += o.newAvail;
    });

    const target = bestDueTarget();
    const dueWord = totalDue === 1 ? 'fällige Wiederholung' : 'fällige Wiederholungen';
    let action, sub;
    if (totalDue > 0) {
        action = `<button class="btn btn-primary home-go" data-go="${target.id}">Jetzt wiederholen</button>`;
        sub = totalNew > 0 ? `Dazu ${totalNew} neue Karte${totalNew !== 1 ? 'n' : ''} verfügbar.` : 'Danach ist für heute alles wiederholt.';
    } else if (totalNew > 0) {
        action = `<button class="btn btn-primary home-go" data-go="${firstNewTarget()}">Neue Karten lernen</button>`;
        sub = `${totalNew} neue Karte${totalNew !== 1 ? 'n' : ''} warten auf dich.`;
    } else {
        action = '';
        sub = 'Nichts fällig. Du kannst jederzeit frei üben.';
    }

    const toggle = (on, attrs, title) =>
        `<button class="home-toggle" role="switch" aria-checked="${on}" title="${title}" ${attrs}><span class="home-toggle-track"></span></button>`;

    const areasHtml = areasNewestFirst().map(a => {
        const aOn = areaActive(a.id);
        const rows = a.modules.map(m => {
            const active = moduleActive(m.id);
            const statusHtml = active
                ? (() => { const s = moduleStatus(m.id); return `<span class="home-pill home-pill--${s.tone}">${s.label}</span>`; })()
                : `<span class="home-pill home-pill--off">inaktiv</span>`;
            const t = toggle(moduleFlag(m.id),
                `data-toggle-module="${m.id}"${aOn ? '' : ' disabled'}`,
                moduleFlag(m.id) ? 'Lektion pausieren' : 'Lektion aktivieren');
            return `<div class="home-row${active ? '' : ' is-off'}">
                        <button class="home-row-main" data-module="${m.id}">
                            <span class="home-row-name">${m.label}</span>
                            ${statusHtml}
                        </button>
                        ${t}
                    </div>`;
        }).join('');
        return `<section class="home-area${aOn ? '' : ' is-off'}">
                    <div class="home-area-head">
                        <h2 class="home-area-title">${a.label}</h2>
                        ${toggle(aOn, `data-toggle-area="${a.id}"`, aOn ? 'Block pausieren' : 'Block aktivieren')}
                    </div>
                    <div class="home-rows">${rows}</div>
                </section>`;
    }).join('');

    el.innerHTML = `
        <section class="home-hero">
            <div class="home-today">
                <p class="home-today-label">Heute</p>
                <p class="home-today-num${totalDue === 0 ? ' is-zero' : ''}">${totalDue}</p>
                <p class="home-today-cap">${dueWord}</p>
                ${action}
                <p class="home-today-sub">${sub}</p>
            </div>
        </section>
        <p class="home-hint">Mit dem Schalter rechts pausierst du eine Lektion oder einen ganzen Block. Pausierte zählen nicht in „Heute“, der Lernstand bleibt erhalten.</p>
        <div class="home-areas">${areasHtml}</div>
    `;

    const go = el.querySelector('.home-go');
    if (go) go.addEventListener('click', () => startDue(go.dataset.go));
    el.querySelectorAll('.home-row-main').forEach(r => r.addEventListener('click', () => switchModule(r.dataset.module)));
    el.querySelectorAll('[data-toggle-module]').forEach(b => b.addEventListener('click', () => toggleModule(b.dataset.toggleModule)));
    el.querySelectorAll('[data-toggle-area]').forEach(b => b.addEventListener('click', () => toggleArea(b.dataset.toggleArea)));
}

function firstNewTarget() {
    const d = Object.keys(decks).find(id => moduleActive(id) && decks[id].overview().newAvail > 0);
    return d || Object.keys(decks).find(id => moduleActive(id)) || 'wissen';
}

// ============================================================
// INITIALISIERUNG (alle Event-Listener)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Wortflüssigkeit
    document.querySelectorAll('.difficulty-btn[data-difficulty]').forEach(b => {
        b.addEventListener('click', () => setDifficulty(b.dataset.difficulty));
    });
    document.querySelectorAll('#letter-options .letter-option').forEach(o => {
        o.addEventListener('click', () => selectAnswer(o.dataset.option));
    });
    document.getElementById('show-word-btn').addEventListener('click', showWord);
    document.getElementById('check-answer-btn').addEventListener('click', checkAnswer);
    document.getElementById('new-word-btn').addEventListener('click', generateNewWord);

    // Zahlenfolgen
    document.querySelectorAll('#zf-options .letter-option').forEach(o => {
        o.addEventListener('click', () => selectZfAnswer(o.dataset.option));
    });
    document.getElementById('zf-check-btn').addEventListener('click', checkZfAnswer);
    document.getElementById('zf-show-btn').addEventListener('click', showZfSolution);
    document.getElementById('zf-new-btn').addEventListener('click', generateNewZahlenfolge);

    // Wissen
    document.querySelectorAll('[data-subject]').forEach(b => {
        b.addEventListener('click', () => setWissenSubject(b.dataset.subject));
    });
    document.querySelectorAll('#wissen-options .letter-option').forEach(o => {
        o.addEventListener('click', () => selectWissenAnswer(o.dataset.option));
    });
    document.getElementById('wissen-check-btn').addEventListener('click', checkWissenAnswer);
    document.getElementById('wissen-new-btn').addEventListener('click', wissenSkip);

    // SRS-Buttons (Wissen)
    document.querySelectorAll('.srs-btn').forEach(btn => {
        btn.addEventListener('click', () => handleSrsRating(parseInt(btn.dataset.rating)));
    });
    document.getElementById('srs-due-btn').addEventListener('click', srsStartDueSession);
    document.getElementById('srs-reset-btn').addEventListener('click', () => {
        if (confirm('SRS-Fortschritt für alle Wissen-Fragen zurücksetzen?')) {
            wissenStore.clear();
            srsUpdateDisplay();
            alert('SRS zurückgesetzt.');
        }
    });

    // Tastatur
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const tag = e.target && e.target.tagName;
        if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;

        if (decks[currentModule]) {
            decks[currentModule].handleKey(e);
        } else if (currentModule === 'wortfluessigkeit') {
            if (e.key === 'Escape') generateNewWord();
            else if (e.key === 'F1') { e.preventDefault(); showWord(); }
            else if (e.key === 'Enter') { e.preventDefault(); checkAnswer(); }
            else if (['a','b','c','d','e'].includes(e.key.toLowerCase())) selectAnswer(e.key.toUpperCase());
        } else if (currentModule === 'zahlenfolgen') {
            if (e.key === 'Escape') generateNewZahlenfolge();
            else if (e.key === 'Enter') { e.preventDefault(); checkZfAnswer(); }
            else if (['a','b','c','d','e'].includes(e.key.toLowerCase())) selectZfAnswer(e.key.toUpperCase());
        } else if (currentModule === 'wissen') {
            if (e.key === 'Escape') wissenSkip();
            else if (e.key === 'Enter') { e.preventDefault(); checkWissenAnswer(); }
            else if (wissenPhase === 'answered' && e.key >= '1' && e.key <= '6') handleSrsRating(parseInt(e.key) - 1);
            else if (['a','b','c','d','e'].includes(e.key.toLowerCase())) selectWissenAnswer(e.key.toUpperCase());
        }
    });

    // Erste Aufgaben generieren (jeder Schritt einzeln abgesichert)
    safe(wissenMigrateV2);
    safe(generateNewWord);
    safe(generateNewZahlenfolge);
    safe(generateNewWissenFrage);
    safe(updateStats);
    safe(updateZfStats);
    safe(updateWissenStats);
    safe(srsUpdateDisplay);

    // Flashcard-Decks aufbauen
    DECK_CONFIGS.forEach(cfg => { safe(() => { decks[cfg.moduleId] = new FlashDeck(cfg); }); });

    // Titel führt zur Startseite zurück
    const home = document.getElementById('home-link');
    if (home) home.addEventListener('click', goHome);

    // Standard-Einstieg: Startseite
    loadNav();
    loadActive();
    currentArea = AREAS[AREAS.length - 1];
    goHome();
});

// Service Worker (Offline-Cache)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
