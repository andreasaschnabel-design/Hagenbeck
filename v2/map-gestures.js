const MIN_SCALE = 0.78;
const MAX_SCALE = 2.8;

let frame = 0;
let gesture = null;
let state = { x: 0, y: 0, scale: 1 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function readStage(stage) {
  const match = stage.style.transform.match(/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)\s*scale\(([\d.]+)\)/);
  if (match) {
    state = { x: Number(match[1]), y: Number(match[2]), scale: Number(match[3]) };
  }
}

function draw(stage) {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    stage.style.transition = 'none';
    stage.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
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

function zoomAround(stage, viewport, nextScale, point) {
  const previousScale = state.scale;
  if (nextScale === previousScale) return;
  const ratio = nextScale / previousScale;
  state.x = point.x - (point.x - state.x) * ratio;
  state.y = point.y - (point.y - state.y) * ratio;
  state.scale = nextScale;
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
    zoomAround(stage, viewport, clamp(state.scale * factor, MIN_SCALE, MAX_SCALE), point);
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

  // Safari-spezifischen Seitenzoom innerhalb der Karte unterbinden.
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(type => {
    viewport.addEventListener(type, event => event.preventDefault(), { passive: false });
  });
}

const style = document.createElement('style');
style.textContent = `
  #viewport.map { touch-action: none; overscroll-behavior: contain; }
  #viewport.map .map-stage { transition: none !important; transform-origin: 0 0; }
`;
document.head.appendChild(style);

const observer = new MutationObserver(attach);
observer.observe(document.documentElement, { childList: true, subtree: true });
attach();
