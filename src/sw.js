const CACHE_NAME = "cache-v1";
const ASSETS_TO_CACHE = ["slow-connection.html"];

addEventListener("install", (event) => {
  console.log("installed!");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

addEventListener("activate", (event) => {
  console.log("activated!");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

addEventListener("fetch", (event) => {
  console.log("fetch", event.request.url);
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});

addEventListener("fetch", (event) => {
  const isSlowConnection = navigator.connection.effectiveType !== "4g";
  event.respondWith(
    isSlowConnection
      ? caches.match("slow-connection.html")
      : fetch(event.request)
  );
});
