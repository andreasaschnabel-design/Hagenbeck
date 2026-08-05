import { STATIONEN, TIERE } from '../app/data.js';

const ARRIVAL_KEY = 'hagenbeck-v24-navigation-arrival';
const ICONS = {
  eisbaer:'🐻‍❄️',walross:'🦭',pinguin:'🐧',kegelrobbe:'🦭',seebaer:'🦭',
  elefant:'🐘',orangutan:'🦧',tiger:'🐅',leopard:'🐆',loewe:'🦁',mandrill:'🐒',
  riesenkaenguru:'🦘',giraffe:'🦒',zebra:'🦓',strauss:'🐦',erdmaennchen:'🦫',
  trampeltier:'🐫',onager:'🫏',kamtschatkabaer:'🐻',flamingo:'🦩',riesenotter:'🦦',
  zwergziege:'🐐',praeriebison:'🦬',hai:'🦈',krokodil:'🐊',rochen:'🐟',
  clownfisch:'🐠',riesenschlange:'🐍',flughund:'🦇'
};

let activeArrival = readArrival();
let selectedAnimalId = null;
let enhancing = false;

function readArrival(){
  try{return JSON.parse(sessionStorage.getItem(ARRIVAL_KEY)||'null')}catch{return null}
}

function stationById(id){return STATIONEN.find(item=>item.id===id)}
function animalById(id){return TIERE.find(item=>item.id===id)}
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}

function animalsForStation(id){
  const station=stationById(id);
  if(!station)return[];
  const ids=new Set(station.tiere||[]);
  return TIERE.filter(animal=>ids.has(animal.id)||animal.station===id);
}

function openAnimal(id){
  const animal=animalById(id);
  if(!animal)return false;
  selectedAnimalId=id;
  const trigger=document.createElement('button');
  trigger.type='button';
  trigger.hidden=true;
  trigger.dataset.animal=id;
  document.body.appendChild(trigger);
  trigger.click();
  trigger.remove();
  requestAnimationFrame(enhanceAnimalModal);
  return true;
}

function openFallback(){
  document.querySelector('.arrival-fallback')?.remove();
  const station=stationById(activeArrival?.stationId);
  const panel=document.createElement('section');
  panel.className='arrival-fallback';
  panel.innerHTML=`
    <em>Ziel erreicht</em>
    <h2>${escapeHtml(station?.name||activeArrival?.stationName||'Station')}</h2>
    <p>${escapeHtml(station?.beschreibung||'Du bist an deinem nächsten Ziel angekommen.')}</p>
    <button type="button" data-arrival-continue>${activeArrival?.nextId?`Weiter zu ${escapeHtml(activeArrival.nextName)}`:'Navigation abschließen'}</button>`;
  document.body.appendChild(panel);
}

function openArrival(arrival){
  activeArrival=arrival||readArrival();
  if(!activeArrival)return;
  const animals=animalsForStation(activeArrival.stationId);
  if(!animals.length){openFallback();return}
  const preferred=animals.some(animal=>animal.id===selectedAnimalId)?selectedAnimalId:animals[0].id;
  openAnimal(preferred);
}

function enhanceAnimalModal(){
  if(enhancing||!activeArrival)return;
  const card=document.querySelector('.animal-modal__card');
  if(!card)return;

  const animals=animalsForStation(activeArrival.stationId);
  const currentTitle=document.querySelector('#animal-modal-title')?.textContent?.trim();
  const currentAnimal=animals.find(animal=>animal.name===currentTitle)||animalById(selectedAnimalId)||animals[0];
  if(currentAnimal)selectedAnimalId=currentAnimal.id;
  const signature=`${activeArrival.stationId}:${activeArrival.nextId||''}:${selectedAnimalId||''}`;
  const currentBanner=card.querySelector('.navigation-arrival-banner');
  const currentActions=card.querySelector('.navigation-arrival-actions');
  if(currentBanner?.dataset.signature===signature&&currentActions?.dataset.signature===signature)return;

  enhancing=true;
  currentBanner?.remove();
  currentActions?.remove();

  const banner=document.createElement('section');
  banner.className='navigation-arrival-banner';
  banner.dataset.signature=signature;
  banner.innerHTML=`
    <div class="navigation-arrival-banner__check">✓</div>
    <div><em>Ziel erreicht · Etappe ${Number(activeArrival.index||0)+1} von ${activeArrival.count||1}</em><strong>${escapeHtml(activeArrival.stationName||stationById(activeArrival.stationId)?.name||'Station')}</strong></div>`;

  if(animals.length>1){
    const chooser=document.createElement('div');
    chooser.className='navigation-arrival-animals';
    chooser.innerHTML=animals.map(animal=>`<button type="button" data-arrival-animal="${escapeHtml(animal.id)}" class="${animal.id===selectedAnimalId?'active':''}"><span>${ICONS[animal.id]||'🐾'}</span>${escapeHtml(animal.name)}</button>`).join('');
    banner.appendChild(chooser);
  }

  const hero=card.querySelector('.animal-modal__hero');
  if(hero)hero.insertAdjacentElement('afterend',banner);else card.prepend(banner);

  const actions=document.createElement('footer');
  actions.className='navigation-arrival-actions';
  actions.dataset.signature=signature;
  actions.innerHTML=`
    <div><small>${activeArrival.nextId?'Nächste Etappe':'Letztes Ziel'}</small><strong>${escapeHtml(activeArrival.nextName||'Tour abschließen')}</strong></div>
    <button type="button" data-arrival-continue>${activeArrival.nextId?'Weiter navigieren':'Navigation abschließen'} <span>→</span></button>`;
  card.appendChild(actions);

  enhancing=false;
}

function showResumeDock(){
  if(!activeArrival||document.querySelector('.animal-modal'))return;
  let dock=document.querySelector('.arrival-resume-dock');
  if(!dock){
    dock=document.createElement('section');
    dock.className='arrival-resume-dock';
    document.body.appendChild(dock);
  }
  dock.innerHTML=`
    <div><em>Ziel erreicht</em><strong>${escapeHtml(activeArrival.stationName||'Station')}</strong></div>
    <button type="button" data-arrival-reopen>Tier öffnen</button>
    <button type="button" class="primary" data-arrival-continue>${activeArrival.nextId?'Weiter':'Fertig'} →</button>`;
}

function continueNavigation(){
  document.querySelector('.arrival-resume-dock')?.remove();
  document.querySelector('.arrival-fallback')?.remove();
  const close=document.querySelector('.animal-modal [data-close-animal]');
  if(close)close.click();
  activeArrival=null;
  selectedAnimalId=null;
  window.dispatchEvent(new CustomEvent('hagenbeck:continue-navigation'));
}

function handleClick(event){
  const chooser=event.target.closest('[data-arrival-animal]');
  if(chooser){
    event.preventDefault();
    event.stopPropagation();
    openAnimal(chooser.dataset.arrivalAnimal);
    return;
  }
  if(event.target.closest('[data-arrival-continue]')){
    event.preventDefault();
    event.stopPropagation();
    continueNavigation();
    return;
  }
  if(event.target.closest('[data-arrival-reopen]')){
    event.preventDefault();
    openArrival(activeArrival);
    document.querySelector('.arrival-resume-dock')?.remove();
    return;
  }
  if(activeArrival&&event.target.closest('.animal-modal [data-close-animal]')){
    setTimeout(showResumeDock,80);
  }
}

document.addEventListener('click',handleClick,true);
window.addEventListener('hagenbeck:navigation-arrival',event=>openArrival(event.detail));

const observer=new MutationObserver(()=>{
  if(!activeArrival)return;
  if(document.querySelector('.animal-modal__card'))enhanceAnimalModal();
});
observer.observe(document.documentElement,{childList:true,subtree:true});

window.addEventListener('load',()=>{
  activeArrival=readArrival();
  if(activeArrival)setTimeout(()=>openArrival(activeArrival),50);
});

const style=document.createElement('style');
style.textContent=`
.navigation-arrival-banner{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.1);background:linear-gradient(135deg,rgba(155,211,94,.2),rgba(255,198,109,.12))}.navigation-arrival-banner__check{width:44px;height:44px;display:grid;place-items:center;border-radius:15px;background:#9bd35e;color:#10200d;font-size:1.55rem;font-weight:950}.navigation-arrival-banner em{display:block;color:#cfeaaf;font-size:.68rem;font-style:normal;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.navigation-arrival-banner strong{display:block;margin-top:3px;font-size:1.08rem}.navigation-arrival-animals{grid-column:1/-1;display:flex;gap:7px;overflow:auto;padding-top:3px}.navigation-arrival-animals button{display:flex;align-items:center;gap:6px;white-space:nowrap;padding:8px 10px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(255,255,255,.06);color:#fff;font:inherit;font-size:.76rem;font-weight:800}.navigation-arrival-animals button.active{border-color:#9bd35e;background:rgba(155,211,94,.18)}
.navigation-arrival-actions{position:sticky;z-index:5;bottom:0;display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:14px 16px calc(14px + env(safe-area-inset-bottom));border-top:1px solid rgba(255,255,255,.12);background:rgba(8,24,16,.97);backdrop-filter:blur(18px)}.navigation-arrival-actions small{display:block;color:#9eb0a3}.navigation-arrival-actions strong{display:block;margin-top:2px}.navigation-arrival-actions button{min-height:48px;padding:0 16px;border:0;border-radius:15px;background:#9bd35e;color:#10200d;font:inherit;font-weight:950}.navigation-arrival-actions button span{font-size:1.2rem}
.arrival-resume-dock{position:fixed;z-index:480;left:12px;right:12px;bottom:calc(82px + env(safe-area-inset-bottom));display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;max-width:650px;margin:auto;padding:12px;border:1px solid rgba(255,255,255,.14);border-radius:20px;background:rgba(8,24,16,.97);color:#fff;box-shadow:0 22px 60px rgba(0,0,0,.5)}.arrival-resume-dock em{display:block;color:#9bd35e;font-size:.65rem;font-style:normal;text-transform:uppercase;font-weight:900}.arrival-resume-dock strong{display:block}.arrival-resume-dock button{min-height:42px;padding:0 12px;border:1px solid rgba(255,255,255,.13);border-radius:13px;background:rgba(255,255,255,.07);color:#fff;font:inherit;font-weight:850}.arrival-resume-dock button.primary{border:0;background:#9bd35e;color:#10200d}
.arrival-fallback{position:fixed;z-index:520;left:14px;right:14px;top:50%;transform:translateY(-50%);max-width:460px;margin:auto;padding:24px;border:1px solid rgba(255,255,255,.14);border-radius:26px;background:#0b1c13;color:#fff;box-shadow:0 28px 90px rgba(0,0,0,.6)}.arrival-fallback em{color:#9bd35e;font-style:normal;font-weight:900;text-transform:uppercase}.arrival-fallback h2{margin:5px 0 12px}.arrival-fallback p{color:#cbd8ce;line-height:1.5}.arrival-fallback button{width:100%;min-height:48px;border:0;border-radius:15px;background:#9bd35e;color:#10200d;font:inherit;font-weight:950}
@media(max-width:520px){.navigation-arrival-actions{grid-template-columns:1fr}.navigation-arrival-actions button{width:100%}.arrival-resume-dock{grid-template-columns:1fr 1fr}.arrival-resume-dock>div{grid-column:1/-1}}
`;
document.head.appendChild(style);
