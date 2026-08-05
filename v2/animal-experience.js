import { STATIONEN, TIERE } from '../app/data.js';
import { KINDER_TIERE } from '../app/data-kinder.js';

const APP_KEY = 'hagenbeck-v24';
const CHILD_MODE_KEY = 'hagenbeck-v24-child-mode';
const ICONS = {
  eisbaer:'🐻‍❄️',walross:'🦭',pinguin:'🐧',kegelrobbe:'🦭',seebaer:'🦭',
  elefant:'🐘',orangutan:'🦧',tiger:'🐅',leopard:'🐆',loewe:'🦁',mandrill:'🐒',
  riesenkaenguru:'🦘',giraffe:'🦒',zebra:'🦓',strauss:'🐦',erdmaennchen:'🦫',
  trampeltier:'🐫',onager:'🫏',kamtschatkabaer:'🐻',flamingo:'🦩',riesenotter:'🦦',
  zwergziege:'🐐',praeriebison:'🦬',hai:'🦈',krokodil:'🐊',rochen:'🐟',
  clownfisch:'🐠',riesenschlange:'🐍',flughund:'🦇'
};

let activeAnimalId = null;
let childMode = loadChildMode();

function escapeHtml(value='') {
  return String(value).replace(/[&<>"']/g, character => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[character]);
}

function readState() {
  try { return JSON.parse(localStorage.getItem(APP_KEY) || '{}'); }
  catch { return {}; }
}

function writeState(state) {
  try { localStorage.setItem(APP_KEY, JSON.stringify(state)); }
  catch { /* Inhalte bleiben auch ohne dauerhafte Speicherung nutzbar. */ }
}

function loadChildMode() {
  try { return localStorage.getItem(CHILD_MODE_KEY) === 'true'; }
  catch { return false; }
}

function setChildMode(value) {
  childMode = Boolean(value);
  try { localStorage.setItem(CHILD_MODE_KEY, String(childMode)); }
  catch {}
  document.querySelectorAll('[data-child-mode]').forEach(input => { input.checked = childMode; });
  if (activeAnimalId) renderAnimalModal(activeAnimalId);
  injectStationAnimals(true);
}

function animalById(id) {
  return TIERE.find(animal => animal.id === id);
}

function stationFromSheet() {
  const id = document.querySelector('.sheet [data-action="navigate"]')?.dataset.id;
  return STATIONEN.find(station => station.id === id);
}

function animalsAtStation(station) {
  if (!station) return [];
  const ids = new Set(station.tiere || []);
  return TIERE.filter(animal => ids.has(animal.id) || animal.station === station.id);
}

function solvedQuizIds() {
  const state = readState();
  return Array.isArray(state.animalQuizSolved) ? state.animalQuizSolved : [];
}

function saveSolvedQuiz(id) {
  const state = readState();
  const solved = new Set(Array.isArray(state.animalQuizSolved) ? state.animalQuizSolved : []);
  const isNew = !solved.has(id);
  solved.add(id);
  state.animalQuizSolved = [...solved];
  state.quizPoints = solved.size;
  writeState(state);
  return isNew;
}

function injectStationAnimals(force=false) {
  const sheet = document.querySelector('.sheet');
  const station = stationFromSheet();
  if (!sheet || !station) return;

  const current = sheet.querySelector('.station-animals');
  if (current && !force && current.dataset.station === station.id) return;
  current?.remove();

  const animals = animalsAtStation(station);
  if (!animals.length) return;

  const section = document.createElement('section');
  section.className = 'station-animals';
  section.dataset.station = station.id;
  section.innerHTML = `
    <div class="station-animals__head">
      <div><em>Tiere an dieser Station</em><h3>${animals.length === 1 ? 'Tier entdecken' : `${animals.length} Tiere entdecken`}</h3></div>
      <label class="child-mode-toggle">
        <input type="checkbox" data-child-mode ${childMode ? 'checked' : ''}>
        <span>🧒 Kinder</span>
      </label>
    </div>
    <div class="animal-card-list">
      ${animals.map(animal => {
        const child = KINDER_TIERE[animal.id];
        const summary = childMode && child ? child.kurz : animal.kurz;
        const solved = solvedQuizIds().includes(animal.id);
        return `
          <button type="button" class="animal-card" data-animal="${escapeHtml(animal.id)}">
            <span class="animal-card__icon">${ICONS[animal.id] || '🐾'}</span>
            <span class="animal-card__copy">
              <strong>${escapeHtml(animal.name)}</strong>
              <small>${escapeHtml(summary || '')}</small>
            </span>
            <span class="animal-card__status">${solved ? '✓' : '›'}</span>
          </button>`;
      }).join('')}
    </div>`;

  const actions = sheet.querySelector('.sheet-actions');
  if (actions) sheet.insertBefore(section, actions);
  else sheet.appendChild(section);
}

function adultContent(animal) {
  const facts = Object.entries(animal.steckbrief || {}).map(([label, value]) => `
    <div class="animal-fact"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`).join('');
  const paragraphs = (animal.text || []).map(text => `<p>${escapeHtml(text)}</p>`).join('');
  const didYouKnow = (animal.wusstest || []).map(text => `<li>${escapeHtml(text)}</li>`).join('');

  return `
    ${facts ? `<section><h3>Steckbrief</h3><div class="animal-facts">${facts}</div></section>` : ''}
    ${paragraphs ? `<section class="animal-reading"><h3>Mehr über dieses Tier</h3>${paragraphs}</section>` : ''}
    ${didYouKnow ? `<section class="animal-knowledge"><h3>Wusstest du?</h3><ul>${didYouKnow}</ul></section>` : ''}
    ${animal.beobachten ? `<aside class="animal-observe"><b>👀 Beobachtungstipp</b><p>${escapeHtml(animal.beobachten)}</p></aside>` : ''}`;
}

function quizContent(animal, child) {
  if (!child?.quiz) return '';
  const solved = solvedQuizIds().includes(animal.id);
  const quiz = child.quiz;
  return `
    <section class="animal-quiz" data-quiz="${escapeHtml(animal.id)}">
      <div class="animal-quiz__head"><span>⭐</span><div><small>Tier-Quiz</small><h3>${escapeHtml(quiz.frage)}</h3></div></div>
      <div class="animal-quiz__answers">
        ${quiz.antworten.map((answer, index) => `
          <button type="button" data-quiz-answer="${index}" ${solved ? 'disabled' : ''}>${escapeHtml(answer)}</button>`).join('')}
      </div>
      <div class="animal-quiz__feedback ${solved ? 'correct' : ''}" aria-live="polite">
        ${solved ? `✓ Bereits gelöst · ${escapeHtml(quiz.erklaerung)}` : 'Wähle eine Antwort.'}
      </div>
    </section>`;
}

function childContent(animal) {
  const child = KINDER_TIERE[animal.id];
  if (!child) return `<section class="animal-reading"><p>Für dieses Tier gibt es noch keinen eigenen Kindertext. Der normale Steckbrief wird angezeigt.</p></section>${adultContent(animal)}`;
  const paragraphs = (child.text || []).map(text => `<p>${escapeHtml(text)}</p>`).join('');
  const facts = (child.wusstest || []).map(text => `<li>${escapeHtml(text)}</li>`).join('');
  return `
    <section class="animal-reading animal-reading--child"><h3>Einfach erklärt</h3>${paragraphs}</section>
    ${facts ? `<section class="animal-knowledge"><h3>Schon gewusst?</h3><ul>${facts}</ul></section>` : ''}
    ${quizContent(animal, child)}`;
}

function modalMarkup(animal) {
  const child = KINDER_TIERE[animal.id];
  const summary = childMode && child ? child.kurz : animal.kurz;
  return `
    <div class="animal-modal__backdrop" data-close-animal></div>
    <article class="animal-modal__card" role="dialog" aria-modal="true" aria-labelledby="animal-modal-title">
      <header class="animal-modal__hero">
        <span class="animal-modal__icon">${ICONS[animal.id] || '🐾'}</span>
        <div>
          <em>${childMode ? 'Kindermodus' : 'Tierwissen'}</em>
          <h2 id="animal-modal-title">${escapeHtml(animal.name)}</h2>
          ${animal.lateinisch ? `<small>${escapeHtml(animal.lateinisch)}</small>` : ''}
        </div>
        <button type="button" class="animal-modal__close" data-close-animal aria-label="Schließen">×</button>
      </header>
      <div class="animal-modal__mode">
        <p>${escapeHtml(summary || '')}</p>
        <label class="child-mode-toggle child-mode-toggle--large">
          <input type="checkbox" data-child-mode ${childMode ? 'checked' : ''}>
          <span>🧒 Kinderansicht</span>
        </label>
      </div>
      <div class="animal-modal__body">${childMode ? childContent(animal) : adultContent(animal)}</div>
    </article>`;
}

function renderAnimalModal(id) {
  const animal = animalById(id);
  if (!animal) return;
  activeAnimalId = id;
  let modal = document.querySelector('.animal-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'animal-modal';
    document.body.appendChild(modal);
  }
  modal.innerHTML = modalMarkup(animal);
  modal.classList.add('open');
  document.body.classList.add('animal-modal-open');
  requestAnimationFrame(() => modal.querySelector('.animal-modal__close')?.focus());
}

function closeAnimalModal() {
  document.querySelector('.animal-modal')?.remove();
  document.body.classList.remove('animal-modal-open');
  activeAnimalId = null;
}

function answerQuiz(button) {
  const section = button.closest('[data-quiz]');
  const animalId = section?.dataset.quiz;
  const child = KINDER_TIERE[animalId];
  if (!section || !child?.quiz) return;
  const chosen = Number(button.dataset.quizAnswer);
  const correct = chosen === child.quiz.richtig;
  const feedback = section.querySelector('.animal-quiz__feedback');

  section.querySelectorAll('[data-quiz-answer]').forEach(answer => answer.classList.remove('wrong'));
  if (!correct) {
    button.classList.add('wrong');
    feedback.className = 'animal-quiz__feedback wrong';
    feedback.textContent = 'Noch nicht – versuch es noch einmal.';
    return;
  }

  const earned = saveSolvedQuiz(animalId);
  section.querySelectorAll('[data-quiz-answer]').forEach((answer, index) => {
    answer.disabled = true;
    answer.classList.toggle('correct', index === child.quiz.richtig);
  });
  feedback.className = 'animal-quiz__feedback correct';
  feedback.textContent = `✓ Richtig! ${child.quiz.erklaerung}${earned ? ' Du bekommst einen Tierpass-Punkt.' : ''}`;
  injectStationAnimals(true);
  injectQuizProgress(true);
}

function injectQuizProgress(force=false) {
  const panel = document.querySelector('main.panel');
  const passportHero = panel?.querySelector('.panel-hero.passport');
  if (!panel || !passportHero) return;
  const existing = panel.querySelector('.quiz-progress-card');
  if (existing && !force) return;
  existing?.remove();

  const solved = solvedQuizIds().length;
  const total = Object.values(KINDER_TIERE).filter(item => item?.quiz).length;
  const percent = total ? Math.round(solved / total * 100) : 0;
  const card = document.createElement('section');
  card.className = 'quiz-progress-card card';
  card.innerHTML = `
    <span>🧠</span>
    <div><em>Kinder-Quiz</em><h2>${solved} Tierpass-Punkte</h2><p>${solved} von ${total} Tierfragen gelöst</p><div class="quiz-progress-bar"><i style="width:${percent}%"></i></div></div>`;
  passportHero.insertAdjacentElement('afterend', card);
}

function handleClick(event) {
  const animalButton = event.target.closest('[data-animal]');
  if (animalButton) {
    event.preventDefault();
    event.stopPropagation();
    renderAnimalModal(animalButton.dataset.animal);
    return;
  }
  if (event.target.closest('[data-close-animal]')) {
    event.preventDefault();
    closeAnimalModal();
    return;
  }
  const quizButton = event.target.closest('[data-quiz-answer]');
  if (quizButton) {
    event.preventDefault();
    answerQuiz(quizButton);
  }
}

function handleChange(event) {
  if (event.target.matches('[data-child-mode]')) setChildMode(event.target.checked);
}

function enhance() {
  injectStationAnimals();
  injectQuizProgress();
}

document.addEventListener('click', handleClick, true);
document.addEventListener('change', handleChange, true);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeAnimalId) closeAnimalModal();
});

const style = document.createElement('style');
style.textContent = `
  .station-animals{margin:18px 0;padding:16px;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:rgba(255,255,255,.035)}
  .station-animals__head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}.station-animals__head h3{margin:3px 0 0}.station-animals__head em{color:#9bd35e;font-size:.68rem;font-style:normal;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
  .child-mode-toggle{display:flex;align-items:center;gap:7px;flex:0 0 auto;padding:8px 10px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(255,255,255,.06);font-size:.76rem;font-weight:850;cursor:pointer}.child-mode-toggle input{accent-color:#9bd35e}
  .animal-card-list{display:grid;gap:8px}.animal-card{width:100%;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:11px;padding:11px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#12271c;color:#fff;text-align:left}.animal-card__icon{width:45px;height:45px;display:grid;place-items:center;border-radius:14px;background:linear-gradient(135deg,rgba(155,211,94,.2),rgba(255,198,109,.18));font-size:1.65rem}.animal-card__copy{display:grid;gap:3px}.animal-card__copy small{color:#9eb0a3;line-height:1.3}.animal-card__status{font-size:1.3rem;color:#9bd35e}
  .animal-modal-open{overflow:hidden}.animal-modal{position:fixed;z-index:500;inset:0;display:none}.animal-modal.open{display:block}.animal-modal__backdrop{position:absolute;inset:0;background:rgba(1,7,4,.76);backdrop-filter:blur(8px)}.animal-modal__card{position:absolute;left:8px;right:8px;top:max(8px,env(safe-area-inset-top));bottom:max(8px,env(safe-area-inset-bottom));max-width:720px;margin:auto;overflow:auto;border:1px solid rgba(255,255,255,.14);border-radius:28px;background:#0b1c13;color:#f4f7f4;box-shadow:0 28px 90px rgba(0,0,0,.65)}
  .animal-modal__hero{position:sticky;z-index:3;top:0;display:grid;grid-template-columns:auto 1fr auto;gap:13px;align-items:center;padding:16px;background:rgba(10,29,19,.96);border-bottom:1px solid rgba(255,255,255,.1);backdrop-filter:blur(18px)}.animal-modal__hero em{color:#9bd35e;font-size:.69rem;font-style:normal;font-weight:900;letter-spacing:.11em;text-transform:uppercase}.animal-modal__hero h2{margin:3px 0;font-size:1.55rem}.animal-modal__hero small{color:#9eb0a3;font-style:italic}.animal-modal__icon{width:58px;height:58px;display:grid;place-items:center;border-radius:19px;background:linear-gradient(135deg,#345d39,#6b7132);font-size:2.15rem}.animal-modal__close{width:42px;height:42px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,255,255,.07);color:#fff;font-size:1.5rem}
  .animal-modal__mode{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 18px;background:linear-gradient(135deg,rgba(155,211,94,.1),rgba(255,198,109,.08))}.animal-modal__mode p{margin:0;line-height:1.45}.child-mode-toggle--large{padding:10px 12px}
  .animal-modal__body{display:grid;gap:16px;padding:18px}.animal-modal__body section,.animal-observe{padding:16px;border:1px solid rgba(255,255,255,.1);border-radius:20px;background:#10241a}.animal-modal__body h3{margin:0 0 12px}.animal-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.animal-fact{display:grid;gap:3px;padding:11px;border-radius:14px;background:rgba(255,255,255,.055)}.animal-fact small{color:#9eb0a3}.animal-fact strong{font-size:.86rem;line-height:1.35}.animal-reading p{line-height:1.58;color:#dfe8e1}.animal-reading p:last-child{margin-bottom:0}.animal-reading--child{font-size:1.04rem}.animal-knowledge ul{margin:0;padding-left:20px}.animal-knowledge li{margin:8px 0;line-height:1.45}.animal-observe{background:linear-gradient(135deg,rgba(255,198,109,.14),rgba(155,211,94,.08))}.animal-observe b{color:#ffc66d}.animal-observe p{margin-bottom:0;line-height:1.5}
  .animal-quiz{background:linear-gradient(145deg,#1b3524,#18250f)!important}.animal-quiz__head{display:flex;gap:11px}.animal-quiz__head>span{font-size:2rem}.animal-quiz__head small{color:#ffc66d;font-weight:900;text-transform:uppercase;letter-spacing:.1em}.animal-quiz__head h3{margin:4px 0 13px}.animal-quiz__answers{display:grid;gap:8px}.animal-quiz__answers button{min-height:48px;padding:10px 13px;border:1px solid rgba(255,255,255,.13);border-radius:14px;background:rgba(255,255,255,.07);color:#fff;text-align:left;font:inherit;font-weight:800}.animal-quiz__answers button.wrong{border-color:#ff806f;background:rgba(255,80,60,.13)}.animal-quiz__answers button.correct{border-color:#9bd35e;background:rgba(155,211,94,.19)}.animal-quiz__answers button:disabled{opacity:.72}.animal-quiz__feedback{margin-top:10px;color:#b9c7bd}.animal-quiz__feedback.wrong{color:#ff9b8d}.animal-quiz__feedback.correct{color:#bfe98d}
  .quiz-progress-card{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;margin:14px 0;padding:18px}.quiz-progress-card>span{width:58px;height:58px;display:grid;place-items:center;border-radius:18px;background:rgba(155,211,94,.15);font-size:2rem}.quiz-progress-card h2{margin:3px 0}.quiz-progress-card p{margin:0 0 9px;color:#9eb0a3}.quiz-progress-bar{height:7px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.1)}.quiz-progress-bar i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#9bd35e,#ffc66d)}
  @media(max-width:520px){.station-animals__head,.animal-modal__mode{align-items:flex-start;flex-direction:column}.animal-facts{grid-template-columns:1fr}.animal-modal__card{border-radius:22px}.child-mode-toggle--large{align-self:flex-start}}
`;
document.head.appendChild(style);

const observer = new MutationObserver(enhance);
observer.observe(document.documentElement, { childList:true, subtree:true });
window.addEventListener('DOMContentLoaded', enhance);
enhance();
