// Lernatlas – Block 2 · Calcium- & Phosphathaushalt: klinische Fälle und Folgefragen
//
// Jeder Fall: Fallvignette, erwartete Reglerstellung, typische Laborwerte, Erklärung, Folgefragen.
// expected: erlaubte Werte je Regler (Arrays), null = wird nicht bewertet.
//   ca/pth/vitd: -1 niedrig/erniedrigt · 0 normal · 1 hoch/erhöht;  ct: 0 inaktiv · 1 aktiviert;  renal: 0 normal · 1 eingeschränkt
// questions: correct = Index (0-basiert) der richtigen Antwort in options.

const caPhosScenarios = [
    {
        id: 'phpt',
        title: 'Primärer Hyperparathyreoidismus',
        short: 'pHPT',
        vignette: '58-jährige Patientin mit wiederkehrenden Nierenkoliken (Calciumoxalat-Steine), Obstipation und Müdigkeit. ' +
                  'Labor: Serum-Calcium 2,92 mmol/l, Phosphat 0,62 mmol/l, PTH deutlich erhöht. Sonografisch Nephrokalzinose.',
        expected: { ca: [1], pth: [1], vitd: [0, 1], ct: null, renal: [0] },
        labs: [
            ['Serum-Ca²⁺', '↑'],
            ['Serum-PO₄³⁻', '↓'],
            ['PTH', '↑ (oder für das hohe Ca unangemessen „normal“)'],
            ['Calcitriol', '↑ bis hoch-normal'],
            ['Urin-Ca', '↑ (Hypercalciurie)'],
            ['Urin-PO₄', '↑ (Phosphaturie)']
        ],
        explain: 'Ein autonomes Nebenschilddrüsen-Adenom schüttet PTH aus, obwohl das Calcium schon hoch ist (der Sollwert des Calcium-sensing-Rezeptors ist verschoben). ' +
                 'PTH stimuliert indirekt die Osteoklasten (Ca und PO₄ aus dem Knochen), steigert die Ca-Rückresorption im distalen Tubulus und induziert die 1α-Hydroxylase (Calcitriol ↑ → mehr Ca und PO₄ aus dem Darm). ' +
                 'Phosphat sinkt trotzdem: PTH hemmt im proximalen Tubulus die Na⁺/Pi-Cotransporter (Phosphaturie). ' +
                 'Die gefilterte Ca-Menge ist so groß, dass sie die gesteigerte Rückresorption übertrifft → Hypercalciurie → Steine und Nephrokalzinose.',
        questions: [
            {
                q: 'Warum ist das Serum-Phosphat beim primären Hyperparathyreoidismus typischerweise erniedrigt?',
                options: [
                    'PTH hemmt die Na⁺/Pi-Cotransporter im proximalen Tubulus → Phosphaturie',
                    'Calcitriol hemmt die Phosphat-Absorption im Darm',
                    'Osteoblasten bauen vermehrt Phosphat in den Knochen ein',
                    'Calcitonin steigert die Phosphat-Rückresorption in der Niere'
                ],
                correct: 0,
                why: 'PTH führt zur Internalisierung der Na⁺/Pi-Cotransporter (NaPi-IIa/IIc) im proximalen Tubulus. Merksatz: PTH – Phosphat raus, Calcium rein.'
            },
            {
                q: 'Welche Komplikation erklärt sich durch die erhöhte Calcium-Ausscheidung im Urin?',
                options: [
                    'Tetanie mit positivem Chvostek-Zeichen',
                    'Nephrolithiasis und Nephrokalzinose',
                    'Rachitischer Rosenkranz',
                    'Hyperphosphatämie mit Gefäßverkalkung'
                ],
                correct: 1,
                why: 'Die gefilterte Ca-Menge überschreitet die Rückresorptionskapazität: Hypercalciurie → Calciumoxalat-/Calciumphosphat-Steine und Nephrokalzinose. Die anderen Optionen gehören zu Hypocalcämie, Vitamin-D-Mangel bzw. CKD.'
            }
        ]
    },
    {
        id: 'hypopth',
        title: 'Hypoparathyreoidismus (nach Thyreoidektomie)',
        short: 'Hypo-PTH',
        vignette: '46-jährige Patientin, zwei Tage nach totaler Thyreoidektomie. Kribbeln um den Mund und in den Fingern, schmerzhafte Muskelkrämpfe. ' +
                  'Chvostek-Zeichen positiv, im EKG verlängerte QT-Zeit. Labor: Serum-Calcium 1,62 mmol/l, Phosphat 1,9 mmol/l, PTH nicht messbar.',
        expected: { ca: [-1], pth: [-1], vitd: [-1], ct: null, renal: [0] },
        labs: [
            ['Serum-Ca²⁺', '↓'],
            ['Serum-PO₄³⁻', '↑'],
            ['PTH', '↓'],
            ['Calcitriol', '↓'],
            ['Urin-Ca', '↓, aber relativ zu hoch für das niedrige Serum-Ca'],
            ['Urin-PO₄', '↓']
        ],
        explain: 'Durch die Operation sind die Nebenschilddrüsen geschädigt oder entfernt. Ohne PTH bleiben die Knochen-Osteoklasten ruhig, die distale Ca-Rückresorption fällt und die 1α-Hydroxylase wird kaum induziert (Calcitriol ↓ → wenig Ca-Absorption im Darm). ' +
                 'Die Na⁺/Pi-Cotransporter bleiben in der Membran, Phosphat wird vermehrt rückresorbiert → Hyperphosphatämie. ' +
                 'Das Ca im Urin ist absolut niedrig, aber für das niedrige Serum-Ca zu hoch (fehlendes PTH). Unter Calcium-/Vitamin-D-Therapie droht daher schnell eine Hypercalciurie.',
        questions: [
            {
                q: 'Welches Zeichen passt zur Hypocalcämie?',
                options: [
                    'Polyurie, Obstipation und Übelkeit',
                    'Looser-Umbauzonen im Röntgenbild',
                    'Positives Chvostek-Zeichen (Zucken der Gesichtsmuskulatur beim Beklopfen des N. facialis)',
                    'Nephrolithiasis mit Calciumoxalat-Steinen'
                ],
                correct: 2,
                why: 'Niedriges ionisiertes Ca erhöht die neuromuskuläre Erregbarkeit: Parästhesien, Tetanie, Chvostek- und Trousseau-Zeichen, QT-Verlängerung. Polyurie/Obstipation sind Hypercalcämie, Looser-Zonen Osteomalazie.'
            },
            {
                q: 'Warum steigt das Serum-Phosphat beim Hypoparathyreoidismus?',
                options: [
                    'Osteoklasten setzen vermehrt Phosphat aus dem Knochen frei',
                    'Ohne PTH wird Phosphat im proximalen Tubulus vermehrt rückresorbiert',
                    'Calcitriol steigert die Phosphat-Ausscheidung über die Niere',
                    'Die Darm-Absorption von Phosphat ist gesteigert'
                ],
                correct: 1,
                why: 'Fehlendes PTH heißt: keine Hemmung der Na⁺/Pi-Cotransporter, also weniger Phosphaturie. Knochen und Darm sind eher vermindert (Osteoklasten ruhig, Calcitriol ↓).'
            }
        ]
    },
    {
        id: 'ckd',
        title: 'Chronische Niereninsuffizienz (renale Osteopathie)',
        short: 'CKD',
        vignette: '62-jähriger Patient mit diabetischer Nephropathie (eGFR 14 ml/min), Knochenschmerzen und Juckreiz. ' +
                  'Labor: Phosphat 2,4 mmol/l, Calcium 2,10 mmol/l (niedrig-normal), PTH stark erhöht, Calcitriol erniedrigt.',
        expected: { ca: [-1, 0], pth: [1], vitd: [-1], ct: null, renal: [1] },
        labs: [
            ['Serum-Ca²⁺', '↔ bis ↓ (niedrig-normal)'],
            ['Serum-PO₄³⁻', '↑'],
            ['PTH', '↑↑ (sekundärer Hyperparathyreoidismus)'],
            ['Calcitriol', '↓'],
            ['Urin-Ca', '↓'],
            ['Urin-PO₄', 'absolut ↓ (Retention), fraktionell ↑']
        ],
        explain: 'Mit dem Nephronverlust sinkt die 1α-Hydroxylase-Kapazität (zusätzlich hemmt FGF23): Calcitriol ↓ → Ca-Absorption im Darm ↓. Phosphat kann nicht mehr ausreichend ausgeschieden werden → Hyperphosphatämie, die Ca bindet und senkt. ' +
                 'Beides – Hypocalcämie-Tendenz und Phosphat ↑ – stimuliert die Nebenschilddrüse: sekundärer Hyperparathyreoidismus. ' +
                 'Der Knochen leidet doppelt: Osteitis fibrosa durch anhaltend hohes PTH, dazu Osteomalazie-Anteil durch Calcitriol-Mangel. Ca×PO₄ ↑ fördert Weichteil- und Gefäßverkalkung.',
        questions: [
            {
                q: 'Welche Konstellation ist bei CKD mit sekundärem Hyperparathyreoidismus typisch?',
                options: [
                    'Phosphat ↓, Calcitriol ↑, Calcium ↑, PTH ↓',
                    'Phosphat ↑, Calcitriol ↓, Calcium niedrig-normal, PTH ↑',
                    'Phosphat ↑, Calcitriol ↑, Calcium ↑, PTH ↑',
                    'Phosphat ↓, Calcitriol ↓, Calcium ↓, PTH ↓'
                ],
                correct: 1,
                why: 'Phosphat-Retention und Calcitriol-Mangel treiben das PTH hoch; das Calcium bleibt nur niedrig-normal. Die Konstellation Phosphat ↓ wäre eher Vitamin-D-Mangel oder pHPT.'
            },
            {
                q: 'Warum ist Calcitriol bei fortgeschrittener CKD erniedrigt?',
                options: [
                    'Die Leber kann 25-OH-D₃ nicht mehr bilden',
                    'Calcitonin hemmt die Calcitriol-Bildung',
                    'Verlust funktionierender Nephrone: die 1α-Hydroxylase im proximalen Tubulus fällt aus (FGF23 hemmt zusätzlich)',
                    'Der Darm verliert die Fähigkeit, Vitamin D aufzunehmen'
                ],
                correct: 2,
                why: 'Die 1α-Hydroxylase sitzt in den proximalen Tubuluszellen. Weniger Nephrone, weniger Calcitriol. Substitution mit aktiviertem Vitamin D (Calcitriol/Alfacalcidol) umgeht diesen Schritt.'
            }
        ]
    },
    {
        id: 'vitd',
        title: 'Vitamin-D-Mangel (Rachitis / Osteomalazie)',
        short: 'Vit.-D-Mangel',
        vignette: '14 Monate altes Kind mit wenig Sonnenlicht und ohne Vitamin-D-Prophylaxe. Auffällig sind O-Beine, tastbare Auftreibungen an den Knorpel-Knochen-Grenzen der Rippen („rachitischer Rosenkranz“) und ein verzögerter Fontanellenschluss. ' +
                  'Labor: Calcium niedrig-normal, Phosphat erniedrigt, PTH erhöht, alkalische Phosphatase erhöht, 25-OH-D₃ erniedrigt. Beim Erwachsenen heißt dasselbe Bild Osteomalazie.',
        expected: { ca: [-1, 0], pth: [1], vitd: [-1], ct: null, renal: [0] },
        labs: [
            ['Serum-Ca²⁺', '↔ bis ↓ (durch sek. HPT gehalten)'],
            ['Serum-PO₄³⁻', '↓'],
            ['PTH', '↑ (sekundärer Hyperparathyreoidismus)'],
            ['Calcitriol', '↓ (Substratmangel an 25-OH-D₃)'],
            ['Urin-Ca', '↓'],
            ['Urin-PO₄', '↑ (Phosphaturie durch PTH)']
        ],
        explain: 'Ohne Vitamin D fehlt der Substratnachschub für Calcitriol: Calbindin, TRPV6 und NaPi-IIb im Darm werden nicht induziert, Ca und PO₄ werden kaum aufgenommen. ' +
                 'Das niedrige Ca löst einen sekundären Hyperparathyreoidismus aus. PTH hält das Calcium mit Knochen-Resorption und Ca-Rückresorption gerade noch im Rahmen, bewirkt aber Phosphaturie → Phosphat ↓. ' +
                 'Das Ca×PO₄-Angebot reicht nicht für die Hydroxylapatit-Bildung: Osteoid wird nicht mineralisiert (Rachitis im Wachstum, Osteomalazie im Erwachsenenalter).',
        questions: [
            {
                q: 'Was ist die Ursache der Mineralisationsstörung bei Rachitis und Osteomalazie?',
                options: [
                    'Zu viele Osteoklasten durch Calcitonin',
                    'Zu wenig Osteoblasten durch PTH-Mangel',
                    'Zu geringes Angebot an Ca und PO₄ für die Hydroxylapatit-Bildung (Calcitriol-Mangel → verminderte Absorption)',
                    'Zu hohe Phosphat-Rückresorption in der Niere'
                ],
                correct: 2,
                why: 'Das Osteoid wird zwar gebildet, aber nicht verkalkt. Grund ist das Ca×PO₄-Produkt, das wegen fehlender Calcitriol-Wirkung im Darm zu klein bleibt.'
            },
            {
                q: 'Welcher Mechanismus erklärt das erniedrigte Phosphat trotz Mangelzustand?',
                options: [
                    'Sekundärer Hyperparathyreoidismus → PTH-bedingte Phosphaturie',
                    'Vermehrter Einbau von Phosphat in den Knochen durch Osteoblasten',
                    'Calcitonin hemmt die Phosphat-Absorption',
                    'Erhöhte Calcitriol-Spiegel steigern die Phosphat-Ausscheidung'
                ],
                correct: 0,
                why: 'Das niedrige Ca stimuliert die Nebenschilddrüse; PTH hemmt NaPi-IIa/IIc im proximalen Tubulus. So erkennst du den Unterschied zur CKD, wo Phosphat steigt.'
            }
        ]
    }
];
