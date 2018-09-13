const cacheName = 'core-pwa';

const PRECACHE_URLS = [
  '404.html',
  './',
  '//fonts.googleapis.com/css?family=Roboto:300,400,400i,700|Roboto+Mono',
  '//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css',
  '//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js',
  '//unpkg.com/enigma.js@2.2.1/enigma.min.js',
  'stylesheets/custom-style.css',
  'stylesheets/downloads.css',
  'javascripts/downloads.js',
  'javascripts/extra.js',
  'search/search_index.json'
];

function _getStaticFilesArray() {
  return fetch('./files.txt').then(res => {
    return res.text().then(filesTxt => {
      return filesTxt.split(/\r?\n/).map(fileStr => {
        return fileStr.replace('./site', '');
      }).filter(x => x !== '');
    });
  });
}

function _getSiteMapArray() {
  return fetch('./sitemap.xml').then(res => {
    const xmlTxtPriomise = res.text();
    return xmlTxtPriomise.then(xmlStr => {
      const extractedLoc = xmlStr.match(/<loc>[^<]*<\/loc>/gi).map(loc => {
        return loc.replace(/(<loc>|<\/loc>)/g, '').replace(/(http[s]?:\/\/)?([^\/\s]+\/)/, '');
      }).filter(item => item !== '');
      return extractedLoc;
    })
  });
}

function prepareCacheArray() {
  return Promise.all([_getSiteMapArray(), _getStaticFilesArray()]).then(res => {
    return [...res[0], ...res[1], ...PRECACHE_URLS];
  });
}

const filesAndAssetsToCache = [];

self.addEventListener('install', (event) => {
  event.waitUntil(
    prepareCacheArray().then(cachedArray => {
      return caches.open(cacheName)
        .then(cache => cache.addAll(cachedArray))
        .then(self.skipWaiting())
    })
  );
});

self.addEventListener('activate', (event) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') { return; }
  //Network First startegy - Network falling back to cache
  event.respondWith(
    fetch(event.request).then(response => {
      return caches.open(cacheName).then(cache => {
        cache.put(event.request.url, response.clone());
        return response;
      });
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
