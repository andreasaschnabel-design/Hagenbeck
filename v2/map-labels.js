import { STATIONEN } from '../app/data.js';

const LABEL_LAYER_CLASS = 'map-label-layer';
let frame = null;
let observer = null;

function stationName(id) {
  return STATIONEN.find(station => station.id === id)?.name || id || 'Station';
}

function overlapArea(a, b) {
  const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return width * height;
}

function rect(left, top, width, height) {
  return { left, top, right: left + width, bottom: top + height, width, height };
}

function expand(box, amount) {
  return rect(box.left - amount, box.top - amount, box.width + amount * 2, box.height + amount * 2);
}

function ensureLayer(map) {
  let layer = map.querySelector(`.${LABEL_LAYER_CLASS}`);
  if (!layer) {
    layer = document.createElement('div');
    layer.className = LABEL_LAYER_CLASS;
    layer.setAttribute('aria-hidden', 'true');
    map.appendChild(layer);
  }
  return layer;
}

function visibleMarkers(mapRect) {
  return [...document.querySelectorAll('.map-stage .marker')]
    .map(marker => {
      const bounds = marker.getBoundingClientRect();
      const id = marker.dataset.station;
      return {
        marker,
        id,
        name: stationName(id),
        bounds: rect(bounds.left - mapRect.left, bounds.top - mapRect.top, bounds.width, bounds.height)
      };
    })
    .filter(item => item.bounds.right > 0 && item.bounds.left < mapRect.width && item.bounds.bottom > 0 && item.bounds.top < mapRect.height);
}

function controlObstacles(map, mapRect) {
  return [...map.querySelectorAll('.filters, .tools, .map-status')]
    .map(element => element.getBoundingClientRect())
    .filter(bounds => bounds.width && bounds.height)
    .map(bounds => rect(bounds.left - mapRect.left, bounds.top - mapRect.top, bounds.width, bounds.height));
}

function candidatesFor(marker, width, height) {
  const gap = 12;
  const cx = marker.bounds.left + marker.bounds.width / 2;
  const cy = marker.bounds.top + marker.bounds.height / 2;
  const radiusX = marker.bounds.width / 2;
  const radiusY = marker.bounds.height / 2;

  return [
    { side: 'right', left: cx + radiusX + gap, top: cy - height / 2 },
    { side: 'left', left: cx - radiusX - gap - width, top: cy - height / 2 },
    { side: 'top', left: cx - width / 2, top: cy - radiusY - gap - height },
    { side: 'bottom', left: cx - width / 2, top: cy + radiusY + gap },
    { side: 'top-right', left: cx + radiusX + 8, top: cy - radiusY - height - 8 },
    { side: 'top-left', left: cx - radiusX - width - 8, top: cy - radiusY - height - 8 },
    { side: 'bottom-right', left: cx + radiusX + 8, top: cy + radiusY + 8 },
    { side: 'bottom-left', left: cx - radiusX - width - 8, top: cy + radiusY + 8 }
  ];
}

function scoreCandidate(candidate, size, mapRect, used, obstacles, markers, ownMarker) {
  const box = rect(candidate.left, candidate.top, size.width, size.height);
  let score = 0;
  const margin = 8;

  if (box.left < margin) score += (margin - box.left) * 800;
  if (box.top < margin) score += (margin - box.top) * 800;
  if (box.right > mapRect.width - margin) score += (box.right - (mapRect.width - margin)) * 800;
  if (box.bottom > mapRect.height - margin) score += (box.bottom - (mapRect.height - margin)) * 800;

  for (const other of used) score += overlapArea(expand(box, 3), other) * 80;
  for (const obstacle of obstacles) score += overlapArea(expand(box, 4), obstacle) * 120;
  for (const marker of markers) {
    if (marker === ownMarker) continue;
    score += overlapArea(expand(box, 2), expand(marker.bounds, 4)) * 100;
  }

  const ownCenterX = ownMarker.bounds.left + ownMarker.bounds.width / 2;
  const ownCenterY = ownMarker.bounds.top + ownMarker.bounds.height / 2;
  const labelCenterX = box.left + box.width / 2;
  const labelCenterY = box.top + box.height / 2;
  score += Math.hypot(labelCenterX - ownCenterX, labelCenterY - ownCenterY) * 0.2;

  return { ...candidate, box, score };
}

function connectorGeometry(marker, labelBox) {
  const mx = marker.bounds.left + marker.bounds.width / 2;
  const my = marker.bounds.top + marker.bounds.height / 2;
  const lx = Math.max(labelBox.left, Math.min(mx, labelBox.right));
  const ly = Math.max(labelBox.top, Math.min(my, labelBox.bottom));
  return { mx, my, lx, ly };
}

function layoutLabels() {
  frame = null;
  const map = document.querySelector('main.map');
  if (!map) return;

  const mapRect = map.getBoundingClientRect();
  if (!mapRect.width || !mapRect.height) return;

  const layer = ensureLayer(map);
  const markers = visibleMarkers(mapRect);
  const obstacles = controlObstacles(map, mapRect);
  const used = [];

  document.querySelectorAll('.map-stage .marker .label').forEach(label => {
    label.style.opacity = '0';
    label.style.pointerEvents = 'none';
  });

  layer.innerHTML = '';

  markers
    .sort((a, b) => a.bounds.top - b.bounds.top || a.bounds.left - b.bounds.left)
    .forEach(marker => {
      const wrapper = document.createElement('div');
      wrapper.className = 'smart-map-label';
      wrapper.dataset.station = marker.id;
      wrapper.textContent = marker.name;
      layer.appendChild(wrapper);

      const measured = wrapper.getBoundingClientRect();
      const size = {
        width: Math.min(Math.max(measured.width, 72), 176),
        height: measured.height
      };
      wrapper.style.width = `${size.width}px`;

      const best = candidatesFor(marker, size.width, size.height)
        .map(candidate => scoreCandidate(candidate, size, mapRect, used, obstacles, markers, marker))
        .sort((a, b) => a.score - b.score)[0];

      wrapper.style.left = `${best.box.left}px`;
      wrapper.style.top = `${best.box.top}px`;
      wrapper.dataset.side = best.side;
      used.push(best.box);

      const line = document.createElement('span');
      line.className = 'smart-map-label__line';
      const connector = connectorGeometry(marker, best.box);
      const dx = connector.lx - connector.mx;
      const dy = connector.ly - connector.my;
      const length = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      line.style.left = `${connector.mx}px`;
      line.style.top = `${connector.my}px`;
      line.style.width = `${length}px`;
      line.style.transform = `rotate(${angle}deg)`;
      layer.insertBefore(line, wrapper);
    });
}

function scheduleLayout() {
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(layoutLabels);
}

function start() {
  scheduleLayout();
  if (!observer) {
    observer = new MutationObserver(scheduleLayout);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'transform', 'class']
    });
  }
}

const style = document.createElement('style');
style.textContent = `
  main.map { position: relative; }
  .map-label-layer {
    position: absolute;
    z-index: 6;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .smart-map-label {
    position: absolute;
    display: block;
    box-sizing: border-box;
    min-height: 25px;
    max-width: 176px;
    padding: 5px 9px 6px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 9px;
    background: rgba(4,15,10,.9);
    color: #fff;
    font-size: 11px;
    font-weight: 900;
    line-height: 1.18;
    letter-spacing: -.01em;
    text-align: center;
    text-overflow: ellipsis;
    white-space: normal;
    overflow-wrap: anywhere;
    box-shadow: 0 5px 16px rgba(0,0,0,.42), 0 0 0 1px rgba(0,0,0,.18);
    backdrop-filter: blur(10px);
    transform: translateZ(0);
  }
  .smart-map-label__line {
    position: absolute;
    z-index: -1;
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,.7);
    box-shadow: 0 0 0 1px rgba(0,0,0,.38);
    transform-origin: 0 50%;
  }
  @media (max-width: 430px) {
    .smart-map-label {
      max-width: 138px;
      min-height: 23px;
      padding: 4px 7px 5px;
      border-radius: 8px;
      font-size: 10px;
    }
  }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', start);
window.addEventListener('load', scheduleLayout);
window.addEventListener('resize', scheduleLayout);
window.addEventListener('orientationchange', scheduleLayout);
window.addEventListener('hagenbeck:heading', scheduleLayout);
document.addEventListener('wheel', scheduleLayout, { passive: true, capture: true });
document.addEventListener('pointermove', event => {
  if (event.buttons) scheduleLayout();
}, { passive: true, capture: true });
document.addEventListener('touchmove', scheduleLayout, { passive: true, capture: true });
start();
