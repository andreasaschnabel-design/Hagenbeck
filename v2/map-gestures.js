const MIN_SCALE = 0.62;
const MAX_SCALE = 3.2;
const STORAGE_KEY = 'hagenbeck-v24';
const ZOOM_FACTOR = 1.22;

let frame = 0;
let gesture = null;
let state = { x: 0, y: 0, scale: 1 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function readStoredState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

function persistState() {
  try {
    const stored = readStoredState();
    stored.x = state.x;
    stored.y = state.y;
    stored.scale = state.scale;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {}
}

function readStage(stage) {
  const transform = stage.style.transform || getComputedStyle(stage).transform || '';
  const direct = transform.match(/translate(?:3d)?\((-?[\d.]+)px,\s*(-?[\d.]+)px(?:,\s*0(?:px)?)?\)\s*scale\(([\d.]+)\)/);
  if (direct) {
    state = { x: Number(direct[1]), y: Number(direct[2]), scale: Number(direct[3]) };
    return;
  }

  const stored = readStoredState();
  state = {
    x: Number.isFinite(Number(stored.x)) ? Number(stored.x) : 0,
    y: Number.isFinite(Number(stored.y)) ? Number(stored.y) : 0,
    scale: Number.isFinite(Number(stored.scale)) ? clamp(Number(stored.scale), MIN_SCALE, MAX_SCALE) : 1
  };
}

function draw(stage, persist = true) {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    stage.style.transition = 'none';
    stage.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
    if (persist) persistState();
    window.dispatchEvent(new CustomEvent('hagenbeck:map-transform', { detail: { ...state } }));
  });
}

function distance(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function midpoint(a, b, rect) {
  return {
    x: (a.clientX + b.clientX) / 2 - rect.left,
    y: (a.clientY + b.clientY) / 2 - rect.top
  };
}

function viewportCenter(viewport) {
  const rect = viewport.getBoundingClientRect();
  return { x: rect.width / 2, y: rect.height / 2 };
}

function zoomAround(stage, nextScale, point) {
  const previousScale = state.scale;
  nextScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
  if (Math.abs(nextScale - previousScale) < 0.001) return;

  const ratio = nextScale / previousScale;
  state.x = point.x - (point.x - state.x) * ratio;
  state.y = point.y - (point.y - state.y) * ratio;
  state.scale = nextScale;
  draw(stage);
}

function resetMap(stage) {
  state = { x: 0, y: 0, scale: 1 };
  draw(stage);
}

function attach() {
  const viewport = document.querySelector('#viewport.map');
  const stage = document.querySelector('#mapStage');
  if (!viewport || !stage || viewport.dataset.smoothGestures === 'true') return;

  viewport.dataset.smoothGestures = 'true';
  readStage(stage);
  stage.style.willChange = 'transform';
  stage.style.backfaceVisibility = 'hidden';

  viewport.addEventListener('wheel', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const rect = viewport.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const factor = Math.exp(-event.deltaY * 0.0014);
    zoomAround(stage, state.scale * factor, point);
  }, { passive: false, capture: true });

  viewport.addEventListener('touchstart', event => {
    if (event.touches.length !== 2) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    readStage(stage);
    const rect = viewport.getBoundingClientRect();
    gesture = {
      distance: distance(event.touches[0], event.touches[1]),
      scale: state.scale,
      midpoint: midpoint(event.touches[0], event.touches[1], rect),
      x: state.x,
      y: state.y
    };
  }, { passive: false, capture: true });

  viewport.addEventListener('touchmove', event => {
    if (!gesture || event.touches.length !== 2) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const rect = viewport.getBoundingClientRect();
    const currentMidpoint = midpoint(event.touches[0], event.touches[1], rect);
    const nextScale = clamp(
      gesture.scale * distance(event.touches[0], event.touches[1]) / gesture.distance,
      MIN_SCALE,
      MAX_SCALE
    );
    const ratio = nextScale / gesture.scale;
    state.x = currentMidpoint.x - (gesture.midpoint.x - gesture.x) * ratio;
    state.y = currentMidpoint.y - (gesture.midpoint.y - gesture.y) * ratio;
    state.scale = nextScale;
    draw(stage);
  }, { passive: false, capture: true });

  const finish = event => {
    if (!gesture) return;
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    gesture = null;
  };

  viewport.addEventListener('touchend', finish, { passive: false, capture: true });
  viewport.addEventListener('touchcancel', finish, { passive: false, capture: true });

  ['gesturestart', 'gesturechange', 'gestureend'].forEach(type => {
    viewport.addEventListener(type, event => event.preventDefault(), { passive: false });
  });
}

function handleToolClick(event) {
  const button = event.target.closest('.map .tools [data-action]');
  if (!button) return;

  const action = button.dataset.action;
  if (!['zoom-in', 'zoom-out', 'reset-map'].includes(action)) return;

  const viewport = document.querySelector('#viewport.map');
  const stage = document.querySelector('#mapStage');
  if (!viewport || !stage) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  readStage(stage);
  if (action === 'reset-map') {
    resetMap(stage);
    return;
  }

  const factor = action === 'zoom-in' ? ZOOM_FACTOR : 1 / ZOOM_FACTOR;
  zoomAround(stage, state.scale * factor, viewportCenter(viewport));
}

document.addEventListener('click', handleToolClick, true);

const style = document.createElement('style');
style.textContent = `
  #viewport.map { touch-action: none; overscroll-behavior: contain; }
  #viewport.map .map-stage {
    transition: none !important;
    transform-origin: 0 0;
  }
`;
document.head.appendChild(style);

const observer = new MutationObserver(attach);
observer.observe(document.documentElement, { childList: true, subtree: true });
attach();
