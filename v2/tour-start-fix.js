import { STATIONEN, TOUREN } from '../app/data.js';
import * as GEO from '../app/mapgeo.js';

const STORAGE_KEY = 'hagenbeck-v24';
const SESSION = {
  start: 'hagenbeck-v24-navigation-start',
  target: 'hagenbeck-v24-navigation-target',
  walked: 'hagenbeck-v24-navigation-walked',
  lastPoint: 'hagenbeck-v24-navigation-last-point',
  summary: 'hagenbeck-v24-last-summary',
  queue: 'hagenbeck-v24-navigation-queue',
  index: 'hagenbeck-v24-navigation-index',
  tour: 'hagenbeck-v24-navigation-tour',
  arrival: 'hagenbeck-v24-navigation-arrival'
};

const validStationIds = new Set(STATIONEN.map(station => station.id));

function readState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

function writeState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch {}
}

function stationId(stop) {
  if (typeof stop === 'string') return stop;
  if (stop && typeof stop === 'object') return stop.id || stop.station || stop.stationId || null;
  return null;
}

function tourTargets(selectedTour) {
  const source = selectedTour?.stationen || selectedTour?.route || selectedTour?.stopps || selectedTour?.stops || [];
  const ids = source
    .map(stationId)
    .filter(id => typeof id === 'string' && validStationIds.has(id));

  const unique = [...new Set(ids)];
  const withoutEntrance = unique.filter(id => id !== 'haupteingang');
  return withoutEntrance.length ? withoutEntrance : unique;
}

function toMapPosition(position) {
  return {
    x: ((position.coords.longitude - GEO.OSM_BOUNDS.west) / (GEO.OSM_BOUNDS.ost - GEO.OSM_BOUNDS.west)) * 100,
    y: ((GEO.OSM_BOUNDS.nord - position.coords.latitude) / (GEO.OSM_BOUNDS.nord - GEO.OSM_BOUNDS.sued)) * GEO.MASS.h
  };
}

function showMessage(text, isError = false) {
  let banner = document.querySelector('#mobile-navigation-message');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'mobile-navigation-message';
    banner.className = 'mobile-navigation-message';
    document.body.appendChild(banner);
  }
  banner.textContent = text;
  banner.classList.toggle('error', isError);
  banner.classList.add('show');
  clearTimeout(showMessage.timer);
  showMessage.timer = setTimeout(() => banner.classList.remove('show'), 3600);
}

function clearOldNavigationSession() {
  sessionStorage.removeItem(SESSION.summary);
  sessionStorage.removeItem(SESSION.arrival);
  sessionStorage.removeItem(SESSION.lastPoint);
  sessionStorage.setItem(SESSION.walked, '0');
}

function storeTourNavigation(position, selectedTour, queue) {
  const mapPosition = toMapPosition(position);
  const target = queue[0];
  const state = readState();

  state.location = mapPosition;
  state.route = ['haupteingang', target];
  state.tour = selectedTour.id;
  state.selected = null;
  state.view = 'map';
  writeState(state);

  sessionStorage.setItem(SESSION.start, JSON.stringify(mapPosition));
  sessionStorage.setItem(SESSION.target, target);
  sessionStorage.setItem(SESSION.queue, JSON.stringify(queue));
  sessionStorage.setItem(SESSION.index, '0');
  sessionStorage.setItem(SESSION.tour, selectedTour.id);
  sessionStorage.setItem(SESSION.lastPoint, JSON.stringify({
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    accuracy: position.coords.accuracy || 999,
    time: position.timestamp || Date.now()
  }));
}

function startTour(selectedTour) {
  const queue = tourTargets(selectedTour);
  if (!queue.length) {
    showMessage(`Die Ziele der Tour „${selectedTour?.titel || 'Tour'}“ konnten nicht gelesen werden.`, true);
    return;
  }
  if (!navigator.geolocation) {
    showMessage('Standort ist auf diesem Gerät nicht verfügbar.', true);
    return;
  }

  clearOldNavigationSession();
  try { window.hagenbeckEnableAutoHeading?.(); } catch {}
  showMessage(`Tour startet mit ${queue.length} Zielen …`);

  navigator.geolocation.getCurrentPosition(position => {
    storeTourNavigation(position, selectedTour, queue);
    window.location.reload();
  }, error => {
    const text = error.code === 1
      ? 'Standortfreigabe fehlt. Bitte in den Handy-Einstellungen für Safari beziehungsweise Chrome erlauben.'
      : 'Standort konnte nicht bestimmt werden. Bitte erneut versuchen.';
    showMessage(text, true);
  }, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 15000
  });
}

function interceptTourStart(event) {
  const button = event.target.closest('[data-tour]');
  if (!button?.dataset.tour) return;

  const selectedTour = TOUREN.find(tour => tour.id === button.dataset.tour);
  if (!selectedTour) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  startTour(selectedTour);
}

document.addEventListener('click', interceptTourStart, true);
