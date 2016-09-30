const staticCacheName = 'webclerks-static-v80';

// Beim erstmaligen installieren des Service Workers
self.addEventListener('install', function(event) {
  console.log(`Service Worker ${staticCacheName} wird installiert`);
  
  event.waitUntil(
    fetch('/rev-manifest.json').then(function(response) {
        console.log('load manifest')
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ', response.status);
        return;
      }

      if (response.type === 'opaque') {
        console.log('Received a response, but it\'s opaque so can\'t examine it');
        return;
      }

      // Examine the text in the response
      response.text().then(function(responseText) {
        const files = [
          '/',
          'index.php',
          'news',
          'offline',
          'events',
          'meetup',
          'kontakt',
          'webclerks',
          'content/logic/fullcss.php',
          'assets/images/webclerks_logo.svg',
          'assets/fonts/extrabold.woff2',
          'assets/fonts/semibold.woff2',
          'assets/fonts/regular.woff2',
        ];

        // Dateiname für js und css aus rev.manifest.json holen
        const revedFiles = JSON.parse(responseText);
     
        for(var x in revedFiles){
          console.log(revedFiles);
            files.push(`assets/${revedFiles[x]}`);
        }

        // Seiten und Ressourcen cachen
        caches.open(staticCacheName).then(function(cache) {
          return cache.addAll(files);
        })
      });
    }).catch(function(err) {
      console.log('Fetch Error: ', err);
    })
  );
});

// Sobald ein Service Worker aktiviert wird
self.addEventListener('activate', function(event) {
  console.log(`Service Worker ${staticCacheName} wird aktiviert`);

  event.waitUntil(
    // checken welche Service Worker es gibt
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        // Alle webclerks SW herausfiltern
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('webclerks-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
            // und wenn es mehrere webclerks SW gibt, 
            // alle außer den aktuellen löschen
            console.log('Lösche Service Worker: ', cacheName)
            return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch Event, also wenn Daten geladen werden,
self.addEventListener('fetch', function(event) {
  // abfangen und mit gecachten Daten antworten
  // oder wenn eine Verbindung besteht und nichts gecached ist, frisch holen
  event.respondWith(
    caches.match(event.request)
    
      .then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function() {
        var lastFiveChars = event.request.url.slice(-5).split('.');

        if(['webp', 'jpg', 'png', 'gif', 'jpeg'].indexOf(lastFiveChars[1]) !== -1) {
          return caches.match('/assets/images/webclerks_logo.svg')
        }


      // Wenn weder aus dem Netz etwas geholt werden kann,
      // noch aus dem Cache, Message anzeigen
      return caches.match('/offline');

      // Todo: Offline Page erstellen und anzeigen statt der Messsage
      // Todo: Fallback für Bilder und sonstige „besondere Szenarien"
    })
  );
});

// Wenn von main.js aus eine 'message' kommt,
self.addEventListener('message', function(event) {  
  if (event.data.action === 'getCachedPages') {
    caches.open(staticCacheName).then(function(cache) {
      return cache.keys().then(function(requests) {
        var urls = requests.filter(function(request){
          return request.url.slice(-6).indexOf('.') === -1 && request.url.indexOf('/offline') === -1;
        }).map(function(request) {
          return request.url;
        });

        return urls.sort();

      }).then(function(urls) {
        event.ports[0].postMessage(urls);
      });
    });
  }

  // und es einen wartenden (waiting) Service Worker gibt
  if (event.data.action === 'skipWaiting') {
    console.log(event.data.action)
    // wird dieser installiert
    // aktiviert wird er aber erst mit dem nächsten Refresh
    self.skipWaiting();
  }
});