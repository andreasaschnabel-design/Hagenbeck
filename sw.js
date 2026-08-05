/* Offline-Cache fuer klassische App und Erlebnis-V2. */
const VERSION = 'v18-guided-navigation';
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
  './v2/',
  './v2/index.html',
  './v2/manifest.webmanifest',
  './v2/styles.css',
  './v2/app.js',
  './v2/routing-fix.js',
  './v2/map-rotation.js',
  './v2/map-gestures.js',
  './v2/route-controls.js',
  './v2/mobile-navigation.js',
  './v2/animal-experience.js',
  './v2/navigation-arrival.js',
  './v2/README.md',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(DATEIEN)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => {
        if (url.pathname.includes('/v2/')) return caches.match('./v2/index.html');
        return caches.match('./index.html');
      });
    })
  );
});