import { STATIONEN } from '../app/data.js';

const NS = 'http://www.w3.org/2000/svg';
const LAYER_CLASS = 'station-label-svg-layer';
let observer = null;
let scheduled = false;

function labelsEnabled() {
  try {
    const state = JSON.parse(localStorage.getItem('hagenbeck-v24') || '{}');
    return state.labels !== false;
  } catch {
    return true;
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

function createLabel(station, index) {
  const geometry = labelGeometry(station, index);
  const group = svgElement('g', {
    class: 'station-label-svg',
    'data-station-label': station.id,
    'pointer-events': 'none'
  });

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

function renderLabels() {
  scheduled = false;
  const svg = document.querySelector('main.map .map-stage > svg');
  if (!svg) return;

  svg.querySelector(`.${LAYER_CLASS}`)?.remove();
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
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => { watchApp(); schedule(); });
window.addEventListener('load', schedule);
window.addEventListener('hagenbeck:map-transform', schedule);
window.addEventListener('hagenbeck:heading', schedule);
document.addEventListener('click', event => {
  if (event.target.closest('[data-action="toggle-labels"]')) setTimeout(schedule, 0);
}, true);

watchApp();
schedule();
