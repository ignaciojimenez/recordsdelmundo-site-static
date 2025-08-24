// Main application logic - routing, animations, and page management

let currentPage = '';
let productData = {};
let pageContent = {};

// Load JSON data files
async function loadData() {
    try {
        const [productsResponse, contentResponse] = await Promise.all([
            fetch('data/products.json'),
            fetch('data/content.json')
        ]);
        
        productData = await productsResponse.json();
        pageContent = await contentResponse.json();
        
        // Make data globally accessible
        window.productData = productData;
        window.pageContent = pageContent;
        
        console.log('Data loaded successfully');
        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        return false;
    }
}
// No dynamic placement here; store-only handling is in loadPage()
// Best-effort helper: gently scroll on mobile to encourage URL/status bar to minimize
function nudgeMobileChrome() {
    const isMobile = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(max-width: 768px)').matches : false;
    if (!isMobile) return;
    // Avoid interfering while typing
    const ae = (typeof document !== 'undefined') ? document.activeElement : null;
    if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.isContentEditable)) return;
    if (typeof window.requestAnimationFrame === 'function') {
        requestAnimationFrame(() => {
            if (window.pageYOffset < 2) {
                try { window.scrollTo(0, 1); } catch (e) {}
            }
        });
    } else {
        if (window.pageYOffset < 2) {
            try { window.scrollTo(0, 1); } catch (e) {}
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    const dataLoaded = await loadData();
    if (dataLoaded) {
        // Signal router to attach and route once data is ready
        window.dispatchEvent(new CustomEvent('rdm:ready'));
        // Attempt to minimize browser chrome on mobile across a few lifecycle events
        setTimeout(nudgeMobileChrome, 300);
        window.addEventListener('orientationchange', () => setTimeout(nudgeMobileChrome, 250));
        window.addEventListener('pageshow', () => setTimeout(nudgeMobileChrome, 150));
        let __resizeNudgeTimer = null;
        window.addEventListener('resize', () => { clearTimeout(__resizeNudgeTimer); __resizeNudgeTimer = setTimeout(nudgeMobileChrome, 200); });
        window.addEventListener('touchend', nudgeMobileChrome, { once: true, passive: true });
        // Make the RDM header clickable to go home on mobile when in store or content pages
        const siglas = document.getElementById('cabecera_siglas_img');
        if (siglas) {
            siglas.addEventListener('click', function(e) {
                const isMobile = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(max-width: 768px)').matches : false;
                if (isMobile && (document.body.classList.contains('is-store') || document.body.classList.contains('is-section'))) {
                    e.preventDefault();
                    // Clean up any transient classes/inline styles and go home directly
                    document.body.classList.remove('is-store-outgoing');
                    const contenidoEl = document.getElementById('contenido');
                    if (contenidoEl) {
                        contenidoEl.style.transition = '';
                        contenidoEl.style.marginTop = '';
                    }
                    mostrar();
                    updateURL('');
                    window.scrollTo(0, 0);
                }
            });
        }
    } else {
        console.error('Failed to load application data');
    }
});

// Navigation functions (preserving original animation logic)
function mostrar() {
    document.getElementById("cabecera_siglas_img").style.marginTop = "0px";
    document.getElementById("cabecera_logo").style.marginTop = "65px";
    document.getElementById("cabecera_menu1").style.marginTop = "23px";
    document.getElementById("cabecera_menu2").style.marginTop = "13px";
    document.getElementsByClassName("lateral_izq_inferior")[0].style.marginTop = "400px";
    // Home: remove section/band classes so large header is visible
    document.body.classList.remove('is-section');
    document.body.classList.remove('is-band');
    document.body.classList.remove('is-info');
    document.body.classList.remove('is-product');
    // Ensure store-specific flow is turned off and social bar restored to original slot
    document.body.classList.remove('is-store');
    document.body.classList.remove('is-store-outgoing');
    document.body.classList.remove('is-shrinking');
    const container = document.querySelector('.container');
    const centro = document.querySelector('.centro');
    const socialBar = document.querySelector('.lateral_dch');
    if (container && centro && socialBar && container.contains(centro)) {
        container.insertBefore(socialBar, centro);
    }
    
    // Clear content and reset menu states
    clearActiveMenus();
    
    // Hide content area completely for home state
    const contenido = document.getElementById('contenido');
    contenido.innerHTML = '';
    contenido.style.display = 'none';
    $('.lateral_izq_inferior').hide();

    currentPage = '';

    // Social bar: nothing else to do; fixed via CSS on home/short pages
    window.scrollTo(0, 0);
}

function esconder(page, options = {}) {
    const instant = !!options.instant;
    const isMobile = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(max-width: 768px)').matches : false;
    // Always reset scroll to top on navigation to avoid position retention
    window.scrollTo(0, 0);
    // Mobile: immediately mark as section to avoid header flicker while waiting for content load
    if (isMobile && page.indexOf("tienda") === -1) {
        document.body.classList.add('is-section');
    }
    if (page.indexOf("tienda") === -1) {
        // Leaving store: ensure store-specific classes are removed
        document.body.classList.remove('is-store');
        document.body.classList.remove('is-shrinking');
        // Reset any store-specific inline spacing
        const centroEl = document.querySelector('.centro');
        if (centroEl) centroEl.style.paddingTop = '';
        if (isMobile) {
            // Mobile content pages: do not apply desktop inline header animations; let CSS (.is-section) drive layout
            document.getElementById("cabecera_siglas_img").style.marginTop = "";
            document.getElementById("cabecera_logo").style.marginTop = "";
            document.getElementById("cabecera_menu1").style.marginTop = "";
            document.getElementById("cabecera_menu2").style.marginTop = "";
        } else {
            const siglas = document.getElementById("cabecera_siglas_img");
            const logo = document.getElementById("cabecera_logo");
            const menu1 = document.getElementById("cabecera_menu1");
            const menu2 = document.getElementById("cabecera_menu2");
            if (instant) {
                [siglas, logo, menu1, menu2].forEach(el => { if (el) el.style.transition = 'none'; });
            }
            if (siglas) siglas.style.marginTop = "-200px";
            if (logo) logo.style.marginTop = "0px";
            if (menu1) menu1.style.marginTop = "-10px";
            if (menu2) menu2.style.marginTop = "0px";
            if (instant) {
                // Force reflow then restore transitions for future animations
                try { void (siglas || logo || menu1 || menu2).offsetHeight; } catch (e) {}
                setTimeout(() => { [siglas, logo, menu1, menu2].forEach(el => { if (el) el.style.transition = ''; }); }, 0);
            }
        }
    } else if (page.indexOf("producto") !== -1) {
        // Product page - keep current header state
        document.body.classList.remove('is-store');
        document.body.classList.remove('is-shrinking');
        const centroEl = document.querySelector('.centro');
        if (centroEl) centroEl.style.paddingTop = '';
    } else {
        // Tienda catalog page
        // Desktop: apply inline margins to animate/hide big header elements
        if (!isMobile) {
            const siglas = document.getElementById("cabecera_siglas_img");
            const logo = document.getElementById("cabecera_logo");
            const menu1 = document.getElementById("cabecera_menu1");
            const menu2 = document.getElementById("cabecera_menu2");
            if (instant) {
                [siglas, logo, menu1, menu2].forEach(el => { if (el) el.style.transition = 'none'; });
            }
            if (siglas) siglas.style.marginTop = "0px";
            if (logo) logo.style.marginTop = "-570px";
            if (menu1) menu1.style.marginTop = "-40px";
            if (menu2) menu2.style.marginTop = "-70px";
            if (instant) {
                try { void (siglas || logo || menu1 || menu2).offsetHeight; } catch (e) {}
                setTimeout(() => { [siglas, logo, menu1, menu2].forEach(el => { if (el) el.style.transition = ''; }); }, 0);
            }
        }
    }
    
    loadPage(page, { instant });
}

function loadPage(page, options = {}) {
    const instant = !!options.instant;
    const isMobile = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(max-width: 768px)').matches : false;
    hideContent({ instant });
    // Ensure we are at the top when loading a new page
    window.scrollTo(0, 0);
    
    const delay = instant ? 0 : (isMobile ? 0 : 1000);
    setTimeout(() => {
        clearActiveMenus();
        setActiveMenu(page);
        // Non-home pages: mark as section for mobile header compaction
        document.body.classList.add('is-section');
        // Ensure product-specific behavior is cleared for non-product routes
        if (!page.startsWith('tienda/producto/')) {
            document.body.classList.remove('is-product');
        }
        // Mark info page for mobile-specific social behavior
        if (page === 'info') {
            document.body.classList.add('is-info');
        } else {
            document.body.classList.remove('is-info');
        }
        // Band pages: mark as band to hide social icons on mobile
        if (page.startsWith('grupos/')) {
            document.body.classList.add('is-band');
        } else {
            document.body.classList.remove('is-band');
        }
        
        const contenido = document.getElementById('contenido');
        let html = '';
        
        if (page === 'info') {
            html = renderInfoPage();
            contenido.className = 'contenido info';
        } else if (page === 'tienda') {
            html = renderTiendaPage();
            contenido.className = 'contenido tienda';
        } else if (page.startsWith('grupos/')) {
            html = renderGroupPage(page);
            contenido.className = 'contenido';
        } else {
            html = '<p>Página no encontrada</p>';
            contenido.className = 'contenido';
        }
        
        contenido.innerHTML = html;
        contenido.style.display = 'block';
        
        // Set different margins for different page types
        if (page === 'tienda' || page.startsWith('tienda/')) {
            // Desktop needs large offset; mobile spacing is handled by CSS (.is-store .centro)
            contenido.style.marginTop = isMobile ? '' : '400px';
            // Clear any inline padding previously set
            if (isMobile) {
                const centroEl = document.querySelector('.centro');
                if (centroEl) centroEl.style.paddingTop = '';
            }
        } else {
            contenido.style.marginTop = '15px';
        }
        // Store-only on mobile: flow social bar after content, animate content spacing to match header shrink; else restore before center
        const socialBar = document.querySelector('.lateral_dch');
        if (isMobile && page === 'tienda') {
            // Measure current header height BEFORE switching to .is-store (pre-shrink size)
            if (instant) {
                document.body.classList.add('is-store');
                if (socialBar && contenido) contenido.after(socialBar);
                contenido.style.marginTop = '8px';
            } else {
                const header = document.getElementById('cabecera_siglas_img');
                const preShrinkHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 176;
                // Set initial spacing so content clears the current large header
                contenido.style.marginTop = `${preShrinkHeight + 8}px`;
                // Now switch to store layout and move social bar
                document.body.classList.add('is-store');
                if (socialBar && contenido) {
                    contenido.after(socialBar);
                }
                // Animate spacing down to the compact gap while the header shrinks via CSS
                if (window.requestAnimationFrame) {
                    requestAnimationFrame(() => {
                        contenido.style.marginTop = '8px';
                    });
                } else {
                    setTimeout(() => { contenido.style.marginTop = '8px'; }, 0);
                }
            }
        } else {
            document.body.classList.remove('is-store');
            const container = document.querySelector('.container');
            const centro = document.querySelector('.centro');
            if (socialBar && container && centro) {
                container.insertBefore(socialBar, centro);
            }
        }
        
        currentPage = page;
        
        // Show content (no animation on mobile to avoid flicker)
        const inDuration = (instant || isMobile) ? 0 : (page === 'tienda' ? 1100 : 900);
        if (inDuration === 0) {
            $('.contenido').show();
        } else {
            $('.contenido').fadeIn(inDuration);
        }
        
        // Back arrow: only show on desktop product pages
        if (page.startsWith('tienda/producto/') && !isMobile) {
            $('.lateral_izq_inferior').fadeIn(900);
        } else {
            $('.lateral_izq_inferior').hide();
        }
        
    }, delay);
}

function loadProductPage(productKey, options = {}) {
    const instant = !!options.instant;
    const isMobile = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(max-width: 768px)').matches : false;
    // Stop any ongoing animations first
    $('.contenido').stop(true, true);
    $('.imagenDisco').stop(true, true);
    $('.lateral_izq_inferior').stop(true, true);
    
    // Hide content immediately without animation
    $('.contenido').hide();
    $('.lateral_izq_inferior').hide();
    window.scrollTo(0, 0);
    
    // Set tienda header layout for product pages
    const siglas = document.getElementById("cabecera_siglas_img");
    const logo = document.getElementById("cabecera_logo");
    const menu1 = document.getElementById("cabecera_menu1");
    const menu2 = document.getElementById("cabecera_menu2");
    if (instant) { [siglas, logo, menu1, menu2].forEach(el => { if (el) el.style.transition = 'none'; }); }
    if (siglas) siglas.style.marginTop = "0px";
    if (logo) logo.style.marginTop = "-570px";
    if (menu1) menu1.style.marginTop = "-40px";
    if (menu2) menu2.style.marginTop = "-70px";
    if (instant) { try { void (siglas || logo || menu1 || menu2).offsetHeight; } catch (e) {} setTimeout(() => { [siglas, logo, menu1, menu2].forEach(el => { if (el) el.style.transition = ''; }); }, 0); }
    
    // Shorter timeout to reduce race conditions
    const delay = instant ? 0 : (isMobile ? 150 : 300);
    setTimeout(() => {
        clearActiveMenus();
        setActiveMenu('tienda');
        // Product detail is a section
        document.body.classList.add('is-section');
        // Mark as product page for mobile-specific social behavior
        document.body.classList.add('is-product');
        // Make sure store flow is disabled and social bar is in its original place
        document.body.classList.remove('is-store');
        const container = document.querySelector('.container');
        const centro = document.querySelector('.centro');
        const socialBar = document.querySelector('.lateral_dch');
        if (container && centro && socialBar && container.contains(centro)) {
            if (isMobile) {
                // On mobile product pages, place socials after the content (in-flow at bottom)
                const contenidoEl = document.getElementById('contenido');
                if (contenidoEl) contenidoEl.after(socialBar);
            } else {
                container.insertBefore(socialBar, centro);
            }
        }
        
        const contenido = document.getElementById('contenido');
        const productHtml = renderProductPage(productKey);
        
        contenido.innerHTML = productHtml;
        contenido.className = 'contenido';
        contenido.style.display = 'block';
        contenido.style.marginTop = isMobile ? '12px' : '400px';
        
        // Show content immediately and reliably
        $(contenido).show();
        $('.imagenDisco').show();
        if (isMobile) {
            $('.lateral_izq_inferior').hide();
        } else {
            $('.lateral_izq_inferior').show();
        }
        
        currentPage = `tienda/producto/${productKey}`;
        
        // Note: Removed call to undefined bindPendingButtonHandlers() (was causing ReferenceError)
    }, delay);
}

function hideContent(options = {}) {
    const instant = !!options.instant;
    const isMobile = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(max-width: 768px)').matches : false;
    if (instant || isMobile) {
        $(".contenido").hide();
        $(".lateral_izq_inferior").hide();
        return;
    }
    $(".contenido").fadeOut(1000);
    $(".lateral_izq_inferior").fadeOut(1000);
}

function clearActiveMenus() {
    document.querySelectorAll('#cabecera_menu1 a, #cabecera_menu2 a').forEach(link => {
        link.classList.remove('active');
    });
}

function setActiveMenu(page) {
    let menuId = '';
    
    if (page === 'grupos/inc') menuId = 'menu-inc';
    else if (page === 'grupos/at') menuId = 'menu-at';
    else if (page === 'grupos/par') menuId = 'menu-par';
    else if (page === 'info') menuId = 'menu-info';
    else if (page === 'tienda' || page.startsWith('tienda/')) menuId = 'menu-tienda';
    
    if (menuId) {
        document.getElementById(menuId).classList.add('active');
    }
}

// updateURL() and backToTienda() are provided by router.js

// Removed legacy printmail() helper; content uses direct mailto links now
