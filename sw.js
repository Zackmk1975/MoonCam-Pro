'use strict';
const CACHE='mooncam-pro-v1-6';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./games/meteor.html','./games/merge.html','./games/tap.html'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('mooncam-pro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  // Only refresh the requested document: game iframe navigation must never overwrite index.html.
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{})}return response}).catch(async()=>{
      const exact=await caches.match(request,{ignoreSearch:true});
      return exact||(url.pathname.endsWith('/index.html')||url.pathname.endsWith('/')?caches.match('./index.html'):Response.error());
    }));
  }else{
    event.respondWith(caches.match(request,{ignoreSearch:true}).then(hit=>hit||fetch(request)));
  }
});
