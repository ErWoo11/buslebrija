const CACHE_NAME = 'autobuses-lebrija-v2'; // Cambia a v2 para forzar nueva instalación
const urlsToCache = [
    '/buslebrija/',
    '/buslebrija/index.html',
    '/buslebrija/styles.css',
    '/buslebrija/script.js',
    '/buslebrija/manifest.json',
    '/buslebrija/logo1.png',        // Cache busting
    '/buslebrija/logo-5121.png'     // Cache busting
];

// Instalación
self.addEventListener('install', event => {
    console.log('Service Worker instalando...');
    self.skipWaiting(); // Activar inmediatamente
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto:', CACHE_NAME);
                return cache.addAll(urlsToCache)
                    .then(() => {
                        console.log('Archivos cacheados exitosamente');
                    })
                    .catch(err => {
                        console.error('Error cacheando archivos:', err);
                    });
            })
    );
});

// Activación
self.addEventListener('activate', event => {
    console.log('Service Worker activando...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Eliminar caches antiguos
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    self.clients.claim(); // Tomar control inmediato de las páginas
});

// Estrategia de cache mejorada
self.addEventListener('fetch', event => {
    // No interceptar peticiones de API externas
    if (event.request.url.includes('api.') || 
        event.request.url.includes('maps.googleapis.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si está en cache, devolverlo pero actualizar en background
                if (response) {
                    // Actualizar en background
                    fetch(event.request).then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200) {
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, networkResponse);
                            });
                        }
                    }).catch(() => {});
                    
                    return response;
                }
                
                // Si no está en cache, buscar en red
                return fetch(event.request)
                    .then(response => {
                        // Clonar la respuesta para guardar en cache
                        if (response && response.status === 200) {
                            const responseToCache = response.clone();
                            
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        
                        return response;
                    })
                    .catch(() => {
                        // Si falla la red, intentar con cache offline
                        return caches.match('/buslebrija/index.html');
                    });
            })
    );
});

// Mensaje para forzar actualización desde la app
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});