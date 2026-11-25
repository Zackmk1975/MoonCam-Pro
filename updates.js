/* MoonCam AutoUpdater – không reload trang khi ghi video, chụp/lưu, đang chơi game. */
(()=>{
 'use strict';
 const APP_VERSION='1.8.0';
 const POLL_MS=5*60*1000;
 const byId=id=>document.getElementById(id);
 const $status=byId('updateStatus'),$check=byId('checkUpdateBtn');
 const $banner=byId('appUpdateNotice'),$title=byId('updateNoticeTitle');
 const $desc=byId('updateNoticeDesc'),$now=byId('updateNowBtn'),$later=byId('updateLaterBtn');
 if(!$status||!$check||!$banner)return;
 let target=null,checking=false,reloading=false,lastCheck=0,snoozed=null;
 const attemptPrefix='mooncam-update-attempt-';
 function alreadyTried(version){try{return sessionStorage.getItem(attemptPrefix+version)==='1'}catch{return false}}
 const asTuple=x=>String(x).split('.').map(n=>Number(n)||0);
 function newer(a,b){let x=asTuple(a),y=asTuple(b);for(let i=0;i<Math.max(x.length,y.length);i++){if((x[i]||0)!==(y[i]||0))return (x[i]||0)>(y[i]||0)}return false;}
 function busy(){
   // Quay hoặc chờ lưu: TUYỆT ĐỐI không tải lại trang. Camera đang mở cũng không tự động tải lại.
   try {
     const s=state;
     return !!(s.cameraOpening||s.finalizing||s.pendingCameraShutdown||
       s.recorder&&s.recorder.state!=='inactive'||
       s.stream&&s.stream.getTracks().some(t=>t.readyState==='live')||
       byId('gameStudio')?.classList.contains('open')||
       byId('privacyStage')?.classList.contains('show')||
       byId('mediaModal')?.classList.contains('open'));
   }catch{return true}
 }
 function showTarget(){
   if(!target)return;
   $status.textContent='Có bản '+target;
   $title.textContent='Có MoonCam Pro v'+target;
   $desc.textContent=busy()?'Đang quay, dùng camera hoặc chơi game: hãy hoàn tất trước khi cập nhật.':alreadyTried(target)?'Đã thử tải bản mới nhưng vẫn đang ở bản cũ. Kiểm tra gói đã triển khai trên Netlify.':'Đã sẵn sàng nhận bản mới. Video đã lưu vẫn ở trên máy.';
   $now.textContent=busy()?'Cập nhật sau':'Cập nhật';
   $now.disabled=busy();
   $banner.hidden=snoozed===target;
 }
 function clearTarget(){target=null;$banner.hidden=true;$status.textContent='Mới nhất · v'+APP_VERSION}
 async function refreshSW(){
   if(!('serviceWorker'in navigator)||!window.isSecureContext)return;
   try{const reg=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});await reg.update()}catch{}
 }
 function doUpdate(force=false){
   if(reloading||busy()||document.hidden)return false;
   if(!target&&!force)return false;
   if(target&&alreadyTried(target)&&!force){showTarget();return false;}
   if(target)try{sessionStorage.setItem(attemptPrefix+target,'1')}catch{}
   reloading=true;
   $status.textContent='Đang cập nhật…';
   $banner.hidden=true;
   // Bỏ query cũ, tải lại chính URL đã cài PWA. Không tạo web app mới và không xóa IndexedDB.
   const next=new URL('./',location.href);
   next.searchParams.set('mc_build',target||APP_VERSION);
   next.searchParams.set('r',String(Date.now()));
   location.replace(next.href);
   return true;
 }
 async function check(manual=false){
   if(checking)return;
   if(!navigator.onLine){$status.textContent='Ngoại tuyến · dùng bản hiện tại';return;}
   checking=true;lastCheck=Date.now();
   if(manual)$status.textContent='Đang kiểm tra…';
   try{
     const url=new URL('./version.json',location.href);url.searchParams.set('check',String(Date.now()));
     const response=await fetch(url.href,{cache:'no-store',credentials:'same-origin'});
     if(!response.ok)throw Error('Không tải được phiên bản mới');
     const data=await response.json();
     if(typeof data.version!=='string'||!/^\d+(?:\.\d+){1,3}$/.test(data.version))throw Error('Thông tin phiên bản không hợp lệ');
     if(newer(data.version,APP_VERSION)){
       target=data.version;
       await refreshSW();
       if(!busy()&&!manual&&!document.hidden&&snoozed!==target&&!alreadyTried(target)){
         // Mở app khi đang rảnh: tự tải bản mới. Không bắt người dùng xóa icon.
         doUpdate();
       }else showTarget();
     }else{
       clearTarget();
       if(manual) $status.textContent='Đã là bản mới nhất · v'+APP_VERSION;
     }
   }catch(err){
     $status.textContent='Không kiểm tra được · thử lại';
     if(manual)console.warn('MoonCam update check:',err);
   }finally{checking=false}
 }
 $check.addEventListener('click',()=>{snoozed=null;check(true)});
 $now.addEventListener('click',()=>{if(busy()){showTarget();return;}if(target)try{sessionStorage.removeItem(attemptPrefix+target)}catch{}doUpdate(true)});
 $later.addEventListener('click',()=>{snoozed=target;$banner.hidden=true;$status.textContent='Cập nhật v'+target+' đang chờ';});
 document.addEventListener('visibilitychange',()=>{
   if(document.hidden)return;
   if(target&&snoozed!==target&&!busy()&&!alreadyTried(target))doUpdate();
   else if(Date.now()-lastCheck>30000)check();
 });
 window.addEventListener('online',()=>check());
 // Tự nhắc lại khi cuộc quay vừa kết thúc, không thay đổi MediaRecorder hay game.
 setInterval(()=>{
   if(document.hidden)return;
   if(target){showTarget();if(!busy()&&snoozed!==target&&!alreadyTried(target))doUpdate();}
   else if(Date.now()-lastCheck>POLL_MS)check();
 },5000);
 setTimeout(()=>check(),450);
})();
