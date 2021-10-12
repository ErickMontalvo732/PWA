const cacheName = 'cacheBar';

addEventListener("install", (event) => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);
    return cache.addAll([
      "/",
      "/index.html",
      "/qr.html",
      "/cart.html",
      "/map.html",

      "/sw-register.js",
      "/sw.js",
      "/manifest.webmanifest",
      "/menu.json",
      "/terrazo.pdf",

      "/assets/css/bootstrap.css",
      "/assets/font-awesome/fontawesome.min.css",
      "/assets/font-awesome/all.css",
      "/assets/js/bootstrap.min.js",
      "/assets/popper/popper.min.js",
      "/assets/jquery/jquery.min.js",
      "/assets/font-awesome/all.js",

      "/assets/images/bebida2.png",
      "/assets/images/bebida3.png",
      "/assets/images/bebida4.png",
      "/assets/images/cart1.png",
      "/assets/images/cart2.png",
      "/assets/images/cart3.png",
      "/assets/images/menu1.png",
      "/assets/images/menu2.png",
      "/assets/images/menu3.png",
      "/assets/images/qr.png",
      "/assets/icons/android-icon-36x36.png",
      "/assets/icons/android-icon-48x48.png",
      "/assets/icons/android-icon-72x72.png",
      "/assets/icons/android-icon-96x96.png",
      "/assets/icons/android-icon-144x144.png",
      "/assets/icons/android-icon-192x192.png",
      "/assets/icons/icon512x512.png"
    ]);
  };
  event.waitUntil(preCache());
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
