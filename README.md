# MedAT Trainer

Persönlicher Übungstrainer für den österreichischen Medizin-Aufnahmetest (MedAT / BMS).
Läuft als Progressive Web App – im Browser, offline-fähig, ohne Installation.

Die App ist in **Bereiche** gegliedert (obere Leiste), darunter liegen die **Kategorien**:

| Bereich | Kategorien |
|---|---|
| 🎓 Aufnahmetest | Wortflüssigkeit · Zahlenfolgen · Wissen · Flashcards |
| 🦴 Block 2 | Knochen- und Bandpraktikum (Latein-Vokabeln, 689 Karten) |

Neue Blöcke: siehe `docs/ERWEITERUNG.md` → „Neuen Block anlegen“.

---

## Inhalte

### 📝 Wortflüssigkeit — 184 Anagramme
Buchstaben werden gemischt angezeigt. Ziel: den Anfangsbuchstaben des versteckten deutschen Substantivs bestimmen.

| Kategorie | Wörter |
|---|---|
| Kurz (≤ 5 Buchstaben) | 40 |
| Mittel (6–8 Buchstaben) | 42 |
| Lang (9+ Buchstaben) | 102 |

**Quellen:** Offizielles IB_WF_26.pdf · ÖH Med Wien Skript 2014 · ÖH Med Wien Skript 2021 · eigene Ergänzungen

**Qualitätssicherung:** Alle Anagramme wurden gegen 118.000+ deutsche Substantive (ngerman) geprüft. Wörter mit mehr als einer gültigen Lösung wurden entfernt. Letters-Arrays werden direkt aus dem Lösungswort abgeleitet — keine manuellen Tippfehler möglich.

---

### 🔢 Zahlenfolgen — 60 Aufgaben
Zwei fehlende Zahlen in einer Folge bestimmen (5 Antwortmöglichkeiten A–E, E = „Keine der Antwortmöglichkeiten").

**Quellen:** Offizielles IB_ZF_26.pdf · ÖH Med Wien Skript 2014

---

### 🧬 Wissen — 657 Fragen

| Fach | Fragen | Quelle |
|---|---|---|
| Biologie | 222 | ÖH Bio-Skript 2022 (191 Original + 31 eigene) |
| Chemie | 121 | ÖH Chemie-Skript 2020 (101 Original + 20 eigene) |
| Physik | 148 | ÖH Physik-Skript 2021 (127 Original + 21 eigene) |
| Mathematik | 166 | ÖH Mathe-Skript Vol.1 2021 (93 Original + 73 eigene) |

Originalfragen aus den ÖH-Skripten sind mit Schwierigkeitsgrad markiert (🟢 Leicht · 🟡 Mittel · 🔴 Schwer). Eigene Ergänzungsfragen erscheinen mit ✏️.

Fragen haben 4 oder 5 Antwortoptionen (bei 5 Optionen: E = „Keine der Antwortmöglichkeiten"). Optionen werden bei jeder Anzeige neu gemischt (Fisher-Yates).

**Spaced Repetition:** Nach jeder Antwort Selbstbewertung 0–5 (nach falscher Antwort nur 0–2). Logik siehe unten. Fortschritt in `localStorage` (`medat_srs_v3`, Schlüssel = Fach + Hash des Fragetexts, bleibt also beim Einfügen neuer Fragen stabil).

---

### 🃏 Flashcards (Aufnahmetest) — 192 Karten

| Fach | Karten |
|---|---|
| Chemie | 79 |
| Biologie | 113 |

**Quelle:** Handschriftliche Mitschriften (Chemie + Biologie). Filter nach Fach.

### 🦴 Block 2 · Knochen- und Bandpraktikum — 689 Karten

Latein-Vokabeln zu den Lehrzielen „Knochen und -strukturen 2026“ und „Knochenverbindungen 2026“ (MedUni Wien), 12 Themen (Grammatik, Lage und Richtung, Strukturen am Knochen, Gelenke/Bänder, Bewegungen …).
Jede Vokabel gibt es in beiden Richtungen (Latein → Deutsch, Deutsch → Latein; Filter „Beide“ möglich). Bei mehrdeutigen deutschen Begriffen (z. B. „kahnförmig“) steht ein Hinweis aus dem Beispiel auf der Vorderseite.
Erzeugt aus `quellen/block2/knochen_latein_vokabeln.md` mit `tools/import_vokabeln.py`.

### Bedienung der Flashcard-Decks

- **Lernen** (Standard): fällige Karten + neue Karten (Tageslimit einstellbar, Standard 20). Vergessene Karten kommen in derselben Sitzung nach ein paar Karten nochmal.
- **Freies Üben:** alle Karten gemischt. Der Lernplan ändert sich dabei nur, wenn du etwas vergessen hast.
- Tippen/Leertaste → umdrehen · 1–6 → bewerten (erst nach dem Umdrehen) · Escape → überspringen
- Unter den Bewertungsbuttons steht, wann die Karte wiederkommt.

---

## Spaced Repetition (alle Module)

SM-2 mit Bewertungen 0–5, gemeinsame Engine in `js/srs.js`:

| Regel | Verhalten |
|---|---|
| Fälligkeit | tagesgenau: „morgen“ heißt morgen ab 00:00 Uhr, nicht erst zur selben Uhrzeit |
| Bewertung ≥ 3 | 1. Mal → 1 Tag, 2. Mal → 6 Tage, danach Intervall × EF (mind. +1 Tag) |
| Bewertung < 3 | vergessen: Intervall 1 Tag, EF −0,2 (nur bei gelernten Karten), Karte kommt in der Sitzung wieder |
| EF | nach SM-2-Formel, zwischen 1,3 und 3,0 |
| Zu früh geübt (nicht fällig) | gewusst → Plan bleibt; vergessen → zurück auf morgen |
| „Bekannt“ | Intervall ≥ 21 Tage; „In Lernung“ = darunter |

---

## Deployment

### GitHub Pages (empfohlen — überall erreichbar, iPhone-tauglich)

1. [github.com](https://github.com) → **New repository** → Name z.B. `medat-trainer` → Public → Create
2. **Add file → Upload files** → alle Dateien aus diesem Ordner hochladen (inkl. `.github/workflows/deploy.yml`)
3. **Settings → Pages → Source: GitHub Actions** → Save
4. App läuft unter `https://DEIN-USERNAME.github.io/medat-trainer/`

**iPhone:** URL in Safari öffnen → Teilen → Zum Home-Bildschirm → die App funktioniert danach **vollständig offline** (Service Worker cached alle Dateien).

### Lokal (ohne Internet)

```bash
# Mac/Linux
python3 start.py

# Windows
start.bat
```

Dann im Browser: [http://localhost:8080](http://localhost:8080)

---

## Dateien

```
medat-trainer/
├── index.html                       ← Seitengerüst (HTML)
├── manifest.json                    ← PWA-Manifest
├── sw.js                            ← Service Worker (Offline-Cache) – muss im Hauptordner liegen
├── deploy.yml                       ← GitHub Actions (Auto-Deploy)
├── README.md
├── css/
│   └── style.css                    ← alle Styles
├── js/
│   ├── app.js                       ← Navigation, Module, Flashcard-Decks (DECK_CONFIGS, AREAS)
│   └── srs.js                       ← Spaced-Repetition-Engine (SM-2, tagesgenau)
├── data/                            ← Inhalte, ein Ordner pro Bereich/Block
│   ├── aufnahmetest/
│   │   ├── wortfluessigkeit.js
│   │   ├── zahlenfolgen.js
│   │   ├── wissen.js
│   │   └── flashcards.js
│   └── block2/
│       └── knochen.js               ← Latein-Vokabeln (generiert)
├── quellen/                         ← Rohmaterial, aus dem Daten erzeugt werden
│   └── block2/
│       └── knochen_latein_vokabeln.md
├── tools/
│   └── import_vokabeln.py           ← Markdown → data/blockN/….js
├── assets/
│   └── icons/                       ← icon-192.png, icon-512.png
└── docs/
    └── ERWEITERUNG.md               ← Anleitung zum Erweitern
```

---

## Tastaturkürzel

| Modul | Taste | Aktion |
|---|---|---|
| Alle | A / B / C / D / E | Antwort auswählen |
| Alle | Enter | Antwort prüfen |
| Alle | Escape | Neue Aufgabe |
| Wortflüssigkeit | F1 | Wort anzeigen |
| Flashcards | Leertaste / Enter | Karte umdrehen |
| Flashcards | 1–6 | SRS-Bewertung (nach dem Umdrehen) |
| Flashcards | Escape | Karte überspringen |
| Wissen | 1–6 | SRS-Bewertung (nach dem Prüfen) |

---

## Daten erweitern

Alle Datendateien (Ordner `data/`) sind plain JavaScript — einfach am Ende des jeweiligen Arrays neue Einträge anhängen und auf GitHub pushen. Das Schema ist in `docs/ERWEITERUNG.md` dokumentiert.

**Neue Flashcard-Mitschrift hinzufügen:**
1. `data/aufnahmetest/flashcards.js` öffnen
2. Neuen Eintrag ans Array anhängen: `{ id: 193, topic: "Biologie", q: "Frage?", a: "Antwort." }` (id eindeutig und nie ändern – daran hängt der Lernfortschritt)
3. `sw.js`: `CACHE` hochzählen, committen, pushen
