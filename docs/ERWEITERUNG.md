# MedAT Trainer – Fragen erweitern

## Dateistruktur

```
medat-trainer/
├── index.html              ← Haupt-App (HTML + CSS + Logik)
├── data_wortfluessigkeit.js ← 137 Wörter
├── data_zahlenfolgen.js    ← 60 Zahlenfolgen-Aufgaben
├── data_wissen.js          ← 564 Wissensfragen (Bio/Chemie/Physik/Mathe)
├── data_figuren.js         ← 20 Figuren-Aufgaben (Canvas)
└── ERWEITERUNG.md          ← Diese Anleitung
```

## Deployment & Cache-Verwaltung

### Nach jedem Update: Cache-Version hochzählen

Wenn du neue Fragen oder andere Daten pushst, **muss** die Cache-Version in `sw.js` erhöht werden — sonst sehen Nutzer auf dem iPhone noch die alte Version.

In `sw.js`, erste Zeile ändern:
```js
const CACHE = 'medat-v3';  // → 'medat-v4', 'medat-v5', ...
```

Dann committen und pushen — GitHub Actions deployt automatisch, und beim nächsten Öffnen der App wird der alte Cache verworfen.

### Fetch-Strategie

- **Datendateien** (`data_*.js`): Network-first — beim Öffnen wird immer die neueste Version vom Server geholt, Fallback auf Cache wenn offline
- **App-Shell** (`index.html`, Icons): Cache-first — bleibt schnell und offline-fähig

### Manueller Cache-Reset (iPhone)

Falls eine Aktualisierung trotzdem nicht ankommt:
Einstellungen → Safari → Erweitert → Websitedaten → Deine GitHub-Pages-URL suchen → Löschen



Alle Dateien in **einem Ordner** behalten und `index.html` im Browser öffnen.
Bei `file://`-Protokoll muss der Browser lokale Scripts erlauben (Chrome: `--allow-file-access-from-files`).
Alternativ: einfacher lokaler Server z.B. `python3 -m http.server 8080`.

---

## Wissensfragen erweitern (`data_wissen.js`)

### Schema

```js
{ q: 'Frage?',
  opts: ['Option A', 'Option B', 'Option C', 'Option D'],  // 4 oder 5 Optionen
  correct: 1,          // 0-basierter Index der richtigen Antwort (hier: Option B)
  level: 'leicht' }    // optional: 'leicht' | 'mittel' | 'schwer'
```

### Markierung
- `level: 'leicht'` / `'mittel'` / `'schwer'` → Originalfragen aus ÖH Med Wien Skripten (grün/gelb/rot im Badge)
- Kein `level` → eigene Ergänzungsfragen (grün im Badge, mit ✏️)

### Beispiel: Neue Biologie-Frage einfügen

In `data_wissen.js` im `biologie: [...]` Array am Ende vor dem `]` einfügen:

```js
{ q: 'Was ist die Funktion der Ribosomen?',
  opts: ['ATP-Produktion', 'Proteinsynthese', 'DNA-Replikation', 'Lipidabbau', 'Keine der Antworten'],
  correct: 1 },
```

### 5-Optionen-Fragen (mit "Keine der Antworten")

```js
{ q: 'Welche Base kommt in RNA aber nicht DNA vor?',
  opts: ['Adenin', 'Guanin', 'Cytosin', 'Thymin', 'Keine der gegebenen Antworten'],
  correct: 3,
  level: 'leicht' },
```

**Wichtig:** `correct` ist immer 0-basiert (A=0, B=1, C=2, D=3, E=4).

---

## Zahlenfolgen erweitern (`data_zahlenfolgen.js`)

```js
{ sequence: [2, 4, 8, '?', 32, '?'],
  options: {
    A: [16, 64], B: [12, 48], C: [16, 48], D: [20, 64]
  },
  correct: 'A',   // 'A'|'B'|'C'|'D'|'E'
  rule: 'Jede Zahl wird verdoppelt (×2)' },
```

---

## Wortflüssigkeit erweitern (`data_wortfluessigkeit.js`)

```js
// In wordFluencyWords.short / .medium / .long einfügen:
{ letters: ['B','A','U','M'], startLetter: 'B', word: 'BAUM' },
```

Kategorien: `short` (≤5 Buchstaben), `medium` (6–8), `long` (9+).

---

## Figuren erweitern (`data_figuren.js`)

```js
{ correct: 'B',
  parts(ctx, w, h) {
      // Zeichne Einzelteile mit fzRect(), fzPoly(), fzCircle(), fzArc()
      fzRect(ctx, 20, 30, 60, 40, FZ_F, FZ_S);
  },
  opts: {
      A: (ctx,w,h) => fzCircle(ctx, w/2, h/2, 35, FZ_F, FZ_S),
      B: (ctx,w,h) => fzRect(ctx, w/2-35, h/2-25, 70, 50, FZ_F, FZ_S),
      C: (ctx,w,h) => fzPoly(ctx, [[w/2,15],[w-15,h-15],[15,h-15]], FZ_F, FZ_S),
      D: (ctx,w,h) => fzPoly(ctx, [[w/2-30,h/2],[w/2,h/2-30],[w/2+30,h/2],[w/2,h/2+30]], FZ_F, FZ_S),
  }
},
```

Verfügbare Hilfsfunktionen: `fzPoly(ctx, pts, fill, stroke)`, `fzCircle(ctx, x, y, r, fill, stroke)`,
`fzRect(ctx, x, y, w, h, fill, stroke)`, `fzArc(ctx, x, y, r, a1, a2, fill, stroke)`.
Konstanten: `FZ_F` (Füllfarbe Hellblau), `FZ_S` (Strichfarbe Dunkelblau).
