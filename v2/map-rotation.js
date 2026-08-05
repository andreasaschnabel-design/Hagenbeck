const ROTATION_KEY = 'hagenbeck-v24-map-rotation';
const STEP = 15;
let rotation = loadRotation();
let applying = false;

function loadRotation() {
  try {
    const value = Number(localStorage.getItem(ROTATION_KEY));
    return Number.isFinite(value) ? normalize(value) : 0;
  } catch {
    return 0;
  }
}

function normalize(value) {
  let angle = value % 360;
  if (angle > 180) angle -= 360;
  if (angle <= -180) angle += 360;
  return angle;
}

function saveRotation() {
  try {
    localStorage.setItem(ROTATION_KEY, String(rotation));
  } catch {
    // Die Kartenrotation funktioniert auch ohne lokale Speicherung.
  }
}

function setRotation(value) {
  rotation = normalize(value);
  saveRotation();
  applyRotation();
}

function injectStyles() {
  if (document.querySelector('#map-rotation-styles')) return;
  const style = document.createElement('style');
  style.id = 'map-rotation-styles';
  style.textContent = `
    .map-stage > svg {
      transform-origin: 50% 50%;
      transition: transform .26s cubic-bezier(.2,.75,.25,1);
      overflow: visible;
      will-change: transform;
    }
    .rotation-button {
      position: relative;
      overflow: visible;
    }
    .north-compass {
      display: grid;
      place-items: center;
      gap: 0;
      line-height: 1;
      font-weight: 900;
    }
    .north-compass__arrow {
      display: block;
      font-size: 1rem;
      transform-origin: 50% 70%;
      transition: transform .26s cubic-bezier(.2,.75,.25,1);
    }
    .north-compass__letter {
      display: block;
      margin-top: 1px;
      font-size: .64rem;
      letter-spacing: .04em;
    }
    .rotation-degree {
      position: absolute;
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
      min-width: 46px;
      padding: 5px 7px;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 999px;
      background: rgba(7,17,12,.86);
      color: rgba(255,255,255,.78);
      font-size: .7rem;
      pointer-events: none;
      backdrop-filter: blur(12px);
    }
  `;
  document.head.appendChild(style);
}

function ensureControls() {
  const tools = document.querySelector('.map .tools');
  if (!tools || tools.querySelector('[data-map-rotate]')) return;

  const left = document.createElement('button');
  left.type = 'button';
  left.className = 'rotation-button';
  left.dataset.mapRotate = 'left';
  left.setAttribute('aria-label', 'Karte nach links drehen');
  left.title = 'Karte nach links drehen';
  left.textContent = '↶';

  const right = document.createElement('button');
  right.type = 'button';
  right.className = 'rotation-button';
  right.dataset.mapRotate = 'right';
  right.setAttribute('aria-label', 'Karte nach rechts drehen');
  right.title = 'Karte nach rechts drehen';
  right.textContent = '↷';

  const north = document.createElement('button');
  north.type = 'button';
  north.className = 'rotation-button north-compass';
  north.dataset.mapRotate = 'north';
  north.setAttribute('aria-label', 'Karte nach Norden ausrichten');
  north.title = 'Nach Norden ausrichten';
  north.innerHTML = `
    <span class="north-compass__arrow" aria-hidden="true">▲</span>
    <span class="north-compass__letter">N</span>
    <span class="rotation-degree" aria-hidden="true"></span>
  `;

  tools.append(left, right, north);

  left.addEventListener('click', event => {
    event.stopPropagation();
    setRotation(rotation - STEP);
  });
  right.addEventListener('click', event => {
    event.stopPropagation();
    setRotation(rotation + STEP);
  });
  north.addEventListener('click', event => {
    event.stopPropagation();
    setRotation(0);
  });
}

function applyRotation() {
  if (applying) return;
  applying = true;
  requestAnimationFrame(() => {
    const svg = document.querySelector('.map-stage > svg');
    if (svg) svg.style.transform = `rotate(${rotation}deg)`;

    const arrow = document.querySelector('.north-compass__arrow');
    if (arrow) arrow.style.transform = `rotate(${rotation}deg)`;

    const degree = document.querySelector('.rotation-degree');
    if (degree) degree.textContent = rotation === 0 ? 'Nord' : `${Math.abs(rotation)}° ${rotation > 0 ? 'rechts' : 'links'}`;

    const compass = document.querySelector('[data-map-rotate="north"]');
    if (compass) compass.setAttribute('aria-label', rotation === 0 ? 'Karte ist nach Norden ausgerichtet' : `Karte um ${rotation} Grad gedreht. Nach Norden ausrichten`);
    applying = false;
  });
}

function enhanceMap() {
  injectStyles();
  ensureControls();
  applyRotation();
}

const observer = new MutationObserver(enhanceMap);
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener('DOMContentLoaded', enhanceMap);
enhanceMap();
