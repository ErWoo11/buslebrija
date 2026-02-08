// Service Worker sin caché offline - App requiere conexión a internet
const CACHE_NAME = 'autobuses-lebrija-v1';

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Intercepta peticiones pero NO cachea
self.addEventListener('fetch', event => {
    // Solo cachear assets estáticos básicos
    if (event.request.url.includes('/buslebrija/styles.css') || 
        event.request.url.includes('/buslebrija/script.js') ||
        event.request.url.includes('/buslebrija/favicon.ico')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                // Si falla, mostrar error
                return new Response('Error de conexión', { status: 503 });
            })
        );
    } else {
        // Para todo lo demás, NO usar caché
        event.respondWith(
            fetch(event.request).catch(() => {
                // Si no hay conexión, mostrar error
                return new Response(
                    '<h1>⚠️ Sin conexión a internet</h1><p>Esta aplicación requiere conexión a internet para funcionar.</p>',
                    { 
                        headers: { 'Content-Type': 'text/html' },
                        status: 503 
                    }
                );
            })
        );
    }
});