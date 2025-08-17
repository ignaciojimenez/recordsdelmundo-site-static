// Main application logic - routing, animations, and page management

let currentPage = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state - show home page
    mostrar();
});

// Navigation functions (preserving original animation logic)
function mostrar() {
    document.getElementById("cabecera_siglas_img").style.marginTop = "0px";
    document.getElementById("cabecera_logo").style.marginTop = "65px";
    document.getElementById("cabecera_menu1").style.marginTop = "23px";
    document.getElementById("cabecera_menu2").style.marginTop = "13px";
    document.getElementsByClassName("lateral_izq_inferior")[0].style.marginTop = "400px";
    
    // Clear content and reset menu states
    clearActiveMenus();
    hideContent();
    currentPage = '';
}

function esconder(page) {
    if (page.indexOf("tienda") === -1) {
        document.getElementById("cabecera_siglas_img").style.marginTop = "-200px";
        document.getElementById("cabecera_logo").style.marginTop = "0px";
        document.getElementById("cabecera_menu1").style.marginTop = "-10px";
        document.getElementById("cabecera_menu2").style.marginTop = "0px";
    } else if (page.indexOf("producto") !== -1) {
        // Product page - keep current header state
    } else {
        document.getElementById("cabecera_siglas_img").style.marginTop = "0px";
        document.getElementById("cabecera_logo").style.marginTop = "-570px";
        document.getElementById("cabecera_menu1").style.marginTop = "-40px";
        document.getElementById("cabecera_menu2").style.marginTop = "-70px";
        document.getElementById("contenido").style.marginTop = "400px";
    }
    
    loadPage(page);
}

function loadPage(page) {
    hideContent();
    
    setTimeout(() => {
        clearActiveMenus();
        setActiveMenu(page);
        
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
        currentPage = page;
        
        // Show content with fade in
        if (page === 'tienda') {
            $('.contenido').fadeIn(1100);
        } else {
            $('.contenido').fadeIn(900);
        }
        
        // Show back button for non-home pages
        if (page !== '') {
            $('.lateral_izq_inferior').fadeIn(900);
        }
        
    }, 1000);
}

function loadProductPage(productKey) {
    hideContent();
    
    setTimeout(() => {
        const contenido = document.getElementById('contenido');
        contenido.innerHTML = renderProductPage(productKey);
        contenido.className = 'contenido';
        contenido.style.display = 'inline-block';
        
        // Show product page elements
        $('.imagenDisco').fadeIn(900);
        $('.lateral_izq_inferior').fadeIn(900);
        
        currentPage = `tienda/producto/${productKey}`;
    }, 1000);
}

function hideContent() {
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

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        if (event.state.page === '') {
            mostrar();
        } else {
            esconder(event.state.page);
        }
    }
});

// Update URL without page reload (for better UX, though not required for static hosting)
function updateURL(page) {
    const url = page === '' ? '/' : `/${page}`;
    history.pushState({page: page}, '', url);
}

// Email obfuscation function (preserved from original)
function printmail(nombre, tagid) {
    const mail = nombre + "@recordsdelmundo.es";
    const s0 = document.getElementById(tagid);
    const newlink = document.createElement("a");
    newlink.setAttribute("href", "mailto:" + mail);
    newlink.innerText = mail;
    s0.appendChild(newlink);
}
