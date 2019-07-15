importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
    workbox.precaching.precacheAndRoute([
        '/',
        '../../templates/public/index.html',
        '../../static/lib/bootstrap/bootstrap.min.css',
        '../../static/lib/photoswipe/default-skin/default-skin.css',
        '../../static/lib/photoswipe/photoswipe.css',
        '../../../static/custom.css',
        '../../static/lib/jquery-3.3.1.js',
        '../../static/lib/bootstrap/bootstrap.min.js',
        '../../static/lib/photoswipe/photoswipe.min.js',
        '../../static/lib/photoswipe/photoswipe-ui-default.min.js',
        '../../static/search.js',
        '../../static/site.js'
    ]);

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'static-resources',
        }),
    );

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.cacheFirst({
            cacheName: 'googleapis',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                }),
            ],
        }),
    );
} else {
    console.log(`Workbox didn't load`);
}