var cacheName = 'pwaKazumi+-v1.2';

self.addEventListener('install', event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([

                './index.html',               
               
                './assets/img/favicon.png',
                './assets/img/icon_40.png',
                './assets/img/icon_57.png',
                './assets/img/icon_60.png',
                './assets/img/icon_80.png',
                './assets/img/icon_87.png',
                './assets/img/icon_114.png',
                './assets/img/icon_120.png',
                './assets/img/icon_180.png',
                './assets/img/icon_512.png',

                './assets/img/about.webp',
                './assets/img/about-2.webp',
                './assets/img/destaque1.webp',
                './assets/img/destaque2.webp',
                './assets/img/destaque3.webp',
                './assets/img/events-1.webp',
                './assets/img/events-2.webp',
                './assets/img/events-3.webp',
                './assets/img/reservation.webp',
                './assets/img/stats-bg.webp',

                './assets/img/gallery/gallery-1.webp',
                './assets/img/gallery/gallery-2.webp',
                './assets/img/gallery/gallery-3.webp',
                './assets/img/gallery/gallery-4.webp',
                './assets/img/gallery/gallery-5.webp',
                './assets/img/gallery/gallery-6.webp',
                './assets/img/gallery/gallery-7.webp',
                './assets/img/gallery/gallery-8.webp',

                './assets/img/menu/menu-item-1.webp',
                './assets/img/menu/menu-item-2.webp',
                './assets/img/menu/menu-item-3.webp',
                './assets/img/menu/menu-item-4.webp',
                './assets/img/menu/menu-item-5.webp',
                './assets/img/menu/menu-item-6.webp',

                './assets/img/testimonials/testimonials-1.webp',
                './assets/img/testimonials/testimonials-2.webp',
                './assets/img/testimonials/testimonials-3.webp',
                './assets/img/testimonials/testimonials-4.webp',

            ]))
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', function (event) {
    //Atualizacao internet
    event.respondWith(async function () {
        try {
            return await fetch(event.request);
        } catch (err) {
            return caches.match(event.request);
        }
    }());

    //Atualizacao cache
    /*event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );*/

});