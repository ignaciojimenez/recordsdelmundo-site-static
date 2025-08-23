export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;
    const looksLikeFile = /\.[a-zA-Z0-9]{2,8}$/.test(pathname);
    const accept = request.headers.get('accept') || '';

    // Allow real static success page under /tienda
    if (pathname.startsWith('/tienda/success')) {
      return env.ASSETS.fetch(request);
    }

    // For SPA navigations (no file extension), serve index.html for GET and HEAD
    if ((method === 'GET' || method === 'HEAD') && !looksLikeFile) {
      try {
        if (!env || !env.ASSETS || typeof env.ASSETS.fetch !== 'function') {
          throw new Error('ASSETS binding is unavailable');
        }

        // Build a safe request to /index.html based on the original request
        const u = new URL(request.url);
        u.pathname = '/index.html';
        u.search = '';

        const headers = new Headers(request.headers);
        // Prefer HTML, avoid confusing range requests
        headers.set('accept', 'text/html,*/*');
        headers.delete('range');
        headers.delete('content-type');

        // Always fetch index.html with GET to ensure a body is returned
        const indexReq = new Request(u.toString(), { method: 'GET', headers });
        const res = await env.ASSETS.fetch(indexReq);

        // Ensure correct content type and inline rendering to prevent downloads on reload
        const resHeaders = new Headers(res.headers);
        resHeaders.set('content-type', 'text/html; charset=utf-8');
        resHeaders.set('content-disposition', 'inline');
        resHeaders.set('cache-control', 'no-store');
        resHeaders.set('x-rdm-spa', '1');
        resHeaders.set('x-rdm-index-status', String(res.status));

        if (method === 'HEAD') {
          return new Response(null, { status: res.status, statusText: res.statusText, headers: resHeaders });
        }
        return new Response(res.body, { status: res.status, statusText: res.statusText, headers: resHeaders });
      } catch (err) {
        // Last-resort full HTML to avoid blank page if index fetch fails
        const fallbackHtml = `<!doctype html>
<html lang="es">
<head>
    <title>Records del mundo</title>
    <link rel="shortcut icon" href="images/favicons/globe_bw.png" type="image/x-icon">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="Récords del Mundo es la casa de discos de los componentes de Atención Tsunami junto a Rodrigo (Ediciones Ochoacostado), Pablo (producción) y Emilio y Gonzalo (diseño). Nueve plusmarquistas del amor al arte que aúnan su experiencia previa y paralela en otras plataformas autogestionadas para seguir haciendo, juntos, lo que les gusta."/>
    <meta name="referrer" content="no-referrer-when-downgrade" />
    <meta property="og:title" content="Records del mundo" />
    <meta property="og:type" content="Record label" />
    <meta property="og:url" content="https://recordsdelmundo.es" />
    <meta property="og:image" content="https://www.recordsdelmundo.es/images/fosbury.png" />
    <meta property="og:description" content="Récords del Mundo es la casa de discos de los componentes de Atención Tsunami junto a Rodrigo (Ediciones Ochoacostado), Pablo (producción) y Emilio y Gonzalo (diseño). Nueve plusmarquistas del amor al arte que aúnan su experiencia previa y paralela en otras plataformas autogestionadas para seguir haciendo, juntos, lo que les gusta."/>
    <base href="/">
    <link href="css/fonts.css" type="text/css" rel="stylesheet" />
    <link href="css/common.css" type="text/css" rel="stylesheet" />
    <link href="css/store.css" type="text/css" rel="stylesheet" />
    <link href="css/back.css" type="text/css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" defer crossorigin="anonymous"></script>
    <script src="js/components.js" defer></script>
    <script src="js/main.js" defer></script>
 </head>
 <body>
    <div class="container">
        <div class="lateral_izq">LATERAL IZQ</div>
        <div class="lateral_izq_inferior">
            <a href="/tienda" onclick="backToTienda(); return false;" class="back" title="Back link"></a>
        </div>
        <div class="lateral_dch">
            <div class="content">
                <a class="facebook" href="https://www.facebook.com/recordsdelmundo"></a>
                <a class="twitter" href="https://twitter.com/R_D_M_"></a>
                <a class="youtube" href="https://www.youtube.com/user/delmundorecords"></a>
            </div>
        </div>
        <div class="centro">
            <div class="cabecera_siglas_img transicion_cabeceras" id="cabecera_siglas_img">
                <a href="/" onclick="mostrar(); return false;"><img src="images/cabecera.png" /></a>
            </div>
            <div class="cabecera_logo transicion_cabeceras" id="cabecera_logo">
                <a href="/" onclick="mostrar(); return false;"><img src="images/fosbury.png"/></a>
            </div>
            <div class="cabecera_menu1 transicion_cabeceras" id="cabecera_menu1">
                <a href="/grupos/inc" onclick="esconder('grupos/inc'); return false;" id="menu-inc">INCENDIOS</a>
                <a href="/grupos/at" onclick="esconder('grupos/at'); return false;" id="menu-at">ATENCIÓN TSUNAMI</a>
                <a href="/grupos/par" onclick="esconder('grupos/par'); return false;" id="menu-par">PARACAÍDAS</a>
            </div>
            <div class="cabecera_menu2 transicion_cabeceras" id="cabecera_menu2">
                <a href="/info" onclick="esconder('info'); return false;" id="menu-info">INFO</a>
                &nbsp;&middot;&nbsp;
                <a href="/tienda" onclick="esconder('tienda'); return false;" id="menu-tienda">TIENDA</a>
            </div>
            <div class="contenido" id="contenido"></div>
        </div>
    </div>
 </body>
 </html>`;
        return new Response(fallbackHtml, {
          status: 200,
          headers: {
            'content-type': 'text/html; charset=utf-8',
            'content-disposition': 'inline',
            'cache-control': 'no-store',
            'x-rdm-spa': 'fallback',
            'x-rdm-error': err && (err.message || String(err))
          }
        });
      }
    }

    // Default static asset serving
    try {
      return await env.ASSETS.fetch(request);
    } catch (err) {
      return new Response('Internal error', { status: 500, headers: { 'x-rdm-error': 'assets-fetch-failed' } });
    }
  }
};
