import { STATIONEN } from '../app/data.js';
import * as GEO from '../app/mapgeo.js';

const STORAGE_KEY = 'hagenbeck-v24';
const SESSION = {
  start: 'hagenbeck-v24-navigation-start',
  target: 'hagenbeck-v24-navigation-target',
  walked: 'hagenbeck-v24-navigation-walked',
  lastPoint: 'hagenbeck-v24-navigation-last-point',
  summary: 'hagenbeck-v24-last-summary'
};

let watchId = null;
let wakeLock = null;
let targetId = null;
let walkedMeters = Number(sessionStorage.getItem(SESSION.walked) || 0);
let lastGeoPoint = readSessionJson(SESSION.lastPoint);
let remainingMeters = null;
let arrivalHits = 0;

function readState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}}}
function writeState(state){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}}
function readSessionJson(key){try{return JSON.parse(sessionStorage.getItem(key)||'null')}catch{return null}}
function station(id){return STATIONEN.find(item=>item.id===id)}
function toMapPosition(position){return{x:((position.coords.longitude-GEO.OSM_BOUNDS.west)/(GEO.OSM_BOUNDS.ost-GEO.OSM_BOUNDS.west))*100,y:((GEO.OSM_BOUNDS.nord-position.coords.latitude)/(GEO.OSM_BOUNDS.nord-GEO.OSM_BOUNDS.sued))*GEO.MASS.h}}
function mapDistanceMeters(a,b){return Math.hypot(a.x-b.x,a.y-b.y)*GEO.MASS.meterProEinheit}
function formatMeters(value){if(value==null||!Number.isFinite(value))return'–';return value>=1000?`${(value/1000).toFixed(value>=10000?0:1).replace('.',',')} km`:`${Math.max(0,Math.round(value))} m`}

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

function showMessage(text,isError=false){let banner=document.querySelector('#mobile-navigation-message');if(!banner){banner=document.createElement('div');banner.id='mobile-navigation-message';banner.className='mobile-navigation-message';document.body.appendChild(banner)}banner.textContent=text;banner.classList.toggle('error',isError);banner.classList.add('show');clearTimeout(showMessage.timer);showMessage.timer=setTimeout(()=>banner.classList.remove('show'),3600)}

async function requestWakeLock(){
  if(!targetId||document.visibilityState!=='visible'||!('wakeLock'in navigator))return;
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
  if(document.visibilityState==='visible'&&targetId)requestWakeLock();
});

function ensureNavigationPanel(){
  const status=document.querySelector('.map-status');
  if(!status||status.querySelector('.navigation-metrics'))return;
  const panel=document.createElement('div');
  panel.className='navigation-metrics';
  panel.innerHTML=`<div><small>Reststrecke</small><strong data-nav-remaining>–</strong></div><div><small>Gelaufen</small><strong data-nav-walked>0 m</strong></div><div class="navigation-awake"><span data-nav-awake>●</span><small data-nav-awake-text>Bildschirm aktiv</small></div>`;
  status.prepend(panel);
}

function updateNavigationPanel(){
  ensureNavigationPanel();
  const remaining=document.querySelector('[data-nav-remaining]');
  const walked=document.querySelector('[data-nav-walked]');
  const awake=document.querySelector('[data-nav-awake]');
  const awakeText=document.querySelector('[data-nav-awake-text]');
  if(remaining)remaining.textContent=formatMeters(remainingMeters);
  if(walked)walked.textContent=formatMeters(walkedMeters);
  if(awake)awake.classList.toggle('active',Boolean(wakeLock));
  if(awakeText)awakeText.textContent=wakeLock?'Bildschirm bleibt aktiv':'App geöffnet lassen';
}

function measureRemaining(attempt=0){
  const route=document.querySelector('.route-line');
  if(!route)return;
  if(route.dataset.routed!=='true'&&attempt<12){requestAnimationFrame(()=>measureRemaining(attempt+1));return}
  try{
    remainingMeters=route.getTotalLength()*GEO.MASS.meterProEinheit;
  }catch{
    remainingMeters=null;
  }
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
  requestAnimationFrame(()=>measureRemaining());
}

function resetTrackingSession(){
  walkedMeters=0;
  lastGeoPoint=null;
  arrivalHits=0;
  remainingMeters=null;
  sessionStorage.setItem(SESSION.walked,'0');
  sessionStorage.removeItem(SESSION.lastPoint);
  sessionStorage.removeItem(SESSION.summary);
}

function storeNavigation(position,id){
  const mapPosition=toMapPosition(position);
  const state=readState();
  state.location=mapPosition;
  state.route=['haupteingang',id];
  state.tour=null;
  state.selected=id;
  state.view='map';
  writeState(state);
  sessionStorage.setItem(SESSION.start,JSON.stringify(mapPosition));
  sessionStorage.setItem(SESSION.target,id);
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
  const target=station(targetId);
  if(!target)return;
  const direct=mapDistanceMeters(mapPosition,{x:target.mapX,y:target.mapY});
  const threshold=Math.max(18,Math.min(32,(position.coords.accuracy||12)+8));
  arrivalHits=direct<=threshold?arrivalHits+1:0;
  if(arrivalHits>=2)finishNavigation('arrived');
}

function startWatching(){
  if(watchId!==null||!navigator.geolocation||!targetId)return;
  requestWakeLock();
  watchId=navigator.geolocation.watchPosition(position=>{
    countWalked(position);
    const mapPosition=toMapPosition(position);
    const state=readState();
    state.location=mapPosition;
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
  writeState(state);
  sessionStorage.removeItem(SESSION.target);
  sessionStorage.removeItem(SESSION.start);
  sessionStorage.removeItem(SESSION.lastPoint);
}

function finishNavigation(reason='arrived'){
  const target=station(targetId);
  const summary={reason,target:target?.name||'Ziel',walked:Math.round(walkedMeters),finishedAt:Date.now()};
  sessionStorage.setItem(SESSION.summary,JSON.stringify(summary));
  stopWatching();
  releaseWakeLock();
  clearActiveNavigation();
  targetId=null;
  showSummary(summary);
}

function showSummary(summary){
  document.querySelector('.navigation-summary')?.remove();
  const card=document.createElement('section');
  card.className='navigation-summary';
  card.innerHTML=`<em>${summary.reason==='arrived'?'Ziel erreicht':'Navigation beendet'}</em><h2>${summary.target}</h2><strong>${formatMeters(summary.walked)}</strong><p>zurückgelegte Strecke</p><button type="button">Fertig</button>`;
  card.querySelector('button').addEventListener('click',()=>{
    sessionStorage.removeItem(SESSION.summary);
    sessionStorage.removeItem(SESSION.walked);
    card.remove();
    window.location.reload();
  });
  document.body.appendChild(card);
}

function requestNavigation(id){
  if(!navigator.geolocation){showMessage('Standort ist auf diesem Gerät nicht verfügbar.',true);return}
  targetId=id;
  resetTrackingSession();
  showMessage('Standort wird bestimmt …');
  navigator.geolocation.getCurrentPosition(position=>{
    storeNavigation(position,id);
    const first={lat:position.coords.latitude,lon:position.coords.longitude,accuracy:position.coords.accuracy||999,time:position.timestamp||Date.now()};
    lastGeoPoint=first;
    sessionStorage.setItem(SESSION.lastPoint,JSON.stringify(first));
    requestWakeLock();
    showMessage('Navigation startet ab deinem Standort.');
    window.location.reload();
  },error=>{
    targetId=null;
    const text=error.code===1?'Standortfreigabe fehlt. Bitte in den Handy-Einstellungen für Safari bzw. Chrome erlauben.':'Standort konnte nicht bestimmt werden. Bitte erneut versuchen.';
    showMessage(text,true);
  },{enableHighAccuracy:true,maximumAge:0,timeout:15000});
}

function interceptNavigate(event){const button=event.target.closest('[data-action="navigate"]');if(!button)return;const id=button.dataset.id;if(!id)return;event.preventDefault();event.stopImmediatePropagation();requestNavigation(id)}
document.addEventListener('click',interceptNavigate,true);

window.addEventListener('hagenbeck:route-cancel',()=>finishNavigation('cancelled'));

window.addEventListener('load',()=>{
  const summary=readSessionJson(SESSION.summary);
  if(summary){showSummary(summary);return}
  targetId=sessionStorage.getItem(SESSION.target);
  if(!targetId)return;
  ensureNavigationPanel();
  updateNavigationPanel();
  let start=readSessionJson(SESSION.start);
  if(start)requestAnimationFrame(()=>redrawRouteFrom(start));
  startWatching();
});

const style=document.createElement('style');
style.textContent=`
.mobile-navigation-message{position:fixed;z-index:200;left:14px;right:14px;top:calc(82px + env(safe-area-inset-top));max-width:560px;margin:auto;padding:13px 16px;border:1px solid rgba(255,255,255,.14);border-radius:16px;background:rgba(10,30,20,.96);color:#fff;font-weight:800;box-shadow:0 18px 50px rgba(0,0,0,.38);transform:translateY(-24px);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}.mobile-navigation-message.show{opacity:1;transform:translateY(0)}.mobile-navigation-message.error{background:rgba(88,24,20,.97)}
.navigation-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:9px;padding-bottom:9px;border-bottom:1px solid rgba(255,255,255,.12)}.navigation-metrics>div{display:grid}.navigation-metrics small{color:#9eb0a3;font-size:.67rem}.navigation-metrics strong{font-size:1.18rem}.navigation-awake{grid-column:1/-1;display:flex!important;align-items:center;gap:6px}.navigation-awake span{color:#7d877f}.navigation-awake span.active{color:#9bd35e;text-shadow:0 0 8px rgba(155,211,94,.65)}
.navigation-summary{position:fixed;z-index:300;left:14px;right:14px;top:50%;transform:translateY(-50%);max-width:430px;margin:auto;padding:26px;text-align:center;border:1px solid rgba(255,255,255,.15);border-radius:28px;background:rgba(8,24,16,.98);color:#fff;box-shadow:0 30px 90px rgba(0,0,0,.58)}.navigation-summary em{display:block;color:#9bd35e;font-style:normal;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;font-weight:900}.navigation-summary h2{margin:6px 0 18px}.navigation-summary>strong{display:block;font-size:3rem;line-height:1;color:#ffc66d}.navigation-summary p{color:#9eb0a3}.navigation-summary button{width:100%;min-height:48px;margin-top:8px;border:0;border-radius:15px;background:#9bd35e;color:#10200d;font:inherit;font-weight:900}
`;
document.head.appendChild(style);
