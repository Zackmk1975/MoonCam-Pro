/* MoonCam Pro v1.8: cache ngoại tuyến, luôn ưu tiên bản mới trên mạng. */
'use strict';
const CACHE='mooncam-pro-v1-8-0';
const PRECACHE=['./','./index.html','./updates.js','./manifest.webmanifest',
  './icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png',
  './games/meteor.html','./games/merge.html'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(PRECACHE.map(path=>new Request(path,{cache:'reload'})));
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('mooncam-pro-')&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(url.pathname.endsWith('/version.json')){
    event.respondWith(fetch(req,{cache:'no-store'}));return;
  }
  const dynamic= req.mode==='navigate'||/\.(?:html|js|css|webmanifest|json)$/i.test(url.pathname);
  if(dynamic){event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const canonical=new Request(url.origin+url.pathname); // no unbounded ?ts cache keys
    try{
      const response=await fetch(req,{cache:'no-store'});
      if(response.ok)event.waitUntil(cache.put(canonical,response.clone()).catch(()=>{}));
      return response;
    }catch{
      return (await cache.match(canonical))||
        (req.mode==='navigate'&&(url.pathname.endsWith('/')||url.pathname.endsWith('/index.html'))?await cache.match('./index.html'):null)||
        Response.error();
    }
  })());return;}
  event.respondWith((async()=>{
    const cached=await caches.match(req,{ignoreSearch:true});
    return cached||fetch(req);
  })());
});
