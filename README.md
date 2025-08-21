# Records del Mundo Website

Official website for Records del Mundo, an independent record label. This is a static site built with vanilla HTML, CSS, and JavaScript.

🌐 **Live Site**: NOT YET [recordsdelmundo.es](https://recordsdelmundo.es)  
📦 **Deployment**: [Cloudflare Pages with automatic GitHub sync](https://recordsdelmundo.i-jimenezpi.workers.dev)

## Quick Start

### Local Development (SPA routing)
```bash
# Clone the repository
git clone https://github.com/ignaciojimenez/recordsdelmundo-site-static.git
cd recordsdelmundo-site-static

# Start the dev server (adds SPA rewrites so deep links work)
python3 server.py

# Open any path directly (all will render index.html and client routes)
# http://localhost:8000/
# http://localhost:8000/tienda
# http://localhost:8000/grupos/at
# http://localhost:8000/tienda/producto/vltra
```

### Making Changes
1. Edit files locally
2. Test on local server
3. Commit and push to a feature branch; open PR into `main`
4. Site automatically deploys via Cloudflare Pages

## Content Management

### Data files
- `data/products.json` — Store catalog (all products/albums)
- `data/content.json` — Site content (artist pages under `grupos/*` and the `info` page)

Both files are fetched by `js/main.js` at runtime;

### Add or edit a product (`data/products.json`)
Each product is keyed by a short identifier (used in URLs and image names):

```json
"vltra": {
  "nombre": "vltra",
  "grupo": "ATENCIÓN TSUNAMI",
  "tipo": "disco",
  "estado": "ok",              
  "bcalbum": "0000000000",    
  "img": "vltra",             
  "formato": "Vinilo 12''",
  "lanzamiento": "2019",
  "precio": "15€",
  "btnppal": "ZHYA5ZJ84P94C"   
}
```

Field notes:
- `estado`: 
  - `ok` (sell via PayPal)
  - `preorder` (shows preorder text + PayPal)
  - `bandcamp` (links out)
  - `nobandcamp`/`reedit` (no PayPal)
- `btnppal`: PayPal Hosted Button ID used at `https://www.paypal.com/ncp/payment/{btnppal}`
- `img`: base filename of the cover image in `images/tienda/` (without extension)

### Edit artist/info pages (`data/content.json`)
Artist pages are keyed by their route, e.g. `grupos/at`, `grupos/inc`, `grupos/par`. Example:

```json
"grupos/at": {
  "title": "ATENCIÓN TSUNAMI",
  "image": "images/at_selr_1200.jpg",
  "imageCredit": "Foto: <a href=\"http://nsefotografia.com/\">Mariano Regidor</a>",
  "social": {
    "facebook": "http://www.facebook.com/atencion.tsunami",
    "instagram": "http://instagram.com/atenciontsunami",
    "bandcamp": "http://atenciontsunami.bandcamp.com"
  },
  "files": [
    { "name": "Nota de prensa", "url": "grupos/at/AT_VLTRA_Prensa.pdf" }
  ],
  "content": "<p>Descripción en HTML...</p>"
}
```

The `info` page lives under the `info` key with similar fields.

### Album Images
- Add album covers to `images/tienda/`
- Use `.jpg` format, 280px width recommended
- Filename must match the product’s `img` value (e.g., `img: "vltra"` -> `images/tienda/vltra.jpg`)

### Press Materials
- Add PDF files to `grupos/[artist-folder]/`
- Update links inside `data/content.json` (the `files` array)

## Site Structure

### Pages
- **Home** (`/`): Label info and latest releases
- **Tienda** (`/tienda`): Complete catalog with purchase options  
- **Album Pages** (`/tienda/producto/[album]`): Individual album details
- **Artist Pages** (`/grupos/[artist]`): Artist info and press materials

### Key Files
```
├── index.html          # Main HTML template
├── js/
│   ├── main.js        # Routing, navigation, animations
│   ├── components.js  # Page templates and rendering
├── data/
│   ├── products.json  # Store catalog
│   └── content.json   # Artist pages + info content
├── css/
│   ├── common.css     # Main styles and layout
│   ├── store.css      # Shop-specific styles
│   └── fonts.css      # Custom font definitions
└── images/            # All visual assets
```

## Technical Details

### Architecture
- **Static SPA**: Client-side routing with vanilla JavaScript
- **No Framework**: Pure HTML/CSS/JS for maximum compatibility
- **Component System**: Reusable templates in `components.js`
- **Data-Driven**: JSON-based content management

## Troubleshooting

### Common Issues/Tips
- **Album not showing**: Check `data/products.json` syntax and that the image exists in `images/tienda/`
- **PayPal button not working**: Verify `btnppal` ID in product data
- **Bandcamp player not loading**: Check `bcalbum` ID is correct
- **JSON not loading locally**: Use `python3 server.py` (handles SPA + proper MIME types) so `fetch()` can read `data/*.json` and deep links work
- **Navigation broken**: Check client routing in `js/main.js`
- Test all album states: `ok`, `preorder`, `bandcamp`, `nobandcamp`, `reedit`
