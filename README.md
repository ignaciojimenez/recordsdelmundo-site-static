# Records del Mundo - Static Site Migration

This is a static version of the recordsdelmundo.es website, migrated from PHP to vanilla HTML/CSS/JavaScript for deployment on Cloudflare Pages.

## Features Preserved
- ✅ Exact visual design and spacing
- ✅ Header animation transitions
- ✅ Font rendering (custom fonts)
- ✅ Responsive behavior
- ✅ PayPal purchase integration
- ✅ Bandcamp music players
- ✅ Product catalog with hover effects
- ✅ Social media links

## Features Removed
- ❌ Mailing list signup (as requested)
- ❌ PHP server-side processing
- ❌ Dynamic content generation

## Architecture
- **Single Page Application**: Client-side routing with vanilla JavaScript
- **Component System**: Reusable templates for different page types
- **Data Management**: JSON-based product catalog (converted from CSV)
- **Static Assets**: All images, CSS, and fonts copied from original

## File Structure
```
/
├── index.html          # Main entry point
├── css/               # Stylesheets (copied from original)
├── js/
│   ├── main.js        # Routing and animations
│   ├── components.js  # Page templates
│   └── data.js        # Content and product data
├── images/            # All assets (copied from original)
└── grupos/            # PDF files for press materials
```

## Development
```bash
# Start local server
python3 -m http.server 8000

# Visit http://localhost:8000
```

## Deployment
Ready for deployment to Cloudflare Pages or any static hosting provider. No build process required.

## Migration Notes
- All PHP includes converted to JavaScript templates
- CSV product data converted to JSON
- Dynamic menu states handled client-side
- PayPal forms preserved exactly as static HTML
- Header animations preserved with identical timing
