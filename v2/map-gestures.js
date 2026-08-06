const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STORAGE_KEY = 'hagenbeck-v24-map-camera';
const ZOOM_FACTOR = 1.28;

let camera = loadCamera();
let frame = 0;
let viewport = null;
let stage = null;
let pointers = new Map();
let gesture = null;
let moved = false;
let lastTap = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function loadCamera() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      x: Number.isFinite(Number(stored.x)) ? Number(stored.x) : 0,
      y: Number.isFinite(Number(stored.y)) ? Number(stored.y) : 0,
      scale: Number.isFinite(Number(stored.scale)) ? clamp(Number(stored.scale), MIN_SCALE, MAX_SCALE) : 1
    };
  } catch {
    return { x: 0, y: 0, scale: 1 };
  }
}

function saveCamera() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(camera)); } catch {}
}

function cameraLimits() {
  if (!viewport) return { x: 0, y: 0 };
  const rect = viewport.getBoundingClientRect();
  return {
    x: Math.max(0, rect.width * (camera.scale - 1) / 2),
    y: Math.max(0, rect.height * (camera.scale - 1) / 2)
  };
}

function constrain() {
  camera.scale = clamp(camera.scale, MIN_SCALE, MAX_SCALE);
  const limits = cameraLimits();
  camera.x = clamp(camera.x, -limits.x, limits.x);
  camera.y = clamp(camera.y, -limits.y, limits.y);
  if (Math.abs(camera.x) < .5) camera.x = 0;
  if (Math.abs(camera.y) < .5) camera.y = 0;
}

function draw({ animate = false, persist = true } = {}) {
  if (!stage) return;
  constrain();
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    stage.style.transition = animate ? 'transform .24s cubic-bezier(.2,.8,.2,1)' : 'none';
    stage.style.transform = `translate3d(${camera.x}px,${camera.y}px,0) scale(${camera.scale})`;
    if (persist) saveCamera();
    window.dispatchEvent(new CustomEvent('hagenbeck:map-transform', { detail: { ...camera } }));
  });
}

function pointFromEvent(event) {
  const rect = viewport.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function zoomAt(nextScale, focus, animate = false) {
  const previous = camera.scale;
  nextScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
  if (Math.abs(nextScale - previous) < .001) return;
  const rect = viewport.getBoundingClientRect();
  const center = { x: rect.width / 2, y: rect.height / 2 };
  const ratio = nextScale / previous;
  camera.x = focus.x - center.x - (focus.x - center.x - camera.x) * ratio;
  camera.y = focus.y - center.y - (focus.y - center.y - camera.y) * ratio;
  camera.scale = nextScale;
  draw({ animate });
}

function resetCamera() {
  camera = { x: 0, y: 0, scale: 1 };
  draw({ animate: true });
}

function startGesture() {
  const values = [...pointers.values()];
  moved = false;
  if (values.length === 1) {
    gesture = { type: 'pan', start: values[0], x: camera.x, y: camera.y };
  } else if (values.length >= 2) {
    const a = values[0], b = values[1];
    gesture = {
      type: 'pinch',
      distance: Math.max(1, distance(a, b)),
      midpoint: midpoint(a, b),
      scale: camera.scale,
      x: camera.x,
      y: camera.y
    };
  }
}

function isUiTarget(target) {
  return Boolean(target.closest('.filters,.tools,.map-status,.bottom-nav,.sheet,.animal-modal'));
}

function onPointerDown(event) {
  if (isUiTarget(event.target)) return;
  viewport.setPointerCapture?.(event.pointerId);
  pointers.set(event.pointerId, pointFromEvent(event));
  startGesture();
}

function onPointerMove(event) {
  if (!pointers.has(event.pointerId) || !gesture) return;
  event.preventDefault();
  pointers.set(event.pointerId, pointFromEvent(event));
  const values = [...pointers.values()];

  if (values.length >= 2) {
    if (gesture.type !== 'pinch') startGesture();
    const a = values[0], b = values[1];
    const currentMid = midpoint(a, b);
    const nextScale = clamp(gesture.scale * distance(a, b) / gesture.distance, MIN_SCALE, MAX_SCALE);
    const ratio = nextScale / gesture.scale;
    camera.scale = nextScale;
    camera.x = currentMid.x - gesture.midpoint.x + gesture.x * ratio;
    camera.y = currentMid.y - gesture.midpoint.y + gesture.y * ratio;
    moved = true;
    draw({ persist: false });
    return;
  }

  const current = values[0];
  if (gesture.type !== 'pan') startGesture();
  const dx = current.x - gesture.start.x;
  const dy = current.y - gesture.start.y;
  if (Math.hypot(dx, dy) > 4) moved = true;
  camera.x = gesture.x + dx;
  camera.y = gesture.y + dy;
  draw({ persist: false });
}

function onPointerUp(event) {
  if (!pointers.has(event.pointerId)) return;
  pointers.delete(event.pointerId);
  try { viewport.releasePointerCapture?.(event.pointerId); } catch {}
  if (pointers.size) startGesture();
  else {
    gesture = null;
    draw({ animate: true });
  }
}

function onClickCapture(event) {
  if (!moved) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  moved = false;
}

function onDoubleTap(event) {
  if (isUiTarget(event.target)) return;
  const now = Date.now();
  if (now - lastTap < 320) {
    event.preventDefault();
    zoomAt(camera.scale * 1.65, pointFromEvent(event), true);
    lastTap = 0;
  } else lastTap = now;
}

function handleTool(event) {
  const button = event.target.closest('.map .tools [data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (!['zoom-in','zoom-out','reset-map'].includes(action)) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const rect = viewport.getBoundingClientRect();
  const center = { x: rect.width / 2, y: rect.height / 2 };
  if (action === 'reset-map') resetCamera();
  else zoomAt(camera.scale * (action === 'zoom-in' ? ZOOM_FACTOR : 1 / ZOOM_FACTOR), center, true);
}

function attach() {
  const nextViewport = document.querySelector('#viewport.map');
  const nextStage = document.querySelector('#mapStage');
  if (!nextViewport || !nextStage || nextViewport.dataset.mapEngine === 'google-like-v2') return;
  viewport = nextViewport;
  stage = nextStage;
  viewport.dataset.mapEngine = 'google-like-v2';
  stage.style.willChange = 'transform';
  stage.style.transformOrigin = '50% 50%';

  viewport.addEventListener('pointerdown', onPointerDown, { passive: true });
  viewport.addEventListener('pointermove', onPointerMove, { passive: false });
  viewport.addEventListener('pointerup', onPointerUp, { passive: true });
  viewport.addEventListener('pointercancel', onPointerUp, { passive: true });
  viewport.addEventListener('click', onClickCapture, true);
  viewport.addEventListener('pointerup', onDoubleTap, { passive: false });
  viewport.addEventListener('wheel', event => {
    if (isUiTarget(event.target)) return;
    event.preventDefault();
    zoomAt(camera.scale * Math.exp(-event.deltaY * .0015), pointFromEvent(event));
  }, { passive: false });

  draw({ animate: true });
}

document.addEventListener('click', handleTool, true);
window.addEventListener('resize', () => draw({ animate: true, persist: false }));
window.addEventListener('orientationchange', () => setTimeout(() => draw({ animate: true, persist: false }), 150));
window.addEventListener('hagenbeck:map-rotation', () => draw({ animate: true, persist: false }));

const style = document.createElement('style');
style.textContent = `
  #viewport.map { touch-action:none; overscroll-behavior:contain; user-select:none; overflow:hidden!important; }
  #viewport.map .map-stage { inset:0; transform-origin:50% 50%!important; transition:none; }
  #viewport.map .map-stage>svg { width:100%; height:100%; }
  #viewport.map[data-map-engine="google-like-v2"] { cursor:grab; }
  #viewport.map[data-map-engine="google-like-v2"]:active { cursor:grabbing; }
`;
document.head.appendChild(style);

const observer = new MutationObserver(attach);
observer.observe(document.documentElement, { childList:true, subtree:true });
attach();
