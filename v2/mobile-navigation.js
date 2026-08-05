import { STATIONEN } from '../app/data.js';
import * as GEO from '../app/mapgeo.js';

const STORAGE_KEY = 'hagenbeck-v24';
let watchId = null;
let targetId = null;

function readState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}}}
function writeState(state){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}}
function toMapPosition(position){return{x:((position.coords.longitude-GEO.OSM_BOUNDS.west)/(GEO.OSM_BOUNDS.ost-GEO.OSM_BOUNDS.west))*100,y:((GEO.OSM_BOUNDS.nord-position.coords.latitude)/(GEO.OSM_BOUNDS.nord-GEO.OSM_BOUNDS.sued))*GEO.MASS.h}}
function station(id){return STATIONEN.find(item=>item.id===id)}

function showMessage(text,isError=false){let banner=document.querySelector('#mobile-navigation-message');if(!banner){banner=document.createElement('div');banner.id='mobile-navigation-message';banner.className='mobile-navigation-message';document.body.appendChild(banner)}banner.textContent=text;banner.classList.toggle('error',isError);banner.classList.add('show');clearTimeout(showMessage.timer);showMessage.timer=setTimeout(()=>banner.classList.remove('show'),3200)}

function redrawRouteFrom(position){
  const target=station(targetId);
  const route=document.querySelector('.route-line');
  if(!target||!route)return;
  const replacement=route.cloneNode(false);
  replacement.removeAttribute('data-routed');
  replacement.setAttribute('d',`M${position.x.toFixed(2)} ${position.y.toFixed(2)} L${target.mapX.toFixed(2)} ${target.mapY.toFixed(2)}`);
  route.replaceWith(replacement);
}

function storeNavigation(position,id){const mapPosition=toMapPosition(position);const state=readState();state.location=mapPosition;state.route=['haupteingang',id];state.tour=null;state.selected=id;state.view='map';writeState(state);sessionStorage.setItem('hagenbeck-v24-navigation-start',JSON.stringify(mapPosition));sessionStorage.setItem('hagenbeck-v24-navigation-target',id)}

function startWatching(){if(watchId!==null||!navigator.geolocation||!targetId)return;watchId=navigator.geolocation.watchPosition(position=>{const mapPosition=toMapPosition(position);const state=readState();state.location=mapPosition;writeState(state);sessionStorage.setItem('hagenbeck-v24-navigation-start',JSON.stringify(mapPosition));redrawRouteFrom(mapPosition)},()=>{}, {enableHighAccuracy:true,maximumAge:2500,timeout:12000})}

function requestNavigation(id){if(!navigator.geolocation){showMessage('Standort ist auf diesem Gerät nicht verfügbar.',true);return}targetId=id;showMessage('Standort wird bestimmt …');navigator.geolocation.getCurrentPosition(position=>{storeNavigation(position,id);showMessage('Navigation startet ab deinem Standort.');window.location.reload()},error=>{const text=error.code===1?'Standortfreigabe fehlt. Bitte in den Handy-Einstellungen für Safari bzw. Chrome erlauben.':'Standort konnte nicht bestimmt werden. Bitte erneut versuchen.';showMessage(text,true)},{enableHighAccuracy:true,maximumAge:0,timeout:15000})}

function interceptNavigate(event){const button=event.target.closest('[data-action="navigate"]');if(!button)return;const id=button.dataset.id;if(!id)return;event.preventDefault();event.stopImmediatePropagation();requestNavigation(id)}
document.addEventListener('click',interceptNavigate,true);

window.addEventListener('load',()=>{targetId=sessionStorage.getItem('hagenbeck-v24-navigation-target');if(!targetId)return;let start=null;try{start=JSON.parse(sessionStorage.getItem('hagenbeck-v24-navigation-start')||'null')}catch{}if(start)requestAnimationFrame(()=>redrawRouteFrom(start));startWatching()});

const style=document.createElement('style');style.textContent=`.mobile-navigation-message{position:fixed;z-index:200;left:14px;right:14px;top:calc(82px + env(safe-area-inset-top));max-width:560px;margin:auto;padding:13px 16px;border:1px solid rgba(255,255,255,.14);border-radius:16px;background:rgba(10,30,20,.96);color:#fff;font-weight:800;box-shadow:0 18px 50px rgba(0,0,0,.38);transform:translateY(-24px);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}.mobile-navigation-message.show{opacity:1;transform:translateY(0)}.mobile-navigation-message.error{background:rgba(88,24,20,.97)}`;document.head.appendChild(style);
