// 💀 KILL SWITCH - Destruir completamente la PWA instalada
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        // Eliminar TODOS los cachés
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    console.log('💀 Eliminando caché:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            // Forzar desinstalación
            return self.registration.unregister().then(() => {
                console.log('💀 Service Worker DESREGISTRADO');
                // Recargar la página para mostrar error
                return self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.navigate(client.url);
                    });
                });
            });
        })
    );
});

// Intercepta TODAS las peticiones y muestra error
self.addEventListener('fetch', event => {
    event.respondWith(
        new Response(
            '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>App Desactivada</title><style>body{font-family:sans-serif;text-align:center;padding:50px;background:#f0f0f0;}h1{color:#d32f2f;}.message{background:#fff;padding:30px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}.icon{font-size:80px;margin-bottom:20px;}</style></head><body><div class="message"><div class="icon">⚠️</div><h1>Aplicación Desactivada</h1><p>Esta aplicación ya no está disponible.</p><p>Por favor, elimina el icono de tu pantalla de inicio.</p><p style="margin-top:30px;font-size:14px;color:#666;">Contacta con el administrador para más información.</p></div></body></html>',
            {
                headers: { 'Content-Type': 'text/html' }
            }
        )
    );
});