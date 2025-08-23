export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;
    const looksLikeFile = /\.[a-zA-Z0-9]{2,8}$/.test(pathname);

    // Allow real static success page under /tienda
    if (pathname.startsWith('/tienda/success')) {
      return env.ASSETS.fetch(request);
    }

    // For SPA routes (no file extension), serve index.html for GET and HEAD
    if ((method === 'GET' || method === 'HEAD') && !looksLikeFile) {
      const indexUrl = new URL('/index.html', url.origin);
      const headers = new Headers(request.headers);
      // Prefer HTML, avoid confusing range requests
      headers.set('accept', 'text/html,*/*');
      headers.delete('range');
      headers.delete('content-type');

      const indexReq = new Request(indexUrl, { method, headers });
      const res = await env.ASSETS.fetch(indexReq);

      // Ensure correct content type and inline rendering to prevent downloads on reload
      const resHeaders = new Headers(res.headers);
      resHeaders.set('content-type', 'text/html; charset=utf-8');
      resHeaders.set('content-disposition', 'inline');

      if (method === 'HEAD') {
        return new Response(null, { status: res.status, statusText: res.statusText, headers: resHeaders });
      }
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers: resHeaders });
    }

    // Default static asset serving
    return env.ASSETS.fetch(request);
  }
};
