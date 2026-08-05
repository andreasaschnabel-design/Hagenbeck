const STORAGE_KEY = 'hagenbeck-v24';
const NAV_TARGET_KEY = 'hagenbeck-v24-navigation-target';

function hasActiveRoute() {
  try {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return Array.isArray(state.route) && state.route.length > 1;
  } catch {
    return false;
  }
}

function clearRouteState() {
  try {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    state.route = [];
    state.tour = null;
    state.selected = null;
    state.view = 'map';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Bei blockiertem Speicher wird die Seite trotzdem neu geladen.
  }
}

function cancelRoute() {
  const trackedNavigation = Boolean(sessionStorage.getItem(NAV_TARGET_KEY));
  if (trackedNavigation) {
    window.dispatchEvent(new CustomEvent('hagenbeck:route-cancel'));
    return;
  }
  clearRouteState();
  window.location.reload();
}

function makeButton(className = '') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `route-cancel ${className}`.trim();
  button.textContent = 'Route beenden';
  button.setAttribute('aria-label', 'Aktive Route beenden');
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    cancelRoute();
  });
  return button;
}

function enhanceRouteControls() {
  if (!hasActiveRoute()) return;

  const status = document.querySelector('.map-status');
  if (status && !status.querySelector('.route-cancel')) {
    status.appendChild(makeButton('route-cancel--status'));
  }

  const sheetActions = document.querySelector('.sheet-actions');
  if (sheetActions && !sheetActions.querySelector('.route-cancel')) {
    sheetActions.appendChild(makeButton('route-cancel--sheet'));
  }
}

const style = document.createElement('style');
style.textContent = `
  .route-cancel {
    min-height: 40px;
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 13px;
    background: rgba(255,255,255,.08);
    color: #fff;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
  }
  .route-cancel--status {
    margin-top: 10px;
    padding: 0 12px;
    justify-self: start;
  }
  .route-cancel--sheet {
    grid-column: 1 / -1;
    width: 100%;
  }
`;
document.head.appendChild(style);

const observer = new MutationObserver(enhanceRouteControls);
observer.observe(document.documentElement, { childList: true, subtree: true });
enhanceRouteControls();
