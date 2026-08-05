import { STATIONEN, TOUREN } from '../app/data.js';
import * as GEO from '../app/mapgeo.js';

const STORAGE_KEY = 'hagenbeck-v24';
const SESSION = {
  start: 'hagenbeck-v24-navigation-start',
  target: 'hagenbeck-v24-navigation-target',
  walked: 'hagenbeck-v24-navigation-walked',
  lastPoint: 'hagenbeck-v24-navigation-last-point',
  summary: 'hagenbeck-v24-last-summary',
  queue: 'hagenbeck-v24-navigation-queue',
  index: 'hagenbeck-v24-navigation-index',
  tour: 'hagenbeck-v24-navigation-tour',
  arrival: 'hagenbeck-v24-navigation-arrival'
};

let watchId = null;
let wakeLock = null;
let targetId = null;
let walkedMeters = Number(sessionStorage.getItem(SESSION.walked) || 0);
let lastGeoPoint = readSessionJson(SESSION.lastPoint);
let remainingMeters = null;
let arrivalHits = 0;
let arrivalPaused = false;
let guidance = { arrow: '↑', instruction: 'Route wird berechnet …', distance: '' };

function readState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}}}
function writeState(state){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}}
function readSessionJson(key){try{return JSON.parse(sessionStorage.getItem(key)||'null')}catch{return null}}
function station(id){return STATIONEN.find(item=>item.id===id)}
function tour(id){return TOUREN.find(item=>item.id===id)}
function toMapPosition(position){return{x:((position.coords.longitude-GEO.OSM_BOUNDS.west)/(GEO.OSM_BOUNDS.ost-GEO.OSM_BOUNDS.west))*100,y:((GEO.OSM_BOUNDS.nord-position.coords.latitude)/(GEO.OSM_BOUNDS.nord-GEO.OSM_BOUNDS.sued))*GEO.MASS.h}}
function mapDistanceMeters(a,b){return Math.hypot(a.x-b.x,a.y-b.y)*GEO.MASS.meterProEinheit}
function formatMeters(value){if(value==null||!Number.isFinite(value))return'–';return value>=1000?`${(value/1000).toFixed(value>=10000?0:1).replace('.',',')} km`:`${Math.max(0,Math.round(value))} m`}
function normalizeAngle(value){let result=value%360;if(result>180)result-=360;if(result<=-180)result+=360;return result}

function haversineMeters(a,b){
  const radius=6371000;
  const rad=Math.PI/180;
  const dLat=(b.lat-a.lat)*rad;
  const dLon=(b.lon-a.lon)*rad;
  const lat1=a.lat*rad;
  const lat2=b.lat*rad;
  const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return 2*radius*Math.asin(Math.min(1,Math.sqrt(h)));
}

function showMessage(text,isError=false){
  let banner=document.querySelector('#mobile-navigation-message');
  if(!banner){banner=document.createElement('div');banner.id='mobile-navigation-message';banner.className='mobile-navigation-message';document.body.appendChild(banner)}
  banner.textContent=text;
  banner.classList.toggle('error',isError);
  banner.classList.add('show');
  clearTimeout(showMessage.timer);
  showMessage.timer=setTimeout(()=>banner.classList.remove('show'),3600);
}

async function requestWakeLock(){
  if(!targetId||arrivalPaused||document.visibilityState!=='visible'||!('wakeLock'in navigator))return;
  try{
    wakeLock=await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release',()=>{wakeLock=null;updateNavigationPanel()},{once:true});
    updateNavigationPanel();
  }catch{
    wakeLock=null;
    updateNavigationPanel();
  }
}

async function releaseWakeLock(){
  if(!wakeLock)return;
  try{await wakeLock.release()}catch{}
  wakeLock=null;
}

document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'&&targetId&&!arrivalPaused)requestWakeLock();
});

function ensureNavigationPanel(){
  const status=document.querySelector('.map-status');
  if(!status||status.querySelector('.navigation-metrics'))return;
  const panel=document.createElement('div');
  panel.className='navigation-metrics';
  panel.innerHTML=`
    <div class="navigation-guidance">
      <span class="navigation-guidance__arrow" data-nav-arrow>↑</span>
      <div><small data-nav-turn-distance>Route wird berechnet</small><strong data-nav-instruction>Bitte kurz warten …</strong></div>
    </div>
    <div><small>Reststrecke</small><strong data-nav-remaining>–</strong></div>
    <div><small>Gelaufen</small><strong data-nav-walked>0 m</strong></div>
    <div class="navigation-awake"><span data-nav-awake>●</span><small data-nav-awake-text>Bildschirm aktiv</small></div>`;
  status.prepend(panel);
}

function updateNavigationPanel(){
  ensureNavigationPanel();
  const remaining=document.querySelector('[data-nav-remaining]');
  const walked=document.querySelector('[data-nav-walked]');
  const awake=document.querySelector('[data-nav-awake]');
  const awakeText=document.querySelector('[data-nav-awake-text]');
  const arrow=document.querySelector('[data-nav-arrow]');
  const instruction=document.querySelector('[data-nav-instruction]');
  const turnDistance=document.querySelector('[data-nav-turn-distance]');
  if(remaining)remaining.textContent=formatMeters(remainingMeters);
  if(walked)walked.textContent=formatMeters(walkedMeters);
  if(awake)awake.classList.toggle('active',Boolean(wakeLock));
  if(awakeText)awakeText.textContent=wakeLock?'Bildschirm bleibt aktiv':'App geöffnet lassen';
  if(arrow)arrow.textContent=guidance.arrow;
  if(instruction)instruction.textContent=guidance.instruction;
  if(turnDistance)turnDistance.textContent=guidance.distance;
}

function parseRoutePoints(pathData){
  return [...String(pathData||'').matchAll(/[ML]\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)]
    .map(match=>[Number(match[1]),Number(match[2])]);
}

function bearing(a,b){
  return Math.atan2(b[0]-a[0],-(b[1]-a[1]))*180/Math.PI;
}

function routeLength(points){
  let length=0;
  for(let index=1;index<points.length;index+=1)length+=Math.hypot(points[index][0]-points[index-1][0],points[index][1]-points[index-1][1]);
  return length;
}

function guidanceFor(points){
  const target=station(targetId);
  if(points.length<2)return{arrow:'↑',instruction:'Route wird berechnet …',distance:''};
  const totalMeters=routeLength(points)*GEO.MASS.meterProEinheit;
  if(totalMeters<=25)return{arrow:'◎',instruction:`${target?.name||'Ziel'} gleich erreicht`,distance:formatMeters(totalMeters)};

  let cumulative=0;
  for(let index=1;index<points.length-1;index+=1){
    cumulative+=Math.hypot(points[index][0]-points[index-1][0],points[index][1]-points[index-1][1]);
    if(index<2)continue;
    const incoming=bearing(points[index-1],points[index]);
    const outgoing=bearing(points[index],points[index+1]);
    const delta=normalizeAngle(outgoing-incoming);
    if(Math.abs(delta)<38)continue;
    const meters=cumulative*GEO.MASS.meterProEinheit;
    const now=meters<=10;
    if(delta>0){
      return{arrow:Math.abs(delta)>125?'↻':'↱',instruction:now?'Jetzt rechts abbiegen':'Rechts abbiegen',distance:now?'Jetzt':`in ${formatMeters(meters)}`};
    }
    return{arrow:Math.abs(delta)>125?'↺':'↰',instruction:now?'Jetzt links abbiegen':'Links abbiegen',distance:now?'Jetzt':`in ${formatMeters(meters)}`};
  }
  return{arrow:'↑',instruction:`Geradeaus zu ${target?.name||'deinem Ziel'}`,distance:formatMeters(totalMeters)};
}

function measureRoute(attempt=0){
  const route=document.querySelector('.route-line');
  if(!route)return;
  if(route.dataset.routed!=='true'&&attempt<24){requestAnimationFrame(()=>measureRoute(attempt+1));return}
  const points=parseRoutePoints(route.getAttribute('d'));
  try{remainingMeters=route.getTotalLength()*GEO.MASS.meterProEinheit}catch{remainingMeters=routeLength(points)*GEO.MASS.meterProEinheit}
  guidance=guidanceFor(points);
  updateNavigationPanel();
}

function redrawRouteFrom(position){
  const target=station(targetId);
  const route=document.querySelector('.route-line');
  if(!target||!route)return;
  const replacement=route.cloneNode(false);
  replacement.removeAttribute('data-routed');
  replacement.setAttribute('d',`M${position.x.toFixed(2)} ${position.y.toFixed(2)} L${target.mapX.toFixed(2)} ${target.mapY.toFixed(2)}`);
  route.replaceWith(replacement);
  guidance={arrow:'↑',instruction:'Route wird neu berechnet …',distance:''};
  updateNavigationPanel();
  requestAnimationFrame(()=>measureRoute());
}

function resetTrackingSession(){
  walkedMeters=0;
  lastGeoPoint=null;
  arrivalHits=0;
  arrivalPaused=false;
  remainingMeters=null;
  guidance={arrow:'↑',instruction:'Route wird berechnet …',distance:''};
  sessionStorage.setItem(SESSION.walked,'0');
  sessionStorage.removeItem(SESSION.lastPoint);
  sessionStorage.removeItem(SESSION.summary);
  sessionStorage.removeItem(SESSION.arrival);
}

function navigationQueue(){
  const queue=readSessionJson(SESSION.queue);
  return Array.isArray(queue)?queue.filter(id=>station(id)):[];
}

function storeNavigation(position,ids,tourId=null){
  const mapPosition=toMapPosition(position);
  const target=ids[0];
  const state=readState();
  state.location=mapPosition;
  state.route=['haupteingang',target];
  state.tour=tourId;
  state.selected=null;
  state.view='map';
  writeState(state);
  sessionStorage.setItem(SESSION.start,JSON.stringify(mapPosition));
  sessionStorage.setItem(SESSION.target,target);
  sessionStorage.setItem(SESSION.queue,JSON.stringify(ids));
  sessionStorage.setItem(SESSION.index,'0');
  if(tourId)sessionStorage.setItem(SESSION.tour,tourId);else sessionStorage.removeItem(SESSION.tour);
}

function countWalked(position){
  const point={lat:position.coords.latitude,lon:position.coords.longitude,accuracy:position.coords.accuracy||999,time:position.timestamp||Date.now()};
  if(lastGeoPoint){
    const segment=haversineMeters(lastGeoPoint,point);
    const elapsed=Math.max(1,(point.time-lastGeoPoint.time)/1000);
    const plausibleSpeed=segment/elapsed;
    const goodAccuracy=point.accuracy<=40&&lastGeoPoint.accuracy<=40;
    if(goodAccuracy&&segment>=1.5&&segment<=80&&plausibleSpeed<=4.2){
      walkedMeters+=segment;
      sessionStorage.setItem(SESSION.walked,String(walkedMeters));
    }
  }
  lastGeoPoint=point;
  sessionStorage.setItem(SESSION.lastPoint,JSON.stringify(point));
}

function checkArrival(mapPosition,position){
  if(arrivalPaused)return;
  const target=station(targetId);
  if(!target)return;
  const direct=mapDistanceMeters(mapPosition,{x:target.mapX,y:target.mapY});
  const threshold=Math.max(18,Math.min(32,(position.coords.accuracy||12)+8));
  arrivalHits=direct<=threshold?arrivalHits+1:0;
  if(arrivalHits>=2)pauseAtArrival();
}

function markVisited(id){
  const state=readState();
  const visited=new Set(Array.isArray(state.visited)?state.visited:[]);
  visited.add(id);
  state.visited=[...visited];
  state.selected=null;
  state.view='map';
  writeState(state);
}

function pauseAtArrival(){
  if(arrivalPaused||!targetId)return;
  arrivalPaused=true;
  stopWatching();
  const queue=navigationQueue();
  const index=Math.max(0,Number(sessionStorage.getItem(SESSION.index)||0));
  const nextId=queue[index+1]||null;
  const current=station(targetId);
  markVisited(targetId);
  const arrival={
    stationId:targetId,
    stationName:current?.name||'Ziel',
    nextId,
    nextName:station(nextId)?.name||null,
    index,
    count:queue.length,
    walked:Math.round(walkedMeters),
    tourId:sessionStorage.getItem(SESSION.tour)||null
  };
  sessionStorage.setItem(SESSION.arrival,JSON.stringify(arrival));
  guidance={arrow:'✓',instruction:`${arrival.stationName} erreicht`,distance:nextId?'Tier ansehen und dann weiter':'Tier ansehen'};
  updateNavigationPanel();
  window.dispatchEvent(new CustomEvent('hagenbeck:navigation-arrival',{detail:arrival}));
}

function startWatching(){
  if(watchId!==null||!navigator.geolocation||!targetId||arrivalPaused)return;
  requestWakeLock();
  watchId=navigator.geolocation.watchPosition(position=>{
    countWalked(position);
    const mapPosition=toMapPosition(position);
    const state=readState();
    state.location=mapPosition;
    state.selected=null;
    state.view='map';
    writeState(state);
    sessionStorage.setItem(SESSION.start,JSON.stringify(mapPosition));
    redrawRouteFrom(mapPosition);
    checkArrival(mapPosition,position);
    updateNavigationPanel();
  },error=>{
    if(error.code===1)showMessage('Standortfreigabe wurde beendet.',true);
  },{enableHighAccuracy:true,maximumAge:1500,timeout:15000});
}

function stopWatching(){
  if(watchId!==null&&navigator.geolocation){navigator.geolocation.clearWatch(watchId);watchId=null}
}

function clearActiveNavigation(){
  const state=readState();
  state.route=[];
  state.tour=null;
  state.selected=null;
  state.view='map';
  writeState(state);
  Object.values(SESSION).forEach(key=>{
    if(key!==SESSION.summary&&key!==SESSION.walked)sessionStorage.removeItem(key);
  });
}

function finishNavigation(reason='arrived'){
  const activeTour=tour(sessionStorage.getItem(SESSION.tour));
  const target=station(targetId);
  const summary={reason,target:activeTour?.titel||target?.name||'Tour',walked:Math.round(walkedMeters),finishedAt:Date.now()};
  sessionStorage.setItem(SESSION.summary,JSON.stringify(summary));
  stopWatching();
  releaseWakeLock();
  clearActiveNavigation();
  targetId=null;
  arrivalPaused=false;
  showSummary(summary);
}

function showSummary(summary){
  document.querySelector('.navigation-summary')?.remove();
  const card=document.createElement('section');
  card.className='navigation-summary';
  card.innerHTML=`<em>${summary.reason==='arrived'?'Tour geschafft':'Navigation beendet'}</em><h2>${summary.target}</h2><strong>${formatMeters(summary.walked)}</strong><p>zurückgelegte Strecke</p><button type="button">Fertig</button>`;
  card.querySelector('button').addEventListener('click',()=>{
    sessionStorage.removeItem(SESSION.summary);
    sessionStorage.removeItem(SESSION.walked);
    card.remove();
    window.location.reload();
  });
  document.body.appendChild(card);
}

function requestOrientationDuringGesture(){
  try{window.hagenbeckEnableAutoHeading?.()}catch{}
}

function beginNavigation(ids,tourId=null){
  const queue=[...new Set(ids)].filter(id=>station(id));
  if(!queue.length){showMessage('Für diese Tour sind keine gültigen Ziele hinterlegt.',true);return}
  if(!navigator.geolocation){showMessage('Standort ist auf diesem Gerät nicht verfügbar.',true);return}
  requestOrientationDuringGesture();
  targetId=queue[0];
  resetTrackingSession();
  showMessage('Standort wird bestimmt …');
  navigator.geolocation.getCurrentPosition(position=>{
    storeNavigation(position,queue,tourId);
    const first={lat:position.coords.latitude,lon:position.coords.longitude,accuracy:position.coords.accuracy||999,time:position.timestamp||Date.now()};
    lastGeoPoint=first;
    sessionStorage.setItem(SESSION.lastPoint,JSON.stringify(first));
    showMessage('Navigation startet ab deinem Standort.');
    window.location.reload();
  },error=>{
    targetId=null;
    const text=error.code===1?'Standortfreigabe fehlt. Bitte in den Handy-Einstellungen für Safari bzw. Chrome erlauben.':'Standort konnte nicht bestimmt werden. Bitte erneut versuchen.';
    showMessage(text,true);
  },{enableHighAccuracy:true,maximumAge:0,timeout:15000});
}

function requestNavigation(id){beginNavigation([id],null)}
function requestTourNavigation(id){const selected=tour(id);if(selected)beginNavigation(selected.stationen||[],id)}

function continueNavigation(){
  const arrival=readSessionJson(SESSION.arrival);
  if(!arrival)return;
  if(!arrival.nextId){finishNavigation('arrived');return}
  const queue=navigationQueue();
  const nextIndex=arrival.index+1;
  targetId=arrival.nextId;
  arrivalPaused=false;
  arrivalHits=0;
  sessionStorage.setItem(SESSION.index,String(nextIndex));
  sessionStorage.setItem(SESSION.target,targetId);
  sessionStorage.removeItem(SESSION.arrival);
  const state=readState();
  state.route=[arrival.stationId,targetId];
  state.tour=sessionStorage.getItem(SESSION.tour)||null;
  state.selected=null;
  state.view='map';
  writeState(state);
  const start=state.location||readSessionJson(SESSION.start);
  if(start)redrawRouteFrom(start);
  guidance={arrow:'↑',instruction:`Weiter zu ${station(targetId)?.name||'nächsten Ziel'}`,distance:`Etappe ${nextIndex+1} von ${queue.length}`};
  updateNavigationPanel();
  requestWakeLock();
  startWatching();
}

function interceptNavigation(event){
  const navigate=event.target.closest('[data-action="navigate"]');
  if(navigate?.dataset.id){
    event.preventDefault();
    event.stopImmediatePropagation();
    requestNavigation(navigate.dataset.id);
    return;
  }
  const tourButton=event.target.closest('[data-tour]');
  if(tourButton?.dataset.tour){
    event.preventDefault();
    event.stopImmediatePropagation();
    requestTourNavigation(tourButton.dataset.tour);
  }
}

document.addEventListener('click',interceptNavigation,true);
window.addEventListener('hagenbeck:route-cancel',()=>finishNavigation('cancelled'));
window.addEventListener('hagenbeck:continue-navigation',continueNavigation);

window.addEventListener('load',()=>{
  const summary=readSessionJson(SESSION.summary);
  if(summary){showSummary(summary);return}
  const arrival=readSessionJson(SESSION.arrival);
  if(arrival){
    targetId=arrival.stationId;
    arrivalPaused=true;
    ensureNavigationPanel();
    guidance={arrow:'✓',instruction:`${arrival.stationName} erreicht`,distance:arrival.nextId?'Tier ansehen und dann weiter':'Tier ansehen'};
    updateNavigationPanel();
    setTimeout(()=>window.dispatchEvent(new CustomEvent('hagenbeck:navigation-arrival',{detail:arrival})),0);
    return;
  }
  targetId=sessionStorage.getItem(SESSION.target);
  if(!targetId)return;
  const state=readState();
  if(state.selected!=null){state.selected=null;state.view='map';writeState(state);window.location.reload();return}
  ensureNavigationPanel();
  updateNavigationPanel();
  const start=readSessionJson(SESSION.start);
  if(start)requestAnimationFrame(()=>redrawRouteFrom(start));
  startWatching();
});

const style=document.createElement('style');
style.textContent=`
.mobile-navigation-message{position:fixed;z-index:200;left:14px;right:14px;top:calc(82px + env(safe-area-inset-top));max-width:560px;margin:auto;padding:13px 16px;border:1px solid rgba(255,255,255,.14);border-radius:16px;background:rgba(10,30,20,.96);color:#fff;font-weight:800;box-shadow:0 18px 50px rgba(0,0,0,.38);transform:translateY(-24px);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}.mobile-navigation-message.show{opacity:1;transform:translateY(0)}.mobile-navigation-message.error{background:rgba(88,24,20,.97)}
.navigation-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:9px;padding-bottom:9px;border-bottom:1px solid rgba(255,255,255,.12)}.navigation-metrics>div{display:grid}.navigation-metrics small{color:#9eb0a3;font-size:.67rem}.navigation-metrics strong{font-size:1.18rem}.navigation-guidance{grid-column:1/-1!important;display:grid!important;grid-template-columns:72px 1fr;align-items:center;gap:12px;padding:10px 12px;border-radius:18px;background:linear-gradient(135deg,rgba(255,198,109,.18),rgba(155,211,94,.12));border:1px solid rgba(255,255,255,.12)}.navigation-guidance__arrow{width:64px;height:64px;display:grid;place-items:center;border-radius:18px;background:#ffc66d;color:#112014;font-size:3.2rem;font-weight:950;line-height:1;box-shadow:0 10px 28px rgba(0,0,0,.24)}.navigation-guidance strong{font-size:1.05rem;line-height:1.2}.navigation-guidance small{margin-bottom:3px;color:#ffc66d}.navigation-awake{grid-column:1/-1;display:flex!important;align-items:center;gap:6px}.navigation-awake span{color:#7d877f}.navigation-awake span.active{color:#9bd35e;text-shadow:0 0 8px rgba(155,211,94,.65)}
.navigation-summary{position:fixed;z-index:600;left:14px;right:14px;top:50%;transform:translateY(-50%);max-width:430px;margin:auto;padding:26px;text-align:center;border:1px solid rgba(255,255,255,.15);border-radius:28px;background:rgba(8,24,16,.98);color:#fff;box-shadow:0 30px 90px rgba(0,0,0,.58)}.navigation-summary em{display:block;color:#9bd35e;font-style:normal;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;font-weight:900}.navigation-summary h2{margin:6px 0 18px}.navigation-summary>strong{display:block;font-size:3rem;line-height:1;color:#ffc66d}.navigation-summary p{color:#9eb0a3}.navigation-summary button{width:100%;min-height:48px;margin-top:8px;border:0;border-radius:15px;background:#9bd35e;color:#10200d;font:inherit;font-weight:900}
@media(max-width:420px){.navigation-guidance{grid-template-columns:58px 1fr}.navigation-guidance__arrow{width:52px;height:52px;font-size:2.55rem}}
`;
document.head.appendChild(style);
