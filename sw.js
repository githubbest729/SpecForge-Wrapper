var V='specforge-v1',A=['./','index.html','offline.html','css/style.css','css/print.css','js/app.js','js/sw-register.js','manifest.webmanifest','icons/icon-192x192.png','icons/icon-512x512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var q=e.request;if(q.method!=='GET'||!q.url.startsWith(self.location.origin))return;
e.respondWith(caches.open(V).then(function(c){return c.match(q).then(function(m){
var f=fetch(q).then(function(r){if(r.ok)c.put(q,r.clone());return r}).catch(function(){return m||(q.mode==='navigate'?c.match('offline.html'):Response.error())});
return m||f})}))});
