function enhanceCompactNavigation() {
  const map = document.querySelector('main.map');
  const status = map?.querySelector('.map-status');
  const metrics = status?.querySelector('.navigation-metrics');
  if (!map || !status || !metrics) return;

  document.body.classList.add('navigation-ui-active');
  status.classList.add('navigation-status-compact');

  const guidance = metrics.querySelector('.navigation-guidance');
  if (guidance && guidance.parentElement !== map) {
    guidance.classList.add('navigation-turn-banner');
    map.appendChild(guidance);
  }

  const cancel = status.querySelector('.route-cancel--status');
  if (cancel) {
    cancel.textContent = 'Beenden';
    cancel.setAttribute('aria-label', 'Navigation beenden');
  }
}

const style = document.createElement('style');
style.textContent = `
  body.navigation-ui-active .map-status.navigation-status-compact {
    position: fixed;
    z-index: 72;
    left: 50%;
    right: auto;
    bottom: calc(88px + env(safe-area-inset-bottom));
    width: min(360px, calc(100vw - 28px));
    max-width: none;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 20px;
    background: rgba(7,17,12,.94);
    box-shadow: 0 12px 34px rgba(0,0,0,.38);
  }

  body.navigation-ui-active .map-status.navigation-status-compact > :not(.navigation-metrics):not(.route-cancel) {
    display: none !important;
  }

  body.navigation-ui-active .navigation-status-compact .navigation-metrics {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 14px;
    margin: 0;
    padding: 0;
    border: 0;
  }

  body.navigation-ui-active .navigation-status-compact .navigation-metrics > div {
    display: grid;
    min-width: 0;
  }

  body.navigation-ui-active .navigation-status-compact .navigation-metrics small {
    font-size: .61rem;
    line-height: 1.1;
    color: #9eb0a3;
  }

  body.navigation-ui-active .navigation-status-compact .navigation-metrics strong {
    font-size: 1.02rem;
    line-height: 1.15;
  }

  body.navigation-ui-active .navigation-status-compact .navigation-awake {
    display: none !important;
  }

  body.navigation-ui-active .navigation-status-compact .route-cancel--status {
    width: auto;
    min-width: 68px;
    min-height: 42px;
    margin: 0;
    padding: 0 11px;
    border-radius: 14px;
    font-size: .76rem;
    white-space: nowrap;
  }

  body.navigation-ui-active .navigation-turn-banner {
    position: fixed;
    z-index: 71;
    top: calc(138px + env(safe-area-inset-top));
    left: 14px;
    right: 76px;
    min-height: 70px;
    display: grid !important;
    grid-template-columns: 56px 1fr;
    align-items: center;
    gap: 11px;
    padding: 9px 12px;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 20px;
    background: rgba(17,35,24,.94);
    box-shadow: 0 12px 34px rgba(0,0,0,.38);
    backdrop-filter: blur(16px);
  }

  body.navigation-ui-active .navigation-turn-banner .navigation-guidance__arrow {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    font-size: 2.55rem;
  }

  body.navigation-ui-active .navigation-turn-banner small {
    display: block;
    margin-bottom: 2px;
    color: #ffc66d;
    font-size: .72rem;
  }

  body.navigation-ui-active .navigation-turn-banner strong {
    display: block;
    font-size: 1.08rem;
    line-height: 1.14;
  }

  @media (max-width: 390px) {
    body.navigation-ui-active .navigation-turn-banner {
      right: 68px;
      grid-template-columns: 48px 1fr;
      min-height: 62px;
      padding: 8px 10px;
    }
    body.navigation-ui-active .navigation-turn-banner .navigation-guidance__arrow {
      width: 46px;
      height: 46px;
      font-size: 2.2rem;
    }
    body.navigation-ui-active .navigation-turn-banner strong { font-size: .98rem; }
  }
`;
document.head.appendChild(style);

const observer = new MutationObserver(enhanceCompactNavigation);
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener('load', enhanceCompactNavigation);
enhanceCompactNavigation();
