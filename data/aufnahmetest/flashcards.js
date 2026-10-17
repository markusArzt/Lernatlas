// MedAT Trainer – Flashcards
// Quelle: Handschriftliche Mitschrift (Chemie)
//
// Schema:
//   { id: 1,
//     topic: "Chemie",   ← Themenfilter
//     q: "Frage?",
//     a: "Antwort."  }
//
// Neue Karten einfach ans Array anhängen.

const flashcardsData = [
    // ── Periodensystem ────────────────────────────────────────────
    { id: 1,  topic: "Chemie",
      q: "Was passiert mit dem Atomradius innerhalb einer Periode (→) und innerhalb einer Gruppe (↓)?",
      a: "Innerhalb einer Periode (→) nimmt der Atomradius ab. Innerhalb einer Gruppe (↓) nimmt er zu." },

    { id: 2,  topic: "Chemie",
      q: "Was passiert mit der Elektronegativität innerhalb einer Periode (→) und innerhalb einer Gruppe (↓)?",
      a: "Innerhalb einer Periode (→) nimmt die Elektronegativität zu. Innerhalb einer Gruppe (↓) nimmt sie ab. Maximum: Fluor." },

    { id: 3,  topic: "Chemie",
      q: "Welche Elemente gehören zu den Alkalimetallen (Gruppe I)?",
      a: "H, Li, Na, K (und Rb, Cs, Fr)." },

    { id: 4,  topic: "Chemie",
      q: "Welche Elemente gehören zu den Erdalkalimetallen (Gruppe II)?",
      a: "Be, Mg, Ca (und Sr, Ba, Ra)." },

    { id: 5,  topic: "Chemie",
      q: "Was unterscheidet Kationen von Anionen?",
      a: "Kationen sind positiv geladen (Elektronenverlust), Anionen sind negativ geladen (Elektronengewinn)." },

    { id: 6,  topic: "Chemie",
      q: "Ab welchem Elektronegativitätsunterschied spricht man von ionischer Bindung?",
      a: "ΔEN > 1,7 → ionische Bindung (~400 kJ/mol)." },

    { id: 7,  topic: "Chemie",
      q: "Nenne die 8 Hauptgruppen mit je einem Beispielelement.",
      a: "I Alkalimetalle (Na) · II Erdalkalimetalle (Ca) · III Borgruppe (Al) · IV Kohlenstoff-Gruppe (C) · V Stickstoff-Gruppe (N) · VI Chalkogene (O) · VII Halogene (F) · VIII Edelgase (Ne)" },

    // ── Bindungen ─────────────────────────────────────────────────
    { id: 8,  topic: "Chemie",
      q: "Wie stark sind Van-der-Waals-Kräfte und welche Art von Wechselwirkung sind sie?",
      a: "Ca. 10 kJ/mol – die schwächste intermolekulare Wechselwirkung; entsteht durch temporäre Dipolmomente." },

    { id: 9,  topic: "Chemie",
      q: "Wie stark sind Wasserstoffbrückenbindungen und wie entstehen sie?",
      a: "Ca. 40 kJ/mol. H ist an stark elektronegatives Atom (O, N, F) gebunden → e⁻-Entzug → δ⁺ am H → Anziehung zu freiem Elektronenpaar." },

    { id: 10, topic: "Chemie",
      q: "Nenne die drei Bindungstypen mit ihrem ΔEN-Bereich.",
      a: "ΔEN < 0,4 → apolare kovalente Bindung · 0,4–1,7 → polare kovalente Bindung · > 1,7 → ionische Bindung." },

    { id: 11, topic: "Chemie",
      q: "Warum leiten feste Salze keinen Strom, gelöste aber schon?",
      a: "Im Festkörper sind Ionen fixiert. Im gelösten Zustand werden sie frei beweglich → Elektrolyt → elektrische Leitfähigkeit." },

    { id: 12, topic: "Chemie",
      q: "Was ist das Prinzip der metallischen Bindung?",
      a: "Atomrümpfe sind in einem delokalisierten Elektronensee eingebettet → hohe Duktilität, gute elektrische Leitfähigkeit." },

    { id: 13, topic: "Chemie",
      q: "Warum sind Halbmetalle Halbleiter?",
      a: "Bei Raumtemperatur sind Elektronen kaum beweglich. Bei höherer Temperatur werden sie frei → Leitfähigkeit steigt mit T." },

    { id: 14, topic: "Chemie",
      q: "Was kennzeichnet die kovalente Bindung? Was ist ein Homodimer?",
      a: "Stoffe teilen Elektronen, Bindung ist gerichtet. Homodimer = Molekül aus 2 gleichen Atomen (z.B. H₂, N₂, O₂, Cl₂)." },

    // ── Chemische Formeln ─────────────────────────────────────────
    { id: 15, topic: "Chemie",
      q: "Was ist der Unterschied zwischen Summenformel und Valenzstrichformel?",
      a: "Summenformel: zeigt nur Atomanzahl (z.B. H₂). Valenzstrichformel: zeigt alle Bindungen (z.B. H–H)." },

    { id: 16, topic: "Chemie",
      q: "Was sind die vier Ebenen der Stereochemie?",
      a: "Konstitution (Atome & Bindungen) · Konformation (Drehung um Einfachbindungen, z.B. cis/trans) · Konfiguration (räumliche Anordnung, kein Bindungsbruch möglich) · Chiralität (dreht Licht links/rechts, CIP-System)." },

    { id: 17, topic: "Chemie",
      q: "Was ist der Unterschied zwischen Konformation und Konfiguration?",
      a: "Konformation: Drehung um Einfachbindungen möglich (z.B. cis/trans bei Alkenen). Konfiguration: räumliche Anordnung nur durch Bindungsbruch änderbar." },

    // ── Reaktionen ────────────────────────────────────────────────
    { id: 18, topic: "Chemie",
      q: "Was sind Edukte und Produkte?",
      a: "Edukte = Ausgangsstoffe einer Reaktion. Produkte = entstehende Stoffe." },

    { id: 19, topic: "Chemie",
      q: "Welche Erhaltungssätze gelten bei chemischen Reaktionen?",
      a: "Massenerhaltung und Ladungserhaltung." },

    { id: 20, topic: "Chemie",
      q: "Was bedeutet Stöchiometrie?",
      a: "Berechnung von Stoffmengen für chemische Reaktionen anhand der molaren Verhältnisse in der Reaktionsgleichung." },

    { id: 21, topic: "Chemie",
      q: "Berechne: Wie viele Liter H₂ braucht man für 360 g H₂O? (2H₂ + O₂ → 2H₂O, Vm = 22,4 L/mol)",
      a: "M(H₂O) = 18 g/mol → 360 g ÷ 18 = 20 mol H₂O → stöchiometrisch 20 mol H₂ → 20 × 22,4 L = 448 L H₂." },

    // ── Gleichgewicht ─────────────────────────────────────────────
    { id: 22, topic: "Chemie",
      q: "Was ist der Unterschied zwischen Geschwindigkeitskonstante k und Reaktionsgeschwindigkeit v?",
      a: "k ist eine temperaturabhängige Konstante. v = −dc/dt ist die tatsächliche Reaktionsgeschwindigkeit, die sich mit der Konzentration ändert." },

    { id: 23, topic: "Chemie",
      q: "Was bedeutet ΔH < 0 und ΔH > 0?",
      a: "ΔH < 0 → exotherm (Wärme wird abgegeben). ΔH > 0 → endotherm (Wärme wird aufgenommen)." },

    { id: 24, topic: "Chemie",
      q: "Was ist die Gibbs-Helmholtz-Gleichung? Was bedeuten die Vorzeichen von ΔG?",
      a: "ΔG = ΔH − T·ΔS. ΔG < 0 → exergon (spontan). ΔG > 0 → endergon (benötigt Energie). ΔG = 0 → Gleichgewicht." },

    { id: 25, topic: "Chemie",
      q: "Was bewirken Katalysatoren thermodynamisch?",
      a: "Sie senken die Aktivierungsenergie Gᴬ, verändern aber ΔG nicht. Enzyme sind biologische Katalysatoren." },

    { id: 26, topic: "Chemie",
      q: "Wie lautet die Gleichgewichtskonstante K für: A + B ⇌ 2C + D?",
      a: "K = [C]² · [D] / ([A] · [B]). Katalysatoren und reine Feststoffe/Lösungsmittel werden nicht einbezogen." },

    { id: 27, topic: "Chemie",
      q: "Was bedeutet K >> 1 für eine Reaktion?",
      a: "Das Gleichgewicht liegt stark auf der Produktseite – die Reaktion ist nahezu irreversibel." },

    // ── Besondere Elemente und Moleküle ───────────────────────────
    { id: 28, topic: "Chemie",
      q: "Aus welchen Elementen besteht der menschliche Körper hauptsächlich?",
      a: "Ca. 65% O, 18% C, 10% H. ~60% des Körpers ist H₂O. Elemente < 0,01% = Spurenelemente (z.B. Fe, I, Zn)." },

    { id: 29, topic: "Chemie",
      q: "Was sind die wichtigsten Eigenschaften von H₂?",
      a: "Farb- und geruchlos, geschmacksneutral, leichter als Luft, explosiv bei Kontakt mit O₂ (Hindenburg-Katastrophe)." },

    { id: 30, topic: "Chemie",
      q: "Was sind die Eigenschaften von O₂? Was ist O₃?",
      a: "O₂: farb- und geruchlos, Oxidationsmittel, 21% der Atmosphäre. O₃ = Ozon (Schutzschicht). Autotrophe produzieren O₂, Aerobe verbrauchen es." },

    { id: 31, topic: "Chemie",
      q: "Warum ist H₂O amphiphoter?",
      a: "H₂O kann als Säure (gibt H⁺ ab → OH⁻) und als Base (nimmt H⁺ auf → H₃O⁺) wirken." },

    { id: 32, topic: "Chemie",
      q: "Warum löst Wasser polare Stoffe?",
      a: "H₂O ist durch Wasserstoffbrückenbindungen stark polar → löst polare Stoffe nach dem Prinzip 'similia similibus solvuntur' (z.B. Alkohole mit OH-Gruppe)." },

    { id: 33, topic: "Chemie",
      q: "Was ist die Rolle von Kohlenstoff in der Biologie?",
      a: "C ist Grundbaustein des Lebens, bildet bis zu 4 kovalente Bindungen, Basis der ¹⁴C-Datierung. Kohlensäure (H₂CO₃) ist eine schwache Säure und reguliert den Blut-pH." },

    { id: 34, topic: "Chemie",
      q: "Welche Rolle spielt N₂ in der Biologie und Atmosphäre?",
      a: "~78% der Atmosphäre, eigener Stickstoffkreislauf. Wichtig für Aminosäuren, DNA, RNA, ATP und Medikamente." },

    { id: 35, topic: "Chemie",
      q: "Nenne alle Halogene und ihre typischen Reaktionsprodukte.",
      a: "F, Cl, Br, I, At. Halogen + H → Halogenwasserstoffsäure (z.B. HCl). Halogen + Metall → Salz (z.B. NaCl)." },

    // ── Biologie Teil 1: Zellbiologie ────────────────────────────
    { id: 36, topic: "Biologie",
      q: "Welche Hauptaufgaben hat der Zellkern (Nucleus)?",
      a: "DNA-Transkription → mRNA. Umgeben von Doppellipidmembran. Enthält Nucleolus (→ rRNA-Herstellung). Euchromatin = aktive DNA, Heterochromatin = inaktive DNA → Chromosomen." },

    { id: 37, topic: "Biologie",
      q: "Was ist der Unterschied zwischen rauem und glattem Endoplasmatischen Retikulum?",
      a: "Raues ER: hat Ribosomen → Proteinsynthese (Sekretion, Faltung). Glattes ER (ohne Ribosomen): Lipidsynthese, Calciumspeicher und Entgiftung." },

    { id: 38, topic: "Biologie",
      q: "Was sind Ribosomen und wo befinden sie sich?",
      a: "Vorkommen: raues ER, Zytoplasma und Mitochondrien. Bestehen aus kleiner und großer Untereinheit (rRNA). Funktion: Translation von mRNA → Protein." },

    { id: 39, topic: "Biologie",
      q: "Was ist der Golgi-Apparat und was macht er?",
      a: "Hat cis- (ER-zugewandte) und trans-Seite. Glykosylierungszentrum der Zelle. Modifiziert, sortiert und verpackt Proteine vom ER für den Weitertransport." },

    { id: 40, topic: "Biologie",
      q: "Was sind Mitochondrien und woher stammen sie evolutionär?",
      a: "Kraftwerk der Zelle (ATP-Synthese), Doppellipidmembran. Entstammen laut Endosymbiontentheorie ursprünglich Prokaryoten. Nur maternale Mitochondrien werden vererbt." },

    { id: 41, topic: "Biologie",
      q: "Was sind die Unterschiede zwischen Lysosomen, Peroxisomen und Proteasomen?",
      a: "Alle sind Abbauorganellen ('MAD der Zelle'). Lysosomen (primär/sekundär/tertiär): bauen Fremdstoffe ab (Membran vorhanden). Proteasomen (keine Membran): bauen Proteine ab. Peroxisomen: bauen Lipide/Fettsäuren ab, enthalten H₂O₂." },

    { id: 42, topic: "Biologie",
      q: "Wie ist die Zellmembran aufgebaut und wie funktioniert Transport?",
      a: "Doppellipidmembran → Fluid Mosaic Modell. Hydrophob innen / hydrophil außen. Transport via Proteine (Ligand, Kanal, elektrisch), ATP oder Konzentrationsgradient. Uniport / Antiport / Symport. Exo-/Endozytose für große Moleküle." },

    { id: 43, topic: "Biologie",
      q: "Aus welchen drei Komponenten besteht das Zytoskelett?",
      a: "Mikrotubuli (→ Transport), Intermediäre Filamente (→ Stabilität), Aktinfilamente (→ Mobilität)." },

    { id: 44, topic: "Biologie",
      q: "Was sind Kinozilien, Geißeln und Mikrovilli?",
      a: "Spezialformen des Zytoskeletts. Kinozilien: Staubbewegung. Geißeln: Fortbewegung (Spermien). Mikrovilli: Oberflächen-/Nahrungsaufnahme (z.B. Darm). Aufbau: 9×2+2 Mikrotubuli (Kinozilien/Geißeln) bzw. 1 Mikrotubulusreihe (Mikrovilli)." },

    { id: 45, topic: "Biologie",
      q: "Welche Arten von Zell-Zell-Kontakten gibt es?",
      a: "Haftverbindungen (Desmosomen), Verschlusskontakte (Tight Junctions), Gap Junctions (direkter Stoffaustausch). Zell-ECM-Kontakte über Intermediärfilamente (Hemidesmosomen)." },

    // ── Biologie Teil 1: Embryologie ─────────────────────────────
    { id: 46, topic: "Biologie",
      q: "Was ist die Blastogenese und welche Schritte umfasst sie?",
      a: "Oozyte wird befruchtet → Zygote. Schritte: 1. Kapazitation, 2. Befruchtung, 3. Akrosomenreaktion, 4. Kortikale Reaktion → Befruchtungsmembran → Einnistung in Uterushöhle. Eizelle nur ~24h befruchtbar." },

    { id: 47, topic: "Biologie",
      q: "Wie entwickelt sich die Zygote in den ersten 5 Tagen nach der Befruchtung?",
      a: "1.–3. Tag: Zygote (totipotent). 3.–4. Tag: Morula (pluripotent). Ab 5. Tag: Blastozyste → Embryoblast + Trophoblast + Keimhöhle → Gastrulation (ab ~16. Tag)." },

    { id: 48, topic: "Biologie",
      q: "Was ist die Embryogenese und welche drei Keimblätter entstehen?",
      a: "Bis Ende 2. Woche zelluläre Phase. 3 Keimblätter aus der Gastrula: Ektoderm (→ Haut, Nervensystem), Mesoderm (→ Herz, Knochen, Muskeln), Endoderm (→ GI-Trakt, Lunge, Harnwege)." },

    { id: 49, topic: "Biologie",
      q: "Was ist die Fetogenese und wann ist der Fötus lebensfähig?",
      a: "17.–60. Tag: Embryo, dann Fötus. Reihenfolge der Entwicklung: Herz → Finger/Zehen → Magen/Darm → Geschlecht. 10. Woche: Bewegungen. 23. Woche: lebensfähig. 36. Woche: Kopf im Becken. 38. Woche: reif." },

    { id: 50, topic: "Biologie",
      q: "Was sind die Funktionen der Plazenta?",
      a: "Gasaustausch + Ernährung für den Fötus (~500g). Entsteht aus dem Trophoblasten. 1× Nabelvene (sauerstoffreich), 2× Nabelarterien (sauerstoffarm). Übernimmt Hormonproduktion ab Woche 10 (hCG, Östrogen, Progesteron). Bindet auch Bilirubin." },

    { id: 51, topic: "Biologie",
      q: "Welche physiologischen Veränderungen treten in der Schwangerschaft auf?",
      a: "Atem- und Herzfrequenz ↑, Lungenvolumen ↓, Gewicht ↑ (~12 kg). Blutvolumen ↑, Ödeme ↑, Brüste ↑. Nebenwirkungen: Übelkeit, Heißhunger, Müdigkeit, Stimmungsschwankungen." },

    // ── Biologie Teil 1: Mikroskopische Anatomie ─────────────────
    { id: 52, topic: "Biologie",
      q: "Was ist der Unterschied zwischen Apoptose und Nekrose?",
      a: "Apoptose = programmierter, physiologischer Zelltod (kontrolliert, keine Entzündung). Nekrose = pathologischer Zelltod durch äußere Einwirkung (unkontrolliert, mit Entzündung)." },

    { id: 53, topic: "Biologie",
      q: "Was sind die Eigenschaften von Epithelgewebe?",
      a: "Keine eigenen Blutgefäße → Versorgung durch Diffusion. Barrierefunktion. Untertypen: Oberflächenepithel (kleidet Hohlräume aus), Drüsenepithel (endokrin/exokrin), Sinnesepithel." },

    { id: 54, topic: "Biologie",
      q: "Was ist der Unterschied zwischen endokrinem und exokrinem Drüsenepithel?",
      a: "Endokrin = Sekretion direkt ins Blut (z.B. Hormone). Exokrin = Sekretion über Ausführungsgang nach außen (z.B. Schweiß, Verdauungsenzyme). Serös = wässrig, mukös = schleimig." },

    { id: 55, topic: "Biologie",
      q: "Welche drei Typen von Muskelgewebe gibt es?",
      a: "1. Glatte Muskulatur (Verdauung, Gefäße – unwillkürlich). 2. Herzmuskulatur (gestreift, unwillkürlich). 3. Skelettmuskulatur (gestreift, willkürlich). Kontraktion durch Aktin/Myosin-Interaktion." },

    { id: 56, topic: "Biologie",
      q: "Was sind die Bestandteile des Nervengewebes?",
      a: "Neuronen (nicht teilungsfähig): Dendriten (Eingang), Soma/Zellkörper (Kern), Axon (Ausgang). Gliazellen: Stütz- und Versorgungszellen (Astrozyten, Oligodendrozyten, Schwann-Zellen, Mikroglia)." },

    // ── Biologie Teil 1: Makroskopische Anatomie ─────────────────
    { id: 57, topic: "Biologie",
      q: "Was passiert im Magen? Welche Zellen produzieren was?",
      a: "Belegzellen → Magensäure (HCl): tötet Bakterien, aktiviert Pepsin, denaturiert Proteine. Hauptzellen → Pepsinogen (→ Pepsin): Proteinverdauung. Nebenzellen → Muzin: schützt Magenwand vor HCl." },

    { id: 58, topic: "Biologie",
      q: "Was passiert im Dünndarm?",
      a: "Größter Teil der Verdauung. Setzt Sekretin frei → stimuliert Pankreas exokrin. Im Duodenum münden Bauchspeicheldrüse und Gallenblase. Oberfläche vergrößert durch: Kerckringfalten → Zotten → Mikrovilli." },

    { id: 59, topic: "Biologie",
      q: "Was produziert die Leber und welche Funktionen hat sie?",
      a: "Leber produziert Galle (nicht die Gallenblase!), ~1,5 kg schwer. Funktionen: Glykogen-Speicher, Eiweiß- und Fettstoffwechsel, Vitamindepot, Entgiftung. Blut aus Magen/Darm über Pfortader → Leber." },

    { id: 60, topic: "Biologie",
      q: "Was sind die Funktionen von Pankreas und Gallenflüssigkeit?",
      a: "Pankreas: produziert Bicarbonat (→ HCl-Neutralisation) und Verdauungsenzyme (Proteine, Kohlenhydrate, Fette), ~1,5 L/Tag. Gallenflüssigkeit: enthält keine Enzyme, emulgiert Fette, stimuliert Pankreaslipase, wird im Ileum recycelt." },

    { id: 61, topic: "Biologie",
      q: "Was sind die grundlegenden Fakten über das Herz?",
      a: "300–350 g, 4% Eigenbedarf (über Herzkranzgefäße). Systole = Kontraktion, Diastole = Entspannung. 4–6 L Blut im Körper, 50–100 Schläge/min, Normaldruck 120/80 mmHg." },

    { id: 62, topic: "Biologie",
      q: "Wie verläuft die Erregungsleitung im Herz?",
      a: "Sinusknoten → AV-Knoten (Verzögerung!) → His-Bündel → Tawara-Schenkel → Purkinje-Fasern → Muskelzellen. AV-Knoten trennt Vorhof- und Kammeraktivität." },

    { id: 63, topic: "Biologie",
      q: "ACHTUNG: Was ist der Unterschied zwischen Arterie und arteriellem Blut?",
      a: "Arterie = Gefäß vom Herz weg (führt NICHT automatisch O₂-reiches Blut – z.B. Lungenarterie führt O₂-armes Blut!). Arterielles Blut = O₂-reiches Blut. Lungenvenen führen O₂-reiches Blut trotz 'Vene' im Namen." },

    { id: 64, topic: "Biologie",
      q: "Was sind primäre vs. sekundäre lymphatische Organe?",
      a: "Primär (Reifung): Thymus (T-Zellen) + Knochenmark (B-Zellen). Sekundär (Aktivierung): Milz, MALT (Schleimhäute), Lymphknoten. Milz kann entfernt werden → andere Organe übernehmen." },

    { id: 65, topic: "Biologie",
      q: "Wie ist die Zusammensetzung von Luft und was ändert sich beim Ausatmen?",
      a: "Einatmen: ~78% N₂, ~21% O₂, <1% CO₂. Ausatmen: O₂ ↓ auf ~16%, CO₂ ↑ auf ~4%." },

    { id: 66, topic: "Biologie",
      q: "Was sind die drei Schritte der Atemphysiologie?",
      a: "1. Ventilation (Atembewegung). 2. Perfusion (Durchblutung der Lunge). 3. Diffusion (Gasaustausch in Alveolen). ~500 mL pro Atemzug, ~10–15 Atemzüge/min. Lungen-/Rippenfell = Pleura." },

    // ── Biologie Teil 2: Nerven & Gehirn ─────────────────────────
    { id: 67, topic: "Biologie",
      q: "Wie entsteht das Ruhepotential einer Nervenzelle?",
      a: "3× Na⁺ raus, 2× K⁺ rein (Na⁺/K⁺-ATPase) + K⁺-Leckagestrom über offene Kanäle → −70 bis −90 mV. Zelle ist im Ruhezustand innen negativ geladen." },

    { id: 68, topic: "Biologie",
      q: "Was ist der Schwellenwert des Aktionspotentials?",
      a: "−50 mV. Wird dieser Wert überschritten, löst die Zelle ein Aktionspotential aus (Alles-oder-nichts-Prinzip). Na⁺-Kanäle öffnen → schnelle Depolarisation → Repolarisation durch K⁺-Ausstrom." },

    { id: 69, topic: "Biologie",
      q: "Was ist die Blut-Hirn-Schranke und woraus besteht sie?",
      a: "Selektive Barriere zwischen Blutkreislauf und ZNS. Aufbau: Endothelzellen (mit Tight Junctions) – Basalmembran – Astrozytenendfüße." },

    { id: 70, topic: "Biologie",
      q: "Was bedeutet afferent vs. efferent im Nervensystem?",
      a: "Afferent = sensorisch: Reize vom Körper zum Gehirn. Efferent = motorisch: Signale vom Gehirn zum Körper. Gehirn wiegt ~1,5 kg." },

    // ── Biologie Teil 2: Sinnesorgane ─────────────────────────────
    { id: 71, topic: "Biologie",
      q: "Wie ist das Auge in drei Schichten gegliedert?",
      a: "Äußere Augenhaut: Binde-, Horn- und Lederhaut. Mittlere Augenhaut (Uvea): Iris, Ziliarkörper, Aderhaut. Innere Augenhaut: Retina (Netzhaut) mit Stäbchen (Helligkeit) und Zapfen (Farbe)." },

    { id: 72, topic: "Biologie",
      q: "Was bewirkt die Kontraktion des Ziliarmuskels?",
      a: "Kontraktion → Erschlaffung der Zonulafasern → Linse wird dicker (stärkere Brechung) → Nahsicht (Akkommodation). Entspannung des Ziliarmuskels → Linse flacher → Fernsicht." },

    { id: 73, topic: "Biologie",
      q: "Wie ist das Ohr aufgebaut (Außen-, Mittel-, Innenohr)?",
      a: "Außenohr: Ohrmuschel, Gehörgang. Mittelohr: Trommelfell, 3 Gehörknöchelchen (Hammer–Amboss–Steigbügel), Eustachische Röhre. Innenohr: Cochlea (Hören), Vestibularorgan (3 Bogengänge + Makulaorgan = Gleichgewicht)." },

    { id: 74, topic: "Biologie",
      q: "Welche vier Hautrezeptoren gibt es und was nehmen sie wahr?",
      a: "Meissner-Körperchen: Berührung/Bewegung. Pacini-Körperchen: Vibration/Druck. Ruffini-Körperchen: Dehnung/Wärme. Merkel-Scheiben: Druck/Intensität (statisch)." },

    // ── Biologie Teil 2: Haut ────────────────────────────────────
    { id: 75, topic: "Biologie",
      q: "Was sind die Grundfakten zur Haut?",
      a: "pH 5,5. Fläche 1,5–2 m². Gewicht 3–5 kg → schwertstes Organ des Körpers. Funktionen: Schutz, Vitamin-D-Synthese, Temperaturregulation, Sinneswahrnehmung." },

    { id: 76, topic: "Biologie",
      q: "Wie ist die Haut in drei Schichten aufgebaut?",
      a: "Epidermis (Oberhaut): Photoprotektionssystem (Melanin). Dermis (Lederhaut): Thermoregulation (Talg- und Schweißdrüsen). Subkutis (Unterhaut): Fettspeicher, Stoßdämpfer." },

    { id: 77, topic: "Biologie",
      q: "Aus welchen Schichten besteht die Epidermis von innen nach außen?",
      a: "Basalzellschicht → Stachelzellschicht → Körnerzellschicht → Glanzschicht (nur Leishaut) → Hornschicht. 90% der Zellen sind Keratinozyten." },

    // ── Biologie Teil 2: Hormone ─────────────────────────────────
    { id: 78, topic: "Biologie",
      q: "Wie unterscheiden sich lipophile von hydrophilen Hormonen?",
      a: "Lipophile (Steroide): brauchen Carrier-Protein im Blut, diffundieren durch Zell- und Kernmembran, wirken auf DNA. Hydrophile (Peptide, Aminosäurederivate): wasserlöslich, Rezeptor in Zellmembran → Second-Messenger (cAMP, IP3)." },

    { id: 79, topic: "Biologie",
      q: "Was macht Insulin und was unterscheidet Diabetes Typ I von Typ II?",
      a: "Insulin: senkt Blutzucker durch Förderung der Glukoseaufnahme in Zellen. Typ I: autoimmune Zerstörung der β-Zellen → keine Insulinproduktion. Typ II: Insulinresistenz der Zellen → keine ausreichende Aufnahme." },

    { id: 80, topic: "Biologie",
      q: "Was sind die Wirkungen von Cortisol und Katecholaminen?",
      a: "Cortisol (Nebennierenrinde): Blutzucker ↑, Entzündung ↓, Immunsystem ↓, unterliegt zirkadianem Rhythmus. Katecholamine (Adrenalin/Noradrenalin): Fight-or-Flight, Blutzucker ↑, Herzfrequenz ↑." },

    { id: 81, topic: "Biologie",
      q: "Was sind die Funktionen von Prolactin, GH, Oxytocin und ADH?",
      a: "Prolactin: Milchproduktion ↑, gehemmt durch Dopamin. Growth Hormone (Somatotropin): Wachstum ↑, anabole Wirkung. Oxytocin: Uteruskontraktion (Geburt), Milchausschuss. ADH/Vasopressin: Wasserrückresorption in Niere → reguliert Osmolarität." },

    { id: 82, topic: "Biologie",
      q: "Wie wird der Calcium-Haushalt hormonal reguliert?",
      a: "Parathormon (PTH, Nebenschilddrüse): Ca²⁺ ↑ (Knochenabbau, Nierenrückresorption). Calcitonin (Schilddrüse): Ca²⁺ ↓. Calcitriol (Vitamin D aktiv): Ca²⁺-Resorption im Darm ↑." },

    // ── Biologie Teil 2: Immunsystem ─────────────────────────────
    { id: 83, topic: "Biologie",
      q: "Was ist der Unterschied zwischen humoralem und zellulärem Immunsystem?",
      a: "Humoral = wasserlöslich: Antikörper im Blut (B-Zellen/Plasmazellen). Zellulär = zellbasiert: T-Zellen, NK-Zellen (direkte Zellkontakte). Beide können spezifisch oder unspezifisch sein." },

    { id: 84, topic: "Biologie",
      q: "Was sind die Zellen des unspezifischen Immunsystems?",
      a: "Neutrophile, Eosinophile, Basophile Granulozyten. Monozyten/Makrophagen (→ Phagozytose). Mastzellen (→ Allergie/Histamin). Natürliche Killerzellen (NK). Komplementsystem (Proteine)." },

    { id: 85, topic: "Biologie",
      q: "Was sind die Zellen des spezifischen Immunsystems?",
      a: "B-Lymphozyten → Plasmazellen (Antikörper) + Gedächtniszellen. T-Lymphozyten → T-Helferzellen (CD4) / Zytotoxische T-Zellen (CD8). T-Zellen reifen im Thymus (positive + negative Selektion: körpereigen vs. körperfremd)." },

    // ── Biologie Teil 2: Niere & Harnwege ───────────────────────
    { id: 86, topic: "Biologie",
      q: "Was sind die Hauptfunktionen der Niere?",
      a: "H₂O-, Elektrolyt- und Säure-Basen-Regulation. Ausscheidung von Stoffwechselendprodukten (Harnstoff, Kreatinin). Produktion von Erythropoetin (EPO) und Renin." },

    { id: 87, topic: "Biologie",
      q: "Wie ist die Niere anatomisch aufgebaut und was ist die GFR?",
      a: "Rinde → Mark → Kelche → Becken → Harnleiter (3 Engstellen!). 1 Mio. Nephrone pro Niere: Glomerulus + Bowman-Kapsel → Tubulussystem. GFR (glomeruläre Filtrationsrate): ~120 mL/min Primärharn. Niere ist bestdurchblutetes Organ: 1200 mL/min bei 200 g." },

    { id: 88, topic: "Biologie",
      q: "Wie regulieren Herz und Niere den Blutdruck?",
      a: "Vasodilatation: ANP (Atriales Natriuretisches Peptid). Vasokonstriktion: RAAS (Renin-Angiotensin-Aldosteron-System). EPO (Erythropoetin) → stimuliert Blutbildung im Knochenmark." },

    // ── Biologie Teil 2: Geschlechtsorgane ──────────────────────
    { id: 89, topic: "Biologie",
      q: "Wie werden Spermien produziert und wo reifen sie?",
      a: "Produktion in Hoden (Samenkanälchen). Reifung und Lagerung im Nebenhoden (Kopf–Körper–Schwanz). Testosteron wird in Leydig-Zellen produziert. Spermium: Kopf (mit Akrosom) – Mittelstück (Mitochondrien) – Schwanzgeißel." },

    { id: 90, topic: "Biologie",
      q: "Was ist der Unterschied zwischen Spermatogenese und Spermiogenese?",
      a: "Spermatogenese (~80 Tage): Spermatogonien → Spermatozyte 1. Ordnung (diploid) → Meiose I → Spermatozyte 2. Ordnung → Meiose II → Spermatiden. Spermiogenese: Differenzierung/Reifung der Spermatiden zu funktionsfähigen Spermien." },

    { id: 91, topic: "Biologie",
      q: "Wie ist der weibliche Zyklus aufgebaut?",
      a: "Menstruationsphase (1–4) → Proliferationsphase (5–14, Östrogen↑, FSH stimuliert Follikelwachstum) → Ovulation (LH-Peak, Tag 14) → Sekretionsphase/Lutealphase (15–28, Progesteron↑, Gelbkörper) → Ischämiephase (28)." },

    { id: 92, topic: "Biologie",
      q: "Was ist die Oogenese?",
      a: "Oogonien → Oozyten 1. Ordnung (Meiose I beginnt, Arrest in Prophase I = Diktyotän). Ab Pubertät: monatlich ein Follikel reift → Ovulation (Meiose II beginnt). Nach Befruchtung: Meiose II abgeschlossen → reife Eizelle + Polkörperchen." },

    // ── Biologie Teil 2: Genetik & Vererbungslehre ───────────────
    { id: 93, topic: "Biologie",
      q: "Wie ist die DNA hierarchisch organisiert?",
      a: "Nukleotide → Basenpaare (A-T, C-G) → Gene → Gencluster → Chromosom (p- und q-Arm, Zentromer) → Genom. Beim Menschen: ~23 Chromosomenpaare, ~46 Chromosomen, ~20.000–25.000 Gene." },

    { id: 94, topic: "Biologie",
      q: "Was sind Gonosomen, Autosomen und Telomere?",
      a: "Gonosomen: Geschlechtschromosomen (X, Y). Autosomen: restliche 22 Chromosomenpaare. Telomere: Schutzkappen an den Enden der Chromosomen, verkürzen sich bei jeder Zellteilung → begrenzen maximale Zellteilungsanzahl." },

    { id: 95, topic: "Biologie",
      q: "Was sind die Phasen des Zellzyklus?",
      a: "Interphase: G₁ (Wachstum) → S (DNA-Replikation) → G₂ (Vorbereitung). M-Phase: Mitose (Kernteilung) + Zytokinese (Zellteilung). G₀ = Ruhephase (ausdifferenzierte Zellen)." },

    { id: 96, topic: "Biologie",
      q: "Beschreibe die 5 Phasen der Mitose.",
      a: "Pro-: Kondensierung, Zentriolen zu Polen, Nucleolus löst sich auf. Prometa-: Spindelapparat bildet sich, Kernhülle löst sich auf. Meta-: Chromosomen in Metaphasenplatte. Ana-: Trennung der Chromatiden, Bewegung zu Polen. Telo-: Kernhülle/Nucleolus neu, Dekondensierung → Zytokinese." },

    // ── Biologie Teil 3: Meiose & Vererbung ──────────────────────
    { id: 97, topic: "Biologie",
      q: "Was passiert in Meiose I vs. Meiose II?",
      a: "Meiose I (Reduktionsteilung): Crossing Over in Prophase I (Lepto-/Zygo-/Pachy-/Diploten), dann Trennung homologer Chromosomen → 2 haploide Tochterzellen. Meiose II (analog Mitose): Trennung der Schwesterchromatiden → 4 haploide Zellen (Gameten)." },

    { id: 98, topic: "Biologie",
      q: "Was sind Allele, Genotyp und Phänotyp?",
      a: "Allel = alternative Variante eines Gens. Genotyp = Gesamtheit aller Allele eines Organismus. Phänotyp = sichtbare Ausprägung (bestimmt durch Genotyp + Umwelt). Homozygot = identische Allele (AA/aa), Heterozygot = verschiedene (Aa)." },

    { id: 99, topic: "Biologie",
      q: "Was besagen die Mendel'schen Regeln?",
      a: "1. Regel (Uniformität): F1-Nachkommen zweier reinerbiger Eltern sind einheitlich (Aa). 2. Regel (Spaltung): F2-Generation spaltet im Verhältnis 1:2:1 (AA:Aa:aa) → Phänotyp 3:1 bei Dominanz." },

    { id: 100, topic: "Biologie",
      q: "Was ist der Unterschied zwischen autosomal-dominant, autosomal-rezessiv und X-chromosomal rezessiv?",
      a: "Autosomal-dominant: ein krankes Allel reicht → häufig krank. Autosomal-rezessiv: beide Allele müssen krank sein → oft Träger. X-chromosomal rezessiv: Mutter als Trägerin, Söhne zu 50% krank (z.B. Farbenblindheit, Hämophilie). Y-chromosomal: kaum bekannte Erbkrankheiten." },

    // ── Biologie Teil 3: Mutationen ──────────────────────────────
    { id: 101, topic: "Biologie",
      q: "Was ist der Unterschied zwischen Keimbahn- und somatischer Mutation?",
      a: "Keimbahnmutation (an Gameten): wird an Nachkommen vererbt. Somatische Mutation (an Körperzellen): nicht vererbbar, kann zu Krebs führen." },

    { id: 102, topic: "Biologie",
      q: "Welche Arten von Genmutationen gibt es?",
      a: "Substitution (ein Nukleotid ersetzt): Transition (Purin↔Purin oder Pyrimidin↔Pyrimidin) oder Transversion (Purin↔Pyrimidin). Deletion (Verlust) oder Insertion (Einfügung) → Frameshift-Mutation verändert gesamten Leserahmen." },

    { id: 103, topic: "Biologie",
      q: "Was sind Chromosommutationen und Genommutationen?",
      a: "Chromosommutationen: strukturelle Veränderungen (Deletion, Inversion, Duplikation, Translokation). Genommutationen: Veränderung der Chromosomenzahl (Monosomie = −1, Trisomie = +1, z.B. Down-Syndrom = Trisomie 21). Häufiger bei älteren Müttern." },

    // ── Biologie Teil 3: Molekulare Genetik ──────────────────────
    { id: 104, topic: "Biologie",
      q: "Wie ist die DNA strukturell aufgebaut?",
      a: "Doppelhelix (rechtsdrehend). Basenpaare + Desoxyribose + Phosphatgruppe. C-G: 3 Wasserstoffbrücken (stabiler). A-T: 2 Wasserstoffbrücken. Stränge antiparallel (5'→3' / 3'→5'). 10 Basenpaare pro Windung." },

    { id: 105, topic: "Biologie",
      q: "Wie läuft die DNA-Replikation ab?",
      a: "Semikonservativ, in der S-Phase. Topoisomerase → entspiralisiert. Helicase → trennt Stränge. SSB-Proteine → halten offen. Primase → RNA-Primer. DNA-Pol III → synthetisiert 5'→3'. Folgestrang: diskontinuierlich (Okazaki-Fragmente). DNA-Pol I → entfernt Primer. Ligase → verbindet. Telomere verkürzen sich → Hayflick-Limit." },

    { id: 106, topic: "Biologie",
      q: "Was bedeutet es, dass Eukaryoten-Chromosomen zu ~95% nicht aus Genen bestehen?",
      a: "Nur ~5% ist proteinkodierend (Exons). Introns = nicht-kodierende Abschnitte innerhalb von Genen (werden herausgespleißt). Intergene DNA = Regulation, Struktur, nicht-kodierende RNAs." },

    // ── Biologie Teil 3: Evolution & Entstehung des Lebens ───────
    { id: 107, topic: "Biologie",
      q: "Was zeigt das Miller-Urey-Experiment?",
      a: "Aus anorganischen Molekülen (Ursuppe: H₂O, CH₄, NH₃, H₂ – kein O₂) entstehen organische Stoffe (Aminosäuren) → experimenteller Beleg für die chemische Evolution." },

    { id: 108, topic: "Biologie",
      q: "Wie verlief die Evolution vom Molekül zur Zelle?",
      a: "RNA-Welt → Lipidmembran um Moleküle → Protocellen → Phagozytose primitiver Bakterien → Prokaryoten → Endosymbiontentheorie → Eukaryoten. Chemotrophe (chemische Energie) und Phototrophe (Lichtenergie)." },

    { id: 109, topic: "Biologie",
      q: "Was besagt die Evolutionstheorie (Darwin, 1859)?",
      a: "Natürliche Selektion: Überleben und Reproduktion der am besten Angepassten. Neue Arten durch: a) Allopatrische Artbildung (geographische Isolation), b) Sympatrische Artbildung (Fortpflanzungsschranken ohne Isolation)." },

    { id: 110, topic: "Biologie",
      q: "Was besagt das Hardy-Weinberg-Gesetz?",
      a: "Allelfrequenzen einer Population sind konstant wenn: große Population, keine Mutationen, zufällige Paarung, keine Selektion, kein Genfluss. Formel: p² + 2pq + q² = 1." },

    // ── Biologie Teil 3: Ökologie ────────────────────────────────
    { id: 111, topic: "Biologie",
      q: "Was ist der Unterschied zwischen Symbiose, Parasitismus und Kommensalismus?",
      a: "Symbiose (+/+): beide profitieren (z.B. Wurzelbakterien/Pflanze). Parasitismus (+/−): einer profitiert, einer wird geschädigt (z.B. Bandwurm). Kommensalismus (+/0): einer profitiert, dem anderen egal (z.B. Schakale beim Löwen)." },

    { id: 112, topic: "Biologie",
      q: "Was sind biotische vs. abiotische Einflussfaktoren in einem Ökosystem?",
      a: "Biotisch = durch Lebewesen (Konkurrenz, Prädation, Symbiose, Parasitismus). Abiotisch = durch Umwelt (Temperatur, Licht, Wasser, pH, Bodenbeschaffenheit)." },

    { id: 113, topic: "Biologie",
      q: "Wie funktioniert die Nahrungskette?",
      a: "Sonne → Primärproduzenten (Pflanzen/Algen) → Primärkonsumenten (Herbivore) → Sekundärkonsumenten (Carnivore) → Detritus (tote Biomasse) → Destruenten (Pilze, Bakterien). Energieverlust ~90% pro Stufe." },

    // ── Biologie Teil 3: Immunbiologie ───────────────────────────
    { id: 114, topic: "Biologie",
      q: "Was sind Antikörper und wie sind sie aufgebaut?",
      a: "Immunglobuline (Ig) – Y-förmige Glykoproteine aus 2 schweren + 2 leichten Ketten. Variable Region (Fab): Antigenbindung. Konstante Region (Fc): Effektorfunktion. Produziert von Plasmazellen (ausdifferenzierte B-Lymphozyten)." },

    { id: 115, topic: "Biologie",
      q: "Welche 5 Immunglobulin-Klassen gibt es? (Merkspruch: GAMED)",
      a: "IgG: häufigster AK, plazentagängig, Langzeitschutz. IgA: Schleimhäute (Sekret-AK). IgM: erster AK bei Primärantwort, Pentamer. IgE: Allergie/Parasitenabwehr. IgD: Reifung von B-Zellen." },

    { id: 116, topic: "Biologie",
      q: "Was ist der Unterschied zwischen aktiver und passiver Impfung?",
      a: "Aktiv: Antigen wird verabreicht → Körper bildet eigene Antikörper + Gedächtniszellen → langanhaltend (Wochen bis Monate). Passiv: fertige Antikörper werden verabreicht → sofortige Wirkung, aber kurzlebig (Wochen)." },

    { id: 117, topic: "Biologie",
      q: "Wie funktioniert das ABO-Blutgruppensystem?",
      a: "Glykoproteine auf Erythrozyten. Blutgruppe A: Antigen A + Anti-B-AK (~40%). B: Antigen B + Anti-A-AK (~15%). AB: Antigen A+B, keine AK (~5%) → Universalempfänger. 0: kein Antigen, Anti-A+B-AK (~40%) → Universalspender (Erythrozyten)." },

    { id: 118, topic: "Biologie",
      q: "Was ist der Rhesusfaktor und welche klinische Bedeutung hat er?",
      a: "D-Antigen auf Erythrozyten. Rh⁺ (85%): D-Antigen vorhanden. Rh⁻ (15%): nicht vorhanden. Rh⁻ Mutter + Rh⁺ Kind: nach erster Geburt Sensibilisierung → 2. Schwangerschaft: Anti-D-AK schädigen Fötus → Anti-D-Prophylaxe!" },

    { id: 119, topic: "Biologie",
      q: "Was ist Crossing Over und warum ist es wichtig?",
      a: "Austausch von Gensegmenten zwischen homologen Chromosomen während Prophase I der Meiose (Pachytän-Stadium). Erhöht genetische Vielfalt. Erzeugt neue Allel-Kombinationen → wichtig für Evolution." },


    // ── Chemie Teil 2: Säuren, Basen, Redox, Organik, Naturstoffe ──────
    { id: 120, topic: "Chemie",
      q: 'Was ist die Autoprotoloyse des Wassers und was folgt daraus für pH + pOH?',
      a: 'H₂O + H₂O → H₃O⁺ + OH⁻. Da H₂O in großer Menge konstant: K = [H₃O⁺] × [OH⁻]. Je 10⁻⁷ mol/L H₃O⁺ und OH⁻ → pK = pH + pOH = 14.' },

    { id: 121, topic: "Chemie",
      q: 'Was ist der Unterschied zwischen Brønsted- und Lewis-Definition von Säure/Base?',
      a: 'Brønsted: Säure = Protonendonator, Base = Protonenakzeptor. Lewis: Säure = e⁻-Paar-Akzeptor, Base = e⁻-Paar-Donator.' },

    { id: 122, topic: "Chemie",
      q: 'Was bestimmt die Stärke einer Säure strukturell?',
      a: 'Je höher die Elektronegativität des Atoms in der Mitte und mehr O → desto stärker die Säure. z.B. Phosphorsäure H₃PO₄, Salzsäure HCl. Stoffe, bei denen Wasser sowohl H₃O⁺ als auch OH⁻ bildet = Ampholyte.' },

    { id: 123, topic: "Chemie",
      q: 'Wie berechnet man den pH starker vs. schwacher Säuren?',
      a: 'Starke Säure: pH = −log₁₀[Säure]. Schwache Säure: pH = ½(pKs − log₁₀[Säure]). pKs = Säurekonstante: <4 = stark, >4 = schwach. pKb analog für Basen.' },

    { id: 124, topic: "Chemie",
      q: 'Was ist Neutralisation und was sind Mineralsäuren?',
      a: 'Neutralisation: Säure + Base → H₂O + Salz (z.B. HCl + NaOH → NaCl + H₂O). Mineralsäuren: Salz-, Schwefel- und Salpetersäure (→ Magenp>sauer/Regen, Löslichkeit).' },

    { id: 125, topic: "Chemie",
      q: 'Was sind Salze und wie werden sie benannt?',
      a: 'Salze = Ionenbindung zwischen Kationen und Anionen (L = Kationen·Anionen). Nitrate/Nitrite (NO₃⁻/NO₂⁻) → Basis N → Salpetersäure. Sulfate/Sulfite/Sulfid (SO₄²⁻/SO₃²⁻/S²⁻) → Basis S → Schwefelsäure.' },

    { id: 126, topic: "Chemie",
      q: 'Was bedeutet Oxidation und Reduktion?',
      a: 'Reduktion = e⁻-Aufnahme. Oxidation = e⁻-Abgabe (Oxidationszahl ↑). Achtung bei Molekülen: bei e⁻-Sharing wird e⁻ dem elektronegativeren zugeordnet. ΣOxidationszahlen = Ladung Molekül.' },

    { id: 127, topic: "Chemie",
      q: 'Was ist die elektrochemische Spannungsreihe?',
      a: 'Sortierung nach Reduktionsfreudigkeit. (Edle) Alkalimetalle = gute Reduktionsmittel (werden leicht oxidiert). Halogene = gute Oxidationsmittel (werden leicht reduziert). Vice versa.' },

    { id: 128, topic: "Chemie",
      q: 'Was ist eine galvanische Zelle und wo ist Anode/Kathode?',
      a: 'Redox-Reaktion + Salzbrücke = galvanische Zelle (Stromzelle). Ort der Oxidation = Anode = −Pol. (Bei Elektrolyse ist es umgekehrt!)' },

    { id: 129, topic: "Chemie",
      q: 'Was sind Alkane, Alkene und Alkine und ihre Formeln?',
      a: 'Kohlenwasserstoffe bestehen nur aus C und H → geringe e⁻-Negativität. Alkane: 1-fach Bindung, CₙH₂ₙ₊₂ (Methan, Ethan, Propan, Butan…), Siedepunkt ↑ mit Kettenlänge. Cycloalkane: CₙHₙ. Alkene: 2-fach Bindung, CₙH₂ₙ₋₂ (C=C), kumuliert/konjugiert/isoliert. Alkine: 3-fach Bindung (C≡C), CₙH₂ₙ₋₂, ungesättigt.' },

    { id: 130, topic: "Chemie",
      q: 'Was sind funktionelle Gruppen mit O und was machen sie?',
      a: '−OH: Alkohole (primär/sekundär/tertiär; ein-/zwei-/dreiwertig; amphoter). C−O−C: Ether (aus −OH + −OH → H₂O + Ether). C=O: Carbonylgruppe (Aldehyd −al, Keton −on). COOH: Carboxylgruppe (Säuren → Alkanname + -säure, enthält Hydroxy-).' },

    { id: 131, topic: "Chemie",
      q: 'Was sind Thiol-Gruppen und Disulfidbrücken?',
      a: 'Gruppen mit S: wie O, aber weniger e⁻-negativ → Siedepunkt ↓, viel Energie gespeichert. Thiole analog Alkohole; Thioether, Thioester. 2× Thiol → Disulfidbrücke (kovalent, sehr stark, wichtig für Mensch z.B. Proteinstruktur).' },

    { id: 132, topic: "Chemie",
      q: 'Was sind Amine und wie unterscheiden sie sich von Alkoholen?',
      a: 'Gruppen mit N leiten sich von Ammoniak ab → Amine. Primär = N + 1×C, Sekundär = N + 2×C. Achtung: anders als bei −OH! (Primär/Sekundär bezieht sich auf die Anzahl der C-Substituenten am N, nicht am Kohlenstoff.)' },

    { id: 133, topic: "Chemie",
      q: 'Wie sind Kohlenhydrate aufgebaut und welche Disaccharide sind wichtig?',
      a: 'Formel: Cₙ(H₂O)ₙ. Als Mono-, Di- und Polysaccharide (Zucker). Unterscheidung durch Kettenlänge → wichtig: Ribose (5C) und Glucose (6C). Wichtige Disaccharide: Lactose (Gala+Gluc), Maltose (Gluc+Gluc), Saccharose (Gluc+Fruct).' },

    { id: 134, topic: "Chemie",
      q: 'Wie sind Aminosäuren und Proteine aufgebaut?',
      a: 'Aminosäuren bestehen aus Carboxylgruppe (COOH) und Aminogruppe (NH₂). 8 essentielle AS → Aufnahme durch Nahrung nötig. Bindung über Amid-/Peptidbindung → Peptide → Proteine. Proteine haben Primär- (Sequenz), Sekundär- (α-Helix, β-Faltblatt), Tertiär- (3D-Struktur) und Quartärstruktur (Domänen).' },

    { id: 135, topic: "Chemie",
      q: 'Was sind Lipide und Fettsäuren?',
      a: 'Lipide sind hydrophob, vom Organismus hergestellt, 7 Gruppen u.a. Fettsäuren. Fettsäuren sind amphiphil → COOH polar, CH-Kette unpolar. Gesättigt = keine Doppelbindung, sonst ungesättigt. ω3-Fettsäure = Doppelbindung am 3. und 4. C vom Kettenende. Fettsäuren nicht frei im Körper → in Glycerin gespeichert.' },

    { id: 136, topic: "Chemie",
      q: 'Wie sind Nukleinsäuren aufgebaut (Nukleotid → DNA)?',
      a: 'Nukleinbase → Nukleosin → Nukleotid → Nukleinsäure. Pyrimidin-Basen: C, T, U. Purin-Basen: A, G. Base + Zucker (Ribose) = Nukleosin. RNA vs. DNA → 2-Desoxyribose. Nukleosin + Phosphorsäure = Nukleotid (Esterbindung mit Zucker). Mehrere Nukleotide = Strang; mittels H-Brücken zum Doppelstrang (→ 2 A-T, 3 C-G).' },

    { id: 137, topic: "Chemie",
      q: 'Welche fettlöslichen Vitamine gibt es und was machen sie?',
      a: 'Fettlöslich: A, D, E, K. A = Retinol → Sehen. D = Cholecalciferol → Knochen, aktiv als D₃, Knochenbildung über Haut. E = Tocopherol → gegen freie Radikale, Antioxidans. K = Phyllochinon → Blutgerinnung.' },

    { id: 138, topic: "Chemie",
      q: 'Welche wasserlöslichen Vitamine gibt es und was machen sie?',
      a: 'C = Ascorbinsäure → Skorbut, Antioxidans. B₁ = Thiamin → Enzym. B₂ = Riboflavin → Stoffwechsel. B₃ = Niacin → Cofaktor. B₅ = Pantothensäure → Coenzym. B₆ = Pyridoxalphosphat (PALP) → wichtiger Cofaktor. B₇/H = Biotin → Stoffwechsel, Epigenetik. B₉ = Folsäure → Methylierung (Nukleinsäuren!). B₁₂ = Cobalamin → Blut, Nerven; in tierischen Produkten.' },

    // ── Biologie Ergänzung (ÖH Bioskript 2022) ───────────────────
    { id: 139, topic: "Biologie",
      q: 'Was sind die Hauptunterschiede zwischen Prokaryoten und Eukaryoten?',
      a: 'Eukaryoten (Tiere, Pflanzen, Pilze): Zellkern vorhanden, Ribosomen 80S (40S+60S), 10–50μm, Zellwand nur bei Pflanzen. Prokaryoten (Bakterien, Archaeen): kein Zellkern, Ribosomen 70S (30S+50S), 1–20μm, Zellwand vorhanden, Genom frei im Zytosol + Plasmide möglich.' },

    { id: 140, topic: "Biologie",
      q: 'Warum sind Prokaryoten anfälliger für Mutationen als Eukaryoten?',
      a: 'Eukaryoten haben ~90% nicht-kodierende DNA → schützt die 10% kodierenden Abschnitte. Prokaryoten haben nur ~15% nicht-kodierende DNA → kleineres, aber anfälligeres Genom.' },

    { id: 141, topic: "Biologie",
      q: 'Sind Viren Lebewesen? Begründung?',
      a: 'Nein. Viren besitzen keinen eigenen Stoffwechsel – das ist das entscheidende Ausschlusskriterium. Sie sind vollständig auf Wirtszellen angewiesen.' },

    { id: 142, topic: "Biologie",
      q: 'Was unterscheidet Pflanzenzellen von tierischen Zellen?',
      a: 'Pflanzenzellen haben zusätzlich: Zellwand (Zellulose, semipermeabel), Vakuolen (Turgor, Giftstoffe, Wasseraufnahme) und Chloroplasten (Photosynthese, eigene Doppelmembran + DNA = Plastom). Tierische Zellen haben keines davon.' },

    { id: 143, topic: "Biologie",
      q: 'Was ist die Photosynthese-Gleichung und wo findet sie statt?',
      a: '6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂. Findet in Chloroplasten statt: Thylakoidmembranen = Lichtreaktion, Stroma = Dunkelreaktion (Calvin-Zyklus). Chlorophyll = grüner Farbstoff, absorbiert Lichtenergie.' },

    { id: 144, topic: "Biologie",
      q: 'Was ist Turgor und warum brauchen Pflanzen eine Zellwand?',
      a: 'Turgor = innerer Zelldruck durch osmotische Wasseraufnahme in Vakuolen. Die Zellwand verhindert das Platzen der Zelle. Tierische Zellen ohne Zellwand platzen bei Überwässerung (Hämolyse).' },

    { id: 145, topic: "Biologie",
      q: 'Was ist der Unterschied zwischen Transkription und Translation?',
      a: 'Transkription: DNA → mRNA (im Zellkern, durch RNA-Polymerase). Translation: mRNA → Protein (am Ribosom im Zytoplasma). Die DNA verlässt den Zellkern nie – nur die mRNA wird hinaustransportiert.' },

    { id: 146, topic: "Biologie",
      q: 'Welche Schritte umfasst die Transkription bei Eukaryoten?',
      a: '1. RNA-Polymerase bindet an Promoter. 2. DNA → prä-mRNA. 3. Prozessierung: 5\'-Kappe + Poly-A-Schwanz. 4. Splicing: Introns herausgeschnitten, Exons zusammengefügt. 5. Reife mRNA verlässt Kern durch Kernporen.' },

    { id: 147, topic: "Biologie",
      q: 'Wie läuft die Translation (Proteinsynthese) ab?',
      a: 'mRNA bindet an kleine Untereinheit (40S) → große Untereinheit (60S) → 80S-Ribosom. tRNA bringt Aminosäuren passend zum Codon. Ribosom: A-Stelle (neu), P-Stelle (wächst), E-Stelle (verlässt). Peptidkette wächst N→C-terminal.' },

    { id: 148, topic: "Biologie",
      q: 'Welche RNA-Typen gibt es und was machen sie?',
      a: 'mRNA: trägt genetische Info vom Kern zum Ribosom. tRNA: bringt Aminosäuren, erkennt Codons über Anticodon. rRNA: Strukturbestandteil der Ribosomen, wird im Nucleolus hergestellt. snRNA: beteiligt am Splicing.' },

    { id: 149, topic: "Biologie",
      q: 'Was ist der genetische Code und was bedeutet "degeneriert"?',
      a: '3 Basen (Codon) = 1 Aminosäure → 4³ = 64 Codons für 20 Aminosäuren. Degeneriert = mehrere Codons können für dieselbe AS kodieren. AUG = Startcodon (Met). UAA, UAG, UGA = Stoppcodons.' },

    { id: 150, topic: "Biologie",
      q: 'Was ist Epigenetik?',
      a: 'Veränderung der Genaktivität ohne Änderung der DNA-Sequenz. Mechanismen: DNA-Methylierung (→ Stummschaltung), Histonacetylierung (→ Aktivierung). Kann vererbt werden. Beeinflusst durch Umwelt, Ernährung, Stress.' },

    { id: 151, topic: "Biologie",
      q: 'Wie ist das Nervensystem eingeteilt?',
      a: 'ZNS: Gehirn + Rückenmark. PNS: alle anderen Nerven. PNS → somatisch (willkürlich, Skelettmuskel) vs. autonom/vegetativ (unwillkürlich). Vegetativ → Sympathikus (fight/flight) vs. Parasympathikus (rest/digest).' },

    { id: 152, topic: "Biologie",
      q: 'Welche Hauptbereiche hat das Gehirn und welche Funktionen haben sie?',
      a: 'Großhirn (Cerebrum): Denken, Sprache, Motorik, Persönlichkeit. Kleinhirn (Cerebellum): Koordination, Gleichgewicht, Feinmotorik. Hirnstamm: Atemkontrolle, Herzkreislauf, Reflexe. Hypothalamus: Hormone, Temperatur, Hunger. Hippocampus: Gedächtnis.' },

    { id: 153, topic: "Biologie",
      q: 'Wie werden Signale zwischen Neuronen übertragen (Synapse)?',
      a: 'Aktionspotential → präsynaptische Endigung → Ca²⁺-Einstrom → Vesikel fusionieren → Neurotransmitter in synaptischen Spalt → Rezeptoren postsynaptisch → neues Potential oder Hemmung. Neurotransmitter werden danach abgebaut oder wiederaufgenommen.' },

    { id: 154, topic: "Biologie",
      q: 'Was ist der Unterschied zwischen myelinisierten und nicht-myelinisierten Nervenfasern?',
      a: 'Myelinisiert (Myelin von Schwann-Zellen/PNS oder Oligodendrozyten/ZNS): saltatorische Erregungsleitung → sehr schnell (bis 120 m/s). Nicht-myelinisiert: kontinuierliche, langsame Leitung. Ranvier-Schnürringe = Lücken in der Myelinscheide.' },

    { id: 155, topic: "Biologie",
      q: 'Aus welchen Bestandteilen besteht Knochen und welche Zelltypen sind beteiligt?',
      a: 'Knochen = Kollagenfasern (Zugfestigkeit) + Hydroxylapatit Ca₃(PO₄)₂ (Druckfestigkeit). Zelltypen: Osteoblasten (Aufbau), Osteoklasten (Abbau), Osteozyten (Erhaltung). Kompakter Knochen (außen) + Spongiöser Knochen (innen, Knochenmark).' },

    { id: 156, topic: "Biologie",
      q: 'Was ist der Unterschied zwischen hyalinem, elastischem und Faserknorpel?',
      a: 'Hyaliner Knorpel: glatt, Gelenkflächen + Rippenknorpel (Kollagen Typ II). Elastischer Knorpel: biegsam, z.B. Ohrmuschel, Kehldeckel. Faserknorpel: druckresistent, z.B. Bandscheiben, Menisken. Alle avaskulär → Ernährung durch Diffusion.' },

    { id: 157, topic: "Biologie",
      q: 'Welche Gelenktypen gibt es nach Bewegungsfreiheit?',
      a: 'Kugelgelenk (3 Achsen, z.B. Schulter, Hüfte). Scharniergelenk (1 Achse, z.B. Ellenbogen, Knie). Sattelgelenk (2 Achsen, z.B. Daumen). Drehgelenk (Rotation, z.B. Atlas-Axis). Amphiarthrose = straffes Gelenk (wenig Bewegung, z.B. Iliosakralgelenk).' },

    { id: 158, topic: "Biologie",
      q: 'Wie funktioniert die Skelettmuskelkontraktion auf molekularer Ebene?',
      a: 'Sarkomer = Grundeinheit (Aktin + Myosin). AP → Acetylcholin an motorischer Endplatte → Ca²⁺-Freisetzung aus sarkoplasmatischem Retikulum → Myosinköpfe binden an Aktin → Querbrückenzyklus (ATP-abhängig) → Gleitfilamenttheorie.' },

    { id: 159, topic: "Biologie",
      q: 'Was ist der Unterschied zwischen Sehnen, Bändern und Faszien?',
      a: 'Sehnen: Muskel → Knochen, Kollagen Typ I, kaum dehnbar. Bänder (Ligamente): Knochen → Knochen, stabilisieren Gelenke. Faszien: Bindegewebshüllen um Muskeln und Organe, Kraftübertragung.' },

    { id: 160, topic: "Biologie",
      q: 'Was ist Kanzerogenese und welche Schritte umfasst sie?',
      a: 'Entstehung durch Mutationen in Protoonkogenen (→ Onkogene) und Tumorsuppressorgenen (z.B. p53). Schritte: Initiation (erste Mutation) → Promotion (klonale Expansion) → Progression (weitere Mutationen, Malignität) → Metastasierung.' },

    { id: 161, topic: "Biologie",
      q: 'Was ist der Unterschied zwischen Protoonkogen und Tumorsuppressorgen?',
      a: 'Protoonkogen: fördert Zellwachstum → durch Mutation dominant-aktives Onkogen (1 Kopie reicht). Tumorsuppressorgen: hemmt Wachstum, fördert Apoptose (z.B. p53) → rezessiv, beide Kopien müssen ausfallen (Two-hit-Hypothese nach Knudson).' },

    { id: 162, topic: "Biologie",
      q: 'Was sind Mutagene und Karzinogene? Beispiele?',
      a: 'Physikalisch: UV-Strahlung (Pyrimidindimere), ionisierende Strahlung. Chemisch: Alkylanzien, polyzyklische Aromaten (Rauchen), Aflatoxin. Biologisch: onkogene Viren (HPV → Zervixkarzinom, HBV → Leberkarzinom).' },

    { id: 163, topic: "Biologie",
      q: 'Was besagt Mendels 3. Regel und wann gilt sie nicht?',
      a: 'Gene auf verschiedenen Chromosomen werden unabhängig vererbt (Unabhängigkeitsregel). Gilt NICHT für Gene auf demselben Chromosom (Genkopplung!). Je weiter zwei Gene entfernt, desto wahrscheinlicher Crossing Over zwischen ihnen.' },

    { id: 164, topic: "Biologie",
      q: 'Was ist Gendrift und wann ist er besonders relevant?',
      a: 'Gendrift = zufällige Allelfrequenzänderung, unabhängig von Selektion. Besonders relevant bei kleinen Populationen: Flaschenhalseffekt (nach Katastrophe) und Gründereffekt (kleine Gruppe gründet neue Population). Kann Allele fixieren oder verlieren.' },

    { id: 165, topic: "Biologie",
      q: 'Was ist DNA-Reparatur und welche Mechanismen gibt es?',
      a: 'Basenexzisionsreparatur (einzelne beschädigte Base). Nucleotidexzisionsreparatur (größere Läsionen, z.B. UV-Schäden). Mismatch-Reparatur (falsch eingebaute Basen nach Replikation). Doppelstrangbruchreparatur (homologe Rekombination oder NHEJ). Fehler → Mutation → ggf. Krebs.' },

    { id: 166, topic: "Biologie",
      q: 'Was ist der Unterschied zwischen aktivem und passivem Transport?',
      a: 'Passiv (kein ATP): einfache Diffusion (lipophile Stoffe), erleichterte Diffusion (Kanalproteine/Carrier entlang Gradient), Osmose (Wasser durch Aquaporine). Aktiv (ATP): Primär-aktiv (z.B. Na⁺/K⁺-ATPase), Sekundär-aktiv (Symport/Antiport nutzt Gradienten).' },

    { id: 167, topic: "Biologie",
      q: 'Was ist der Unterschied zwischen Pinozytose, Phagozytose und Rezeptor-vermittelter Endozytose?',
      a: 'Pinozytose: Aufnahme von Flüssigkeit + gelöste Stoffe in kleinen Vesikeln. Phagozytose: Aufnahme von Partikeln (Bakterien) durch Pseudopodien (z.B. Makrophagen). Rezeptor-vermittelt: Ligand bindet an Rezeptor → clathrinbedeckte Vesikel → Endosom.' },

    // ── Chemie Ergänzung (ÖH Chemieskript 2020) ──────────────────
    { id: 168, topic: "Chemie",
      q: 'Was sind die drei Elementarteilchen und ihre Eigenschaften?',
      a: 'Proton: +1, ~1u, im Kern. Neutron: 0, ~1u, im Kern. Elektron: −1, ~0,0005u (~2000× leichter), in der Hülle. Die Masse eines Atoms kommt fast ausschließlich von Protonen + Neutronen.' },

    { id: 169, topic: "Chemie",
      q: 'Was ist der Unterschied zwischen Atom, Element, Molekül und Ion?',
      a: 'Element: alle Atome mit gleicher Protonenzahl (z.B. Sauerstoff). Atom: konkretes Exemplar (z.B. ¹⁶O). Molekül: 2+ Atome (z.B. O₂, H₂O). Ion: elektrisch geladenes Atom oder Molekül (veränderte Elektronenzahl).' },

    { id: 170, topic: "Chemie",
      q: 'Was sind die vollständigen Trends im Periodensystem?',
      a: 'Von oben nach unten ↓: Radius ↑, Schalen ↑, Metallcharakter ↑, Ionisierungsenergie ↓, Elektronegativität ↓. Von links nach rechts →: Valenzelektronen ↑, Ionisierungsenergie ↑, Elektronegativität ↑, Radius ↓, Metallcharakter ↓.' },

    { id: 171, topic: "Chemie",
      q: 'Was sind Isotope und wie berechnet man Protonenzahl, Neutronenzahl und Elektronenzahl?',
      a: 'Isotope = Atome desselben Elements mit verschiedener Neutronenzahl. Ordnungszahl (Oz) = Protonenzahl = Elektronenzahl (ungeladen). Neutronenzahl = Massenzahl − Oz. Beispiele: Deuterium (¹H + 1n), Tritium (¹H + 2n).' },

    { id: 172, topic: "Chemie",
      q: 'Was besagt die Oktettregel und wann wird sie verletzt?',
      a: 'Jedes Atom strebt 8 Valenzelektronen an (Ausnahme: He mit 2). Abgabe → Kation, Aufnahme → Anion. Ausnahmen: H (2 e⁻), erweiterte Oktettregel ab 3. Periode (z.B. SF₆ mit 12 e⁻ um S).' },

    { id: 173, topic: "Chemie",
      q: 'Was beschreiben die 4 Quantenzahlen eines Elektrons?',
      a: 'Hauptquantenzahl n: Schale (1,2,3…). Nebenquantenzahl l: Orbital (s,p,d,f). Magnetquantenzahl mₗ: Orientierung. Spinquantenzahl ms: +½ oder −½. Pauli-Prinzip: keine zwei e⁻ mit identischen 4 Quantenzahlen → max. 2 e⁻ pro Orbital.' },

    { id: 174, topic: "Chemie",
      q: 'Was besagt die ideale Gasgleichung und welche Einheiten gelten?',
      a: 'p·V = n·R·T. p [Pa], V [m³], n [mol], R = 8,3145 J/(mol·K), T [Kelvin!]. Bei 0°C (273,15 K) und 1 atm: 1 mol Gas = 22,4 L. Immer in Kelvin rechnen!' },

    { id: 175, topic: "Chemie",
      q: 'Was besagen die drei Gasgesetze (Boyle-Mariotte, Gay-Lussac, Amontons)?',
      a: 'Boyle-Mariotte (isotherm, T=const.): p·V = const. → Druck ↑, Volumen ↓. Gay-Lussac (isobar, p=const.): V/T = const. → Heißluftballon. Amontons (isochor, V=const.): p/T = const. → Sprühdose im Feuer.' },

    { id: 176, topic: "Chemie",
      q: 'Welche Phasenübergänge gibt es?',
      a: 'Fest→Flüssig: Schmelzen. Flüssig→Fest: Erstarren. Fest→Gas: Sublimieren. Gas→Fest: Desublimieren. Flüssig→Gas: Verdampfen. Gas→Flüssig: Kondensieren. Reaktionen laufen an Grenzflächen ab → größere Grenzfläche = schnellere Reaktion.' },

    { id: 177, topic: "Chemie",
      q: 'Was ist der Tripelpunkt und was sind Emulsion, Suspension und Aerosol?',
      a: 'Tripelpunkt: alle drei Phasen im Gleichgewicht (H₂O: 6 mbar / 273,16 K). Über kritischem Punkt: Gas nicht mehr verflüssigbar. Emulsion = flüssig/flüssig (Milch). Suspension = fest/flüssig (Blut). Aerosol = fest oder flüssig/gasförmig (Nebel, Rauch).' },

    { id: 178, topic: "Chemie",
      q: 'Was ist ein Dipol und wann ist ein Molekül ein Dipol?',
      a: 'Dipol = Molekül mit ungleicher Elektronenverteilung (δ+ und δ−). Bedingung: asymmetrischer Aufbau UND ΔEN > 0,5. H₂O = Dipol (asymmetrisch, gewinkelt). CO₂ = kein Dipol (symmetrisch linear, Ladungen heben sich auf).' },

    { id: 179, topic: "Chemie",
      q: 'Welche intermolekularen Kräfte gibt es (schwächste → stärkste)?',
      a: 'Van-der-Waals/London (unpolar, ~1–10 kJ/mol) → Dipol-Dipol (polar) → Wasserstoffbrücken (H an O/N/F, ~40 kJ/mol) → Ionenbindung (~400 kJ/mol). Je stärker die Kräfte, desto höher Siedepunkt und Schmelzpunkt.' },

    { id: 180, topic: "Chemie",
      q: 'Was sind die Eigenschaften von Ionenbindungen (Salzen)?',
      a: 'Isolator im Festkörper, Elektrolyt wenn gelöst. Hohe Schmelz- und Siedepunkte. Spröde: bei Verschiebung gleiche Ladungen → Abstoßung → bricht. Gut löslich in polaren Lösungsmitteln (Hydratation).' },

    { id: 181, topic: "Chemie",
      q: 'Was besagt das Prinzip von Le Chatelier?',
      a: 'Wird ein Gleichgewicht gestört, verschiebt es sich entgegen der Störung. Edukt-Konzentration ↑ → zu Produkten. Temperatur ↑ → begünstigt endotherme Richtung. Druck ↑ (Gasen) → begünstigt Seite mit weniger Gasmolen.' },

    { id: 182, topic: "Chemie",
      q: 'Was ist der Unterschied zwischen Reaktionsgeschwindigkeit und Gleichgewichtskonstante K?',
      a: 'Reaktionsgeschwindigkeit v = −dc/dt: ändert sich mit Konzentration und Temperatur. K = [Produkte]/[Edukte]: temperaturabhängig, aber nicht konzentrationsabhängig. Katalysator: ändert v aber nicht K oder ΔG.' },

    { id: 183, topic: "Chemie",
      q: 'Was ist sp³-, sp²- und sp-Hybridisierung?',
      a: 'sp³: 4 Bindungen, Tetraeder, 109,5° (Alkan). sp²: 3 Bindungen + 1 π-Bindung, trigonal-planar, 120° (Alken, C=O). sp: 2 Bindungen + 2 π-Bindungen, linear, 180° (Alkin, CO₂). Mehr π-Bindungen = weniger drehbar.' },

    { id: 184, topic: "Chemie",
      q: 'Was ist der Unterschied zwischen Konstitutionsisomerie und Stereoisomerie?',
      a: 'Konstitutionsisomerie: gleiche Summenformel, verschiedene Verknüpfung (z.B. Ethanol vs. Dimethylether). Stereoisomerie: gleiche Verknüpfung, verschiedene Raumorientierung → Enantiomere (Spiegelbild, dreht Licht) und Diastereomere (z.B. cis/trans).' },

    { id: 185, topic: "Chemie",
      q: 'Was ist ein Enantiomer und was ist ein chirales Zentrum?',
      a: 'Chirales Zentrum = sp³-C mit 4 verschiedenen Substituenten → zwei nicht-deckbare Spiegelbilder (Enantiomere). Gleiche physikalische Eigenschaften außer: drehen polarisiertes Licht entgegengesetzt (R/S-Nomenklatur). Im Körper oft nur ein Enantiomer biologisch aktiv!' },

    { id: 186, topic: "Chemie",
      q: 'Was sind Aromate und was macht Benzol besonders?',
      a: 'Aromate: cyclisch, planar, konjugierte π-Elektronen (4n+2 nach Hückel). Benzol (C₆H₆): 6 delokalisierte π-Elektronen → resonanzstabilisiert. Typische Reaktion: elektrophile aromatische Substitution. Wichtig für Aminosäuren (Phe, Tyr, Trp, His).' },

    { id: 187, topic: "Chemie",
      q: 'Was ist Veresterung und Verseifung?',
      a: 'Veresterung: Carbonsäure + Alkohol → Ester + H₂O (säurekatalysiert, reversibel). Verseifung (Umkehrreaktion mit Lauge): Ester + OH⁻ → Carboxylat + Alkohol (irreversibel). Fette = Glycerin + 3 Fettsäuren (Triglyceride). Ester riechen oft fruchtig.' },

    { id: 188, topic: "Chemie",
      q: 'Was sind Amide und warum ist die Peptidbindung stabil?',
      a: 'Amid: Carbonsäure + Amin → Amid + H₂O. Die Peptidbindung ist eine Amidbindung (−CO−NH−). Stabil durch Resonanzstabilisierung (partielle Doppelbindung). Hydrolyse mit Säure oder Base → Aminosäuren.' },

    { id: 189, topic: "Chemie",
      q: 'Was ist die glykosidische Bindung und was ist der Unterschied zwischen α- und β-glykosidisch?',
      a: 'Glykosidische Bindung = zwischen anomeres C-Atom eines Monosaccharids und −OH-Gruppe → Acetalbindung unter Wasserabspaltung. α-glykosidisch: Stärke, Glykogen (verdaubar). β-glykosidisch: Cellulose (für Menschen nicht verdaubar, keine β-Glukosidase).' },

    { id: 190, topic: "Chemie",
      q: 'Was ist ein Puffersystem und wie funktioniert es?',
      a: 'Puffer = schwache Säure + konjugierte Base. Resistiert pH-Änderungen: H⁺-Zugabe → Base nimmt auf. OH⁻-Zugabe → Säure gibt ab. Henderson-Hasselbalch: pH = pKs + log([Base]/[Säure]). Bester Puffer wenn pH ≈ pKs.' },

    { id: 191, topic: "Chemie",
      q: 'Wie funktioniert das Blutpuffersystem?',
      a: 'Hauptpuffer: H₂CO₃/HCO₃⁻. Blut-pH: 7,35–7,45. CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. Lunge reguliert CO₂ (Abatmen), Niere reguliert HCO₃⁻. Azidose: pH < 7,35. Alkalose: pH > 7,45.' },

    { id: 192, topic: "Chemie",
      q: 'Was sind Ampholyte und was ist der isoelektrische Punkt?',
      a: 'Ampholyte = Stoffe die sowohl als Säure als auch als Base reagieren (z.B. H₂O, Aminosäuren). Isoelektrischer Punkt (pI) = pH bei dem Nettoladung = 0 → geringste Löslichkeit. Aminosäuren: −COOH gibt H⁺ ab, −NH₂ nimmt H⁺ auf.' },
];
