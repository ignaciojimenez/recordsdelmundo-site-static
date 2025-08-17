# Records del Mundo Website

Official website for Records del Mundo, an independent record label. This is a static site built with vanilla HTML, CSS, and JavaScript.

🌐 **Live Site**: NOT YET [recordsdelmundo.es](https://recordsdelmundo.es)  
📦 **Deployment**: [Cloudflare Pages with automatic GitHub sync](https://recordsdelmundo.i-jimenezpi.workers.dev)

## Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/ignaciojimenez/recordsdelmundo-site-static.git

# Start a local server (since it's an SPA nothing else is needed)
python3 -m http.server 8000
```

### Making Changes
1. Edit files locally
2. Test on local server
3. Commit and push to `main` branch
4. Site automatically deploys via Cloudflare Pages

## Content Management

### Adding New Albums
Edit `js/data.js` to add new products:

```javascript
"album-key": {
    "nombre": "album-key",
    "grupo": "artist-name",
    "tipo": "disco",
    "estado": "ok",           // ok, preorder, bandcamp, nobandcamp, reedit
    "bcalbum": "bandcamp-id", // Bandcamp album ID for player
    "img": "album-image",     // Image filename (without .jpg)
    "formato": "Vinilo 12''",
    "lanzamiento": "Release date",
    "precio": "Price €",
    "btnppal": "PAYPAL_BUTTON_ID"
}
```

### Album Images
- Add album covers to `images/tienda/`
- Use `.jpg` format, 280px width recommended
- Filename should match the `img` field in data.js

### Press Materials
- Add PDF files to `grupos/[artist-folder]/`
- Update navigation in `js/main.js` if needed

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
│   └── data.js        # Product catalog and content
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
- **Album not showing**: Check `data.js` syntax and image file exists
- **PayPal button not working**: Verify `btnppal` ID in product data
- **Bandcamp player not loading**: Check `bcalbum` ID is correct
- **Navigation broken**: Check URL hash routing in `main.js`
- Test all album states: `ok`, `preorder`, `bandcamp`, `nobandcamp`, `reedit`
