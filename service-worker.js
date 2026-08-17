// Service Worker para Aprendo a Leer
const CACHE_NAME = 'lectura-global-v1';

// Archivos básicos a guardar en caché
const urlsToCache = [
  './index.html',
  './icono.png',
  './logofirma.png',
  './manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché instalados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para que funcione correctamente
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo de la caché si existe, si no, lo busca en la red
        return response || fetch(event.request);
      })
  );
});