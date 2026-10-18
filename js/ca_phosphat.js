// Lernatlas – Block 2 · Calcium- & Phosphathaushalt
// Interaktives Regelkreis-Modell: Hormone einstellen → Wirkung auf Knochen, Niere, Darm → Serum- und Urin-Tendenzen.
//
// Das Modell ist qualitativ (Richtungen, keine Konzentrationen) und bewusst so gebaut, dass die vier klassischen
// Krankheitsbilder die Lehrbuch-Konstellation ergeben (siehe Tests). Inhalte der Fälle: data/block2/calcium_phosphat.js

(function (root) {
    'use strict';

    const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
    const tend = (x, th) => (x >= th ? 1 : x <= -th ? -1 : 0);

    // ── Regler ───────────────────────────────────────────────────────
    // cls: Farbklasse der gewählten Option (down = rot, flat = grün, up = orange, info = blau)
    const CONTROLS = [
        { key: 'ca', label: 'Serum-Calcium', hint: 'Reiz für den Regelkreis', opts: [
            { v: -1, t: 'Niedrig', cls: 'down' }, { v: 0, t: 'Normal', cls: 'flat' }, { v: 1, t: 'Hoch', cls: 'up' } ] },
        { key: 'pth', label: 'Parathormon (PTH)', opts: [
            { v: -1, t: 'Erniedrigt', cls: 'down' }, { v: 0, t: 'Normal', cls: 'flat' }, { v: 1, t: 'Erhöht', cls: 'up' } ] },
        { key: 'vitd', label: 'Calcitriol (1,25-(OH)₂-Vit. D₃)', opts: [
            { v: -1, t: 'Erniedrigt', cls: 'down' }, { v: 0, t: 'Normal', cls: 'flat' }, { v: 1, t: 'Erhöht', cls: 'up' } ] },
        { key: 'ct', label: 'Calcitonin', opts: [
            { v: 0, t: 'Inaktiv', cls: 'flat' }, { v: 1, t: 'Aktiviert', cls: 'info' } ] },
        { key: 'renal', label: 'Nierenfunktion', hint: 'für CKD', opts: [
            { v: 0, t: 'Normal', cls: 'flat' }, { v: 1, t: 'Eingeschränkt', cls: 'down' } ] }
    ];
    const START = { ca: 0, pth: 0, vitd: 0, ct: 0, renal: 0 };

    // ── Modell ───────────────────────────────────────────────────────
    // s = { ca, pth, vitd: -1|0|1, ct: 0|1, renal: 0|1 }
    function compute(s) {
        const L = s.ca, P = s.pth, D = s.vitd, C = s.ct, R = s.renal;

        // Knochen
        const osteoclast = clamp(P + 0.5 * Math.max(D, 0) - C, -2, 2);
        const mineralImpaired = D < 0 && P >= 0;          // Substratmangel (Rachitis/Osteomalazie, Renale Osteopathie)

        // Niere
        const kidneyCa = clamp(P + 0.5 * D - 0.5 * C - 0.5 * L, -2, 2);       // Ca-Rückresorption (distal; CaSR bremst bei hohem Ca)
        const kidneyPo = clamp(-2.5 * P + 0.5 * D - 0.5 * C, -2, 2);          // PO4-Rückresorption (proximal; PTH hemmt)
        let hydroxylase = P - (D > 0 ? 0.5 : 0);                              // 1α-Hydroxylase; Calcitriol hemmt sich selbst
        if (R) hydroxylase = Math.min(hydroxylase, -2);                       // Nephronverlust
        hydroxylase = clamp(hydroxylase, -2, 2);
        const poExcretion = clamp(-kidneyPo - 4 * R, -2, 2);                  // PO4-Ausscheidung (CKD: begrenzt)
        const caUrine = clamp(2 * L - kidneyCa, -4, 4);                       // gefilterte Menge (Serum-Ca) minus Rückresorption

        // Darm (nur Calcitriol; PTH wirkt indirekt)
        const gut = D;

        // Netto-Bilanz für das Serum
        const netCa = osteoclast + kidneyCa + gut;
        const netPo = 0.5 * osteoclast + 0.5 * gut - poExcretion;

        return {
            osteoclast, osteoblast: P, mineralImpaired,
            kidneyCa, kidneyPo, hydroxylase, gut, poExcretion, caUrine,
            netCa, netPo,
            tend: { ca: tend(netCa, 1.5), po: tend(netPo, 0.5), uca: tend(caUrine, 0.75), upo: tend(poExcretion, 0.75) },
            // Netto-Fluss ins Blut je Organ (für das Diagramm)
            flux: {
                bone: { ca: osteoclast, po: osteoclast },
                kidney: { ca: kidneyCa, po: -poExcretion },
                gut: { ca: gut, po: gut }
            },
            relativeCaLoss: L < 0 && kidneyCa < 0    // Ca-Verlust im Urin für das niedrige Serum-Ca inadäquat hoch
        };
    }

    // Vergleich der Reglerstellung mit der erwarteten Stellung eines Falls
    // → [{ key, ok, skipped, allowed }]
    function checkSetting(expected, s) {
        return CONTROLS.map(c => {
            const allowed = expected[c.key];
            if (allowed === null || allowed === undefined) return { key: c.key, ok: true, skipped: true, allowed: null };
            return { key: c.key, ok: allowed.includes(s[c.key]), skipped: false, allowed };
        });
    }

    // Physiologischer Regelkreis: Hormone folgen dem Calcium (und der Niere)
    function autoHormones(s) {
        const L = s.ca;
        let pth = L < 0 ? 1 : L > 0 ? -1 : 0;
        let vitd = L < 0 ? 1 : L > 0 ? -1 : 0;
        const ct = L > 0 ? 1 : 0;
        if (s.renal) vitd = -1;                              // ohne funktionierende Nephrone kein Calcitriol-Anstieg
        return { pth, vitd, ct };
    }

    // ── Darstellung ──────────────────────────────────────────────────
    const ARROW = { 1: '↑', 0: '↔', '-1': '↓' };
    const CLS = { 1: 'up', 0: 'flat', '-1': 'down' };
    const sgn = (x, th) => tend(x, th == null ? 0.5 : th);

    // Stufe einer Aktivität (−2…+2) → Chip
    function lv(x) {
        if (x <= -1.5) return { cls: 'down', t: '↓↓ stark vermindert' };
        if (x <= -0.5) return { cls: 'down', t: '↓ vermindert' };
        if (x < 0.5)  return { cls: 'flat', t: '↔ normal' };
        if (x < 1.5)  return { cls: 'up',   t: '↑ gesteigert' };
        return { cls: 'up', t: '↑↑ stark gesteigert' };
    }
    const chip = (cls, text) => `<span class="cp-chip cp-${cls}">${text}</span>`;
    const lvChip = x => { const l = lv(x); return chip(l.cls, l.t); };

    function organCards(s, m) {
        const P = s.pth, D = s.vitd, C = s.ct, L = s.ca, R = s.renal;

        // Knochen
        const ocReasons = [];
        if (P > 0) ocReasons.push('PTH wirkt über die Osteoblasten (RANKL ↑, OPG ↓) – Osteoklasten tragen selbst keinen PTH-Rezeptor.');
        if (P < 0) ocReasons.push('Ohne PTH-Reiz bleibt das RANKL-Signal niedrig, die Resorption ruht.');
        if (D > 0) ocReasons.push('Viel Calcitriol fördert ebenfalls RANKL.');
        if (C)     ocReasons.push('Calcitonin hemmt Osteoklasten direkt (beim Menschen nur schwacher Effekt).');
        if (!ocReasons.length) ocReasons.push('Ausgeglichener Knochenumbau.');

        const obText = P > 0 ? 'Gekoppelter Umbau: Osteoblasten sind aktiviert und geben RANKL ab. Dauerhaft hohes PTH baut Knochen ab, kurze pulsatile Gaben wirken anabol (Teriparatid).'
                    : P < 0 ? 'Der Umbau ist insgesamt verlangsamt (adynamischer, dichter Knochen).'
                    : 'Aufbau und Abbau im Gleichgewicht.';

        let minChip, minText;
        if (m.mineralImpaired) {
            minChip = chip('down', '↓ gestört');
            minText = 'Calcitriol fehlt: das Ca×PO₄-Angebot reicht nicht für die Hydroxylapatit-Bildung, Osteoid bleibt unverkalkt (Rachitis, Osteomalazie' + (R ? ', Anteil der renalen Osteopathie' : '') + ').';
        } else {
            minChip = chip('flat', '↔ ungestört');
            minText = (D < 0 && P < 0) ? 'Calcitriol niedrig, aber der Umbau ruht – die Mineralisation ist nicht primär gestört.' : 'Genug Ca und PO₄ für den Einbau.';
        }

        const rel = m.osteoclast;
        const relChip = rel >= 0.5 ? chip('up', '↑ Freisetzung') : rel <= -0.5 ? chip('down', '↓ Freisetzung (Einbau)') : chip('flat', '↔ ausgeglichen');

        // Niere
        const caReasons = [];
        if (P > 0) caReasons.push('PTH steigert die Rückresorption im distalen Tubulus (TRPV5, Calbindin-D28k).');
        if (P < 0) caReasons.push('Ohne PTH wird weniger Ca rückresorbiert.');
        if (D > 0) caReasons.push('Calcitriol verstärkt den Effekt.');
        if (L > 0) caReasons.push('Hohes Serum-Ca aktiviert den Calcium-sensing-Rezeptor im aufsteigenden Ast: Rückresorption ↓, Calciurie.');
        if (C)     caReasons.push('Calcitonin hemmt die Rückresorption leicht.');
        if (!caReasons.length) caReasons.push('Der größte Teil des filtrierten Calciums wird rückresorbiert.');

        const poReasons = [];
        if (P > 0) poReasons.push('PTH hemmt die Na⁺/Pi-Cotransporter (NaPi-IIa/IIc) im proximalen Tubulus → Phosphaturie.');
        if (P < 0) poReasons.push('Ohne PTH bleiben die Transporter in der Membran: Phosphat wird vermehrt rückresorbiert.');
        if (D > 0) poReasons.push('Calcitriol steigert die Rückresorption leicht.');
        if (R)     poReasons.push('Nephronverlust: Phosphat wird kaum noch ausgeschieden (Retention), obwohl PTH die Ausscheidung je Nephron fördert.');
        if (!poReasons.length) poReasons.push('Normale Rückresorption.');

        const hyReasons = [];
        if (P > 0) hyReasons.push('PTH induziert die 1α-Hydroxylase im proximalen Tubulus: 25-OH-D₃ → Calcitriol.');
        if (P < 0) hyReasons.push('Ohne PTH wird die 1α-Hydroxylase kaum induziert, Calcitriol sinkt.');
        if (D > 0) hyReasons.push('Calcitriol bremst seine eigene Bildung (negative Rückkopplung).');
        if (R)     hyReasons.push('Nephronverlust: die Enzymkapazität fällt aus (FGF23 hemmt zusätzlich).');
        if (D < 0 && m.hydroxylase > 0.5) hyReasons.push('Das Enzym ist aktiv, aber ohne Substrat (25-OH-D₃, Vitamin-D-Mangel) entsteht trotzdem zu wenig Calcitriol.');
        if (!hyReasons.length) hyReasons.push('Normale Calcitriol-Bildung.');

        // Darm
        const gutPte = P !== 0 ? ' PTH wirkt am Darm nur indirekt – über die Calcitriol-Bildung in der Niere.' : '';
        const cbText = D > 0 ? 'Calcitriol induziert im Enterozyten Calbindin-D9k (Transport), TRPV6 (Aufnahme) und PMCA1b (Abgabe ins Blut).'
                    : D < 0 ? 'Ohne Calcitriol werden diese Proteine kaum gebildet.' : 'Normale Expression.';

        return [
            { key: 'bone', title: 'Knochen', rows: [
                { name: 'Osteoklasten (Resorption)', chip: lvChip(m.osteoclast), text: ocReasons.join(' ') },
                { name: 'Osteoblasten (Umbau)', chip: lvChip(m.osteoblast), text: obText },
                { name: 'Mineralisation', chip: minChip, text: minText },
                { name: 'Ca²⁺- und PO₄³⁻-Freisetzung', chip: relChip, text: 'Hydroxylapatit gibt Calcium und Phosphat gleichsinnig ab: Resorption erhöht beides im Blut.' }
            ], tips: ['PTH → Osteoblast → RANKL → Osteoklast: Der Osteoklast hat keinen PTH-Rezeptor.'].concat(C ? ['Calcitonin = Calcium-Bremse: C-Zellen der Schilddrüse, bei Hypercalcämie aktiv, hemmen Osteoklasten.'] : []) },
            { key: 'kidney', title: 'Niere', rows: [
                { name: 'Ca²⁺-Rückresorption (distal)', chip: lvChip(m.kidneyCa), text: caReasons.join(' ') },
                { name: 'PO₄³⁻-Rückresorption (proximal)', chip: lvChip(m.kidneyPo), text: poReasons.join(' ') },
                { name: '1α-Hydroxylase-Aktivität', chip: lvChip(m.hydroxylase), text: hyReasons.join(' ') }
            ], tips: ['PTH: Phosphat raus, Calcium rein.', 'Calcitriol entsteht erst in der Niere: 25-OH-D₃ (Leber) → 1,25-(OH)₂-D₃ (proximaler Tubulus).'] },
            { key: 'gut', title: 'Darm', rows: [
                { name: 'Calbindin-Expression', chip: lvChip(m.gut), text: cbText },
                { name: 'Ca²⁺-Absorption', chip: lvChip(m.gut), text: 'Aktiver, calcitriol-abhängiger Transport in Duodenum und Jejunum.' + gutPte },
                { name: 'PO₄³⁻-Absorption', chip: lvChip(m.gut), text: 'Über NaPi-IIb, ebenfalls von Calcitriol gesteigert.' }
            ], tips: ['Der Darm gehorcht Calcitriol – PTH wirkt dort nur indirekt.'] }
        ];
    }

    // Regelkreis-Analyse: passt die Reaktion zum Calcium?
    function analysis(s, m) {
        const out = [];
        const L = s.ca, P = s.pth;
        if (L < 0 && P > 0) out.push({ tone: 'ok', text: 'Regelkreis intakt: Das niedrige Calcium wird mit erhöhtem PTH beantwortet (adäquat, z. B. sekundärer Hyperparathyreoidismus).' });
        else if (L < 0 && P <= 0) out.push({ tone: 'warn', text: 'PTH ' + (P < 0 ? 'inadäquat niedrig' : 'inadäquat „normal“') + ' bei niedrigem Calcium: Die Nebenschilddrüse antwortet nicht – Hypoparathyreoidismus-Muster.' });
        else if (L > 0 && P > 0) out.push({ tone: 'warn', text: 'PTH trotz Hypercalcämie nicht gebremst: autonome PTH-Sekretion (primärer Hyperparathyreoidismus, Sollwert des Ca-Sensors verschoben).' });
        else if (L > 0 && P === 0) out.push({ tone: 'warn', text: 'Ein „normales“ PTH bei Hypercalcämie ist unangemessen: Es müsste supprimiert sein – Verdacht auf primären Hyperparathyreoidismus.' });
        else if (L > 0 && P < 0) out.push({ tone: 'ok', text: 'PTH adäquat supprimiert: Der Regelkreis funktioniert. Bei Hypercalcämie mit niedrigem PTH liegt die Ursache außerhalb der Nebenschilddrüse (z. B. Tumor, Vitamin-D-Überschuss).' });
        else if (L === 0 && P === 0 && s.vitd === 0 && !s.ct && !s.renal) out.push({ tone: 'ok', text: 'Gleichgewicht: Ohne Reiz bleibt alles im Normbereich.' });
        else if (L === 0 && P !== 0) out.push({ tone: 'info', text: 'PTH ' + (P > 0 ? 'erhöht' : 'erniedrigt') + ' bei normalem Calcium: Der Reiz liegt woanders (Phosphat, Calcitriol, Niere) oder die Ursache ist primär.' });

        if (s.ct && L <= 0) out.push({ tone: 'info', text: 'Calcitonin wird physiologisch bei Hypercalcämie ausgeschüttet (C-Zellen, Ca-Sensor). Ohne diesen Reiz wirkt es nur pharmakologisch.' });
        if (s.renal) out.push({ tone: 'warn', text: 'Eingeschränkte Nierenfunktion: Phosphat-Retention und Calcitriol-Mangel treiben das PTH hoch (sekundärer Hyperparathyreoidismus).' });
        if (m.tend.ca >= 0 && m.tend.po > 0) out.push({ tone: 'warn', text: 'Ca×PO₄ steigt: Gefahr von Weichteil- und Gefäßverkalkung (Calciphylaxie, Nephrokalzinose).' });
        if (m.tend.ca === 0 && L !== 0) out.push({ tone: 'info', text: 'Die Netto-Bilanz ist ausgeglichen: Die Gegenregulation hält den Serumspiegel gerade stabil.' });
        return out;
    }

    // ── Diagramm (SVG) ───────────────────────────────────────────────
    function arrowSvg(x, flux, label, side) {
        const y1 = 150, y2 = 82;
        const a = Math.min(Math.abs(flux), 2);
        const lx = side < 0 ? x - 9 : x + 9;
        const anchor = side < 0 ? 'end' : 'start';
        const text = `<text x="${lx}" y="120" text-anchor="${anchor}" class="cp-svg-lbl">${label}</text>`;
        if (a < 0.4) return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="cp-ar0"/>` + text;
        const up = flux > 0;
        const w = (2 + a * 2).toFixed(1);
        const head = 10 + a * 3;
        const tip = up ? y2 : y1;
        const base = up ? y2 + head : y1 - head;
        const from = up ? y1 : y2;
        const hw = head * 0.55;
        return `<line x1="${x}" y1="${from}" x2="${x}" y2="${base}" class="cp-ar cp-ar-${up ? 'up' : 'down'}" stroke-width="${w}"/>` +
               `<polygon points="${x},${tip} ${x - hw},${base} ${x + hw},${base}" class="cp-arh cp-arh-${up ? 'up' : 'down'}"/>` + text;
    }

    function diagram(s, m) {
        const t = m.tend;
        const val = (x, label, k) => `<text x="${x}" y="54" text-anchor="middle" class="cp-svg-val cp-t-${CLS[k]}">${label} ${ARROW[k]}</text>`;
        const organs = [
            { label: 'Knochen', x: 6,   f: m.flux.bone },
            { label: 'Niere',   x: 126, f: m.flux.kidney },
            { label: 'Darm',    x: 246, f: m.flux.gut }
        ];
        let svg = `<svg viewBox="0 0 360 252" class="cp-svg" role="img" aria-label="Fluss von Calcium und Phosphat zwischen Blut, Knochen, Niere und Darm. ` +
            `Netto-Tendenz im Blut: Calcium ${t.ca > 0 ? 'steigt' : t.ca < 0 ? 'sinkt' : 'bleibt'}, Phosphat ${t.po > 0 ? 'steigt' : t.po < 0 ? 'sinkt' : 'bleibt'}.">`;
        svg += `<rect x="6" y="6" width="348" height="68" rx="3" class="cp-svg-blood"/>`;
        svg += `<text x="180" y="28" text-anchor="middle" class="cp-svg-title">Blut</text>`;
        svg += val(112, 'Ca²⁺', t.ca) + val(248, 'PO₄³⁻', t.po);
        organs.forEach(o => {
            const cx = o.x + 54;
            svg += arrowSvg(cx - 16, o.f.ca, 'Ca', -1) + arrowSvg(cx + 16, o.f.po, 'PO₄', 1);
            svg += `<rect x="${o.x}" y="156" width="108" height="56" rx="3" class="cp-svg-organ"/>`;
            svg += `<text x="${cx}" y="190" text-anchor="middle" class="cp-svg-organ-t">${o.label}</text>`;
        });
        svg += `<text x="180" y="238" text-anchor="middle" class="cp-svg-small">Urin: Ca ` +
               `<tspan class="cp-t-${CLS[t.uca]}">${ARROW[t.uca]}</tspan> · PO₄ <tspan class="cp-t-${CLS[t.upo]}">${ARROW[t.upo]}</tspan></text>`;
        return svg + '</svg>';
    }

    // ── Ergebnis-Kacheln ─────────────────────────────────────────────
    function tiles(s, m) {
        const t = m.tend;
        const org = (name, x) => `${name} ${ARROW[sgn(x, 0.5)]}`;
        const serumCa = `${org('Knochen', m.flux.bone.ca)} · ${org('Niere', m.flux.kidney.ca)} · ${org('Darm', m.flux.gut.ca)}`;
        const serumPo = `${org('Knochen', m.flux.bone.po)} · ${org('Niere', m.flux.kidney.po)} · ${org('Darm', m.flux.gut.po)}`;
        const uCaNote = `gefiltert ${ARROW[sgn(s.ca, 0.5)]} · Rückresorption ${ARROW[sgn(m.kidneyCa, 0.5)]}` + (m.relativeCaLoss ? '. Für das niedrige Serum-Ca relativ zu hoch.' : '');
        const uPoNote = `Rückresorption ${ARROW[sgn(m.kidneyPo, 0.5)]}` + (s.renal ? '. Nephronverlust: Retention' : '');
        const items = [
            { label: 'Ca²⁺ im Blut', k: t.ca, word: ['sinkt', 'bleibt stabil', 'steigt'], note: 'Netto aus: ' + serumCa },
            { label: 'PO₄³⁻ im Blut', k: t.po, word: ['sinkt', 'bleibt stabil', 'steigt'], note: 'Netto aus: ' + serumPo },
            { label: 'Urin-Calcium', k: t.uca, word: ['vermindert', 'unverändert', 'vermehrt'], note: uCaNote },
            { label: 'Urin-Phosphat', k: t.upo, word: ['vermindert', 'unverändert', 'vermehrt'], note: uPoNote }
        ];
        return items.map(i => `
            <div class="cp-tile cp-${CLS[i.k]}">
                <span class="cp-tile-arrow" aria-hidden="true">${ARROW[i.k]}</span>
                <span class="cp-tile-label">${i.label}</span>
                <span class="cp-tile-word">${i.word[i.k + 1]}</span>
                <span class="cp-tile-note">${i.note}</span>
            </div>`).join('');
    }

    // ── Oberfläche ───────────────────────────────────────────────────
    function mount(el, scenarios) {
        const st = Object.assign({}, START);
        let auto = true;
        let activeCase = null;
        let savedAuto = true;
        let answered = {};

        const ctl = CONTROLS.map(c => `
            <fieldset class="cp-ctl">
                <legend>${c.label}${c.hint ? ` <span class="cp-ctl-hint">${c.hint}</span>` : ''}</legend>
                <div class="cp-segs">
                    ${c.opts.map(o => `<label class="cp-seg cp-${o.cls}"><input type="radio" name="cp-${c.key}" value="${o.v}"><span>${o.t}</span></label>`).join('')}
                </div>
            </fieldset>`).join('');

        el.innerHTML = `
            <section class="cp">
                <div class="cp-live" data-ref="live" role="status" aria-live="polite"></div>

                <div class="cp-panel">
                    <div class="cp-panel-head">
                        <h3>Regler</h3>
                        <label class="fc-check"><input type="checkbox" data-ref="auto" checked> Hormone folgen dem Calcium</label>
                    </div>
                    <div class="cp-ctls">${ctl}</div>
                    <div class="cp-actions">
                        <button class="btn" data-ref="reset">Zurücksetzen</button>
                        <button class="btn btn-primary" data-ref="casesBtn" aria-expanded="false">Klinische Fälle</button>
                    </div>
                </div>

                <div class="cp-cases" data-ref="cases" hidden></div>

                <div class="cp-panel">
                    <h3>Ergebnis</h3>
                    <div class="cp-tiles" data-ref="tiles"></div>
                </div>

                <div class="cp-panel">
                    <h3>Regelkreis</h3>
                    <div class="cp-diagram" data-ref="diagram"></div>
                    <p class="cp-caption">Pfeil nach oben: Zufuhr ins Blut · nach unten: Verlust aus dem Blut · Dicke: Stärke</p>
                    <ul class="cp-analysis" data-ref="analysis"></ul>
                </div>

                <div class="cp-organs" data-ref="organs"></div>
            </section>`;

        const ref = {};
        el.querySelectorAll('[data-ref]').forEach(n => { ref[n.dataset.ref] = n; });

        function syncInputs() {
            CONTROLS.forEach(c => {
                el.querySelectorAll(`input[name="cp-${c.key}"]`).forEach(i => { i.checked = parseInt(i.value, 10) === st[c.key]; });
            });
            ref.auto.checked = auto;
        }

        function applyAuto() {
            if (!auto) return;
            Object.assign(st, autoHormones(st));
        }

        function render() {
            const m = compute(st);
            const t = m.tend;
            const live = (label, k) => `<span class="cp-live-item cp-${CLS[k]}"><span class="cp-live-label">${label}</span> <b>${ARROW[k]}</b></span>`;
            ref.live.innerHTML = live('Ca²⁺', t.ca) + live('PO₄³⁻', t.po) + live('Urin-Ca', t.uca) + live('Urin-PO₄', t.upo);
            ref.tiles.innerHTML = tiles(st, m);
            ref.diagram.innerHTML = diagram(st, m);
            ref.analysis.innerHTML = analysis(st, m).map(a => `<li class="cp-an cp-an-${a.tone}">${a.text}</li>`).join('');
            ref.organs.innerHTML = organCards(st, m).map(o => `
                <section class="cp-organ">
                    <h3>${o.title}</h3>
                    <div class="cp-rows">
                        ${o.rows.map(r => `
                            <div class="cp-row">
                                <div class="cp-row-head"><span class="cp-row-name">${r.name}</span>${r.chip}</div>
                                <p class="cp-row-text">${r.text}</p>
                            </div>`).join('')}
                    </div>
                    ${o.tips.map(x => `<p class="cp-tip">${x}</p>`).join('')}
                </section>`).join('');
        }

        function set(partial, fromUser) {
            Object.assign(st, partial);
            if (fromUser && (('ca' in partial) || ('renal' in partial))) applyAuto();
            syncInputs();
            render();
        }

        el.addEventListener('change', e => {
            const t = e.target;
            if (t.matches('input[type="radio"][name^="cp-"]')) {
                set({ [t.name.slice(3)]: parseInt(t.value, 10) }, true);
            } else if (t === ref.auto) {
                auto = ref.auto.checked;
                if (auto) { applyAuto(); syncInputs(); render(); }
            }
        });

        ref.reset.addEventListener('click', () => { Object.assign(st, START); syncInputs(); render(); });

        // ── Klinische Fälle ──
        function qHtml(sc, qi) {
            const q = sc.questions[qi];
            const a = answered[sc.id + qi];
            return `
                <div class="cp-q" data-q="${qi}">
                    <p class="cp-q-text">${q.q}</p>
                    <div class="cp-q-opts">
                        ${q.options.map((o, oi) => {
                            let cls = '';
                            if (a !== undefined) cls = oi === q.correct ? ' is-correct' : (oi === a ? ' is-wrong' : '');
                            return `<button class="cp-opt${cls}" data-qi="${qi}" data-oi="${oi}"${a !== undefined ? ' disabled' : ''}>${o}</button>`;
                        }).join('')}
                    </div>
                    ${a !== undefined ? `<p class="cp-q-why ${a === q.correct ? 'ok' : 'bad'}"><b>${a === q.correct ? 'Richtig.' : 'Nicht ganz.'}</b> ${q.why}</p>` : ''}
                </div>`;
        }

        function renderCases(checkResult, reveal) {
            if (!scenarios.length) { ref.cases.innerHTML = '<p class="cp-caption">Keine Fälle geladen.</p>'; return; }
            const pills = scenarios.map(sc => `<button class="fc-pill${activeCase && activeCase.id === sc.id ? ' active' : ''}" data-case="${sc.id}">${sc.short}</button>`).join('');
            let body = '<p class="cp-caption">Wähle einen Fall. Stelle dann die Regler passend zur Erkrankung ein und prüfe deine Einstellung.</p>';
            if (activeCase) {
                const sc = activeCase;
                const names = {};
                CONTROLS.forEach(c => { names[c.key] = c; });
                let check = '';
                if (checkResult) {
                    check = '<ul class="cp-check">' + checkResult.map(r => {
                        const c = names[r.key];
                        const mine = c.opts.find(o => o.v === st[r.key]).t;
                        if (r.skipped) return `<li class="skip">${c.label}: nicht bewertet</li>`;
                        const want = r.allowed.map(v => c.opts.find(o => o.v === v).t).join(' oder ');
                        return r.ok ? `<li class="ok">${c.label}: ${mine}</li>` : `<li class="bad">${c.label}: ${mine} (erwartet: ${want})</li>`;
                    }).join('') + '</ul>';
                }
                const labs = reveal ? `
                    <div class="cp-reveal">
                        <h4>Typischer Befund</h4>
                        <dl class="cp-labs">${sc.labs.map(l => `<div><dt>${l[0]}</dt><dd>${l[1]}</dd></div>`).join('')}</dl>
                        <h4>Warum?</h4>
                        <p>${sc.explain}</p>
                    </div>` : '';
                body = `
                    <h4>${sc.title}</h4>
                    <p class="cp-vignette">${sc.vignette}</p>
                    <p class="cp-caption">Aufgabe: Stelle die Regler so ein, wie sie zu diesem Fall passen.</p>
                    <div class="cp-actions">
                        <button class="btn btn-primary" data-act="check">Meine Einstellung prüfen</button>
                        <button class="btn" data-act="solve">Lösung einstellen</button>
                        <button class="btn btn-quiet" data-act="leave">Fall verlassen</button>
                    </div>
                    ${check}${labs}
                    <h4>Folgefragen</h4>
                    ${sc.questions.map((_, qi) => qHtml(sc, qi)).join('')}`;
            }
            ref.cases.innerHTML = `<div class="cp-panel"><h3>Klinische Fälle</h3><div class="fc-pills">${pills}</div>${body}</div>`;
        }

        function enterCase(sc) {
            if (!activeCase) savedAuto = auto;
            activeCase = sc;
            auto = false;                              // Hormone selbst einstellen
            answered = {};
            Object.assign(st, START);
            syncInputs(); render(); renderCases(null, false);
        }
        function leaveCase() {
            activeCase = null;
            auto = savedAuto;
            Object.assign(st, START);
            syncInputs(); render(); renderCases(null, false);
        }

        ref.casesBtn.addEventListener('click', () => {
            const open = ref.cases.hidden;
            ref.cases.hidden = !open;
            ref.casesBtn.setAttribute('aria-expanded', String(open));
            ref.casesBtn.textContent = open ? 'Fälle ausblenden' : 'Klinische Fälle';
            if (open) renderCases(null, false);
            else if (activeCase) leaveCase();
        });

        ref.cases.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b) return;
            if (b.dataset.case) { enterCase(scenarios.find(s => s.id === b.dataset.case)); return; }
            if (!activeCase) return;
            if (b.dataset.act === 'check') {
                const res = checkSetting(activeCase.expected, st);
                renderCases(res, res.every(r => r.ok));
            } else if (b.dataset.act === 'solve') {
                const ex = activeCase.expected, sol = {};
                CONTROLS.forEach(c => { if (ex[c.key]) sol[c.key] = ex[c.key][ex[c.key].length > 1 ? 1 : 0]; });
                // Bei Wahlmöglichkeit die ausgeprägtere Variante zeigen (z. B. niedrig statt normal bei CKD)
                CONTROLS.forEach(c => { if (ex[c.key] && ex[c.key].length > 1) sol[c.key] = ex[c.key][0]; });
                Object.assign(st, sol);
                syncInputs(); render();
                renderCases(checkSetting(activeCase.expected, st), true);
            } else if (b.dataset.act === 'leave') {
                leaveCase();
            } else if (b.dataset.qi !== undefined) {
                answered[activeCase.id + b.dataset.qi] = parseInt(b.dataset.oi, 10);
                const keepCheck = ref.cases.querySelector('.cp-check') ? checkSetting(activeCase.expected, st) : null;
                const keepReveal = !!ref.cases.querySelector('.cp-reveal');
                renderCases(keepCheck, keepReveal);
            }
        });

        syncInputs();
        render();
        return { state: st, render, set };
    }

    const api = { CONTROLS, START, compute, checkSetting, autoHormones, mount };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.CaPhos = api;

    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', () => {
            const el = document.getElementById('b2calcium-module');
            if (!el) return;
            const sc = (typeof caPhosScenarios !== 'undefined') ? caPhosScenarios : [];
            try { mount(el, sc); } catch (e) { console.error(e); }
        });
    }
})(typeof window !== 'undefined' ? window : globalThis);
