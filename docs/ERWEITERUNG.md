# MedAT Trainer – Fragen erweitern

## Dateistruktur

Siehe `README.md` → „Dateien“. Kurz: `js/app.js` (App), `js/srs.js` (Spaced Repetition), `data/<bereich>/*.js` (Inhalte), `sw.js` (Offline-Cache).

---

## Neuen Block anlegen (z. B. Block 3)

Ein Block = ein Bereich in der oberen Navigationsleiste, darin eine oder mehrere Kategorien. Für Latein-/Lernkarten-Kategorien:

1. **Karten erzeugen.** Markdown-Vokabeldatei nach `quellen/block3/` legen und
   `python3 tools/import_vokabeln.py quellen/block3/NAME.md data/block3/xyz.js` ausführen
   (oder Karten von Hand schreiben: `{ id, topic, q, a }`, siehe unten). In der erzeugten Datei die Konstanten umbenennen
   (`block2KnochenCards` → z. B. `block3XyzCards`) bzw. im Importskript anpassen.
2. **Datei einbinden:** in `index.html` neben den anderen Daten-Skripten `<script src="data/block3/xyz.js"></script>` ergänzen, in `sw.js` in die Liste `DATA` aufnehmen.
3. **Deck eintragen:** in `js/app.js` in `DECK_CONFIGS` einen Eintrag ergänzen:
   ```js
   { moduleId: 'b3xyz', storageKey: 'medat_srs_b3_xyz_v1', cards: block3XyzCards,
     defaultNewLimit: 20 }
   ```
   Optional: `dirLabels` + `defaultDir` (Hin-/Rückrichtung), `topicColors`, `topicIcons`, `topicOrder`.
   Der `storageKey` muss pro Deck eindeutig sein und darf später nicht geändert werden (sonst ist der Lernfortschritt weg).
4. **Navigation:** in `js/app.js` in `AREAS` einen Bereich bzw. eine Kategorie ergänzen:
   ```js
   { id: 'block3', label: '🧠 Block 3', modules: [ { id: 'b3xyz', label: '🧠 Kategorie-Name' } ] },
   ```
5. `sw.js`: `CACHE` hochzählen, committen, pushen.

**Kartenschema:**
```js
{ id: 'eindeutig-und-stabil',   // nie ändern, sonst geht der Lernfortschritt dieser Karte verloren
  topic: 'Thema',               // Themenfilter (bis 4 Themen als Buttons, darüber als Auswahlliste)
  dir: 'la-de',                 // optional: Richtung, wenn das Deck Hin-/Rückrichtung hat
  q: 'Frage',  a: 'Antwort' }   // \n = Zeilenumbruch
```

---

## Deployment & Cache-Verwaltung

### Nach jedem Update: Cache-Version hochzählen

Wenn du neue Fragen oder andere Daten pushst, **muss** die Cache-Version in `sw.js` erhöht werden — sonst sehen Nutzer auf dem iPhone noch die alte Version.

In `sw.js`, erste Zeile ändern:
```js
const CACHE = 'medat-v8';  // → 'medat-v9', 'medat-v10', ...
```

Dann committen und pushen — GitHub Actions deployt automatisch, und beim nächsten Öffnen der App wird der alte Cache verworfen.

### Fetch-Strategie

- **Datendateien** (`data/**/*.js`): Network-first — beim Öffnen wird immer die neueste Version vom Server geholt, Fallback auf Cache wenn offline
- **App-Shell** (`index.html`, `css/`, `js/`, Icons): Cache-first — bleibt schnell und offline-fähig

### Manueller Cache-Reset (iPhone)

Falls eine Aktualisierung trotzdem nicht ankommt:
Einstellungen → Safari → Erweitert → Websitedaten → Deine GitHub-Pages-URL suchen → Löschen



Die Ordnerstruktur unverändert lassen und `index.html` im Browser öffnen.
Bei `file://`-Protokoll muss der Browser lokale Scripts erlauben (Chrome: `--allow-file-access-from-files`).
Alternativ: einfacher lokaler Server z.B. `python3 -m http.server 8080`.

---

## Wissensfragen erweitern (`data/aufnahmetest/wissen.js`)

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

In `data/aufnahmetest/wissen.js` im `biologie: [...]` Array am Ende vor dem `]` einfügen:

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

## Zahlenfolgen erweitern (`data/aufnahmetest/zahlenfolgen.js`)

```js
{ sequence: [2, 4, 8, '?', 32, '?'],
  options: {
    A: [16, 64], B: [12, 48], C: [16, 48], D: [20, 64]
  },
  correct: 'A',   // 'A'|'B'|'C'|'D'|'E'
  rule: 'Jede Zahl wird verdoppelt (×2)' },
```

---

## Wortflüssigkeit erweitern (`data/aufnahmetest/wortfluessigkeit.js`)

```js
// In wordFluencyWords.short / .medium / .long einfügen:
{ letters: ['B','A','U','M'], startLetter: 'B', word: 'BAUM' },
```

Kategorien: `short` (≤5 Buchstaben), `medium` (6–8), `long` (9+).

---

---

## Spaced Repetition (`js/srs.js`)

Gemeinsame Engine (`js/srs.js`) für Wissen und alle Flashcard-Decks – Details und Regeln in der `README.md`. Wichtig beim Erweitern:

- **Flashcards:** Der Lernstand hängt an der Karten-`id`. IDs nie ändern oder wiederverwenden.
- **Wissensfragen:** Der Lernstand hängt am Fragetext (Hash). Wird der Text einer Frage geändert, gilt sie als neue Karte.
- Die Konstanten (Start-EF, Mindest-/Höchst-EF, „bekannt“ ab 21 Tagen, Abstand für Wiederholung vergessener Karten) stehen oben in `js/srs.js`.
