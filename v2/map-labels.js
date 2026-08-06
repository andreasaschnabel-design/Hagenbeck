import { STATIONEN } from '../app/data.js';

const LAYER_ID = 'map-label-overlay';
const names = new Map(STATIONEN.map(station => [station.id, station.name]));
let frame = 0;
let appObserver = null;

function box(left, top, width, height) {
  return { left, top, right: left + width, bottom: top + height, width, height };
}

function overlap(a, b) {
  const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return width * height;
}

function expand(value, amount) {
  return box(value.left - amount, value.top - amount, value.width + amount * 2, value.height + amount * 2);
}

function ensureLayer() {
  let layer = document.getElementById(LAYER_ID);
  if (!layer) {
    layer = document.createElement('div');
    layer.id = LAYER_ID;
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
  }
  return layer;
}

function markerItems(mapRect) {
  return [...document.querySelectorAll('main.map .map-stage .marker[data-station]')]
    .map(marker => {
      const rect = marker.getBoundingClientRect();
      return {
        id: marker.dataset.station,
        name: names.get(marker.dataset.station) || marker.dataset.station || 'Station',
        rect,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2
      };
    })
    .filter(item =>
      item.rect.width > 0 &&
      item.rect.height > 0 &&
      item.centerX >= mapRect.left &&
      item.centerX <= mapRect.right &&
      item.centerY >= mapRect.top &&
      item.centerY <= mapRect.bottom
    );
}

function obstacles(map) {
  return [...map.querySelectorAll('.filters, .tools, .map-status')]
    .map(element => element.getBoundingClientRect())
    .filter(rect => rect.width > 0 && rect.height > 0)
    .map(rect => box(rect.left, rect.top, rect.width, rect.height));
}

function candidates(marker, width, height) {
  const gap = 16;
  const radiusX = marker.rect.width / 2;
  const radiusY = marker.rect.height / 2;
  const x = marker.centerX;
  const y = marker.centerY;
  return [
    { side: 'right', left: x + radiusX + gap, top: y - height / 2 },
    { side: 'left', left: x - radiusX - gap - width, top: y - height / 2 },
    { side: 'top', left: x - width / 2, top: y - radiusY - gap - height },
    { side: 'bottom', left: x - width / 2, top: y + radiusY + gap },
    { side: 'top-right', left: x + radiusX + 10, top: y - radiusY - height - 10 },
    { side: 'top-left', left: x - radiusX - width - 10, top: y - radiusY - height - 10 },
    { side: 'bottom-right', left: x + radiusX + 10, top: y + radiusY + 10 },
    { side: 'bottom-left', left: x - radiusX - width - 10, top: y + radiusY + 10 }
  ];
}

function score(candidate, width, height, mapRect, used, fixedObstacles, allMarkers, ownMarker) {
  const value = box(candidate.left, candidate.top, width, height);
  let result = 0;
  const margin = 8;

  if (value.left < mapRect.left + margin) result += (mapRect.left + margin - value.left) * 1000;
  if (value.top < mapRect.top + margin) result += (mapRect.top + margin - value.top) * 1000;
  if (value.right > mapRect.right - margin) result += (value.right - (mapRect.right - margin)) * 1000;
  if (value.bottom > mapRect.bottom - margin) result += (value.bottom - (mapRect.bottom - margin)) * 1000;

  for (const other of used) result += overlap(expand(value, 5), other) * 150;
  for (const obstacle of fixedObstacles) result += overlap(expand(value, 5), obstacle) * 180;
  for (const marker of allMarkers) {
    if (marker === ownMarker) continue;
    const markerBox = box(marker.rect.left, marker.rect.top, marker.rect.width, marker.rect.height);
    result += overlap(expand(value, 4), expand(markerBox, 8)) * 220;
  }

  result += Math.hypot(value.left + width / 2 - ownMarker.centerX, value.top + height / 2 - ownMarker.centerY) * 0.15;
  return { ...candidate, value, result };
}

function connector(marker, labelBox) {
  const endX = Math.max(labelBox.left, Math.min(marker.centerX, labelBox.right));
  const endY = Math.max(labelBox.top, Math.min(marker.centerY, labelBox.bottom));
  const dx = endX - marker.centerX;
  const dy = endY - marker.centerY;
  return {
    left: marker.centerX,
    top: marker.centerY,
    width: Math.hypot(dx, dy),
    angle: Math.atan2(dy, dx) * 180 / Math.PI
  };
}

function renderLabels() {
  frame = 0;
  const map = document.querySelector('main.map');
  const layer = ensureLayer();
  if (!map) {
    layer.replaceChildren();
    layer.hidden = true;
    return;
  }

  const mapRect = map.getBoundingClientRect();
  if (!mapRect.width || !mapRect.height) return;

  layer.hidden = false;
  layer.style.clipPath = `inset(${Math.max(0, mapRect.top)}px ${Math.max(0, innerWidth - mapRect.right)}px ${Math.max(0, innerHeight - mapRect.bottom)}px ${Math.max(0, mapRect.left)}px)`;
  layer.replaceChildren();

  const markers = markerItems(mapRect);
  const fixedObstacles = obstacles(map);
  const used = [];

  for (const marker of markers.sort((a, b) => a.centerY - b.centerY || a.centerX - b.centerX)) {
    const label = document.createElement('div');
    label.className = 'map-label-overlay__label';
    label.textContent = marker.name;
    layer.appendChild(label);

    const natural = label.getBoundingClientRect();
    const width = Math.min(Math.max(natural.width, 86), innerWidth <= 430 ? 144 : 180);
    label.style.width = `${width}px`;
    const height = label.getBoundingClientRect().height;

    const best = candidates(marker, width, height)
      .map(candidate => score(candidate, width, height, mapRect, used, fixedObstacles, markers, marker))
      .sort((a, b) => a.result - b.result)[0];

    label.style.left = `${best.value.left}px`;
    label.style.top = `${best.value.top}px`;
    label.dataset.side = best.side;
    used.push(best.value);

    const lineData = connector(marker, best.value);
    const line = document.createElement('span');
    line.className = 'map-label-overlay__line';
    line.style.left = `${lineData.left}px`;
    line.style.top = `${lineData.top}px`;
    line.style.width = `${lineData.width}px`;
    line.style.transform = `rotate(${lineData.angle}deg)`;
    layer.insertBefore(line, label);
  }
}

function schedule() {
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(renderLabels);
}

function startObserver() {
  const app = document.getElementById('app');
  if (!app || appObserver) return;
  appObserver = new MutationObserver(schedule);
  appObserver.observe(app, { childList: true, subtree: true });
}

const style = document.createElement('style');
style.id = 'map-label-overlay-styles';
style.textContent = `
  main.map .map-stage .marker text.label,
  main.map .map-stage .marker > text.label {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  main.map { isolation: isolate; }
  main.map .map-stage { position: relative; z-index: 1; }
  main.map .filters,
  main.map .tools,
  main.map .map-status { z-index: 90 !important; }
  #${LAYER_ID} {
    position: fixed;
    z-index: 70;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .map-label-overlay__label {
    position: fixed;
    box-sizing: border-box;
    min-height: 26px;
    max-width: 180px;
    padding: 5px 9px 6px;
    border: 1px solid rgba(255,255,255,.24);
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
  .map-label-overlay__line {
    position: fixed;
    z-index: -1;
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,.78);
    box-shadow: 0 0 0 1px rgba(0,0,0,.45);
    transform-origin: 0 50%;
  }
  @media (max-width: 430px) {
    .map-label-overlay__label {
      max-width: 144px;
      min-height: 24px;
      padding: 4px 7px 5px;
      font-size: 10px;
    }
  }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => {
  startObserver();
  schedule();
});
window.addEventListener('load', schedule);
window.addEventListener('resize', schedule);
window.addEventListener('orientationchange', schedule);
window.addEventListener('hagenbeck:heading', schedule);
document.addEventListener('wheel', schedule, { passive: true, capture: true });
document.addEventListener('touchmove', schedule, { passive: true, capture: true });
document.addEventListener('pointermove', event => {
  if (event.buttons) schedule();
}, { passive: true, capture: true });

startObserver();
schedule();
