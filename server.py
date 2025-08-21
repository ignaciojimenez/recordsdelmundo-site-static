#!/usr/bin/env python3
import http.server
import socketserver
import os
import posixpath
from urllib.parse import urlparse

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def send_head(self):
        # Parse path and normalize
        parsed = urlparse(self.path)
        path = parsed.path
        if path.endswith('/') and len(path) > 1:
            path = path[:-1]

        # SPA routes we want to rewrite to index.html
        is_spa = (
            path in ('', '/', '/tienda', '/info', '/grupos/inc', '/grupos/at', '/grupos/par')
            or path.startswith('/tienda/producto/')
        )

        # Allow real static success page
        if path.startswith('/tienda/success'):
            return super().send_head()

        # If it's an SPA route, serve index.html regardless of file/dir presence
        if is_spa:
            self.path = '/index.html'
            return super().send_head()

        # Otherwise, default static behavior
        return super().send_head()

if __name__ == "__main__":
    PORT = 8000
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print("No-cache headers enabled for easier development testing")
        httpd.serve_forever()
