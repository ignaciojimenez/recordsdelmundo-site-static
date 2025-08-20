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

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    const dataLoaded = await loadData();
    if (dataLoaded) {
        // Set initial state - show home page
        mostrar();
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
    
    // Clear content and reset menu states
    clearActiveMenus();
    
    // Hide content area completely for home state
    const contenido = document.getElementById('contenido');
    contenido.innerHTML = '';
    contenido.style.display = 'none';
    $('.lateral_izq_inferior').hide();
    
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
        contenido.style.display = 'block';
        
        // Set different margins for different page types
        if (page === 'tienda' || page.startsWith('tienda/')) {
            contenido.style.marginTop = '400px';
        } else {
            contenido.style.marginTop = '15px';
        }
        
        currentPage = page;
        
        // Show content with fade in
        if (page === 'tienda') {
            $('.contenido').fadeIn(1100);
        } else {
            $('.contenido').fadeIn(900);
        }
        
        // Show back button only for product pages
        if (page.startsWith('tienda/producto/')) {
            $('.lateral_izq_inferior').fadeIn(900);
        }
        
    }, 1000);
}

function loadProductPage(productKey) {
    // Stop any ongoing animations first
    $('.contenido').stop(true, true);
    $('.imagenDisco').stop(true, true);
    $('.lateral_izq_inferior').stop(true, true);
    
    // Hide content immediately without animation
    $('.contenido').hide();
    $('.lateral_izq_inferior').hide();
    
    // Set tienda header layout for product pages
    document.getElementById("cabecera_siglas_img").style.marginTop = "0px";
    document.getElementById("cabecera_logo").style.marginTop = "-570px";
    document.getElementById("cabecera_menu1").style.marginTop = "-40px";
    document.getElementById("cabecera_menu2").style.marginTop = "-70px";
    
    // Shorter timeout to reduce race conditions
    setTimeout(() => {
        clearActiveMenus();
        setActiveMenu('tienda');
        
        const contenido = document.getElementById('contenido');
        const productHtml = renderProductPage(productKey);
        
        contenido.innerHTML = productHtml;
        contenido.className = 'contenido';
        contenido.style.display = 'block';
        contenido.style.marginTop = '400px';
        
        // Show content immediately and reliably
        $(contenido).show();
        $('.imagenDisco').show();
        $('.lateral_izq_inferior').show();
        
        currentPage = `tienda/producto/${productKey}`;
        
        // Bind button event handlers after DOM is ready
        bindPendingButtonHandlers();
    }, 300);
}

function hideContent() {
    console.log('=== HIDE CONTENT DEBUG ===');
    console.log('Hiding content, current display:', document.getElementById('contenido').style.display);
    $(".contenido").fadeOut(1000);
    $(".lateral_izq_inferior").fadeOut(1000);
    console.log('=== END HIDE CONTENT DEBUG ===');
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

// Back button navigation - goes to tienda, not home
function backToTienda() {
    esconder('tienda');
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
