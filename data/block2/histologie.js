// Lernatlas – Block 2 · Histologie: 14 Präparate in 4 Blöcken (aus den Musterantworten). Erzeugt mit tools/import_histologie.py
// Podcast je Block: `podcast: 'https://open.spotify.com/…'` eintragen (Spotify → Teilen → Link kopieren). Leer = „Link folgt".
// Präparat: id (stabil), nr, title, meta, kern, sections[{title, md}], fragen[{q, a}] (Markdown).
const block2Histologie = [
 {
  "id": "b1",
  "title": "Block 1 · Epithel & Haut",
  "podcast": "https://open.spotify.com/episode/2JVTEpEY30VxR2WN3p26QM?si=jOcYgpVYRs68Teb8CwzQKQ",
  "preps": [
   {
    "id": "h1-1",
    "nr": 1,
    "title": "Kornea (Hornhaut)",
    "meta": "Gewebetyp: Epithel + straffes, geordnetes Bindegewebe · Färbung: meist HE",
    "kern": "Die Kornea ist ein gefässfreies, durchsichtiges Gewebe aus fünf Schichten. Ihre Transparenz beruht auf der streng geordneten Kollagenarchitektur des Stromas und auf der Pumpfunktion des Endothels.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "Reihenfolge von aussen (vorne) nach innen (Vorderkammer):\n\n| # | Struktur | Woran erkenne ich sie? |\n|---|---|---|\n| 1 | **Vorderes Korneaepithel** | Mehrschichtiges, **unverhorntes** Plattenepithel, 5–7 Zelllagen; basal kubisch-hochprismatische Zellen, oben abgeflachte Zellen mit Kern; gerade, unverzahnte Grenze zum Stroma |\n| 2 | **Bowman-Membran** | Schmaler, **zellfreier**, homogen blass-eosinophiler Streifen direkt unter dem Epithel (ca. 8–12 µm) |\n| 3 | **Stroma (Substantia propria)** | Macht ca. 90 % der Dicke aus; parallele, eosinophile Kollagenlamellen; **keine Gefässe**; oft Schrumpfspalten (Artefakt) |\n| 4 | **Fibrozyten (Keratozyten)** | Flache, langgestreckte, schmale Kerne **zwischen** den Lamellen, parallel zur Oberfläche |\n| 5 | **Descemet-Membran** | Zellfreie, homogene, kräftig eosinophile Schicht innen auf dem Stroma (dicker als Bowman, wird im Alter dicker) |\n| 6 | **Hinteres Korneaepithel (Endothel)** | **Einschichtiges Plattenepithel**, flache Kerne, grenzt an die Vorderkammer |\n\n**Skizzentipp:** Schichten massstabsgetreu zeichnen: Stroma dominiert, Epithel ca. 10 %, Bowman und Descemet als dünne, zellfreie Bänder, Endothel als eine Kernreihe."
     },
     {
      "title": "Prüfungsfallen",
      "md": "- „Endothel\" der Kornea hat **nichts** mit Gefässendothel zu tun (stammt aus Neuralleistenzellen).\n- **Keratozyten** = Fibrozyten der Hornhaut ≠ **Keratinozyten** der Epidermis.\n- Das vordere Epithel ist **unverhornt**."
     }
    ],
    "fragen": [
     {
      "q": "Regenerationsfähigkeit des vorderen & hinteren Epithels?",
      "a": "- **Vorderes Epithel: sehr gut.** Komplette Erneuerung in ca. 7 Tagen. Kleine Erosionen heilen in 24–48 h narbenlos. Die Stammzellen liegen am **Limbus** (Übergang Kornea/Konjunktiva). Von dort wandern die Zellen zentripetal zur Mitte und von basal nach apikal.\n- **Hinteres Epithel (Endothel): praktisch keine.** Beim Erwachsenen findet keine relevante Mitose mehr statt. Zellverluste (Alter, OP, Trauma) werden dadurch ausgeglichen, dass die Nachbarzellen sich **vergrössern und ausbreiten** (Polymegathismus, Pleomorphismus). Die Zelldichte sinkt so lebenslang (ca. 3000 → < 2000 Zellen/mm²).\n- **Bowman-Membran:** regeneriert nicht, Verletzungen hinterlassen eine Narbe (Trübung).\n- **Descemet-Membran:** wird vom Endothel gebildet und kann nachgebildet werden."
     },
     {
      "q": "Worauf basiert die Transparenz der Kornea?",
      "a": "1. **Gefässfreiheit:** keine Erythrozyten, keine Gefässwände, die Licht absorbieren oder streuen.\n2. **Marklose Nervenfasern:** Myelin würde streuen. Die Kornea ist trotzdem extrem dicht innerviert.\n3. **Kollagenarchitektur des Stromas** (zentraler Punkt):\n   - Fibrillen (v. a. Kollagen Typ I, dazu Typ V) mit **einheitlichem, kleinem Durchmesser** (ca. 30 nm),\n   - in **gleichmässigem Abstand** zueinander, der kleiner ist als die halbe Wellenlänge des Lichts,\n   - dadurch löschen sich die Streuwellen durch **destruktive Interferenz** aus,\n   - parallele Fibrillen pro Lamelle, Lamellen gegeneinander gekreuzt (sperrholzartig),\n   - die Abstände werden durch **Proteoglykane** (Keratansulfat, Dermatansulfat) gehalten.\n4. **Deturgeszenz:** konstant niedriger Wassergehalt (ca. 78 %), aufrechterhalten durch das Endothel.\n5. **Unverhorntes, regelmässiges Epithel** mit glattem Tränenfilm."
     },
     {
      "q": "Bedeutung des Endothels für die Transparenz?",
      "a": "- Die Proteoglykane im Stroma sind stark hydrophil, das Stroma würde ohne Gegenregulation Kammerwasser aufnehmen und **quellen**.\n- Das Endothel arbeitet nach dem **Pump-Leck-Prinzip**:\n  - *Leck:* leicht durchlässig, damit Nährstoffe aus dem Kammerwasser eindringen können,\n  - *Pumpe:* **Na⁺/K⁺-ATPase** und Bikarbonat-Transporter pumpen Ionen in die Vorderkammer, Wasser folgt osmotisch.\n- Fällt die Zelldichte unter einen kritischen Wert (ca. 500–800 Zellen/mm²), reicht die Pumpleistung nicht mehr: **Hornhautödem → Trübung** (z. B. Fuchs-Endotheldystrophie). Therapie dann oft Keratoplastik.\n- Verbindung zur Regeneration: Weil sich das Endothel nicht teilt, ist jeder Zellverlust dauerhaft."
     },
     {
      "q": "Wie wird das Gewebe der Kornea „ernährt\"?",
      "a": "Ausschliesslich über **Diffusion**, von drei Seiten:\n\n| Quelle | Liefert |\n|---|---|\n| **Kammerwasser** (über das Endothel) | Glukose, Aminosäuren, Hauptversorgung des Stromas |\n| **Tränenfilm / Luft** (über das Epithel) | Sauerstoff (deshalb Probleme bei schlecht O₂-durchlässigen Kontaktlinsen und im Schlaf) |\n| **Randschlingennetz am Limbus** | Periphere Hornhaut |"
     },
     {
      "q": "Grundbauprinzip der Bowman & Descemet Membran?",
      "a": "Beide sind **zellfreie, kollagenhaltige Schichten aus extrazellulärer Matrix**, aber unterschiedlich gebaut und entstanden:\n\n| | Bowman-Membran | Descemet-Membran |\n|---|---|---|\n| Lage | unter dem vorderen Epithel | über dem Endothel |\n| Natur | **keine** Basalmembran; verdichtete, azelluläre Randzone des Stromas | **echte Basalmembran** des Endothels (die dickste des Körpers) |\n| Aufbau | **regellos** angeordnete, feine Kollagenfibrillen (Typ I, III, V) | Kollagen **Typ IV** und **Typ VIII** (gitterartig), Laminin |\n| Gebildet von | Stroma/Keratozyten (embryonal) | Endothel (lebenslang) |\n| Dicke im Alter | konstant | **nimmt zu** (ca. 3 → 10 µm) |\n| Regeneration | **nein** (Narbe) | **ja** |\n\n**Merksatz:** *Bowman gehört zum Stroma, Descemet gehört zum Endothel.*"
     }
    ]
   },
   {
    "id": "h1-2",
    "nr": 2,
    "title": "Gallenblase (Vesica biliaris)",
    "meta": "Gewebetyp: Hohlorgan mit resorbierendem Zylinderepithel · Färbung: meist HE",
    "kern": "Die Gallenblase speichert die Galle und dickt sie ein (bis ca. 10-fach). Dafür hat sie ein resorbierendes Zylinderepithel mit Mikrovilli und ein stark gefaltetes Schleimhautrelief. Ihr fehlen Muscularis mucosae und Submukosa.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Tunica mucosa** | Hohes, verzweigtes Faltenrelief zum Lumen hin |\n| ↳ **Lamina epithelialis** | **Einschichtiges hochprismatisches Epithel** (Zylinderepithel), Kerne in einer Reihe basal |\n| ↳↳ **Hauptzellen** | Die vorherrschenden hohen Epithelzellen; helles bis eosinophiles Zytoplasma, ovaler basaler Kern |\n| ↳↳ **Mikrovilli, Bürstensaum** | Feiner, schwach eosinophiler apikaler Saum (zarter als im Dünndarm) |\n| ↳ **Lamina propria** | Lockeres Bindegewebe unter dem Epithel mit Gefässen und einzelnen Lymphozyten; **keine Lamina muscularis mucosae** |\n| ↳ **Schleimhautfalten** | Unterschiedlich hohe, verzweigte Falten (beim Präparat im kontrahierten/leeren Zustand besonders ausgeprägt) |\n| ↳ **Schleimhautbrücken** | Quer angeschnittene, miteinander verbundene Falten, „Brücken\" über Buchten. Epithelumkleidete Buchten sind meist angeschnittene Faltentäler, keine Drüsen (Rokitansky-Aschoff-Sinus = pathologische Aussackungen) |\n| **Tunica muscularis** | Glatte Muskelbündel, **scherengitter-/netzartig** angeordnet, viel Bindegewebe dazwischen, keine klaren Schichten |\n| **Tela subserosa** | Relativ breite Bindegewebsschicht mit Gefässen, Nerven, oft Fettgewebe |\n| **Tunica serosa** | Ganz aussen: einschichtiges Plattenepithel (**Mesothel**) auf dünnem Bindegewebe |\n\n**Skizzentipp:** Wandschichten in Reihenfolge zeichnen, Falten mit Brücken andeuten, Epithel als Detailausschnitt mit Bürstensaum."
     },
     {
      "title": "Prüfungsfallen",
      "md": "- **Keine Lamina muscularis mucosae, keine Tela submucosa**, ein Unterschied zum restlichen GI-Trakt.\n- **Keine Becherzellen** im normalen Gallenblasenepithel.\n- Epithelbuchten ≠ Drüsen (angeschnittene Falten); echte muköse Drüsen nur im Halsbereich."
     }
    ],
    "fragen": [
     {
      "q": "Funktion der Schleimhaut-Faltenbildung?",
      "a": "1. **Oberflächenvergrösserung** für die Resorption von Wasser und Elektrolyten (Eindickung der Galle).\n2. **Dehnungsreserve:** Bei Füllung glätten sich die Falten, die Wand kann sich ausdehnen, ohne dass das Epithel unter Zug reisst. In kontrahiertem Zustand stehen die Falten hoch."
     },
     {
      "q": "Funktion der Mikrovilli?",
      "a": "- **Vergrösserung der apikalen Zelloberfläche**, also der Membranfläche, in der Transporter sitzen.\n- In der Gallenblase: **Resorption von Na⁺ und Cl⁻** (gekoppelter Transport), **Wasser folgt osmotisch** (parazellulär und über Aquaporine). Ergebnis: Konzentrierung der Galle.\n- **Bau:** fingerförmige Ausstülpungen (ca. 1 µm), Zytoskelett aus einem **Bündel von Aktinfilamenten**, verankert im terminalen Netz. Sie sind **unbeweglich** (keine aktive Bewegung, vgl. Kinozilien → Trachea).\n- Zusätzlich: Glykokalyx, Schutz und enzymatische Funktionen."
     },
     {
      "q": "Funktionelle Unterschiede Platten- / Zylinderepithel?",
      "a": "| | Plattenepithel | Zylinderepithel (hochprismatisch) |\n|---|---|---|\n| Zellform | flach, breiter als hoch | höher als breit |\n| Zytoplasma/Organellen | wenig | viel (Mitochondrien, ER, Golgi) |\n| Hauptfunktion einschichtig | **Diffusion/Austausch**, Gleitfläche (Endothel, Alveolen, Mesothel) | **aktive Resorption & Sekretion** (Gallenblase, Darm, Magen) |\n| Hauptfunktion mehrschichtig | **mechanischer Schutz** (Haut, Mundhöhle, Ösophagus, Vagina) | selten (z. B. Konjunktiva, grosse Ausführungsgänge) |\n\n**Merksatz:** *Flache Zellen schützen oder lassen durch, hohe Zellen arbeiten (stoffwechselaktiv).*"
     },
     {
      "q": "Tunica Serosa / Tunica Adventitia?",
      "a": "| | Tunica serosa | Tunica adventitia |\n|---|---|---|\n| Aufbau | **Mesothel** (einschichtiges Plattenepithel) + Lamina propria serosae; darunter Tela subserosa | Nur **lockeres Bindegewebe**, **kein** Epithel |\n| Vorkommen | Organe, die in eine **seröse Höhle** ragen (Peritoneal-, Pleura-, Perikardhöhle) | Organe, die in Bindegewebe **eingebaut** sind (z. B. Trachea, Ösophagus, Harnblase grösstenteils, retroperitoneale Organe) |\n| Funktion | glatte, feuchte Oberfläche → **Verschieblichkeit** gegen Nachbarorgane; Sekretion/Resorption seröser Flüssigkeit | **Verankerung** im umgebenden Gewebe; Leitungsbahnen |\n\n**Gallenblase:** freie, zur Bauchhöhle gerichtete Seite → **Serosa**; der Leber anliegende Seite → **Adventitia** (Kontakt zum Leberbindegewebe)."
     }
    ]
   },
   {
    "id": "h1-3",
    "nr": 3,
    "title": "Trachea (Luftröhre)",
    "meta": "Gewebetyp: Atemweg mit respiratorischem Epithel und hyalinem Knorpel · Färbung: meist HE",
    "kern": "Die Trachea muss **offen bleiben** (hyaline Knorpelspangen) und die Atemluft **reinigen** (mukoziliärer Apparat aus Flimmerzellen, Becherzellen und Drüsen).",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Tunica mucosa** | Innerste Schicht mit Epithel und Lamina propria |\n| ↳ **Lamina epithelialis** | **Mehrreihiges hochprismatisches Flimmerepithel mit Becherzellen** (respiratorisches Epithel); Kerne in mehreren Höhen; deutliche Basalmembran |\n| ↳↳ **Flimmerzellen / Kinozilien** | Hohe Zellen mit dichtem, „haarigem\" Saum an der Oberfläche; darunter dunkle Basalkörperchen-Linie |\n| ↳↳ **Becherzellen** | Hell, bauchig, mit Schleim gefüllt (in HE blass/leer, in PAS magenta); schmaler Kern basal |\n| ↳↳ **Basalzellen** | Kleine, dunkle Kerne direkt auf der Basalmembran; erreichen die Oberfläche nicht |\n| ↳ **Lamina propria** | Lockeres Bindegewebe, reich an **elastischen Fasern**, Lymphozyten, Gefässe |\n| ↳ **Glandulae tracheales** | **Seromuköse** Drüsen in der Submukosa: helle muköse und dunklere seröse Anteile, Ausführungsgänge zur Oberfläche |\n| **Tunica fibro-musculo-cartilaginea** | Mittlere Schicht aus Bindegewebe, glatter Muskulatur (M. trachealis) und Knorpel |\n| ↳ **Hyaline Knorpelspangen** | Grosse, homogen bläulich-violette Knorpelfläche mit Perichondrium, Chondrozyten in isogenen Gruppen |\n| **Tunica adventitia** | Lockeres Bindegewebe aussen mit Gefässen, Nerven, Fett |\n\n**Skizzentipp:** Querschnitt als „C\" mit offener Hinterwand (Paries membranaceus mit M. trachealis); Epitheldetail mit allen drei Zelltypen."
     },
     {
      "title": "Prüfungsfallen",
      "md": "- Mehrreihig ≠ mehrschichtig (siehe oben).\n- Basalzellen = **Stammzellen** des respiratorischen Epithels.\n- Glandulae tracheales sind **seromukös** (gemischt)."
     }
    ],
    "fragen": [
     {
      "q": "Mukoziliärer Apparat?",
      "a": "Selbstreinigungssystem der Atemwege (**mukoziliäre Clearance**):\n\n1. **Zweischichtiger Flüssigkeitsfilm** auf dem Epithel:\n   - **Sol-Phase** (periziliäre Flüssigkeit, unten): dünnflüssig, die Zilien schlagen frei darin,\n   - **Gel-Phase** (Schleim, oben): zäh, von Becherzellen und Glandulae tracheales gebildet.\n2. Partikel, Staub und Mikroorganismen **bleiben am Schleim kleben**.\n3. Die **Kinozilien schlagen koordiniert** (metachrone Wellen) und schieben mit ihren Spitzen den Schleimteppich **rachenwärts** (ca. 1–2 cm/min).\n4. Dort wird er **verschluckt oder abgehustet**.\n\n**Klinik:** Rauchen lähmt die Zilien und führt zu Plattenepithel-**Metaplasie**. Bei Primärer ziliärer Dyskinesie (Kartagener-Syndrom; Dyneindefekt) und Mukoviszidose (zäher Schleim) kommt es zu chronischen Infekten."
     },
     {
      "q": "Begriff „respiratorisches\" Flimmerepithel?",
      "a": "- = **Mehrreihiges hochprismatisches Flimmerepithel mit Becherzellen**.\n- „Respiratorisch\", weil es die **luftleitenden Atemwege** auskleidet (Nasenhöhle, Nasennebenhöhlen, Kehlkopf ausser Stimmlippen, Trachea, Bronchien).\n- Der Name steht für die Funktion: Luft **reinigen, anfeuchten, erwärmen**. Mit dem Gasaustausch (respiratorischer Abschnitt der Lunge) hat er nichts zu tun."
     },
     {
      "q": "Funktion der Kinozilien?",
      "a": "- **Aktive, gerichtete Bewegung** von Flüssigkeit/Schleim über die Zelloberfläche (Transport, nicht Oberflächenvergrösserung).\n- Schlagmuster: schneller, steifer **Wirkschlag** Richtung Rachen + langsamer, gebeugter **Erholungsschlag**.\n- Weitere Vorkommen: Tuba uterina (Eizelltransport), Ependym (Liquor), Ductuli efferentes."
     },
     {
      "q": "Unterschied Mikrovilli – Kinozilien?",
      "a": "| | Mikrovilli | Kinozilien |\n|---|---|---|\n| Länge / Dicke | ca. 1 µm / 0,1 µm | ca. 5–10 µm / 0,25 µm |\n| Zytoskelett | **Aktinfilamente** (Bündel) | **Mikrotubuli**, Axonem in **9×2 + 2**-Anordnung |\n| Motorprotein | (Myosin, nur minimale Verformung) | **Dynein** (ATP-abhängig) |\n| Verankerung | terminales Netz | **Basalkörperchen** (9×3 Mikrotubuli-Tripletts) |\n| Beweglichkeit | **unbeweglich** | **aktiv beweglich** |\n| Funktion | Oberflächenvergrösserung → **Resorption** | **Transport** (Schleim, Flüssigkeit, Zellen) |\n| Beispiele | Dünndarm, Gallenblase, Nierentubulus | Trachea, Eileiter |\n\n**Merksatz:** *Mikrovilli = Aktin = Oberfläche; Kinozilien = Mikrotubuli = Bewegung.*"
     },
     {
      "q": "Unterschied stufig/gereiht & mehrschichtiges Epithel?",
      "a": "| | Mehrreihig (gestuft, „pseudostratifiziert\") | Mehrschichtig |\n|---|---|---|\n| Kontakt zur Basalmembran | **alle Zellen** | **nur die basale Zelllage** |\n| Erreichen alle die Oberfläche? | nein | nein |\n| Eigentlich | **einschichtig** | echt mehrschichtig |\n| Kerne | in verschiedenen Höhen (täuscht Schichten vor) | in echten Lagen übereinander |\n| Beispiel | Trachea, Nebenhoden | Epidermis, Ösophagus, Kornea |\n\n**Merksatz:** *Mehrreihig: alle stehen am Boden. Mehrschichtig: sie stapeln sich übereinander.*"
     },
     {
      "q": "Funktion der hyalinen Knorpelspangen?",
      "a": "- **Offenhalten des Lumens:** Beim Einatmen entsteht ein intrathorakaler Unterdruck, ohne Knorpel würde die Trachea kollabieren.\n- **Flexibilität:** 16–20 C-förmige Spangen, verbunden durch **Ligg. anularia**, so kann sich die Trachea biegen und bei Kopfbewegung und Schlucken verlängern bzw. verkürzen.\n- **Offene Hinterwand** (Paries membranaceus mit M. trachealis): Platz für den Ösophagus beim Schlucken; der M. trachealis kann das Lumen verengen (Husten → höhere Strömungsgeschwindigkeit).\n- Hyaliner Knorpel: druckelastisch, formstabil (Details → Rippe)."
     },
     {
      "q": "Tunica Serosa / Tunica Adventitia?",
      "a": "- Die Trachea hat eine **Adventitia**, weil sie im Hals und im Mediastinum **in Bindegewebe eingebaut** ist und nicht in eine seröse Höhle ragt.\n- Serosa = Mesothel + Bindegewebe, für Verschieblichkeit in serösen Höhlen; Adventitia = lockeres Bindegewebe ohne Epithel, für Verankerung (ausführlich → Gallenblase)."
     }
    ]
   },
   {
    "id": "h1-4",
    "nr": 4,
    "title": "Fingerbeere (Leistenhaut)",
    "meta": "Gewebetyp: Haut (Leistenhaut) · Färbung: meist HE",
    "kern": "Die Leistenhaut der Fingerbeere ist für Greifen und Tasten spezialisiert: sehr dicke Epidermis mit allen fünf Schichten, keine Haare/Talgdrüsen, viele ekkrine Schweissdrüsen und Mechanorezeptoren.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "### Epidermis (mehrschichtiges verhorntes Plattenepithel)\nVon **basal nach apikal**:\n\n| Schicht | Woran erkenne ich sie? |\n|---|---|\n| **Str. basale** | Eine Lage kubisch-prismatischer Zellen auf der Basalmembran; Mitosen; einzelne Melanozyten (heller Hof) |\n| **Str. spinosum** | Mehrere Lagen polygonaler Zellen mit „Stacheln\" (Desmosomen-Brücken) |\n| **Str. granulosum** | 2–4 Lagen abgeflachter Zellen mit **dunklen basophilen Keratohyalingranula** |\n| **Str. lucidum** | Schmales, **homogen glänzendes**, eosinophiles Band, kernlos; **nur in Leistenhaut** |\n| **Str. corneum** | Sehr **dicke**, eosinophile Hornschicht aus kernlosen Hornschuppen; spiralig durchziehende Schweissdrüsengänge |\n\n### Dermis (Corium)\n\n| Schicht | Woran erkenne ich sie? |\n|---|---|\n| **Str. papillare** | Lockeres Bindegewebe in **Papillen**, die mit Epidermisleisten verzahnt sind; Kapillarschlingen |\n| **Str. reticulare** (auf Folie „texticulare\") | **Straffes geflechtartiges Bindegewebe**, dicke Kollagenbündel |\n| **Meissner-Tastkörperchen** | In den dermalen Papillen; länglich-oval, quer gestapelte flache Zellen („Tannenzapfen\"/„Geldrolle\") |\n\n### Subkutis / Hypodermis\n\n| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Fettgewebe** | Univakuoläre Fettzellen (optisch leer), in Läppchen durch Bindegewebssepten (Retinacula) gekammert |\n| **Vater-Pacini-Lamellenkörperchen** | Gross (bis 1–4 mm), rund, **konzentrische Lamellen** um zentralen Innenkolben: „Zwiebelquerschnitt\" |\n| **Schweissdrüsen** | Ekkrine Drüsenknäuel an der Grenze Dermis/Subkutis: Gruppen runder Anschnitte; Endstück hell (einschichtig, mit Myoepithelzellen), Gang dunkler und zweischichtig kubisch |"
     },
     {
      "title": "Prüfungsfallen",
      "md": "- Str. lucidum **nur in Leistenhaut**.\n- Meissner = **Dermis/Papillen** (feine Berührung), Vater-Pacini = **Subkutis** (Vibration).\n- Keratozyten ≠ Keratinozyten."
     }
    ],
    "fragen": [
     {
      "q": "Unterschied Leistenhaut – Felderhaut?",
      "a": "| | Leistenhaut | Felderhaut |\n|---|---|---|\n| Vorkommen | **Handflächen, Fusssohlen** (inkl. Finger, Zehen) | übriger Körper |\n| Oberfläche | Papillarleisten (Fingerabdrücke, genetisch festgelegt) | Furchen → rhombische Felder |\n| Epidermis | **sehr dick**, dicke Hornschicht | dünner |\n| Str. lucidum | **vorhanden** | fehlt |\n| Haare / Talgdrüsen | **keine** | **vorhanden** |\n| Ekkrine Schweissdrüsen | sehr zahlreich | vorhanden |\n| Meissner-Körperchen | sehr zahlreich | wenige |\n| Funktion | Greifen (Reibung), feines Tasten | Schutz, Thermoregulation |"
     },
     {
      "q": "Keratozyten – Keratinozyten – Korneozyten?",
      "a": "| Begriff | Was ist das? | Wo? |\n|---|---|---|\n| **Keratinozyten** | Lebende Hauptzellen der Epidermis, bilden Keratin | Str. basale bis Str. granulosum |\n| **Korneozyten** | Tote, kernlose Endstufe der Keratinozyten (Hornschuppen) | Str. (lucidum und) corneum |\n| **Keratozyten** | **Fibrozyten des Hornhautstromas** (Bindegewebszellen!) | Kornea des Auges |\n\nNamenswurzel jeweils griech. *keras* = Horn (auch Hornhaut = Kornea)."
     },
     {
      "q": "Wo befinden sich Melanozyten?",
      "a": "- Im **Str. basale**, zwischen den basalen Keratinozyten (ca. 1 Melanozyt auf 5–10 basale Keratinozyten), auch in der Haarmatrix.\n- In HE: Zellen mit **hellem perinukleärem Hof**; dendritische Fortsätze reichen zu ca. 36 Keratinozyten (**epidermale Melanineinheit**).\n- Herkunft: **Neuralleiste**.\n- Funktion: bilden **Melanin** in Melanosomen und geben diese an Keratinozyten ab. Die legen sich dort als **Kappe über den Zellkern** (UV-Schutz der DNA).\n- Hautfarbe hängt nicht von der Zahl der Melanozyten ab, sondern von deren Aktivität sowie Grösse und Verteilung der Melanosomen."
     },
     {
      "q": "Veränderungen im Rahmen der Differenzierung vom Str. germinativum > Str. corneum?",
      "a": "Str. germinativum = Str. basale + Str. spinosum. Dauer des ganzen Wegs ca. **4 Wochen**.\n\n1. **Str. basale:** Mitosen der Stammzellen; Keratin K5/K14; Verankerung über Hemidesmosomen.\n2. **Str. spinosum:** Zellen werden polygonal und grösser; viele **Keratinfilamente** (Tonofilamente, K1/K10) und **Desmosomen** → mechanische Festigkeit. Beginn der Bildung **lamellärer Körperchen** (Odland-Körperchen).\n3. **Str. granulosum:** **Keratohyalingranula** (Profilaggrin → **Filaggrin** bündelt Keratinfilamente); lamelläre Körperchen geben **Lipide** (Ceramide) in den Interzellularraum ab, dort entsteht die **Wasserbarriere**; Tight Junctions; Beginn des **Abbaus von Kern und Organellen** (programmierter Zelltod, Cornifikation).\n4. **Str. lucidum:** Kernlos, homogen (Eleidin), Übergangszone.\n5. **Str. corneum:** Abgeflachte, tote **Korneozyten**, gefüllt mit Keratin-Filaggrin-Masse; **verhornte Hülle** (Cornified Envelope aus Involucrin, Loricrin) innen an der Membran; Lipidlamellen dazwischen („Ziegel-und-Mörtel-Modell\"); schliesslich **Desquamation** (Abschilferung).\n\n**Zusammengefasst:** Zellen werden flacher, verlieren Kern und Organellen, füllen sich mit Keratin und bilden eine Lipidbarriere."
     },
     {
      "q": "Mündung der Schweissdrüsenausführungsgänge?",
      "a": "- Ekkriner Gang zieht gestreckt durch die Dermis, tritt **zwischen zwei Papillen** (an der Basis einer Epidermisleiste) in die Epidermis ein.\n- In der Epidermis **ohne eigene Wand**, **korkenzieherartig gewunden** zwischen den Keratinozyten (Acrosyringium).\n- Mündet **frei an der Hautoberfläche** mit einer Pore, in der Leistenhaut **auf dem Kamm der Papillarleisten** (deshalb hinterlassen Fingerabdrücke Schweissspuren).\n- Zum Vergleich: **apokrine** Duftdrüsen (Achsel, Genitalregion) münden in den **Haarfollikel**."
     }
    ]
   }
  ]
 },
 {
  "id": "b2",
  "title": "Block 2 · Binde- & Stützgewebe",
  "podcast": "https://open.spotify.com/episode/2vvCKDrNMQsUrm12tkvgQ2?si=7n4I2EZeR_GnCj99uX39ow",
  "preps": [
   {
    "id": "h2-1",
    "nr": 1,
    "title": "Nabelstrang (Funiculus umbilicalis)",
    "meta": "Gewebetyp: Gallertiges Bindegewebe · Färbung: meist HE",
    "kern": "Gallertiges, hyaluronsäurereiches Bindegewebe (Wharton-Sulze) polstert **zwei Arterien** (sauerstoffarm) und **eine Vene** (sauerstoffreich) gegen Kompression und Abknicken.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Amnionepithel** | Aussen; einschichtiges, flaches bis kubisches Epithel |\n| **Gallertiges Bindegewebe (Wharton-Sulze)** | Sehr **hell**, „leer\" wirkende Grundsubstanz; zellarm |\n| **Kollagenfasern & Fibroblasten** | Zarte, locker verlaufende Kollagenfasern; **sternförmige**, verzweigte Fibroblasten mit langen Fortsätzen |\n| **Nabelschnurgefässe** | **2 Arterien:** dicke Muskelwand, kleines (oft fast verschlossenes) Lumen. **1 Vene:** grösser, weiteres Lumen, relativ dünnere Wand |\n| **Eventuell Allantoisgang** | Kleiner Gang mit Epithel (kubisch/flach), meist zwischen den Arterien, oft nur rudimentär |\n\n**Skizzentipp:** Übersichtsquerschnitt mit drei Gefässen; Arterien deutlich dickwandiger als die Vene."
     },
     {
      "title": "Ergänzung: Allantoisgang",
      "md": "- Allantois = embryonale Ausstülpung des Dottersacks/Enddarms (Region der späteren Harnblase) in den Haftstiel.\n- Rückbildung zum **Urachus** → Lig. umbilicale medianum (Blase → Nabel).\n- Klinik: persistierender Urachus → Urinaustritt am Nabel, Urachuszyste."
     }
    ],
    "fragen": [
     {
      "q": "Charakteristika des BG im Nabelstrang – Anforderungen?",
      "a": "**Charakteristika:**\n- **Gallertiges (mukoides) Bindegewebe**, ähnelt embryonalem Mesenchym.\n- Grundsubstanz sehr reich an **Hyaluronsäure** (+ andere Glykosaminoglykane), extrem **wasserbindend** → gelartig, prall-elastisch.\n- Wenig, locker angeordnetes Kollagen (Typ I, III); sternförmige Fibroblasten (Myofibroblasten).\n- **Keine Vasa vasorum, keine Nerven, keine Lymphgefässe.**\n- Stammzellreservoir (mesenchymale Stammzellen aus Wharton-Sulze).\n\n**Anforderungen:**\n- Nabelstrang wird ständig **gedreht, gebogen, gedrückt** (Fetusbewegungen, Schlingen, Knoten).\n- Die Gefässe dürfen dabei **nicht komprimiert oder abgeknickt** werden.\n- Lösung: **Wasserkissen-Prinzip**. Das Gel verteilt Druck gleichmässig (hydrostatisch) und bleibt trotzdem flexibel. Die spiralige Verdrillung der Gefässe erhöht die Stabilität zusätzlich."
     },
     {
      "q": "Nabelstranggefässe: Arterie / Vene?",
      "a": "| | Aa. umbilicales (2) | V. umbilicalis (1) |\n|---|---|---|\n| Wand | **dick**, kräftige glatte Muskulatur (innen längs, aussen zirkulär) | relativ **dünn** |\n| Lumen | **klein**, oft verschlossen (postpartale Kontraktion) | **weit** |\n| Membrana elastica interna | fehlt bzw. nur schwach | fehlt |\n| Blut | **sauerstoffarm** | **sauerstoffreich** |\n| Fluss | Fetus → Plazenta | Plazenta → Fetus |\n\n- Starke Kontraktion der Arterien nach der Geburt (Kälte, Dehnung, O₂-Anstieg) verhindert eine Blutung aus dem Nabelstumpf.\n- Arterie und Vene sind **nach Flussrichtung relativ zum Herzen** definiert, nicht nach O₂-Gehalt."
     },
     {
      "q": "Fetaler Kreislauf – Körperkreislauf – Lungenkreislauf?",
      "a": "**Prinzip:** Die Plazenta übernimmt die Funktion der Lunge. Die Lunge ist nicht belüftet, hat einen hohen Widerstand und wird über **drei Shunts** weitgehend umgangen.\n\n1. **Plazenta** → V. umbilicalis (O₂-reich) → Leber\n2. **Ductus venosus (Arantii):** Ein grosser Teil des Blutes umgeht die Leber direkt → **V. cava inferior**\n3. → **rechter Vorhof** → Grossteil durch das **Foramen ovale** → linker Vorhof → linke Kammer → Aorta → Körper (v. a. Kopf/Gehirn gut versorgt)\n4. Blut aus der V. cava superior → rechte Kammer → Truncus pulmonalis → über den **Ductus arteriosus (Botalli)** grösstenteils direkt in die **Aorta** (Lunge umgangen)\n5. Aus den Aa. iliacae internae → **Aa. umbilicales** (O₂-arm) → Plazenta\n\n**Umstellung bei der Geburt:**\n- Erster Atemzug → Lungenwiderstand ↓ → Lungendurchblutung ↑ → Druck im linken Vorhof ↑ → **Foramen ovale** schliesst funktionell (später Fossa ovalis).\n- **Ductus arteriosus** verschliesst sich (O₂ ↑, Prostaglandine ↓) → Lig. arteriosum.\n- **Ductus venosus** → Lig. venosum; **V. umbilicalis** → Lig. teres hepatis; **Aa. umbilicales** → Ligg. umbilicalia medialia.\n- Ab jetzt: Körper- und Lungenkreislauf **in Serie** hintereinander."
     },
     {
      "q": "Welche Gefässe führen sauerstoffreiches bzw. -armes Blut?",
      "a": "| Sauerstoffreich | Sauerstoffarm |\n|---|---|\n| **V. umbilicalis** (fetal) | **Aa. umbilicales** (fetal) |\n| Vv. pulmonales (postnatal) | Truncus/Aa. pulmonales (postnatal) |\n| Aorta und Körperarterien (postnatal) | Körpervenen (postnatal) |\n\n**Merksatz:** *Arterien führen vom Herzen weg, Venen zum Herzen hin, egal welcher O₂-Gehalt.* Im Fetus herrscht ausserdem überall **Mischblut**. Am höchsten ist der O₂-Gehalt in der V. umbilicalis."
     }
    ]
   },
   {
    "id": "h2-2",
    "nr": 2,
    "title": "Rippe – Hyaliner Knorpel",
    "meta": "Gewebetyp: Hyaliner Knorpel (Rippenknorpel) · Färbung: meist HE",
    "kern": "Hyaliner Knorpel besteht aus Kollagen Typ II und wasserbindenden Proteoglykanen (Aggrecan). Er ist **druckelastisch**, **gefässfrei**, wird über das **Perichondrium** ernährt und wächst appositionell und interstitiell.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Perichondrium** | Bindegewebige Hülle aussen um den Knorpel |\n| ↳ **Str. fibrosum** | Äussere Schicht: straffes Bindegewebe, flache Fibroblasten, Gefässe |\n| ↳ **Str. chondrogenicum** | Innere, zellreichere Schicht: Vorläuferzellen/Chondroblasten; fliessender Übergang zum Knorpel, Zellen hier noch flach und einzeln |\n| **Chondron / territoriale Matrix** | Funktionseinheit: Chondrozyt(en) + Kapsel + Hof (= Territorium) |\n| **Chondrozyten** | Runde Zellen in Lakunen, oft in **isogenen Gruppen** (2, 4, 8 Zellen); im Präparat oft geschrumpft (Artefakt) |\n| **Knorpelkapsel** | Schmaler, **stark basophiler/färbbarer Saum** direkt um die Lakune |\n| **Knorpelhof** | Basophile Zone um die Kapsel (territoriale Matrix) |\n| **Interstitium** | **Interterritoriale Matrix**: hellere, weniger basophile Matrix zwischen den Chondronen |\n| **Asbestfasern** | Im Zentrum (weit weg vom Perichondrium): **seidig glänzende, parallele Faserbündel** (demaskiertes Kollagen); Zeichen der Degeneration |\n\n**Skizzentipp:** Gradient vom Perichondrium nach innen zeichnen (flache Einzelzellen → runde isogene Gruppen); ein Chondron mit Kapsel, Hof und Interterritorium im Detail beschriften."
     },
     {
      "title": "Prüfungsfallen",
      "md": "- Hyaliner Knorpel = **Kollagen Typ II** (Knochen = Typ I).\n- Basophilie kommt von den **GAG**, nicht von den Zellen.\n- Asbestfasern sind **demaskiertes Kollagen**, keine echten Asbestfasern."
     }
    ],
    "fragen": [
     {
      "q": "Aufbau des hyalinen Knorpels – Typ Kollagen?",
      "a": "- **Zellen:** Chondrozyten (ca. 1–2 % des Volumens), in Lakunen, keine Zell-Zell-Kontakte.\n- **Matrix:**\n  - **Kollagen Typ II** (feine Fibrillen, Netzwerk), dazu Typ IX, XI (Vernetzung), Typ VI (perizellulär).\n  - **Proteoglykane:** v. a. **Aggrecan**, an **Hyaluronsäure** gebunden zu riesigen Aggregaten (über Link-Protein); Seitenketten aus **Chondroitinsulfat** und **Keratansulfat**: stark negativ geladen, binden viel Wasser.\n  - **Wasser:** 60–80 %.\n  - Adhäsionsproteine (z. B. Chondronektin).\n- **Färbung:** Matrix **basophil** wegen der sauren GAG (Sulfat-, Carboxylgruppen), am stärksten im Knorpelhof.\n- **„Hyalin\" = glasartig:** Kollagenfibrillen haben fast denselben Brechungsindex wie die Grundsubstanz, sie sind **maskiert** und lichtmikroskopisch unsichtbar."
     },
     {
      "q": "Biomechanische Eigenschaften / Anforderungen?",
      "a": "- **Druckelastisch:** Proteoglykane erzeugen einen **Quelldruck** (osmotisch, durch negative Ladungen), das **Kollagennetz** setzt dem eine Zugspannung entgegen. Bild: Wasserballon im Netz.\n- Unter Last: Wasser wird herausgepresst, Knorpel gibt nach. Bei Entlastung: Wasser strömt zurück.\n- **Formstabil, glatt, reibungsarm** (Gelenkflächen).\n- Vorkommen und Anforderungen: Gelenkflächen (Druck, Gleiten), Rippen (federnde Verformung bei der Atmung), Trachea/Bronchien/Kehlkopf (Offenhalten), Nasenseptum, Epiphysenfugen (Wachstum), embryonales Skelett."
     },
     {
      "q": "Ernährung des hyalinen Knorpels?",
      "a": "- **Gefässfrei** (bradytrophes Gewebe), Versorgung durch **Diffusion** durch die wasserreiche Matrix.\n- **Mit Perichondrium** (Rippe, Trachea): aus den **Gefässen des Perichondriums**.\n- **Ohne Perichondrium** (Gelenkknorpel): aus der **Synovia**, unterstützt durch **intermittierende Belastung** (Schwammprinzip: Druck presst aus, Entlastung saugt an). → Bewegung ist Ernährung.\n- Folge: begrenzte Dicke, niedriger Stoffwechsel (Chondrozyten weitgehend anaerob)."
     },
     {
      "q": "Degenerationserscheinungen?",
      "a": "- **Asbestartige Degeneration (Asbestfaserung):** Verlust von Proteoglykanen und Wasser → Kollagenfibrillen werden **demaskiert**, lagern sich zu dicken parallelen Bündeln zusammen → seidiger, asbestähnlicher Glanz. Typisch im **Zentrum** (schlechteste Ernährung), ab dem mittleren Lebensalter.\n- **Verkalkung** (Rippenknorpel im Alter) → reduzierte Thoraxbeweglichkeit; z. T. Verknöcherung.\n- **Chondrozytenuntergang**, Zystenbildung.\n- Gelenkknorpel: **Arthrose** (Auffaserung, Einrisse, Abrieb, freiliegender Knochen)."
     },
     {
      "q": "Appositionelles & interstitielles Wachstum?",
      "a": "| | Appositionell | Interstitiell |\n|---|---|---|\n| Wo? | an der **Oberfläche** | im **Inneren** des Knorpels |\n| Wer? | Vorläuferzellen des **Str. chondrogenicum** → Chondroblasten | **Chondrozyten** in der Matrix teilen sich |\n| Wie? | Neue Schichten werden **aussen angelagert** (wie Jahresringe) | Teilung → **isogene Gruppen**, Matrixbildung um sie herum → Knorpel dehnt sich von innen aus |\n| Bedeutung | Dickenwachstum, v. a. später | v. a. in jungem Knorpel, Epiphysenfuge (Längenwachstum) |\n\nDie **isogenen Gruppen** im Präparat sind Zeugen des interstitiellen Wachstums."
     },
     {
      "q": "Bedeutung des Perichondriums?",
      "a": "1. **Ernährung** (Gefässe) des gefässfreien Knorpels.\n2. **Appositionelles Wachstum** (Str. chondrogenicum).\n3. **Regeneration**: einzige relevante Quelle neuer Knorpelzellen, allerdings begrenzt; Defekte heilen oft mit **Faserknorpel/Narbe**.\n4. **Mechanische Verankerung** und Übergang zu umgebendem Gewebe (Sehnen, Bänder).\n\nGelenkknorpel hat kein Perichondrium und heilt deshalb besonders schlecht."
     }
    ]
   },
   {
    "id": "h2-3",
    "nr": 3,
    "title": "Ohrmuschel – Elastischer Knorpel",
    "meta": "Gewebetyp: Elastischer Knorpel + Felderhaut · Färbung: Elastika-Färbung (z. B. Resorcin-Fuchsin), ggf. HE",
    "kern": "Elastischer Knorpel entspricht hyalinem Knorpel plus einem dichten **Netz elastischer Fasern**: biegeelastisch, springt in die Ausgangsform zurück. Die Ohrmuschel ist beidseits von **Felderhaut** mit Haaren, Talg- und Schweissdrüsen überzogen.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Perichondrium** | Bindegewebige Hülle beidseits des Knorpels, Fibroblasten, Gefässe |\n| **Chondron / Chondrozyten** | Relativ grosse, dicht liegende Chondrozyten, meist **einzeln oder in kleinen Gruppen**; Territorien weniger deutlich als im hyalinen Knorpel |\n| **Elastische Fasern** | In Elastika-Färbung **dunkelviolett-schwarz** (Resorcin-Fuchsin) bzw. braun (Orcein): dichtes, verzweigtes Netz, um die Chondrozyten verdichtet |\n| **Felderhaut** | Dünne Epidermis, dünne Hornschicht, **kein Str. lucidum** |\n| **Haarfollikel & Talgdrüsen** | Schräg angeschnittene Haarwurzeln; Talgdrüsen als helle, „schaumige\", traubenförmige Zellhaufen, münden in den Follikel |\n| **Schweissdrüsen** | Knäuel aus runden Anschnitten in der Dermis |\n| **Quergestreifte Skelettmuskulatur ?** | Evtl. Anschnitte der rudimentären Ohrmuskeln (Mm. auriculares): Querstreifung, randständige Kerne |"
     }
    ],
    "fragen": [
     {
      "q": "Elastika – Färbung?",
      "a": "- Elastische Fasern sind in HE **kaum sichtbar** (blass eosinophil, ähnlich wie Kollagen).\n- **Spezialfärbungen:**\n  - **Resorcin-Fuchsin (nach Weigert):** dunkelviolett bis schwarz\n  - **Orcein:** braun-rotbraun\n  - **Elastica-van-Gieson (EvG):** elastische Fasern schwarz, Kollagen rot, Muskulatur/Zytoplasma gelb\n  - Aldehydfuchsin: violett\n- Grund: Färbbar ist das **Elastin**, ein stark hydrophobes, quervernetztes Protein (Desmosin, Isodesmosin) mit **Fibrillin-Mikrofibrillen** als Gerüst."
     },
     {
      "q": "Unterschied hyaliner – elastischer Knorpel?",
      "a": "| | Hyaliner Knorpel | Elastischer Knorpel |\n|---|---|---|\n| Kollagen | Typ II | Typ II |\n| Elastische Fasern | **keine** | **dichtes Netz** |\n| Farbe frisch | bläulich-weiss, glasig | **gelblich**, opak |\n| Mechanik | **druckelastisch**, formstabil | **biegeelastisch**, Rückstellkraft |\n| Chondrozyten | in isogenen Gruppen, deutliche Territorien | grösser, dichter, meist einzeln |\n| Alterung | Asbestfaserung, **Verkalkung** | verkalkt **nicht** |\n| Perichondrium | ja (ausser Gelenkknorpel) | ja |\n| Vorkommen | Gelenke, Rippen, Trachea, Kehlkopf (Schild-, Ringknorpel), Nase | **Ohrmuschel**, äusserer Gehörgang, Tuba auditiva, **Epiglottis**, kleine Kehlkopfknorpel (Cartilago corniculata, cuneiformis, Proc. vocalis) |\n\n(Der Vollständigkeit halber: **Faserknorpel** = Kollagen **Typ I** + II, kein Perichondrium; Bandscheiben, Symphyse, Menisken.)"
     },
     {
      "q": "Epidermis: Unterschied Leistenhaut – Felderhaut",
      "a": "| | Leistenhaut (→ Fingerbeere) | Felderhaut (→ Ohrmuschel) |\n|---|---|---|\n| Vorkommen | Handflächen, Fusssohlen | übriger Körper |\n| Oberfläche | Papillarleisten | rhombische Felder |\n| Epidermis / Hornschicht | sehr dick | dünn |\n| Str. lucidum | ja | **nein** |\n| Haare, Talgdrüsen | nein | **ja** |\n| Schweissdrüsen | sehr viele | vorhanden |\n| Funktion | Greifen, Tasten | Schutz, Thermoregulation |\n\n**Talgdrüsen:** holokrine Sekretion (die ganze Zelle zerfällt zum Sekret), münden in den Haarfollikel (Haar-Talgdrüsen-Einheit)."
     },
     {
      "q": "Blutgefässe: Arterien – Venen; Intima – Media – Adventitia; Membrana elastica interna",
      "a": "**Allgemeiner Wandbau (von innen nach aussen):**\n\n| Schicht | Aufbau | Funktion |\n|---|---|---|\n| **Tunica intima** | **Endothel** (einschichtiges Plattenepithel) + Basalmembran + subendotheliales Bindegewebe | Barriere, Stoffaustausch, Gerinnungshemmung, Gefässtonus (NO) |\n| *Membrana elastica interna* | Gefensterte elastische Lamelle zwischen Intima und Media (v. a. **Arterien**) | elastische Rückstellung, Diffusion durch Fenster |\n| **Tunica media** | **Glatte Muskulatur** (zirkulär/spiralig) + elastische und kollagene Fasern | Tonus, Durchmesserregulation (Blutdruck/-verteilung) |\n| *Membrana elastica externa* | zwischen Media und Adventitia (grössere Arterien) | |\n| **Tunica adventitia** | Lockeres Bindegewebe, Vasa vasorum, Nerven | Verankerung, Versorgung |\n\n**Arterie vs. Vene im Präparat (Begleitpaar):**\n\n| | Arterie | Vene |\n|---|---|---|\n| Wand | **dick**, im Verhältnis zum Lumen | dünn |\n| Lumen | **rund**, eher klein | weit, oft **kollabiert**/unregelmässig, oft Blut enthalten |\n| Media | **kräftig**, dominierende Schicht | schwach |\n| Membrana elastica interna | **deutlich, gewellt** (postmortale Kontraktion) | fehlt/undeutlich |\n| Dickste Schicht | Media | oft **Adventitia** |\n| Klappen | nein | ja (Extremitätenvenen) |\n\nGrund: **Hochdruck** (Arterien) vs. **Niederdruck**/Kapazitätsgefässe (Venen)."
     }
    ]
   },
   {
    "id": "h2-4",
    "nr": 4,
    "title": "Fingerknochen (Lamellenknochen)",
    "meta": "Gewebetyp: Lamellenknochen (Kompakta + Spongiosa) · Präparat: entkalkt (HE) oder Schliff",
    "kern": "Knochen ist ein **Verbundwerkstoff** aus Kollagen Typ I (Zugfestigkeit) und Hydroxylapatit (Druckfestigkeit), in der Kompakta aufgebaut aus **Osteonen**, und wird lebenslang **umgebaut**.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Periost** | Aussen: Str. fibrosum (straffes Bindegewebe) + Str. osteogenicum (Kambium, zellreich); **Sharpey-Fasern** strahlen in den Knochen |\n| **Endost** | Innen zur Markhöhle und auf Trabekeln: **eine dünne Lage flacher Zellen** (bone lining cells), kaum Fasern |\n| **Kompakta** | Dichter, massiver äusserer Knochenmantel aus Osteonen |\n| **Spongiosa** | Schwammwerk aus dünnen **Knochenbälkchen** (Trabekel) im Inneren, v. a. in den Epiphysen |\n| **Markraum** | Zwischen Trabekeln und zentral: Knochenmark (Fettmark = optisch leere Fettzellen; ggf. rotes Mark) |\n| **Osteon** (Havers-System) | Runde Einheit: **zentraler Kanal + konzentrische Lamellen** („Jahresringe\") |\n| **Speziallamellen – Schaltlamellen** | *Speziallamellen* = konzentrische Osteonlamellen. *Schaltlamellen* = unregelmässige Lamellenreste **zwischen** Osteonen ohne eigenen Kanal |\n| (+ Generallamellen) | Äussere und innere Grundlamellen, umlaufend unter Periost bzw. Endost |\n| **Havers-Kanal & Volkmann-Kanal** | *Havers:* zentral im Osteon, längs zur Knochenachse, Gefässe + Nerven. *Volkmann:* **quer/schräg**, verbinden Havers-Kanäle untereinander und mit Periost/Markraum, **ohne** konzentrische Lamellen |\n| **Kittlinie / Zementlinie** | Dünne, stark lichtbrechende/basophile Grenzlinie um jedes Osteon (kollagenarm, mineralreich) |\n| **Canaliculi** | Im **Schliff** gut sichtbar: feine Kanälchen, strahlenförmig von den Osteozytenlakunen ausgehend, verbinden Lakunen untereinander und mit dem Havers-Kanal |\n\n**Skizzentipp:** 2–3 Osteonen mit Kanal, Lamellen, Lakunen und Canaliculi, dazwischen Schaltlamellen; Kittlinie betonen; ein Volkmann-Kanal quer."
     },
     {
      "title": "Prüfungsfallen",
      "md": "- Volkmann-Kanäle haben **keine** eigenen konzentrischen Lamellen.\n- Canaliculi sieht man am besten im **Knochenschliff**, nicht im entkalkten HE-Schnitt.\n- Knochen = **Typ I**, Knorpel = **Typ II**."
     }
    ],
    "fragen": [
     {
      "q": "Osteoid – organische & anorganische Phase?",
      "a": "- **Osteoid** = von Osteoblasten frisch sezernierte, **noch nicht mineralisierte** Knochenmatrix (schmaler, blassroter Saum unter den Osteoblasten). Mineralisierung nach ca. 10 Tagen.\n- **Organische Phase** (ca. 25–30 % des Gewichts):\n  - ca. 90 % **Kollagen Typ I**\n  - nicht-kollagene Proteine: **Osteocalcin**, **Osteonectin**, Osteopontin, Knochen-Sialoprotein, Proteoglykane, Wachstumsfaktoren (BMPs)\n- **Anorganische Phase** (ca. 60–70 % des Gewichts):\n  - **Hydroxylapatit** Ca₁₀(PO₄)₆(OH)₂, nadel-/plättchenförmige Kristalle, entlang der Kollagenfibrillen (in deren Lückenzonen) angelagert\n  - dazu Carbonat, Mg²⁺, Na⁺, F⁻\n- **Wasser:** ca. 10 %\n- Klinik: gestörte Mineralisierung (Vitamin-D-Mangel) → Osteoid bleibt unverkalkt → **Rachitis/Osteomalazie**."
     },
     {
      "q": "Aufbau – Typ Kollagen?",
      "a": "- **Kollagen Typ I** (Knorpel: Typ II).\n- Im **Lamellenknochen:** Fibrillen innerhalb einer Lamelle parallel und **schraubenförmig**; der Steigungswinkel wechselt von Lamelle zu Lamelle (sperrholzartig) → hohe Festigkeit in alle Richtungen.\n- Im **Geflechtknochen:** Fibrillen ungeordnet (embryonal, Frakturkallus)."
     },
     {
      "q": "Zugfestigkeit & Druckfestigkeit?",
      "a": "| Komponente | verleiht |\n|---|---|\n| **Kollagen Typ I** | **Zugfestigkeit**, Biegsamkeit, Bruchzähigkeit |\n| **Hydroxylapatit** | **Druckfestigkeit**, Härte, Steifigkeit |\n\n- **Stahlbeton-Prinzip** (Verbundwerkstoff).\n- Experiment: Knochen ohne Mineral (Säure) → biegsam wie Gummi; ohne Kollagen (Glühen) → spröde, zerbröselt.\n- Klinik: Osteogenesis imperfecta (Kollagen-I-Defekt) → Glasknochen.\n- Spongiosa-Trabekel richten sich nach den **Spannungstrajektorien** aus (Wolff-Gesetz)."
     },
     {
      "q": "Knochenumbau – Knochenneubau?",
      "a": "**Knochenneubau (Osteogenese):**\n- **Desmal:** direkt aus Mesenchym (Schädeldach, Klavikula teilweise).\n- **Chondral:** über hyalines Knorpelmodell (Fingerknochen, Röhrenknochen): perichondrale Knochenmanschette + enchondrale Ossifikation in der Epiphysenfuge.\n- Zuerst entsteht immer **Geflechtknochen**, der dann in **Lamellenknochen** umgebaut wird. Auch bei der Frakturheilung.\n\n**Knochenumbau (Remodeling):**\n- Lebenslang, ca. **10 % des Skeletts pro Jahr** (Spongiosa schneller als Kompakta).\n- **Basic Multicellular Unit (BMU):**\n  1. **Aktivierung:** bone lining cells ziehen sich zurück, Osteoklasten-Vorläufer rekrutiert (RANKL/OPG-System).\n  2. **Resorption:** **Osteoklasten** (mehrkernig, Riesenzellen, Howship-Lakunen) bohren einen **Resorptionskanal** („Bohrkopf\").\n  3. **Umkehr:** Kittlinie wird angelegt.\n  4. **Formation:** **Osteoblasten** kleiden den Kanal Lamelle für Lamelle aus, bis nur der Havers-Kanal bleibt → **neues Osteon**.\n- Reste alter Osteone → **Schaltlamellen**.\n- Zweck: Anpassung an Belastung, Reparatur von Mikroschäden, **Kalziumhomöostase** (Parathormon, Calcitonin, Vitamin D)."
     },
     {
      "q": "Osteogenes Potential?",
      "a": "- Fähigkeit, **neuen Knochen zu bilden**.\n- Sitz: **Osteoprogenitorzellen** (mesenchymale Stammzellen) im **Str. osteogenicum des Periosts**, im **Endost** und im Knochenmark.\n- Bedeutung: **Frakturheilung** (Kallusbildung, v. a. vom Periost), Dickenwachstum, Remodeling.\n- Klinik: Periost bei OP schonen; Periostlappen/Knochentransplantate nutzen das osteogene Potential."
     },
     {
      "q": "Endost – „bone lining cells\"?",
      "a": "- **Endost** = dünne Zellschicht auf allen inneren Knochenoberflächen (Markhöhle, Trabekel, Havers- und Volkmann-Kanäle).\n- **Bone lining cells** = **ruhende, abgeflachte Osteoblasten** (Osteoblasten-Linie).\n- Funktionen:\n  - **Abdeckung** der ruhenden Knochenoberfläche (Schutz vor unkontrollierter Resorption),\n  - Regulation des **Mineralaustauschs** Knochen ↔ Blut (Ca²⁺),\n  - **Einleitung des Remodelings:** ziehen sich zurück, verdauen die dünne Osteoidschicht, signalisieren an Osteoklasten (RANKL),\n  - können wieder zu **aktiven Osteoblasten** werden,\n  - über Gap Junctions mit Osteozyten verbunden → Teil des mechanosensorischen Netzwerks."
     }
    ]
   }
  ]
 },
 {
  "id": "b3",
  "title": "Block 3 · Muskelgewebe",
  "podcast": "https://open.spotify.com/episode/6SzSUXDwQJXRDzmE041N9Q?si=U1EkF6XzTU62EHMJ4xjOqg",
  "preps": [
   {
    "id": "h3-1",
    "nr": 1,
    "title": "Zungenspitze – Skelettmuskulatur",
    "meta": "Gewebetyp: Quergestreifte Skelettmuskulatur + Mundschleimhaut · Färbung: meist HE (ggf. Eisenhämatoxylin für Querstreifung)",
    "kern": "Skelettmuskelfasern sind **Synzytien** mit vielen **randständigen Kernen** und einer **Querstreifung** aus Sarkomeren. In der Zunge verlaufen sie in drei Raumrichtungen, deshalb sieht man Längs- und Querschnitte im selben Präparat.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Querstreifung: A-Bande & I-Bande** | Im Längsschnitt: abwechselnd **dunkle (A, anisotrop)** und **helle (I, isotrop)** Bänder; bei starker Vergrösserung Z-Linie in der I-Bande |\n| **Zellkerne** | **Viele**, länglich, **randständig** direkt unter dem Sarkolemm (im Querschnitt am Rand der polygonalen Fasern) |\n| **BG: Endomysium** | Zartes Bindegewebe **um jede einzelne Faser**, mit Kapillaren (zusätzlich: Perimysium um Bündel, Epimysium um Muskel) |\n| **Schleimhaut** | Mehrschichtiges Plattenepithel (Zungenrücken teilweise verhornt), Lamina propria **fest mit der Muskulatur verwachsen** (keine Submukosa an der Oberseite) |\n| **Papillae filiformes** | Zahlreich, schlank, **spitz**, an der Spitze **verhornt**, **keine Geschmacksknospen** |\n| **Papillae fungiformes** | Pilzförmig: breiter Kopf, schmaler Stiel; unverhornt; **Geschmacksknospen** an der Oberfläche; gut vaskularisiert |\n| **Seromuköse Speicheldrüsen** | Zwischen den Muskelbündeln: gemischte Endstücke (hell muköse und dunkel seröse Anteile) (Gll. linguales anteriores, Blandin-Nuhn) |\n\n**Skizzentipp:** Längsschnitt einer Faser mit Querstreifung und Randkernen + Querschnitt (polygonale Felder, Kerne am Rand, Endomysium)."
     },
     {
      "title": "Vergleich der drei Muskeltypen (Übersicht)",
      "md": "| | Skelettmuskel | Herzmuskel | Glatte Muskulatur |\n|---|---|---|---|\n| Zelle | Synzytium, sehr lang | verzweigte Einzelzelle | spindelförmige Einzelzelle |\n| Kerne | viele, **randständig** | 1–2, **zentral** | 1, **zentral** |\n| Querstreifung | ja | ja | **nein** |\n| Besonderes | Satellitenzellen | Glanzstreifen | Dense Bodies |\n| Steuerung | willkürlich (somatisch) | autonom (Sinusknoten) | vegetativ |\n| Regeneration | gut | praktisch keine | gut (auch Teilung) |"
     }
    ],
    "fragen": [
     {
      "q": "Z-Scheibe / M-Scheibe / H-Scheibe?",
      "a": "| Struktur | Lage | Inhalt / Funktion |\n|---|---|---|\n| **Z-Scheibe (Z-Linie)** | Mitte der **I-Bande** | Verankerung der **Aktinfilamente** (α-Actinin) und von Titin; Grenze des Sarkomers |\n| **H-Zone (H-Scheibe)** | Mitte der **A-Bande**, heller | Nur **Myosin**, keine Aktin-Überlappung; wird bei Kontraktion **schmaler** |\n| **M-Scheibe (M-Linie)** | Mitte der **H-Zone** | Querverbindung der **Myosinfilamente** (Myomesin, M-Protein) |\n| **A-Bande** | | Länge = **Myosinfilamente** (+ Überlappung mit Aktin); **bleibt bei Kontraktion gleich** |\n| **I-Bande** | beidseits der Z-Scheibe | nur **Aktin**; wird bei Kontraktion **schmaler** |"
     },
     {
      "q": "Definition Sarkomer?",
      "a": "- **Abschnitt zwischen zwei Z-Scheiben**, kleinste **kontraktile Funktionseinheit** der quergestreiften Muskulatur.\n- Länge in Ruhe ca. **2–2,5 µm**.\n- Aufbau: ½ I-Bande – A-Bande (mit H-Zone und M-Linie) – ½ I-Bande.\n- Viele Sarkomere hintereinander → **Myofibrille**; viele Myofibrillen → Muskelfaser."
     },
     {
      "q": "Myofilamente?",
      "a": "| Filament | Bestandteile | Durchmesser |\n|---|---|---|\n| **Dünne Filamente** | **Aktin** (F-Aktin-Doppelhelix) + **Tropomyosin** + **Troponin** (C, I, T); Nebulin als Lineal | ca. 7 nm |\n| **Dicke Filamente** | **Myosin II** (Schwanz + 2 Köpfchen mit ATPase und Aktinbindung) | ca. 15 nm |\n| **Elastische Filamente** | **Titin**: von der Z-Scheibe zur M-Linie, zentriert das Myosin, passive Elastizität | |\n\nIm Querschnitt (EM): jedes Myosin von **6 Aktinfilamenten** umgeben."
     },
     {
      "q": "Kontraktionsvorgang?",
      "a": "**Elektromechanische Kopplung + Querbrückenzyklus:**\n\n1. Aktionspotential des Motoneurons → **motorische Endplatte** → Acetylcholin → Endplattenpotential → Aktionspotential am Sarkolemm.\n2. Fortleitung über die **T-Tubuli** ins Faserinnere.\n3. **Dihydropyridin-Rezeptor** (spannungsabhängig) koppelt mechanisch an den **Ryanodin-Rezeptor** des **sarkoplasmatischen Retikulums** → **Ca²⁺-Freisetzung** (Triade = T-Tubulus + 2 terminale Zisternen).\n4. Ca²⁺ bindet an **Troponin C** → **Tropomyosin** verschiebt sich → Myosin-Bindungsstellen am Aktin frei.\n5. **Querbrückenzyklus:** Myosinkopf (mit ADP + Pᵢ) bindet Aktin → **Kraftschlag** (Kippen, Aktin wird zur M-Linie gezogen; ADP + Pᵢ werden frei) → **ATP-Bindung löst** den Kopf → ATP-Hydrolyse **spannt** den Kopf neu.\n6. **Gleitfilamenttheorie:** Filamente gleiten aneinander vorbei, **werden nicht kürzer**. I-Bande und H-Zone schmaler, Z-Scheiben rücken zusammen, **A-Bande bleibt konstant**.\n7. Erschlaffung: Ca²⁺-Rückpumpen (**SERCA**) ins SR.\n\n(Ohne ATP bleibt der Myosinkopf gebunden → **Totenstarre**.)"
     },
     {
      "q": "Regeneration der Skelettmuskulatur?",
      "a": "- **Gut**, dank der **Satellitenzellen**: ruhende muskuläre Stammzellen zwischen Sarkolemm und **Basallamina**.\n- Bei Verletzung: Aktivierung → Proliferation → Myoblasten → **Fusion** zu neuen Fasern bzw. Reparatur bestehender. Die Basallamina dient als Leitschiene.\n- Grössere Defekte → Narbe (Bindegewebe).\n- Anpassung an Training: **Hypertrophie** (dickere Fasern, mehr Myofibrillen), kaum Hyperplasie.\n- Erschöpfung der Satellitenzellen z. B. bei Muskeldystrophie Duchenne."
     }
    ]
   },
   {
    "id": "h3-2",
    "nr": 2,
    "title": "Herzwand – Herzmuskulatur",
    "meta": "Gewebetyp: Quergestreifte Herzmuskulatur · Färbung: meist HE",
    "kern": "Herzmuskelzellen sind **verzweigte Einzelzellen** mit **zentralem Kern**, über **Glanzstreifen** zu einem **funktionellen Synzytium** verbunden. Das Herz hat ein **eigenes Erregungssystem** und regeneriert praktisch nicht.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Epikard – Myokard – Endokard** | *Endokard:* Endothel + dünne Bindegewebsschicht (innen). *Myokard:* breite Muskelschicht. *Epikard:* Mesothel + Bindegewebe mit **Fettgewebe** und Koronargefässen (aussen) |\n| **Querstreifung A/I** | Wie beim Skelettmuskel, oft etwas weniger deutlich |\n| **Zellkern** | **1 (–2), zentral** gelegen, oval |\n| **Kernspindel** | Helle, spindelförmige, myofibrillenfreie Zone an beiden Kernpolen (Organellen, Glykogen, **Lipofuszin**) |\n| **Glanzstreifen / Disci intercalares** | Dunkle, quer verlaufende, oft **treppenförmige** Linien an den Zellgrenzen |\n| **Endomysium** | Zartes Bindegewebe zwischen den Zellen mit **sehr vielen Kapillaren** |\n| **Purkinje-Fasern** | **Subendokardial:** grosse, **helle** (glykogenreiche) Zellen mit wenigen, randständigen Myofibrillen und hellem perinukleärem Hof |\n\n**Skizzentipp:** Verzweigte Zellen mit zentralem Kern, Kernspindel, Glanzstreifen treppenförmig; separat Purkinje-Fasern unter dem Endokard."
     }
    ],
    "fragen": [
     {
      "q": "Aufbau des Perikards?",
      "a": "| Teil | Aufbau | Funktion |\n|---|---|---|\n| **Pericardium fibrosum** | Aussen; derber Sack aus **straffem kollagenem Bindegewebe** | Schutz vor Überdehnung, Verankerung (Zwerchfell, Sternum) |\n| **Pericardium serosum, Lamina parietalis** | Mesothel + Bindegewebe; kleidet das Pericardium fibrosum innen aus | |\n| **Pericardium serosum, Lamina visceralis = Epikard** | Mesothel + Bindegewebe (+ Fett, Koronargefässe); liegt dem Myokard direkt auf | |\n| **Cavitas pericardialis** | Kapillärer Spalt zwischen beiden serösen Blättern, ca. 10–20 ml seröse Flüssigkeit | **reibungsfreies Gleiten** des Herzens |\n\nEpikard = **Serosa** (Herz ragt in eine seröse Höhle).\nKlinik: Perikarderguss/-tamponade, Perikarditis (Reibegeräusch)."
     },
     {
      "q": "Funktion der Glanzstreifen?",
      "a": "Glanzstreifen = spezialisierte **Zell-Zell-Kontakte** an den Enden der Kardiomyozyten mit drei Komponenten:\n\n| Kontakt | Lage | Funktion |\n|---|---|---|\n| **Fascia adhaerens** | quer verlaufende Anteile | Verankerung der **Aktinfilamente** (ersetzt Z-Scheibe am Zellende) → **Kraftübertragung** von Zelle zu Zelle |\n| **Desmosomen (Maculae adhaerentes)** | quer verlaufende Anteile | Verankerung von Intermediärfilamenten (**Desmin**) → **mechanischer Zusammenhalt** |\n| **Gap Junctions (Nexus)** | **längs** verlaufende Anteile | **elektrische Kopplung** (Connexin 43): Ionen fliessen direkt → schnelle Erregungsausbreitung |\n\n→ Myokard arbeitet als **funktionelles Synzytium**: Alle Zellen kontrahieren nahezu gleichzeitig."
     },
     {
      "q": "Herzeigene Erregungsleitung?",
      "a": "**Erregungsbildungs- und -leitungssystem** aus **spezialisierten Herzmuskelzellen** (nicht Nerven!):\n\n1. **Sinusknoten** (Keith-Flack; rechter Vorhof, Mündung V. cava superior): primärer Schrittmacher, ca. **60–80/min** (spontane Depolarisation, HCN-Kanäle).\n2. Ausbreitung über die Vorhofmuskulatur.\n3. **AV-Knoten** (Aschoff-Tawara; Koch-Dreieck): **Verzögerung** der Überleitung (Vorhöfe entleeren sich zuerst in die Kammern); Ersatzrhythmus 40–50/min.\n4. **His-Bündel**: durchbricht das bindegewebige Herzskelett (einzige Verbindung Vorhof → Kammer).\n5. **Tawara-Schenkel** (rechts/links) im Kammerseptum.\n6. **Purkinje-Fasern**: subendokardial → Kammermyokard (von der Herzspitze zur Basis); Ersatzrhythmus 20–30/min.\n\n**Vegetatives Nervensystem** moduliert nur: Sympathikus ↑ Frequenz/Kraft, Parasympathikus (N. vagus) ↓ Frequenz. Das Herz schlägt auch denerviert (z. B. nach Transplantation)."
     },
     {
      "q": "Begriff Purkinje-Fasern?",
      "a": "- **Keine Nervenfasern!** Spezialisierte **Herzmuskelzellen** des Erregungsleitungssystems („Faser\" wie „Muskelfaser\").\n- Merkmale: **gross**, **hell** (viel **Glykogen**), **wenige Myofibrillen** (randständig), oft 2 Kerne, wenig T-Tubuli, viele Gap Junctions.\n- Lage: **subendokardial**, z. T. in falschen Sehnenfäden.\n- Funktion: **schnellste Erregungsleitung** (bis 4 m/s), nicht Kraft.\n- Nicht verwechseln mit **Purkinje-Zellen** des Kleinhirns (Neurone)."
     },
     {
      "q": "Regenerationsfähigkeit der Herzmuskulatur?",
      "a": "- **Praktisch keine.** Kardiomyozyten sind beim Erwachsenen **postmitotisch**; Erneuerung < 1 %/Jahr.\n- **Keine Satellitenzellen** (anders als Skelettmuskel).\n- **Herzinfarkt** → Nekrose → Ersatz durch **Narbengewebe** (Fibroblasten, Kollagen) → nicht kontraktil, Gefahr von Herzinsuffizienz, Aneurysma, Rhythmusstörungen.\n- Anpassung an Mehrbelastung nur durch **Hypertrophie** (grössere Zellen, z. B. Sportlerherz, Hypertonie), nicht durch Hyperplasie.\n- **Lipofuszin** reichert sich mit dem Alter an (keine Verdünnung durch Teilung)."
     }
    ]
   },
   {
    "id": "h3-3",
    "nr": 3,
    "title": "Harnblase – Glatte Muskulatur und Urothel",
    "meta": "Gewebetyp: Glatte Muskulatur + Übergangsepithel · Färbung: meist HE",
    "kern": "Das **Urothel** bildet eine harndichte, dehnbare Barriere. Der **M. detrusor** besteht aus **glatter Muskulatur** ohne Querstreifung, ist vegetativ innerviert und kaum ermüdbar.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Tunica mucosa** | Im leeren Zustand stark gefaltet; Urothel + Lamina propria (keine echte Muscularis mucosae) |\n| **Lamina epithelialis – Urothel** | **Mehrschichtiges Übergangsepithel**: Basalzellen, mehrere Lagen Intermediärzellen, oben Deckzellen; Höhe abhängig vom Füllungszustand |\n| **Deckzellen (Umbrella Cells)** | Oberste Lage: **sehr grosse**, oft **zweikernige** Zellen, die mehrere darunterliegende Zellen „überdachen\"; apikal dunkler eosinophiler Saum (**Crusta**) |\n| **Tunica muscularis** (M. detrusor vesicae) | Dicke Schicht aus glatter Muskulatur, Bündel durch Bindegewebe getrennt |\n| **Bündel glatter Muskulatur längs & quer** | Geflecht: Bündel in verschiedenen Richtungen angeschnitten (klassisch innen längs, Mitte zirkulär, aussen längs, im Präparat oft nicht trennbar) |\n| **Zellkerne** | Längsschnitt: **ein zentraler, länglicher, zigarrenförmiger Kern** (bei Kontraktion korkenzieherartig); Querschnitt: runde Anschnitte verschiedener Grösse, Kern nur in den grössten (Zellmitte) |\n| **Tunica adventitia** | Aussen lockeres Bindegewebe (nur am Blasendach: Serosa = Peritoneum) |\n\n**Skizzentipp:** Urothel mit Deckzellen im Detail; glatte Muskelzellen längs (spindelförmig, zentraler Kern) und quer (Kern nur in grossen Anschnitten)."
     },
     {
      "title": "Ergänzung: Urothel",
      "md": "- **Barriere:** Deckzellen mit **asymmetrischer Einheitsmembran** aus **Uroplakin-Plaques** + Tight Junctions + Glykosaminoglykan-Schicht → undurchlässig für Wasser und Harnbestandteile (Harn ist meist hyperton).\n- **Dehnbarkeit:** leer = hoch, viele Lagen, rundliche Deckzellen; voll = flach (2–3 Lagen), Deckzellen gestreckt, bauen gespeicherte **fusiforme Vesikel** in die apikale Membran ein.\n- Vorkommen: Nierenbecken bis proximale Urethra."
     },
     {
      "title": "Prüfungsfallen",
      "md": "- Glatte Muskelzellen: **ein zentraler** Kern (Skelettmuskel: viele randständige).\n- Kein Troponin → **Calmodulin**.\n- Nur am Blasendach Serosa, sonst Adventitia."
     }
    ],
    "fragen": [
     {
      "q": "Kontraktiler Apparat der glatten Muskelzellen?",
      "a": "- **Aktin** (dünne Filamente, mit Tropomyosin und **Caldesmon/Calponin**, **kein Troponin**) und **Myosin II** (dicke Filamente, „side-polar\"), Verhältnis Aktin : Myosin ca. 15 : 1.\n- **Nicht in Sarkomeren** angeordnet, sondern **schräg/netzartig** durch die Zelle gespannt.\n- Verankerung an **Dense Bodies** (zytoplasmatisch) und **Anheftungsplaques** (membranständig), enthalten **α-Actinin**.\n- Verbunden durch **Intermediärfilamente** (**Desmin**, in Gefässmuskulatur auch Vimentin).\n- Kontraktion: Zelle verkürzt sich und **verdreht sich korkenzieherartig**, wird rundlicher.\n- **Regulation (myosingekoppelt):** Ca²⁺ (aus Extrazellulärraum + SR) bindet **Calmodulin** → aktiviert **Myosin-leichte-Ketten-Kinase (MLCK)** → Phosphorylierung der regulatorischen leichten Kette → Myosin aktiv. Erschlaffung über **Myosin-Phosphatase**.\n- Statt T-Tubuli: **Caveolae** (Membraneinstülpungen)."
     },
     {
      "q": "Gibt es eine Querstreifung?",
      "a": "**Nein.** Aktin und Myosin sind nicht in parallelen, hintereinanderliegenden Sarkomeren geordnet, also entsteht kein regelmässiges Bandenmuster. Deshalb „glatte\" Muskulatur."
     },
     {
      "q": "Gibt es Z-Linien?",
      "a": "**Nein, nicht im eigentlichen Sinn.** Ihre Funktion (Verankerung der Aktinfilamente) übernehmen die **Dense Bodies** und die **Anheftungsplaques**. Diese enthalten wie die Z-Scheiben **α-Actinin** und gelten daher als **funktionelles Äquivalent der Z-Scheibe**."
     },
     {
      "q": "Innervation der glatten Muskulatur?",
      "a": "- **Vegetatives (autonomes) Nervensystem**, unwillkürlich.\n- **Keine motorischen Endplatten.** Postganglionäre Axone bilden **Varikositäten** (perlschnurartige Auftreibungen), die Transmitter **diffus** ins Interstitium freisetzen („Synapse en passant\").\n- Erregungsausbreitung über **Gap Junctions**:\n  - **Single-Unit-Typ** (viszeral; Darm, Harnblase, Uterus): viele Gap Junctions, funktionelles Synzytium, teils **myogene Spontanaktivität** und **dehnungsinduzierte** Kontraktion.\n  - **Multi-Unit-Typ** (Iris, Ductus deferens, grosse Arterien): jede Zelle einzeln innerviert, fein abstufbar.\n- Zusätzlich hormonelle und lokale Steuerung (z. B. Oxytocin, NO, Histamin).\n- **Harnblase:** **Parasympathikus** (Nn. splanchnici pelvici, S2–S4; Acetylcholin, M3-Rezeptoren) → **Detrusorkontraktion = Miktion**. **Sympathikus** (Th12–L2; Noradrenalin; β3 → Detrusor-Relaxation, α1 → Kontraktion des inneren Sphinkters) → **Speicherung**."
     },
     {
      "q": "Ermüdungspotential der glatten Muskulatur?",
      "a": "- **Sehr gering**: glatte Muskulatur ermüdet praktisch nicht.\n- Kontraktion **langsam**, aber **dauerhaft** mit sehr geringem ATP-Verbrauch (ca. 300-mal ökonomischer als Skelettmuskel).\n- Grund: **Latch-Zustand** (Sperrzustand). Dephosphorylierte Myosinköpfe bleiben lange am Aktin gebunden, der Querbrückenzyklus verlangsamt sich, die Spannung bleibt aber erhalten.\n- Ideal für **Tonusorgane** (Gefässe, Sphinkter, Harnblase, Darm).\n- Ausserdem: **Plastizität** – kann sich bei Dehnung an neue Länge anpassen, ohne dass die Spannung stark steigt (Blasenfüllung)."
     }
    ]
   }
  ]
 },
 {
  "id": "b4",
  "title": "Block 4 · Nervengewebe",
  "podcast": "https://open.spotify.com/episode/52KwQKmkUsiM3urWWyFlAU?si=7q8YuIaAQ_SUdaTuuDuzdQ",
  "preps": [
   {
    "id": "h4-1",
    "nr": 1,
    "title": "Peripherer Nerv",
    "meta": "Gewebetyp: Nervengewebe (PNS) + Bindegewebshüllen · Färbung: HE, ggf. Osmium (Myelin schwarz)",
    "kern": "Ein peripherer Nerv ist ein Bündel aus **Axonen** mit **Schwann-Zellen** in drei Bindegewebshüllen (Epi-, Peri-, Endoneurium). Er enthält **keine Perikarya**. Myelinisierte Fasern leiten **saltatorisch** von Ranvier-Schnürring zu Ranvier-Schnürring.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Epineurium** | Äussere Hülle um den ganzen Nerv: lockeres bis straffes Bindegewebe, **Fettgewebe**, grössere Gefässe |\n| **Nervenfaserbündel / Faszikel** | Runde bis ovale Felder mit Nervenfasern innerhalb des Epineuriums |\n| **Perineurium** | Dünne, mehrlagige Hülle aus **flachen Zellen** (Perineuralepithel) um jeden Faszikel |\n| **Endoneurium** | Zartes, lockeres Bindegewebe mit Kapillaren **zwischen den einzelnen Fasern** im Faszikel |\n| **Markhaltige Nervenfaser** | Querschnitt: zentrales **Axon** (Punkt) + **heller, netzartiger Hof** (herausgelöstes Myelin, Neurokeratin) + Schwann-Zell-Kern am Rand. In Osmium: schwarze Ringe. Längsschnitt: **wellig**, Ranvier-Schnürringe |\n| **Marklose Nervenfaser** | Kleine Gruppen dünner Axone ohne hellen Myelinhof, in Schwann-Zellen eingebettet (Remak-Bündel) |\n| **Schwann-Zellen** | Längliche bis ovale, **flache Kerne** an den Fasern (in HE die meisten Kerne im Faszikel) |\n\n**Skizzentipp:** Querschnitt mit Epineurium, 2–3 Faszikeln mit Perineurium, darin einzelne Fasern mit Endoneurium; Detail: markhaltige vs. marklose Faser."
     },
     {
      "title": "Ergänzung: Perineurium & Regeneration",
      "md": "- **Perineurium** = Perineuralepithel mit **Tight Junctions** und Basallamina → **Blut-Nerven-Schranke** (Diffusionsbarriere, schützt das endoneurale Milieu; vgl. Blut-Hirn-Schranke).\n- **Regeneration** nach Durchtrennung möglich: distale Waller-Degeneration; Schwann-Zellen bilden **Büngner-Bänder** (Leitschienen in der Basallamina); Axon wächst ca. **1 mm/Tag** aus. Voraussetzung: intaktes Perikaryon und adaptierte Nervenenden (Nervennaht)."
     }
    ],
    "fragen": [
     {
      "q": "Perikarya im peripheren Nerv?",
      "a": "- **Nein.** Ein peripherer Nerv enthält nur **Nervenfortsätze (Axone)**, **Schwann-Zellen**, Bindegewebszellen (Fibroblasten), Endothelzellen und ggf. Mastzellen/Makrophagen.\n- Alle sichtbaren Kerne gehören zu **Schwann-Zellen, Fibroblasten, Endothelzellen**.\n- Die **Perikarya** liegen:\n  - **motorisch (somatoefferent):** Vorderhorn des Rückenmarks / Hirnnervenkerne,\n  - **sensibel (afferent):** **Spinalganglion** / sensible Hirnnervenganglien,\n  - **vegetativ (viszeroefferent):** Seitenhorn (präganglionär) und vegetative Ganglien (postganglionär)."
     },
     {
      "q": "Afferenzen – Efferenzen",
      "a": "| | Afferenzen | Efferenzen |\n|---|---|---|\n| Richtung | Peripherie **→ ZNS** (zuführend) | ZNS **→ Peripherie** (wegführend) |\n| Funktion | **sensibel/sensorisch** | **motorisch**, sekretorisch |\n| Somatisch | Haut, Muskel, Gelenke (Tastsinn, Schmerz, Propriozeption) | Skelettmuskulatur |\n| Viszeral | Eingeweide (Dehnung, Chemorezeption) | glatte Muskulatur, Herz, Drüsen |\n| Perikaryon | Spinalganglion (pseudounipolar) | Vorderhorn (multipolar) bzw. Seitenhorn/vegetative Ganglien |\n| Rückenmarkswurzel | **Hinterwurzel** | **Vorderwurzel** |\n\nDie meisten peripheren Nerven sind **gemischt**."
     },
     {
      "q": "Internodium",
      "a": "- Abschnitt eines myelinisierten Axons zwischen **zwei Ranvier-Schnürringen**, also der von **einer** Schwann-Zelle myelinisierte Bereich.\n- Länge ca. **0,2–1,5 mm**; je dicker die Faser, desto länger das Internodium und desto schneller die Leitung.\n- Myelin = **spiralig umwickelte Zellmembran** der Schwann-Zelle (lipidreich, ca. 70–80 % Lipide) → **elektrische Isolation**, geringe Kapazität.\n- Schmidt-Lanterman-Einkerbungen: Zytoplasmareste in der Myelinscheide."
     },
     {
      "q": "Ranvier-Schnürring",
      "a": "- **Myelinfreie Lücke** (ca. 1 µm) zwischen zwei benachbarten Schwann-Zellen bzw. Internodien.\n- Hier ist das Axon dem Extrazellulärraum ausgesetzt; hohe Dichte **spannungsabhängiger Na⁺-Kanäle**.\n- **Saltatorische Erregungsleitung:** Aktionspotential „springt\" von Schnürring zu Schnürring; dazwischen elektrotonische Ausbreitung.\n- Vorteile: **viel schneller** (bis 120 m/s vs. ca. 0,5–2 m/s marklos) und **energiesparender** (Na⁺/K⁺-ATPase nur an Schnürringen nötig).\n- Klinik: Demyelinisierung (z. B. Guillain-Barré-Syndrom im PNS, Multiple Sklerose im ZNS) → Leitungsverlangsamung/-block."
     }
    ]
   },
   {
    "id": "h4-2",
    "nr": 2,
    "title": "Spinalganglion (Ganglion sensorium nervi spinalis)",
    "meta": "Gewebetyp: Sensibles Ganglion (PNS) · Färbung: HE, ggf. Nissl-Färbung (Kresylviolett)",
    "kern": "Das Spinalganglion enthält die **Perikarya der pseudounipolaren sensiblen Neurone**, umgeben von **Mantelzellen**. Es gibt **keine Synapsen** im Ganglion. Die Information läuft von der Peripherie direkt ins Rückenmark durch.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Perikarya** | **Grosse, runde** Nervenzellkörper (ca. 20–100 µm), in Gruppen zwischen Faserbündeln; **zentraler, runder, heller Kern** mit grossem, deutlichem **Nukleolus** („Eulenauge\") |\n| **Mantelzellen / Satellitenzellen** | Kranz **kleiner, dunkler, runder/flacher Kerne** dicht um jedes Perikaryon |\n| **Schwann-Zellen** | Längliche Kerne entlang der durchziehenden Nervenfasern |\n| **Nervenfasern** | Bündel myelinisierter Fasern zwischen den Zellgruppen (zentrale und periphere Fortsätze) |\n| **Nissl-Schollen** | Basophile (blau-violette) Schollen/Körnchen im Zytoplasma der Perikarya; in Spinalganglienzellen eher **fein verteilt** |\n| **Endoneurium** | Zartes Bindegewebe mit Kapillaren zwischen Perikarya und Fasern (aussen: Kapsel aus Epi-/Perineurium) |\n\nZusätzlich oft: gelb-braunes **Lipofuszin** im Zytoplasma (v. a. bei älteren Spendern).\n\n**Skizzentipp:** Ein Perikaryon mit Kern, Nukleolus, Nissl-Substanz, Lipofuszin und Mantelzellkranz; daneben Faserbündel mit Schwann-Zellen."
     },
     {
      "title": "Prüfungsfallen",
      "md": "- **Keine Synapsen** im Spinalganglion.\n- Mantelzellen = Gliazellen des PNS (Funktion ähnlich Astrozyten).\n- Purkinje-Fasern, Purkinje-Zellen, Pseudounipolare Zellen nicht verwechseln."
     }
    ],
    "fragen": [
     {
      "q": "Pseudo-unipolare Nervenzelle",
      "a": "- **Ein einziger Fortsatz** verlässt das Perikaryon (oft zunächst gewunden: Glomerulus), teilt sich nach kurzer Strecke **T-förmig**:\n  - **peripherer Ast** → zum Rezeptor (z. B. Meissner-Körperchen der Fingerbeere, Muskelspindel),\n  - **zentraler Ast** → über die **Hinterwurzel** ins Rückenmark (Hinterhorn bzw. Hinterstrang).\n- **„Pseudo\"**: entwicklungsgeschichtlich **bipolar**; die beiden Fortsätze verschmelzen am Zellkörper zu einem Stamm.\n- Das Signal läuft **am Perikaryon vorbei** direkt von peripher nach zentral. Das Perikaryon ist **nicht in die Leitung eingeschaltet** und dient der trophischen Versorgung.\n- → **Keine Synapsen, keine Umschaltung** im Spinalganglion (Unterschied zu vegetativen Ganglien, dort multipolare Neurone mit Synapsen).\n- Mantelzellen umhüllen das Perikaryon lückenlos → keine synaptischen Kontakte auf der Zelloberfläche."
     },
     {
      "q": "Bauweise des Dendriten?",
      "a": "- Der **periphere Fortsatz** ist **funktionell ein Dendrit** (leitet **zum** Perikaryon hin, afferent),\n- **strukturell aber ein Axon:**\n  - lang (bis > 1 m),\n  - meist **myelinisiert** (Schwann-Zellen, Ranvier-Schnürringe),\n  - leitet **Aktionspotentiale** (saltatorisch), nicht nur elektrotonisch,\n  - axonales Zytoskelett, keine Nissl-Schollen, keine Dendritendornen.\n- Daher Bezeichnung: **„dendritisches Axon\"** bzw. **peripheres Axon**.\n- Generatorpotential entsteht an der Rezeptorendigung, AP wird am ersten Schnürring ausgelöst."
     },
     {
      "q": "Lipofuszin – Alter?",
      "a": "- **Abnutzungs- bzw. Alterspigment**: gelblich-braune Granula, **autofluoreszierend**.\n- Besteht aus **nicht abbaubaren Resten** in (Telo-)Lysosomen: oxidierte Lipide und Proteine (Produkte der Lipidperoxidation, freie Radikale).\n- Reichert sich **lebenslang** an, besonders in **postmitotischen Zellen** (Neurone, Herzmuskelzellen, auch Hepatozyten), da diese das Material nicht durch Zellteilung „verdünnen\" können.\n- **Je älter, desto mehr Lipofuszin** → Indikator für Zellalter. Ausgeprägt: „braune Atrophie\" (Herz, Leber).\n- Für sich nicht schädlich, aber Marker oxidativen Stresses."
     },
     {
      "q": "Funktion der Nissl-Schollen?",
      "a": "- **Nissl-Schollen** = Stapel aus **rauem endoplasmatischem Retikulum** + **freie Ribosomen/Polysomen** → **Basophilie** (RNA).\n- Funktion: **Proteinsynthese** (Strukturproteine, Enzyme, Transmitter-Enzyme, Membranproteine, Ionenkanäle).\n- Notwendig, weil das Perikaryon das gesamte, teils extrem lange **Axon** mitversorgen muss. Transport über **axonalen Transport** (schnell: Kinesin/Dynein an Mikrotubuli; langsam: Zytoskelett).\n- Vorkommen: Perikaryon und proximale Dendriten, **nicht** im Axonhügel und Axon.\n- **Chromatolyse:** nach Axonschädigung lösen sich die Nissl-Schollen auf, die Zelle schwillt, der Kern wird exzentrisch. Zeichen der **Umstellung auf Regeneration** (Synthese von Reparaturproteinen)."
     }
    ]
   },
   {
    "id": "h4-3",
    "nr": 3,
    "title": "Rückenmark (Medulla spinalis)",
    "meta": "Gewebetyp: ZNS · Färbung: HE, Nissl, ggf. Markscheidenfärbung (Klüver-Barrera, Luxol)",
    "kern": "Graue Substanz (Perikarya, Neuropil) innen in Schmetterlingsform, weisse Substanz (myelinisierte Bahnen) aussen. Myelin bilden hier **Oligodendrozyten**. Die Form des Querschnitts verrät das **Segment**.",
    "sections": [
     {
      "title": "Auffinden im Mikroskop & Skizzieren",
      "md": "| Struktur | Woran erkenne ich sie? |\n|---|---|\n| **Graue / weisse Substanz** | *Grau:* zentral, **Schmetterlings-/H-Form**, kernreich, feinkörniges Neuropil. *Weiss:* aussen, myelinisierte Axone (in HE hell-netzig, in Markscheidenfärbung dunkel) in Vorder-, Seiten-, Hinterstrang |\n| **Vorderhorn** | Ventral, **breit und plump**, grosse Motoneurone |\n| **Hinterhorn** | Dorsal, **schmal**, reicht fast bis zur Oberfläche (Substantia gelatinosa als helle Kappe) |\n| **(Seitenhorn?)** | Kleiner seitlicher Zipfel zwischen Vorder- und Hinterhorn, **nur C8–L2** (Sympathikus) und S2–S4 (Parasympathikus, angedeutet) |\n| **Zentralkanal – Ependymzellen** | In der Commissura grisea, klein; ausgekleidet von **einschichtig kubisch-prismatischen Ependymzellen** (z. T. mit Kinozilien); beim Erwachsenen oft obliteriert |\n| **Motoneurone** | **Grösste Zellen**, **multipolar**, grosser heller Kern mit Nukleolus, **grobe Nissl-Schollen** (Tigroid), Fortsätze sichtbar |\n| **Astrozyten / Oligodendrozyten** | *Astrozyten:* grosse, **ovale, helle** Kerne, Zytoplasma in HE kaum sichtbar (GFAP-Färbung). *Oligodendrozyten:* **kleine, runde, dunkle** Kerne mit hellem Hof, in der weissen Substanz **in Reihen** zwischen den Fasern |\n| **Neuropil** | Feinkörniges, eosinophiles **Geflecht** zwischen den Zellkörpern der grauen Substanz |\n\nUmgebung: Pia mater (eng anliegend, mit Gefässen), Fissura mediana anterior (ventral, tief), Sulcus medianus posterior (dorsal, flach)."
     },
     {
      "title": "Prüfungsfallen",
      "md": "- **Seitenhorn nur C8–L2** (thorakal deutlich) → wichtigster Hinweis auf ein Thorakalsegment.\n- Im Rückenmark ist grau **innen**, im Gross- und Kleinhirn grau **aussen** (Rinde).\n- Ependymzellen sind **Gliazellen** (kein echtes Epithel, keine Basalmembran)."
     }
    ],
    "fragen": [
     {
      "q": "Schwann-Zelle / Oligodendrozyt",
      "a": "| | Schwann-Zelle | Oligodendrozyt |\n|---|---|---|\n| Nervensystem | **PNS** | **ZNS** |\n| Myelinisiert | **1 Internodium** von **1 Axon** | **viele Internodien** (bis ca. 50) **verschiedener** Axone über mehrere Fortsätze |\n| Basallamina | **ja** | **nein** |\n| Marklose Fasern | umhüllt mehrere marklose Axone (Remak) | marklose Axone im ZNS liegen frei |\n| Myelinproteine | P0, PMP22 | PLP, MOG |\n| Herkunft | Neuralleiste | Neuralrohr |\n| **Regeneration** | **fördernd**: Büngner-Bänder als Leitschiene, Wachstumsfaktoren | **hemmend**: Nogo, MAG; dazu Glianarbe (Astrozyten) → kaum Regeneration |\n| Klinik | Guillain-Barré, Charcot-Marie-Tooth | **Multiple Sklerose** |"
     },
     {
      "q": "Blut-Hirn-Schranke",
      "a": "- **Selektive Barriere** zwischen Blut und Hirngewebe, schützt das konstante Milieu der Neurone (vor Toxinen, Transmittern und Schwankungen von Ionen im Blut).\n- **Aufbau:**\n  1. **Endothel** der ZNS-Kapillaren (eigentliche Barriere): **kontinuierlich**, keine Fenestrationen, **Tight Junctions** (Claudin-5, Occludin), kaum Transzytose, viele Transporter und Effluxpumpen (P-Glykoprotein).\n  2. **Basalmembran**.\n  3. **Perizyten**.\n  4. **Astrozyten-Endfüsse** (Membrana limitans gliae perivascularis): induzieren und erhalten die Schrankeneigenschaften, regulieren Wasser (Aquaporin-4) und K⁺.\n- **Passage:** lipophile kleine Stoffe, O₂, CO₂ frei; **Glukose** über **GLUT1**, Aminosäuren über Transporter.\n- **Lücken:** zirkumventrikuläre Organe (Area postrema, Neurohypophyse …).\n- Klinik: Pharmakologie (viele Medikamente gelangen nicht hinein), Störung bei Entzündung, Tumor, Ischämie (Ödem).\n- PNS-Pendant: **Blut-Nerven-Schranke** (Perineurium + Endoneuralkapillaren)."
     },
     {
      "q": "Präparat – welches Rückenmarkssegment? (zervikal – thorakal – lumbal – sakral?)",
      "a": "**Zwei Faustregeln:**\n1. **Weisse Substanz nimmt nach kranial zu** (oben laufen alle auf- und absteigenden Bahnen).\n2. **Vorderhörner sind breit in den Intumeszenzen** (C5–Th1: Arme; L1–S2: Beine).\n\n| Segment | Querschnitt | Graue vs. weisse Substanz | Hörner |\n|---|---|---|---|\n| **Zervikal** | **gross, queroval** | **viel weisse** Substanz | Vorderhörner **breit** (Intumescentia cervicalis); Hinterstrang mit Fasciculus gracilis + **cuneatus** (Septum intermedium) |\n| **Thorakal** | **klein, rund** | weisse Substanz überwiegt deutlich, graue Substanz **schmal, zierlich** | schlanke Vorder- und Hinterhörner, **deutliches Seitenhorn**, Nucleus thoracicus (Clarke) |\n| **Lumbal** | **rund**, mittelgross | graue Substanz **gross**, weisse relativ weniger | **plumpe, massive** Vorder- und Hinterhörner (Intumescentia lumbosacralis) |\n| **Sakral** | **klein**, rund | **graue Substanz dominiert**, weisse nur schmaler Saum | breite, plumpe Hörner, kurze Kommissur |"
     }
    ]
   }
  ]
 }
];
