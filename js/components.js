// Component templates for rendering different page types

function renderGroupPage(pageKey) {
    const page = pageContent[pageKey];
    if (!page) return '';
    
    let html = `<img class="imagen" src="${page.image}" />`;
    if (page.imageCredit) {
        html += `<span class="piedefoto">${page.imageCredit}</span>`;
    }
    html += '<br>';
    
    if (page.social || page.files) {
        html += '<table class="tablagrupo"><tr>';
        
        if (page.files) {
            html += '<td class="datos">';
            page.files.forEach((file, index) => {
                if (index > 0) html += ' · ';
                html += `<a href="${file.url}"><span>${file.name}</span></a>`;
            });
            html += '</td>';
        }
        
        if (page.social) {
            html += '<td class="social">';
            if (page.social.facebook) html += `<a class="iconos facebook" href="${page.social.facebook}"></a>`;
            if (page.social.instagram) html += `<a class="iconos instagram" href="${page.social.instagram}"></a>`;
            if (page.social.bandcamp) html += `<a class="iconos bandcamp" href="${page.social.bandcamp}"></a>`;
            html += '</td>';
        }
        
        html += '</tr></table>';
    }
    
    html += page.content;
    return html;
}

function renderInfoPage() {
    const page = pageContent.info;
    let html = `<img class="imagen" src="${page.image}" width="100%"/>`;
    if (page.imageCredit) {
        html += `<span class="piedefoto">${page.imageCredit}</span>`;
    }
    html += '<br>';
    html += page.content;
    return html;
}

function renderTiendaPage() {
    let html = '';
    
    // Product grid
    const products = [
        { key: 'metavolante', title: 'META VOLANTE - LP', price: '€15' },
        { key: 'pensamientomagico', title: 'DISCIPLINA ATLÁNTICO - PENSAMIENTO MÁGICO - LP', price: '€18' },
        { key: 'vltra', title: 'ATENCIÓN TSUNAMI - VLTRA - LP', price: '€15' },
        { key: 'realejo', title: 'AUTUMN COMETS - REALEJO - LP', price: '€16,95' },
        { key: 'silencioretaguardia', title: 'ATENCIÓN TSUNAMI - SILENCIO EN LA RETAGUARDIA - LP', price: 'SOLD OUT - GRATIS ONLINE' },
        { key: 'sillasvoladoras', title: 'INCENDIOS - LAS SILLAS VOLADORAS - LP', price: '€14' },
        { key: 'pensamientodepaz', title: 'PARACAÍDAS - PENSAMIENTO DE PAZ DURANTE UN ATAQUE AÉREO - EP', price: '€12' },
        { key: 'quelecortenlacabeza', title: 'ATENCIÓN TSUNAMI - QUE LE CORTEN LA CABEZA - LP', price: '€14' },
        { key: 'elcuerpohumano', title: 'INCENDIOS - EL CUERPO HUMANO- EP', price: '€12' },
        { key: 'ellejanooyente', title: 'ATENCIÓN TSUNAMI - EL LEJANO OYENTE - LP', price: 'SOLD OUT - GRATIS ONLINE' }
    ];
    
    products.forEach(product => {
        html += `
            <div class="product">
                <a href="#" onclick="loadProductPage('${product.key}')" title="Ver ${product.title}">
                    <div class="product_header">
                        <h2>${product.title}</h2>
                        <span class="dash"></span>
                        <h3>${product.price.includes('€') ? '<span class="currency_sign">€</span>' + product.price.replace('€', '') : product.price}</h3>
                    </div>
                    <div class="product_thumb">
                        <img src="images/tienda/${product.key}.jpg" class="fade_in" alt="Image of ${product.title}">
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
    
    let html = '';
    
    // Left div - Product image and purchase info (except nobandcamp)
    html += `<div class='imagenDisco' style='text-align:left;font-family:Arial; font-size:12px; float:left; width:280px;'>`;
    html += `<img src='images/tienda/${product.img}.jpg' width='280'/>`;
    
    if (product.estado === "ok") {
        html += `<br><strong>Formato:</strong> ${product.formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${product.lanzamiento}`;
        html += `<br><strong>Precio:</strong> ${product.precio} (Envío incluido)`;
        html += `<br>`;
        // New PayPal hosted button integration
        html += `<form action="https://www.paypal.com/ncp/payment/${product.btnppal}" method="post" target="_blank" class="paypal-form-container">
                   <input class="paypal-comprar-btn" type="submit" value=" COMPRAR " />
                 </form>`;
        html += `<a href='https://bit.ly/${product.grupo}${product.nombre}' class='descarga'>DESCARGAR</a>`;
    } else if (product.estado === "reedit") {
        html += `<br><strong>Formato:</strong> ${product.formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${product.lanzamiento}`;
        html += `<br>Esta edición se ha agotado. En caso de que estés interesado en una reedición, ponte en contacto con nosotros<br>`;
        html += `<a href='https://bit.ly/${product.grupo}${product.nombre}' class='descarga'>DESCARGAR</a>`;
    } else if (product.estado === "bandcamp") {
        html += `<br><strong>Formato:</strong> ${product.formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${product.lanzamiento}`;
        html += `<br><strong>Precio:</strong> ${product.precio} (Envío incluido)`;
        html += `<br><a href='${product.bcurl}' style='display:inline-block;' class='descarga'>Comprar en Bandcamp</a>`;
    } else if (product.estado === "preorder") {
        html += `<br><strong>Formato:</strong> ${product.formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${product.lanzamiento}`;
        html += `<br><strong>Precio:</strong> ${product.precio} (Envío incluido)`;
        html += `<br>`;
        html += `<br>Los envíos comenzarán en junio de XXX`;        
        // New PayPal hosted button integration for preorder
        html += `<form action="https://www.paypal.com/ncp/payment/${product.btnppal}" method="post" target="_blank" class="paypal-form-container">
                   <input class="paypal-comprar-btn" type="submit" value=" COMPRAR " />
                 </form>`;
    }
    // Note: nobandcamp products have NO info in left column - only image
    html += `</div>`;
    
    // Right div - Bandcamp player or nobandcamp info
    html += `<div class='playerDisco' style='text-align:left;font-family:Arial; font-size:12px; float:right; width:300px;'>`;
    if (product.bcalbum && product.bcalbum !== "") {
        html += `<iframe id="bc" width="300" height="390" style="position: relative; width: 300px; height: 390px;" src="https://bandcamp.com/EmbeddedPlayer/v=2/album=${product.bcalbum}/size=grande2/bgcol=FFFFFF/linkcol=333333/debug=true/" allowtransparency="true" frameborder="0"></iframe>`;
    } else if (product.estado === "nobandcamp") {
        html += `<strong>Formato:</strong> ${product.formato}`;
        html += `<br><strong>Lanzamiento:</strong> ${product.lanzamiento}`;
        html += `<br><strong>Precio:</strong> ${product.precio} (Envío incluido)`;
        html += `<br>`;
        // New PayPal hosted button integration for nobandcamp
        html += `<form action="https://www.paypal.com/ncp/payment/${product.btnppal}" method="post" target="_blank" class="paypal-form-container">
                   <input class="paypal-comprar-btn" type="submit" value=" COMPRAR " />
                 </form>`;
        html += `<a href='https://bit.ly/${product.grupo}${product.nombre}' class='descarga'>DESCARGAR</a>`;
    } else {
        html += `<span style='font-size:36;text-align:left;'>EL DISCO SELECCIONADO<br>NO PUEDE ESCUCHARSE<br>ACTUALMENTE</span>`;
    }
    html += `</div>`;
    
    // Clear floats
    html += `<div style='clear:both;'></div>`;
    
    return html;
}

