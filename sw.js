// Ashwath AI PWA Service Worker
const CACHE_NAME = 'ashwath-showcase-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Video files stream with HTTP 206 Partial Content, bypass cache
  if (event.request.url.endsWith('.mp4') || event.request.headers.get('range')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
