/* Service Worker: macht die App im Park ohne Netz nutzbar.
 * Strategie: Alles Eigene beim ersten Aufruf in den Cache legen und
 * danach zuerst aus dem Cache bedienen (die Inhalte sind statisch).
 * Bei jeder Inhaltsaenderung VERSION hochzaehlen. */

const VERSION = 'v31';
const CACHE = `tierpark-begleiter-${VERSION}`;

const DATEIEN = [
  './',
  './index.html',
  './manifest.webmanifest',
  './app/styles.css',
  './app/app.js',
  './app/data.js',
  './app/data-kinder.js',
  './app/mapgeo.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((namen) => Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

/* WICHTIG: kein Datei-fuer-Datei-Auffrischen im Hintergrund. Sonst mischen
 * sich alte und neue Modul-Dateien und die App startet mit einem
 * Importfehler (leere Seite). Updates kommen ausschliesslich ueber eine
 * neue VERSION: install laedt alles frisch, activate loescht den alten
 * Cache - dadurch ist ein Update immer vollstaendig oder gar nicht. */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request).then((treffer) => {
      if (treffer) return treffer;
      return fetch(e.request)
        .then((antwort) => {
          if (antwort && antwort.ok) {
            const kopie = antwort.clone();
            caches.open(CACHE).then((c) => c.put(e.request, kopie));
          }
          return antwort;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
