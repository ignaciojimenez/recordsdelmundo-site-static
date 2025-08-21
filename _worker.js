export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const isGet = request.method === 'GET';
    const looksLikeFile = /\.[a-zA-Z0-9]{2,8}$/.test(pathname);

    // Allow real static success page under /tienda
    if (pathname.startsWith('/tienda/success')) {
      return env.ASSETS.fetch(request);
    }

    // For SPA routes (no file extension), always serve index.html
    if (isGet && !looksLikeFile) {
      const indexUrl = new URL('/index.html', url.origin);
      return env.ASSETS.fetch(new Request(indexUrl, request));
    }

    // Default static asset serving
    return env.ASSETS.fetch(request);
  }
};
