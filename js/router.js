// Router for Records del Mundo SPA (hash-based)
// Depends on global functions from main.js: mostrar(), esconder(page), loadProductPage(key)

(function() {
  'use strict';

  function getHashPath() {
    const h = window.location.hash || '';
    return h.startsWith('#') ? h.slice(1) : h;
  }

  function routeFromHash(options = {}) {
    const instant = !!options.instant;
    const page = getHashPath();
    if (!page) {
      // Home
      if (typeof window.mostrar === 'function') window.mostrar();
      return;
    }
    if (page.startsWith('tienda/producto/')) {
      const parts = page.split('/');
      const key = parts[2] || '';
      if (key && typeof window.loadProductPage === 'function') {
        window.loadProductPage(key, { instant });
        return;
      }
    }
    // Other known pages
    if (typeof window.esconder === 'function') window.esconder(page, { instant });
  }

  function updateURL(page) {
    const target = page || '';
    if (window.location.hash.replace(/^#/, '') !== target) {
      window.location.hash = target;
    }
  }

  function backToTienda() {
    updateURL('tienda');
  }

  function attachRouter() {
    // First route after reload should be instant: render final state with no menu/header animation
    routeFromHash({ instant: true });
    // Subsequent in-app navigations animate normally
    window.addEventListener('hashchange', () => routeFromHash({ instant: false }));
  }

  // Attach when app data and UI are ready
  window.addEventListener('rdm:ready', attachRouter);

  // Expose minimal API used by main.js and HTML
  window.updateURL = updateURL;
  window.backToTienda = backToTienda;
})();
