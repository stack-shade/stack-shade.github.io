// StackShade no longer uses a service worker for application caching.
// This file intentionally unregisters any older worker that may have cached
// stale HTML/Next.js chunks and clears its caches.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key)))),
      self.clients.claim(),
    ]).then(() => self.registration.unregister())
  );
});
