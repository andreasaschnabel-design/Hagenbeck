import { BEREICHE, STATIONEN, TOUREN } from '../app/data.js';
import * as GEO from '../app/mapgeo.js';

const app = document.querySelector('#app');
const state = { filter:'alle', selected:null, scale:1, x:0, y:0, route:null, location:null };
const emoji = {
  haupteingang:'🎟️', flamingoteich:'🦩', elefanten:'🐘', orangutans:'🦧', tiger:'🐅',
  loewen:'🦁', afrikapanorama:'🦒', strausse:'🦓', eismeer:'🐧', seeloewen:'🦭',
  kamele:'🐫', alpakas:'🦦', streichelgehege:'🐐', spielplatz:'🛝', japangarten:'🌿', tropenaquarium:'🐠'
};

function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function path(points){return points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ')+' Z';}
function openPath(points){return points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');}
function station(id){return STATIONEN.find(s=>s.id===id);}

function renderMap(){
  const areas=GEO.GEHEGE.map(g=>`<path d="${path(g.punkte)}" fill="${BEREICHE[g.bereich]?.farbe||'#78906b'}" opacity=".34" stroke="rgba(255,255,255,.18)" stroke-width=".2"/>`).join('');
  const water=GEO.WASSER.map(w=>`<path d="${path(w.punkte)}" fill="#73b8ce" opacity=".72" stroke="#b8e1eb" stroke-width=".25"/>`).join('');
  const ways=GEO.WEGE.map(w=>`<path d="${openPath(w)}" fill="none" stroke="#e2d9bd" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  const buildings=GEO.GEBAEUDE.map(g=>`<path d="${path(g.punkte)}" fill="#d8c4a4" stroke="#f1e5cf" stroke-width=".25"/>`).join('');
  const trees=GEO.BAEUME.slice(0,180).map(b=>`<circle cx="${b[0]}" cy="${b[1]}" r="${Math.max(.32,(b[2]||1)*.28)}" fill="#315f3b" opacity=".75"/>`).join('');
  const markers=STATIONEN.map(s=>`<g class="marker ${state.filter!=='alle'&&state.filter!==s.bereich?'hidden':''}" data-id="${s.id}" transform="translate(${s.mapX} ${s.mapY})"><circle r="3.2" fill="${BEREICHE[s.bereich]?.farbe||'#85c34a'}" stroke="#fff" stroke-width=".55"/><text x="0" y="1.15" text-anchor="middle">${emoji[s.id]||'📍'}</text></g>`).join('');
  const route=state.route?`<path class="route-line" d="${openPath(state.route.map(id=>{const s=station(id);return [s.mapX,s.mapY]}))}"/>`:'';
  const loc=state.location?`<g transform="translate(${state.location.x} ${state.location.y})"><circle class="location-ring" r="3" fill="#5db7df"/><circle r="2" fill="#1688ff" stroke="#fff" stroke-width=".6"/></g>`:'';
  return `<svg viewBox="-2 -2 104 ${GEO.MASS.h+4}" role="img" aria-label="Interaktive Karte des Tierparks"><rect x="-2" y="-2" width="104" height="${GEO.MASS.h+4}" fill="#294534"/><path d="${path(GEO.GRENZE)}" fill="#b8cca9" stroke="#d9e4d2" stroke-width=".5"/>${areas}${water}${ways}${trees}${buildings}${route}${markers}${loc}</svg>`;
}

function render(){
  app.innerHTML=`
  <header class="topbar"><div class="brand"><div class="brand-mark">H</div><div><div class="brand-title">Hagenbeck erleben</div><div class="brand-sub">Version 2 · interaktiver Begleiter</div></div></div><div class="top-actions"><button class="icon-btn" data-action="tour" aria-label="Tour planen">✨</button><button class="icon-btn" data-action="locate" aria-label="Standort">◎</button></div></header>
  <main class="hero-map" id="viewport">
    <div class="filter-row">${[['alle','Alle'],['eismeer','Eismeer'],['afrika','Afrika'],['asien','Asien'],['kinder','Kinder'],['tropen','Indoor']].map(([k,l])=>`<button class="chip ${state.filter===k?'active':''}" data-filter="${k}">${l}</button>`).join('')}</div>
    <div class="map-tools"><button data-action="plus">＋</button><button data-action="minus">−</button><button data-action="reset">⌂</button></div>
    <div class="map-stage" id="mapStage" style="transform:translate(${state.x}px,${state.y}px) scale(${state.scale})">${renderMap()}</div>
    <div class="status-card"><strong>${state.route?'Route aktiv':'Erlebnis-Karte'}</strong><span>${state.route?'Tippe auf eine Station für Details':'Tippe auf ein Tier oder plane deine Tour'}</span></div>
  </main>
  <nav class="bottom-nav"><button class="active"><b>🗺️</b>Karte</button><button data-action="tour"><b>✨</b>Tour</button><button data-action="animals"><b>🐾</b>Tiere</button><button data-action="legacy"><b>☰</b>Mehr</button></nav>
  <section class="sheet ${state.selected?'open':''}" id="sheet">${sheetContent()}</section>
  <section class="tour-panel" id="tourPanel">${tourPanel()}</section>`;
  bind();
}

function sheetContent(){
  if(!state.selected)return '<div class="sheet-handle"></div>';
  const s=state.selected; const area=BEREICHE[s.bereich]?.name||'Station';
  return `<div class="sheet-handle"></div><div class="sheet-top"><div class="sheet-emoji">${emoji[s.id]||'📍'}</div><div><div class="meta">${esc(area)} · ca. ${s.dauer} Min.</div><h2>${esc(s.name)}</h2></div><button class="icon-btn" data-action="close" style="margin-left:auto">×</button></div><p>${esc(s.beschreibung)}</p><div class="button-row"><button class="primary" data-action="navigate" data-id="${s.id}">Bring mich hin</button><button class="secondary" data-action="details" data-id="${s.id}">Mehr erfahren</button></div>`;
}

function tourPanel(){
  return `<div class="panel-header"><div><div class="brand-sub">Persönliche Empfehlung</div><h1>Welche Tour passt heute?</h1></div><button class="icon-btn" data-action="tour-close">×</button></div><div class="panel-content"><div class="question-card"><label for="time">Wie viel Zeit habt ihr?</label><select id="time"><option value="60">Bis 1 Stunde</option><option value="120" selected>Etwa 2 Stunden</option><option value="180">Etwa 3 Stunden</option><option value="300">Fast den ganzen Tag</option></select></div><div class="question-card"><label for="group">Wer ist dabei?</label><select id="group"><option value="family">Familie mit Kindern</option><option value="adult">Erwachsene</option><option value="accessible">Barrierearm unterwegs</option><option value="rain">Regenwetter</option></select></div><button class="primary" data-action="recommend" style="width:100%">Tour empfehlen</button><div id="recommendation"></div></div>`;
}

function recommend(){
  const max=Number(document.querySelector('#time').value); const group=document.querySelector('#group').value;
  let pool=TOUREN.filter(t=>t.minuten<=max+30);
  const words={family:['famil','kind'],adult:['klass','afrika','raub'],accessible:['barriere'],rain:['regen','indoor','aquarium']};
  const wanted=words[group];
  let chosen=pool.find(t=>wanted.some(w=>(t.id+t.titel+t.schwerpunkt).toLowerCase().includes(w)))||pool.sort((a,b)=>b.minuten-a.minuten)[0]||TOUREN[0];
  const box=document.querySelector('#recommendation');
  box.innerHTML=`<div class="tour-result"><div class="meta">Unsere Empfehlung</div><h2>${chosen.emoji||'✨'} ${esc(chosen.titel)}</h2><p>${esc(chosen.beschreibung||chosen.schwerpunkt||'Eine passende Runde durch den Tierpark.')}</p><div class="tour-stats"><span class="mini-stat">⏱ ${chosen.minuten} Min.</span><span class="mini-stat">📍 ${chosen.stationen.length} Stationen</span></div><button class="primary" data-start-tour="${chosen.id}" style="width:100%">Diese Tour starten</button></div>`;
  box.querySelector('[data-start-tour]').addEventListener('click',()=>startTour(chosen.id));
}

function startTour(id){
  const t=TOUREN.find(x=>x.id===id); if(!t)return;
  state.route=t.stationen.map(x=>x.id); state.selected=station(state.route[0]);
  document.querySelector('#tourPanel').classList.remove('open'); render();
}

function navigateTo(id){
  const target=station(id); if(!target)return;
  state.route=['haupteingang',id]; state.selected=target; render();
}

function locate(){
  if(!navigator.geolocation){alert('Standort ist auf diesem Gerät nicht verfügbar.');return;}
  navigator.geolocation.getCurrentPosition(pos=>{
    const x=(pos.coords.longitude-GEO.OSM_BOUNDS.west)/(GEO.OSM_BOUNDS.ost-GEO.OSM_BOUNDS.west)*100;
    const y=(GEO.OSM_BOUNDS.nord-pos.coords.latitude)/(GEO.OSM_BOUNDS.nord-GEO.OSM_BOUNDS.sued)*GEO.MASS.h;
    state.location={x,y}; render();
  },()=>alert('Standort konnte nicht bestimmt werden.'));
}

function bind(){
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.filter=b.dataset.filter;render();}));
  document.querySelectorAll('.marker').forEach(m=>m.addEventListener('click',e=>{e.stopPropagation();state.selected=station(m.dataset.id);document.querySelector('#sheet').innerHTML=sheetContent();document.querySelector('#sheet').classList.add('open');bind();}));
  document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
    const a=b.dataset.action;
    if(a==='plus'){state.scale=Math.min(2.5,state.scale+.2);render();}
    if(a==='minus'){state.scale=Math.max(.8,state.scale-.2);render();}
    if(a==='reset'){state.scale=1;state.x=0;state.y=0;render();}
    if(a==='close'){state.selected=null;document.querySelector('#sheet').classList.remove('open');}
    if(a==='tour'){document.querySelector('#tourPanel').classList.add('open');}
    if(a==='tour-close'){document.querySelector('#tourPanel').classList.remove('open');}
    if(a==='recommend')recommend();
    if(a==='locate')locate();
    if(a==='navigate')navigateTo(b.dataset.id);
    if(a==='details')location.href=`../#/karte?station=${b.dataset.id}`;
    if(a==='animals')location.href='../#/tiere';
    if(a==='legacy')location.href='../';
  }));
  let drag=null;const viewport=document.querySelector('#viewport');
  viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button,.marker'))return;drag={x:e.clientX,y:e.clientY,ox:state.x,oy:state.y};viewport.setPointerCapture(e.pointerId);});
  viewport.addEventListener('pointermove',e=>{if(!drag)return;state.x=drag.ox+e.clientX-drag.x;state.y=drag.oy+e.clientY-drag.y;document.querySelector('#mapStage').style.transform=`translate(${state.x}px,${state.y}px) scale(${state.scale})`;});
  viewport.addEventListener('pointerup',()=>drag=null);
  viewport.addEventListener('wheel',e=>{e.preventDefault();state.scale=Math.max(.8,Math.min(2.5,state.scale+(e.deltaY<0?.12:-.12)));document.querySelector('#mapStage').style.transform=`translate(${state.x}px,${state.y}px) scale(${state.scale})`;},{passive:false});
}
render();
