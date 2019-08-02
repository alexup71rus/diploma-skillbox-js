var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
    '/',
    '/static'
];

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['pwa-task-manager'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
});

async function install() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        console.log(deferredPrompt)
        deferredPrompt.userChoice.then(function (choiceResult) {

            if (choiceResult.outcome === 'accepted') {
                console.log('Your PWA has been installed');
            } else {
                console.log('User chose to not install your PWA');
            }

            deferredPrompt = null;

        });


    }
}

