// Component templates for rendering different page types

// HTML-escape helper to prevent XSS when interpolating data into templates
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderGroupPage(pageKey) {
    const page = pageContent[pageKey];
    if (!page) return '';
    
    // Image first (imageCredit and content are intentional HTML from first-party JSON)
    let html = `<img class="imagen" src="${escapeHtml(page.image)}" />`;
    if (page.imageCredit) {
        html += `<span class="piedefoto">${page.imageCredit}</span>`;
    }
    html += '<br>';

    // Main content next
    html += page.content;

    // Place files/social at the very bottom
    if (page.social || page.files) {
        html += '<table class="tablagrupo"><tr>';
        if (page.files) {
            html += '<td class="datos">';
            page.files.forEach((file, index) => {
                if (index > 0) html += ' · ';
                html += `<a href="${escapeHtml(file.url)}"><span>${escapeHtml(file.name)}</span></a>`;
            });
            html += '</td>';
        }
        if (page.social) {
            html += '<td class="social">';
            if (page.social.facebook) html += `<a class="iconos facebook" href="${escapeHtml(page.social.facebook)}"></a>`;
            if (page.social.instagram) html += `<a class="iconos instagram" href="${escapeHtml(page.social.instagram)}"></a>`;
            if (page.social.bandcamp) html += `<a class="iconos bandcamp" href="${escapeHtml(page.social.bandcamp)}"></a>`;
            html += '</td>';
        }
        html += '</tr></table>';
    }
    return html;
}

function renderInfoPage() {
    const page = pageContent.info;
    let html = `<img class="imagen" src="${escapeHtml(page.image)}" width="100%"/>`;
    if (page.imageCredit) {
        html += `<span class="piedefoto">${page.imageCredit}</span>`;
    }
    html += '<br>';
    html += page.content;
    return html;
}

// Parse Spanish month date strings like "6 de Mayo 2014" or "Enero 2009" into a sortable timestamp
function parseSpanishDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return 0;
    const s = dateStr.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // strip accents
    const months = {
        'enero': 0,
        'febrero': 1,
        'marzo': 2,
        'abril': 3,
        'mayo': 4,
        'junio': 5,
        'julio': 6,
        'agosto': 7,
        'septiembre': 8,
        'setiembre': 8,
        'octubre': 9,
        'noviembre': 10,
        'diciembre': 11
    };
    // 1) dd de mes yyyy
    let m = s.match(/^(\d{1,2})\s+de\s+([a-z]+)\s+(\d{4})$/);
    if (m) {
        const d = parseInt(m[1], 10);
        const mon = months[m[2]] ?? 0;
        const y = parseInt(m[3], 10);
        return new Date(y, mon, d).getTime();
    }
    // 2) mes yyyy
    m = s.match(/^([a-z]+)\s+(\d{4})$/);
    if (m) {
        const mon = months[m[1]] ?? 0;
        const y = parseInt(m[2], 10);
        return new Date(y, mon, 1).getTime();
    }
    // 3) yyyy only fallback
    m = s.match(/(\d{4})/);
    if (m) {
        const y = parseInt(m[1], 10);
        return new Date(y, 0, 1).getTime();
    }
    return 0;
}

function renderTiendaPage() {
    let html = '';
    
    // Build product grid from loaded data and sort by lanzamiento (newest first)
    const data = (typeof window !== 'undefined' && window.productData) ? window.productData : {};
    Object.keys(data)
      .map(key => ({ key, product: data[key] }))
      .filter(entry => entry.product && entry.product.tipo === 'disco')
      .sort((a, b) => {
        const ta = parseSpanishDate(a.product.lanzamiento);
        const tb = parseSpanishDate(b.product.lanzamiento);
        const diff = tb - ta; // newest first
        if (diff !== 0) return diff;
        const na = (a.product.nombre || a.key || '').toString();
        const nb = (b.product.nombre || b.key || '').toString();
        return na.localeCompare(nb, 'es', { sensitivity: 'base' });
      })
      .forEach(({ key, product }) => {
        const title = escapeHtml(product.description || `${(product.grupo || '').toUpperCase()} - ${(product.nombre || '').toUpperCase()}`.trim());
        const rawPrice = product.precio || '';
        // Normalize price display: move € to a leading span when present
        let priceHtml = escapeHtml(rawPrice);
        if (rawPrice.includes('€')) {
            const numberPart = escapeHtml(rawPrice.replace('€', '').trim());
            priceHtml = `<span class="currency_sign">€</span>${numberPart}`;
        }
        const safeKey = escapeHtml(key);
        const thumbKey = escapeHtml(product.nombre || key);
        html += `
            <div class="product">
                <a href="#tienda/producto/${safeKey}" title="Ver ${title}">
                    <div class="product_header">
                        <h2>${title}</h2>
                        <span class="dash"></span>
                        <h3>${priceHtml || ''}</h3>
                    </div>
                    <div class="product_thumb">
                        <img src="images/tienda/${thumbKey}.jpg" class="fade_in" alt="Image of ${title}">
                    </div>
                </a>
            </div>
        `;
    });
    
    return html;
}

function renderProductPage(productKey) {
    console.log('Loading product:', productKey);
    
    // Check if productData is available globally
    if (typeof window.productData === 'undefined') {
        console.error('productData not loaded');
        return '<p>Error: Datos del producto no disponibles</p>';
    }
    
    console.log('Available products:', Object.keys(window.productData));
    
    const product = window.productData[productKey];
    if (!product) {
        console.error('Product not found:', productKey);
        return '<p>Producto no encontrado</p>';
    }

    // Escape all interpolated values for XSS defense-in-depth
    const nombre = escapeHtml(product.nombre || productKey);
    const formato = escapeHtml(product.formato || '');
    const lanzamiento = escapeHtml(product.lanzamiento || '');
    const precio = escapeHtml(product.precio || '');
    const grupo = escapeHtml(product.grupo || '');
    const btnppal = escapeHtml(product.btnppal || '');
    const bcalbum = escapeHtml(product.bcalbum || '');
    const bcurl = (product.bcurl && /^https?:\/\//.test(product.bcurl)) ? escapeHtml(product.bcurl) : '#';

    let html = '';

    // Left div - Product image and purchase info (except nobandcamp)
    html += `<div class='imagenDisco' style='text-align:left;font-family:Arial; font-size:12px; float:left; width:280px;'>`;
    html += `<img src='images/tienda/${nombre}.jpg' width='280'/>`;

    if (product.estado === "ok") {
        html += `<br><strong>Formato:</strong> ${formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${lanzamiento}`;
        html += `<br><strong>Precio:</strong> ${precio} (Envío incluido)`;
        html += `<br>`;
        // New PayPal hosted button integration
        html += `<form action="https://www.paypal.com/ncp/payment/${btnppal}" method="post" target="_blank" class="paypal-form-container">
                   <input class="paypal-comprar-btn" type="submit" value=" COMPRAR " />
                 </form>`;
        html += `<a href='https://bit.ly/${grupo}${nombre}' class='descarga'>DESCARGAR</a>`;
    } else if (product.estado === "reedit") {
        html += `<br><strong>Formato:</strong> ${formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${lanzamiento}`;
        html += `<br>Esta edición se ha agotado. En caso de que estés interesado en una reedición, ponte en contacto con nosotros<br>`;
        html += `<a href='https://bit.ly/${grupo}${nombre}' class='descarga'>DESCARGAR</a>`;
    } else if (product.estado === "bandcamp") {
        html += `<br><strong>Formato:</strong> ${formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${lanzamiento}`;
        html += `<br><strong>Precio:</strong> ${precio} (Envío incluido)`;
        html += `<br><a href='${bcurl}' style='display:inline-block;' class='descarga'>Comprar en Bandcamp</a>`;
    } else if (product.estado === "preorder") {
        html += `<br><strong>Formato:</strong> ${formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${lanzamiento}`;
        html += `<br><strong>Precio:</strong> ${precio} (Envío incluido)`;
        html += `<br>`;
        html += `<br>Los envíos comenzarán en junio de XXX`;
        // New PayPal hosted button integration for preorder
        html += `<form action="https://www.paypal.com/ncp/payment/${btnppal}" method="post" target="_blank" class="paypal-form-container">
                   <input class="paypal-comprar-btn" type="submit" value=" COMPRAR " />
                 </form>`;
    }
    // Note: nobandcamp products have NO info in left column - only image
    html += `</div>`;

    // Right div - Bandcamp player or nobandcamp info
    html += `<div class='playerDisco' style='text-align:left;font-family:Arial; font-size:12px; float:right; width:300px;'>`;
    if (product.bcalbum && product.bcalbum !== "") {
        // Show full playlist on mobile and desktop (mobile uses taller height)
        const isMobile = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(max-width: 768px)').matches : false;
        const bcSrc = `https://bandcamp.com/EmbeddedPlayer/v=2/album=${bcalbum}/size=grande2/bgcol=FFFFFF/linkcol=333333/`;
        const bcHeight = isMobile ? 400 : 390;
        html += `<iframe id="bc" style="position:relative; border:0; width:100%; height:${bcHeight}px;" src="${bcSrc}" allowtransparency="true" frameborder="0"></iframe>`;
    } else if (product.estado === "nobandcamp") {
        html += `<strong>Formato:</strong> ${formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${lanzamiento}`;
        html += `<br><strong>Precio:</strong> ${precio} (Envío incluido)`;
        html += `<br>`;
        // New PayPal hosted button integration for nobandcamp
        html += `<form action="https://www.paypal.com/ncp/payment/${btnppal}" method="post" target="_blank" class="paypal-form-container">
                   <input class="paypal-comprar-btn" type="submit" value=" COMPRAR " />
                 </form>`;
        html += `<a href='https://bit.ly/${grupo}${nombre}' class='descarga'>DESCARGAR</a>`;
    } else {
        html += `<span style='font-size:36;text-align:left;'>EL DISCO SELECCIONADO<br>NO PUEDE ESCUCHARSE<br>ACTUALMENTE</span>`;
    }
    html += `</div>`;

    // Clear floats
    html += `<div style='clear:both;'></div>`;

    return html;
}

