const CACHE_NAME = "iah-site-v5.6.1";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./config.js",
  "./favicon.ico",
  "./icon-192.png",
  "./manifest.webmanifest",
  "./assets/iah-mark.svg",
  "./assets/ai_city_network.png",
  "./assets/quantum_data_center.png",
  "./assets/upi_qr.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_ASSETS.map((asset) => new URL(asset, self.registration.scope))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("iah-site-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate" || url.pathname.endsWith("/config.js")) {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const copy = response.clone();
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, copy);
          }
          return response;
        })
        .catch(async () => (
          await caches.match(request) ||
          await caches.match(new URL("./", self.registration.scope))
        ))
    );
    return;
  }

  if (request.headers.has("Authorization")) return;
  if (url.pathname.includes("/assets/") || /\/(favicon\.ico|icon-192\.png|manifest\.webmanifest)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      })
    );
  }
});
