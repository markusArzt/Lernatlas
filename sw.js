// Lernatlas – Service Worker (Offline-Cache)
// WICHTIG: CACHE-Version hochzählen bei jedem Deployment mit Änderungen!
const CACHE = 'medat-v12';

const FILES = [
  './',
  './index.html',
  './css/style.css',
  './js/srs.js',
  './js/app.js',
  './manifest.json',
  './assets/fonts/eb-garamond-latin-wght-normal.woff2',
  './assets/fonts/eb-garamond-latin-wght-italic.woff2',
  './assets/fonts/public-sans-latin-wght-normal.woff2',
  './data/aufnahmetest/wortfluessigkeit.js',
  './data/aufnahmetest/zahlenfolgen.js',
  './data/aufnahmetest/wissen.js',
  './data/aufnahmetest/flashcards.js',
  './data/block2/knochen.js',
];

// Install: jede Datei einzeln cachen. Fehlt eine auf dem Server, wird nur sie übersprungen –
// der Service Worker wird trotzdem aktiv (früher blockierte eine fehlende Datei jedes Update).
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(FILES.map(u => c.add(new Request(u, { cache: 'reload' }))))
    )
  );
  self.skipWaiting();
});

// Activate: alte Caches löschen
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: erst Netz, bei Fehler (offline) der Cache. So kommt jede neue Version sofort an,
// und die App läuft trotzdem ohne Internet. Fehlerseiten (404 …) werden nie gecacht.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(hit =>
          hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())
        )
      )
  );
});
