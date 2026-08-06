import { STATIONEN } from '../app/data.js';

const NS = 'http://www.w3.org/2000/svg';
const LAYER_CLASS = 'station-label-svg-layer';
const LABEL_KEY = 'hagenbeck-v24-labels-visible';
let observer = null;
let scheduled = false;

function labelsEnabled() {
  try {
    const explicit = localStorage.getItem(LABEL_KEY);
    if (explicit !== null) return explicit !== 'false';
    const state = JSON.parse(localStorage.getItem('hagenbeck-v24') || '{}');
    return state.labels !== false;
  } catch {
    return true;
  }
}

function saveLabelsEnabled(value) {
  try { localStorage.setItem(LABEL_KEY, String(Boolean(value))); } catch {}
}

function currentRotation() {
  if (Number.isFinite(window.hagenbeckMapRotation)) return window.hagenbeckMapRotation;
  try {
    const value = Number(localStorage.getItem('hagenbeck-v24-map-rotation'));
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function splitLabel(name) {
  const words = String(name || 'Station').split(/\s+/).filter(Boolean);
  if (words.length < 2 || name.length <= 17) return [name];

  let first = '';
  let second = '';
  for (const word of words) {
    if (!first || (first + ' ' + word).length <= 17) first = first ? `${first} ${word}` : word;
    else second = second ? `${second} ${word}` : word;
  }
  return second ? [first, second] : [first];
}

function labelGeometry(station, index) {
  const lines = splitLabel(station.name);
  const longest = Math.max(...lines.map(line => line.length));
  const width = Math.max(15, Math.min(31, longest * 1.28 + 4));
  const height = lines.length === 2 ? 7.2 : 4.9;

  const preferLeft = station.mapX > 62;
  const verticalOffset = (index % 3 - 1) * 3.2;
  let x = preferLeft ? station.mapX - 6.2 - width : station.mapX + 6.2;
  let y = station.mapY - height / 2 + verticalOffset;

  x = Math.max(1, Math.min(99 - width, x));
  y = Math.max(1, Math.min(124 - height, y));

  return { x, y, width, height, lines, preferLeft };
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(NS, name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  return element;
}

function applyCounterRotation(group, station, rotation = currentRotation()) {
  group.setAttribute('transform', `rotate(${-rotation} ${station.mapX} ${station.mapY})`);
}

function createLabel(station, index) {
  const geometry = labelGeometry(station, index);
  const group = svgElement('g', {
    class: 'station-label-svg',
    'data-station-label': station.id,
    'pointer-events': 'none'
  });
  applyCounterRotation(group, station);

  const markerX = station.mapX;
  const markerY = station.mapY;
  const targetX = geometry.preferLeft ? geometry.x + geometry.width : geometry.x;
  const targetY = geometry.y + geometry.height / 2;

  group.appendChild(svgElement('line', {
    x1: markerX,
    y1: markerY,
    x2: targetX,
    y2: targetY,
    class: 'station-label-svg__line'
  }));

  group.appendChild(svgElement('rect', {
    x: geometry.x,
    y: geometry.y,
    width: geometry.width,
    height: geometry.height,
    rx: 1.7,
    ry: 1.7,
    class: 'station-label-svg__box'
  }));

  const text = svgElement('text', {
    x: geometry.x + geometry.width / 2,
    y: geometry.y + (geometry.lines.length === 2 ? 2.65 : 3.15),
    class: 'station-label-svg__text',
    'text-anchor': 'middle'
  });

  geometry.lines.forEach((line, lineIndex) => {
    const tspan = svgElement('tspan', {
      x: geometry.x + geometry.width / 2,
      dy: lineIndex === 0 ? 0 : 2.45
    });
    tspan.textContent = line;
    text.appendChild(tspan);
  });

  group.appendChild(text);
  return group;
}

function updateCounterRotation(rotation = currentRotation()) {
  document.querySelectorAll(`.${LAYER_CLASS} [data-station-label]`).forEach(group => {
    const station = STATIONEN.find(item => item.id === group.dataset.stationLabel);
    if (station) applyCounterRotation(group, station, rotation);
  });
}

function updateToggleButton() {
  const button = document.querySelector('[data-action="toggle-labels"]');
  if (!button) return;
  const enabled = labelsEnabled();
  button.classList.toggle('active', enabled);
  button.setAttribute('aria-pressed', String(enabled));
  button.setAttribute('aria-label', enabled ? 'Stationsnamen ausblenden' : 'Stationsnamen einblenden');
}

function renderLabels() {
  scheduled = false;
  const svg = document.querySelector('main.map .map-stage > svg');
  if (!svg) return;

  svg.querySelector(`.${LAYER_CLASS}`)?.remove();
  updateToggleButton();
  if (!labelsEnabled()) return;

  const layer = svgElement('g', { class: LAYER_CLASS, 'aria-hidden': 'true' });
  STATIONEN.forEach((station, index) => layer.appendChild(createLabel(station, index)));
  svg.appendChild(layer);
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(renderLabels);
}

function watchApp() {
  const app = document.getElementById('app');
  if (!app || observer) return;
  observer = new MutationObserver(mutations => {
    const externalChange = mutations.some(mutation => {
      const target = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement;
      return !target?.closest(`.${LAYER_CLASS}`);
    });
    if (externalChange) schedule();
  });
  observer.observe(app, { childList: true, subtree: true });
}

const style = document.createElement('style');
style.textContent = `
  main.map .map-stage .marker text.label {
    display: none !important;
  }
  .station-label-svg-layer {
    pointer-events: none;
  }
  .station-label-svg {
    transition: transform .18s linear;
  }
  .station-label-svg__line {
    stroke: rgba(255,255,255,.86);
    stroke-width: .42;
    paint-order: stroke;
    filter: drop-shadow(0 .35px .45px rgba(0,0,0,.9));
  }
  .station-label-svg__box {
    fill: rgba(4,15,10,.94);
    stroke: rgba(255,255,255,.48);
    stroke-width: .32;
    filter: drop-shadow(0 .75px 1.1px rgba(0,0,0,.72));
  }
  .station-label-svg__text {
    fill: #fff;
    stroke: rgba(0,0,0,.75);
    stroke-width: .38;
    paint-order: stroke fill;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 2.05px;
    font-weight: 900;
    letter-spacing: .01em;
  }
  [data-action="toggle-labels"].active {
    border-color: rgba(155,211,94,.72) !important;
    background: rgba(155,211,94,.18) !important;
    color: #dff7bf !important;
  }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => { watchApp(); schedule(); });
window.addEventListener('load', schedule);
window.addEventListener('hagenbeck:map-transform', schedule);
window.addEventListener('hagenbeck:map-rotation', event => {
  updateCounterRotation(Number(event.detail?.rotation) || 0);
});

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action="toggle-labels"]');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  saveLabelsEnabled(!labelsEnabled());
  renderLabels();
}, true);

watchApp();
schedule();
