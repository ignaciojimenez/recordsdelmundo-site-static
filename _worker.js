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

        if (method === 'HEAD') {
          return new Response(null, { status: res.status, statusText: res.statusText, headers: resHeaders });
        }
        return new Response(res.body, { status: res.status, statusText: res.statusText, headers: resHeaders });
      } catch (err) {
        // Last-resort minimal HTML to avoid 1101 and downloads
        const fallbackHtml = `<!doctype html><meta charset="utf-8"><title>RDM</title><div id="app"></div><script src="/js/components.js" defer></script><script src="/js/main.js" defer></script>`;
        return new Response(fallbackHtml, {
          status: 200,
          headers: {
            'content-type': 'text/html; charset=utf-8',
            'content-disposition': 'inline',
            'cache-control': 'no-store',
            'x-rdm-spa': 'fallback'
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
