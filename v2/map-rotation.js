const ROTATION_KEY = 'hagenbeck-v24-map-rotation';
const AUTO_KEY = 'hagenbeck-v24-auto-heading';
const STEP = 15;
let rotation = loadRotation();
let autoHeading = loadAutoHeading();
let applying = false;
let headingListening = false;
let smoothedHeading = null;
let pendingHeading = null;
let headingFrame = null;

function loadRotation() {
  try {
    const value = Number(localStorage.getItem(ROTATION_KEY));
    return Number.isFinite(value) ? normalize(value) : 0;
  } catch {
    return 0;
  }
}

function loadAutoHeading() {
  try {
    return localStorage.getItem(AUTO_KEY) === 'true';
  } catch {
    return false;
  }
}

function normalize(value) {
  let angle = value % 360;
  if (angle > 180) angle -= 360;
  if (angle <= -180) angle += 360;
  return angle;
}

function normalize360(value) {
  return ((value % 360) + 360) % 360;
}

function angularDifference(target, current) {
  return normalize(target - current);
}

function saveRotation() {
  try {
    localStorage.setItem(ROTATION_KEY, String(rotation));
  } catch {}
}

function saveAutoHeading() {
  try {
    localStorage.setItem(AUTO_KEY, String(autoHeading));
  } catch {}
}

function publishRotation() {
  window.hagenbeckMapRotation = rotation;
  window.dispatchEvent(new CustomEvent('hagenbeck:map-rotation', {
    detail: { rotation }
  }));
}

function setRotation(value, { manual = true } = {}) {
  if (manual && autoHeading) disableAutoHeading();
  rotation = normalize(value);
  saveRotation();
  applyRotation();
}

function deviceHeading(event) {
  if (Number.isFinite(event.webkitCompassHeading)) return normalize360(event.webkitCompassHeading);
  if (!Number.isFinite(event.alpha)) return null;
  const screenAngle = Number(screen.orientation?.angle ?? window.orientation ?? 0);
  return normalize360(360 - event.alpha + screenAngle);
}

function handleOrientation(event) {
  if (!autoHeading) return;
  const heading = deviceHeading(event);
  if (heading == null) return;
  pendingHeading = heading;
  if (headingFrame) return;
  headingFrame = requestAnimationFrame(() => {
    headingFrame = null;
    if (pendingHeading == null) return;
    if (smoothedHeading == null) smoothedHeading = pendingHeading;
    else smoothedHeading = normalize360(smoothedHeading + angularDifference(pendingHeading, smoothedHeading) * 0.18);
    rotation = normalize(-smoothedHeading);
    saveRotation();
    applyRotation();
    window.dispatchEvent(new CustomEvent('hagenbeck:heading', { detail: { heading: smoothedHeading } }));
  });
}

function startHeadingListener() {
  if (headingListening) return;
  window.addEventListener('deviceorientationabsolute', handleOrientation, true);
  window.addEventListener('deviceorientation', handleOrientation, true);
  headingListening = true;
}

async function enableAutoHeading() {
  let granted = true;
  try {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      granted = (await DeviceOrientationEvent.requestPermission()) === 'granted';
    }
  } catch {
    granted = false;
  }
  if (!granted || typeof DeviceOrientationEvent === 'undefined') {
    autoHeading = false;
    saveAutoHeading();
    updateControls();
    return false;
  }
  autoHeading = true;
  smoothedHeading = null;
  saveAutoHeading();
  startHeadingListener();
  updateControls();
  return true;
}

function disableAutoHeading() {
  autoHeading = false;
  smoothedHeading = null;
  saveAutoHeading();
  updateControls();
}

window.hagenbeckEnableAutoHeading = enableAutoHeading;
window.hagenbeckDisableAutoHeading = disableAutoHeading;
window.hagenbeckMapRotation = rotation;

function injectStyles() {
  if (document.querySelector('#map-rotation-styles')) return;
  const style = document.createElement('style');
  style.id = 'map-rotation-styles';
  style.textContent = `
    .map-stage > svg {
      transform-origin: 50% 50%;
      transition: transform .18s linear;
      overflow: visible;
      will-change: transform;
      --map-counter-rotation: 0deg;
    }
    .marker text {
      transform-box: fill-box;
      transform-origin: center;
      transform: rotate(var(--map-counter-rotation));
      transition: transform .18s linear;
    }
    .rotation-button { position: relative; overflow: visible; }
    .rotation-button.auto-heading.active {
      border-color: rgba(155,211,94,.72);
      background: rgba(155,211,94,.2);
      color: #dff7bf;
      box-shadow: 0 0 0 2px rgba(155,211,94,.1);
    }
    .auto-heading { display:grid; place-items:center; line-height:1; }
    .auto-heading b { font-size:.61rem; letter-spacing:.04em; }
    .auto-heading span { font-size:1rem; }
    .north-compass { display:grid; place-items:center; gap:0; line-height:1; font-weight:900; }
    .north-compass__arrow {
      display:block;
      font-size:1rem;
      transform-origin:50% 70%;
      transition:transform .18s linear;
    }
    .north-compass__letter { display:block; margin-top:1px; font-size:.64rem; letter-spacing:.04em; }
    .rotation-degree {
      position:absolute;
      right:calc(100% + 8px);
      top:50%;
      transform:translateY(-50%);
      min-width:46px;
      padding:5px 7px;
      border:1px solid rgba(255,255,255,.12);
      border-radius:999px;
      background:rgba(7,17,12,.86);
      color:rgba(255,255,255,.78);
      font-size:.7rem;
      pointer-events:none;
      backdrop-filter:blur(12px);
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
  left.textContent = '↶';

  const right = document.createElement('button');
  right.type = 'button';
  right.className = 'rotation-button';
  right.dataset.mapRotate = 'right';
  right.setAttribute('aria-label', 'Karte nach rechts drehen');
  right.textContent = '↷';

  const auto = document.createElement('button');
  auto.type = 'button';
  auto.className = 'rotation-button auto-heading';
  auto.dataset.mapRotate = 'auto';
  auto.setAttribute('aria-label', 'Karte mit dem Handy ausrichten');
  auto.innerHTML = '<span aria-hidden="true">🧭</span><b>AUTO</b>';

  const north = document.createElement('button');
  north.type = 'button';
  north.className = 'rotation-button north-compass';
  north.dataset.mapRotate = 'north';
  north.setAttribute('aria-label', 'Karte nach Norden ausrichten');
  north.innerHTML = `
    <span class="north-compass__arrow" aria-hidden="true">▲</span>
    <span class="north-compass__letter">N</span>
    <span class="rotation-degree" aria-hidden="true"></span>
  `;

  tools.append(left, right, auto, north);

  left.addEventListener('click', event => {
    event.stopPropagation();
    setRotation(rotation - STEP);
  });
  right.addEventListener('click', event => {
    event.stopPropagation();
    setRotation(rotation + STEP);
  });
  auto.addEventListener('click', async event => {
    event.stopPropagation();
    if (autoHeading) disableAutoHeading();
    else await enableAutoHeading();
  });
  north.addEventListener('click', event => {
    event.stopPropagation();
    disableAutoHeading();
    setRotation(0, { manual: false });
  });
  updateControls();
}

function updateControls() {
  const auto = document.querySelector('[data-map-rotate="auto"]');
  if (auto) {
    auto.classList.toggle('active', autoHeading);
    auto.setAttribute('aria-pressed', String(autoHeading));
    auto.setAttribute('aria-label', autoHeading ? 'Automatische Kartenausrichtung ausschalten' : 'Karte mit dem Handy ausrichten');
  }
}

function applyRotation() {
  if (applying) return;
  applying = true;
  requestAnimationFrame(() => {
    const svg = document.querySelector('.map-stage > svg');
    if (svg) {
      svg.style.transform = `rotate(${rotation}deg)`;
      svg.style.setProperty('--map-counter-rotation', `${-rotation}deg`);
    }

    const arrow = document.querySelector('.north-compass__arrow');
    if (arrow) arrow.style.transform = `rotate(${rotation}deg)`;

    const degree = document.querySelector('.rotation-degree');
    if (degree) degree.textContent = autoHeading ? 'AUTO' : rotation === 0 ? 'Nord' : `${Math.abs(Math.round(rotation))}°`;

    const compass = document.querySelector('[data-map-rotate="north"]');
    if (compass) compass.setAttribute('aria-label', rotation === 0 ? 'Karte ist nach Norden ausgerichtet' : 'Karte nach Norden ausrichten');
    updateControls();
    publishRotation();
    applying = false;
  });
}

function enhanceMap() {
  injectStyles();
  ensureControls();
  applyRotation();
}

const observer = new MutationObserver(enhanceMap);
observer.observe(document.documentElement, { childList:true, subtree:true });
window.addEventListener('DOMContentLoaded', enhanceMap);
window.addEventListener('load', () => {
  if (autoHeading) startHeadingListener();
});
enhanceMap();
