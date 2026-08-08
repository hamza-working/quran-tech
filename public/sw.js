const CACHE_NAME = 'quran-tech-v1';
const urlsToCache = [
  '/',
  '/ar',
  '/ar/program',
  '/ar/english',
  '/ar/french',
  '/ar/tajweed',
  '/ar/quiz',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});