// Router for Records del Mundo SPA (hash-based)
// Depends on global functions from main.js: mostrar(), esconder(page), loadProductPage(key)

(function() {
  'use strict';

  function getHashPath() {
    const h = window.location.hash || '';
    return h.startsWith('#') ? h.slice(1) : h;
  }

  function isRecentKeyboardNav() {
    try {
      const li = typeof window !== 'undefined' ? window.__rdm_last_input : null;
      if (!li || li.type !== 'keydown') return false;
      const dt = Date.now() - (li.t || 0);
      if (dt > 1500) return false;
      const key = li.key;
      const alt = !!li.altKey;
      const meta = !!li.metaKey;
      const ctrl = !!li.ctrlKey;
      // Common back/forward combos
      if ((key === 'ArrowLeft' && (alt || meta || ctrl)) || (key === 'ArrowRight' && (alt || meta || ctrl))) return true;
      if (meta && (key === '[' || key === ']')) return true;
      return false;
    } catch (_) { return false; }
  }

  function consumeClickNav() {
    try {
      const was = !!(typeof window !== 'undefined' && window.__rdm_click_nav);
      if (typeof window !== 'undefined') window.__rdm_click_nav = false;
      return was;
    } catch (_) { return false; }
  }
  function setActiveMenu(page) {
    try {
      const links = document.querySelectorAll('#cabecera_menu1 a, #cabecera_menu2 a');
      links.forEach(a => {
        a.classList.remove('is-active');
        if (a.getAttribute('aria-current') === 'page') a.removeAttribute('aria-current');
      });
      if (!page) return;
      let activeId = '';
      if (page === 'info') {
        activeId = 'menu-info';
      } else if (page === 'tienda' || page.startsWith('tienda/producto/')) {
        activeId = 'menu-tienda';
      } else if (page.startsWith('grupos/')) {
        const parts = page.split('/');
        const slug = parts[1] || '';
        if (slug) activeId = `menu-${slug}`;
      }
      if (activeId) {
        const el = document.getElementById(activeId);
        if (el) {
          el.classList.add('is-active');
          el.setAttribute('aria-current', 'page');
        }
      }
    } catch (_) {}
  }

  function routeFromHash(options = {}) {
    const instant = !!options.instant;
    const page = getHashPath();
    try { if (window.__rdm_debug && typeof window.rdmLog === 'function') window.rdmLog('routeFromHash', { page, instant, restoring: !!window.__rdm_restoring }); } catch (_) {}
    // If the page was restored from bfcache/back-forward, avoid re-rendering;
    // keep existing DOM and only refresh menu state to prevent flicker.
    if (typeof window !== 'undefined' && window.__rdm_restoring) {
      setActiveMenu(page);
      return;
    }
    setActiveMenu(page);
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

  function attachRouter() {
    // First route after reload should be instant: render final state with no menu/header animation
    routeFromHash({ instant: true });
    // Subsequent in-app navigations animate normally.
    // Only when a swipe gesture is detected do we suppress animations and render instantly.
    window.addEventListener('hashchange', () => {
      const wasClick = consumeClickNav();
      const kbNav = isRecentKeyboardNav();
      const instant = !wasClick && !kbNav; // treat swipe/tool-bar arrows as instant
      try { if (window.__rdm_debug && typeof window.rdmLog === 'function') window.rdmLog('hashchange', { hash: window.location.hash, wasClick, kbNav, instant }); } catch (_) {}
      if (instant) {
        try { document.body.classList.add('no-anim'); } catch (_) {}
        setTimeout(() => { try { document.body.classList.remove('no-anim'); } catch (_) {} }, 250);
      }
      routeFromHash({ instant });
      // Clear any transient swipe flag
      try { if (typeof window !== 'undefined') window.__rdm_swipe_nav = false; } catch (_) {}
    });
  }

  // Attach when app data and UI are ready
  window.addEventListener('rdm:ready', attachRouter);

  // Expose minimal API used by main.js and HTML
  window.updateURL = updateURL;
})();
