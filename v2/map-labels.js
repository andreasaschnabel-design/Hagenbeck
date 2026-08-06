import { STATIONEN } from '../app/data.js';

const LAYER_CLASS = 'map-station-label-layer';
const stationNames = new Map(STATIONEN.map(station => [station.id, station.name]));
let frame = 0;
let appObserver = null;

function makeBox(left, top, width, height) {
  return { left, top, right: left + width, bottom: top + height, width, height };
}

function overlap(a, b) {
  const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return width * height;
}

function expand(value, amount) {
  return makeBox(
    value.left - amount,
    value.top - amount,
    value.width + amount * 2,
    value.height + amount * 2
  );
}

function ensureLayer(map) {
  let layer = map.querySelector(`.${LAYER_CLASS}`);
  if (!layer) {
    layer = document.createElement('div');
    layer.className = LAYER_CLASS;
    layer.setAttribute('aria-hidden', 'true');
    map.appendChild(layer);
  }
  return layer;
}

function visibleMarkers(mapRect) {
  return [...document.querySelectorAll('main.map .map-stage .marker[data-station]')]
    .map(marker => {
      const rect = marker.getBoundingClientRect();
      return {
        id: marker.dataset.station,
        name: stationNames.get(marker.dataset.station) || marker.dataset.station || 'Station',
        rect: makeBox(
          rect.left - mapRect.left,
          rect.top - mapRect.top,
          rect.width,
          rect.height
        )
      };
    })
    .filter(marker =>
      marker.rect.width > 0 &&
      marker.rect.height > 0 &&
      marker.rect.right > 0 &&
      marker.rect.bottom > 0 &&
      marker.rect.left < mapRect.width &&
      marker.rect.top < mapRect.height
    );
}

function controlObstacles(map, mapRect) {
  return [...map.querySelectorAll('.filters, .tools, .map-status')]
    .map(element => element.getBoundingClientRect())
    .filter(rect => rect.width > 0 && rect.height > 0)
    .map(rect => makeBox(
      rect.left - mapRect.left,
      rect.top - mapRect.top,
      rect.width,
      rect.height
    ));
}

function candidates(marker, width, height) {
  const gap = 15;
  const centerX = marker.rect.left + marker.rect.width / 2;
  const centerY = marker.rect.top + marker.rect.height / 2;
  const radiusX = marker.rect.width / 2;
  const radiusY = marker.rect.height / 2;

  return [
    { side: 'right', left: centerX + radiusX + gap, top: centerY - height / 2 },
    { side: 'left', left: centerX - radiusX - gap - width, top: centerY - height / 2 },
    { side: 'top', left: centerX - width / 2, top: centerY - radiusY - gap - height },
    { side: 'bottom', left: centerX - width / 2, top: centerY + radiusY + gap },
    { side: 'top-right', left: centerX + radiusX + 9, top: centerY - radiusY - height - 9 },
    { side: 'top-left', left: centerX - radiusX - width - 9, top: centerY - radiusY - height - 9 },
    { side: 'bottom-right', left: centerX + radiusX + 9, top: centerY + radiusY + 9 },
    { side: 'bottom-left', left: centerX - radiusX - width - 9, top: centerY + radiusY + 9 }
  ];
}

function scoreCandidate(candidate, width, height, mapRect, used, obstacles, markers, ownMarker) {
  const value = makeBox(candidate.left, candidate.top, width, height);
  const margin = 8;
  let score = 0;

  if (value.left < margin) score += (margin - value.left) * 1000;
  if (value.top < margin) score += (margin - value.top) * 1000;
  if (value.right > mapRect.width - margin) score += (value.right - mapRect.width + margin) * 1000;
  if (value.bottom > mapRect.height - margin) score += (value.bottom - mapRect.height + margin) * 1000;

  for (const label of used) score += overlap(expand(value, 4), label) * 140;
  for (const obstacle of obstacles) score += overlap(expand(value, 5), obstacle) * 180;
  for (const marker of markers) {
    if (marker === ownMarker) continue;
    score += overlap(expand(value, 3), expand(marker.rect, 7)) * 220;
  }

  return { ...candidate, value, score };
}

function connector(marker, label) {
  const markerX = marker.rect.left + marker.rect.width / 2;
  const markerY = marker.rect.top + marker.rect.height / 2;
  const labelX = Math.max(label.left, Math.min(markerX, label.right));
  const labelY = Math.max(label.top, Math.min(markerY, label.bottom));
  const dx = labelX - markerX;
  const dy = labelY - markerY;

  return {
    left: markerX,
    top: markerY,
    width: Math.hypot(dx, dy),
    angle: Math.atan2(dy, dx) * 180 / Math.PI
  };
}

function renderLabels() {
  frame = 0;
  const map = document.querySelector('main.map');
  if (!map) return;

  const mapRect = map.getBoundingClientRect();
  if (!mapRect.width || !mapRect.height) return;

  const layer = ensureLayer(map);
  layer.replaceChildren();

  const markers = visibleMarkers(mapRect);
  const obstacles = controlObstacles(map, mapRect);
  const used = [];

  markers
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left)
    .forEach(marker => {
      const label = document.createElement('div');
      label.className = 'map-station-label';
      label.dataset.station = marker.id;
      label.textContent = marker.name;
      layer.appendChild(label);

      const natural = label.getBoundingClientRect();
      const maximum = window.innerWidth <= 430 ? 138 : 176;
      const width = Math.min(Math.max(natural.width, 78), maximum);
      label.style.width = `${width}px`;
      const height = label.getBoundingClientRect().height;

      const best = candidates(marker, width, height)
        .map(candidate => scoreCandidate(candidate, width, height, mapRect, used, obstacles, markers, marker))
        .sort((a, b) => a.score - b.score)[0];

      label.style.left = `${best.value.left}px`;
      label.style.top = `${best.value.top}px`;
      used.push(best.value);

      const lineData = connector(marker, best.value);
      const line = document.createElement('span');
      line.className = 'map-station-label-line';
      line.style.left = `${lineData.left}px`;
      line.style.top = `${lineData.top}px`;
      line.style.width = `${lineData.width}px`;
      line.style.transform = `rotate(${lineData.angle}deg)`;
      layer.insertBefore(line, label);
    });
}

function schedule() {
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(renderLabels);
}

function observeApp() {
  const app = document.getElementById('app');
  if (!app || appObserver) return;
  appObserver = new MutationObserver(schedule);
  appObserver.observe(app, { childList: true, subtree: true });
}

const style = document.createElement('style');
style.id = 'map-station-label-styles';
style.textContent = `
  main.map {
    position: relative;
    isolation: isolate;
  }
  main.map .map-stage .marker text.label,
  main.map .map-stage .marker > text.label {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  main.map .map-stage { z-index: 1; }
  main.map .map-station-label-layer {
    position: absolute;
    z-index: 30;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  main.map .filters,
  main.map .tools,
  main.map .map-status {
    z-index: 60 !important;
  }
  .map-station-label {
    position: absolute;
    box-sizing: border-box;
    min-height: 25px;
    max-width: 176px;
    padding: 5px 9px 6px;
    border: 1px solid rgba(255,255,255,.25);
    border-radius: 9px;
    background: rgba(4,15,10,.94);
    color: #fff;
    font-size: 11px;
    font-weight: 900;
    line-height: 1.18;
    text-align: center;
    white-space: normal;
    overflow-wrap: anywhere;
    box-shadow: 0 6px 18px rgba(0,0,0,.5);
    backdrop-filter: blur(10px);
  }
  .map-station-label-line {
    position: absolute;
    z-index: -1;
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,.8);
    box-shadow: 0 0 0 1px rgba(0,0,0,.4);
    transform-origin: 0 50%;
  }
  @media (max-width: 430px) {
    .map-station-label {
      max-width: 138px;
      min-height: 23px;
      padding: 4px 7px 5px;
      font-size: 10px;
    }
  }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => {
  observeApp();
  schedule();
});
window.addEventListener('load', schedule);
window.addEventListener('resize', schedule);
window.addEventListener('orientationchange', schedule);
window.addEventListener('hagenbeck:heading', schedule);
window.addEventListener('hagenbeck:map-transform', schedule);
document.addEventListener('wheel', schedule, { passive: true, capture: true });
document.addEventListener('touchmove', schedule, { passive: true, capture: true });
document.addEventListener('pointermove', event => {
  if (event.buttons) schedule();
}, { passive: true, capture: true });

observeApp();
schedule();
