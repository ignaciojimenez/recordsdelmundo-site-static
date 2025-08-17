# Website Migration Prompt: PHP to Static Site

## Project Overview
Migrate the record label website recordsdelmundo.es from PHP to a static, client-side website that can be hosted on Cloudflare Pages (or similar free static hosting).

## Current State Analysis Required
1. **Inspect the codebase** in the current repository
2. **Visit the live site** at recordsdelmundo.es to understand functionality
3. **Document the site structure** and key features you discover

## Migration Requirements

### Technical Constraints
- **Target hosting**: Cloudflare Pages (free tier) - static files only
- **Fallback option**: Cloudflare Workers if absolutely necessary for dynamic features
- **Priority**: Simplicity over complexity - avoid frameworks unless they genuinely simplify
- **Output location**: New folder in `/Users/choco/Workspaces/`

### Content & Features
- **Language**: Website content and variable names are in Spanish
- **Remove entirely**: 
  - Everything in `estorescasa/` folder
  - All mailing list functionality (right panel banner + PHP code)
- **Preserve exactly**:
  - Visual design and spacing
  - Top banner JavaScript animations
  - Font rendering
  - Responsive behavior
  - Different layouts for main site vs. webshop (`tienda/`)

### Quality Standards
- **Visual fidelity**: 100% match to original appearance
- **Code quality**: Clean, professional-grade code suitable for a tech executive's GitHub
- **Documentation**: Concise, actionable (avoid verbosity)
- **Testing**: Self-verify by comparing original vs. new in browser

## Specific Technical Challenges to Address
1. **PHP includes/imports**: Convert to JavaScript modules or build process
2. **Dynamic content**: Identify what's truly dynamic vs. what can be static
3. **Webshop functionality**: Ensure `tienda/` section works identically
4. **Top banner animations**: Preserve JavaScript behavior exactly

## Deliverables Expected
1. **New codebase** in separate folder with identical functionality
2. **Local development server** running and accessible
3. **Pre-verification** that you've tested visual/functional parity
4. **Brief migration notes** explaining key architectural decisions

## Success Criteria
- Original site and new site are visually indistinguishable when compared side-by-side
- All animations, interactions, and responsive behavior preserved
- Codebase is clean, maintainable, and deployment-ready for Cloudflare Pages
- No PHP dependencies remain

## Process
1. Analyze current codebase and live site thoroughly
2. Create migration plan with architectural decisions
3. Implement new version
4. Self-test and verify visual/functional parity
5. Provide working local server for final review

**Note**: This is a stack migration, not a redesign. End users should notice zero difference.

## Project Specifications (Pre-answered)

### Browser & Device Support
- **Target**: Modern browsers only (Chrome, Firefox, Safari, Edge current versions)
- **Responsive design**: Not required for this migration - current desktop-focused layout is fine
- **Mobile**: Current site doesn't work well on mobile, acceptable to maintain this limitation for now

### E-commerce Functionality
- **Payment processing**: PayPal "Buy Now" buttons only (PayPal handles cart/transactions)
- **No server-side commerce logic needed** - just preserve existing PayPal button integrations
- **Webshop is catalog + PayPal buttons** - analyze current implementation in `tienda/`

### Content Management
- **Update frequency**: Very rare content updates
- **Maintenance**: Single technical maintainer (owner), code-based updates are fine
- **No CMS needed** - hardcoded content is acceptable

### Performance & Analytics
- **Performance goal**: Faster than current (leverage static hosting benefits)
- **Analytics**: Remove any existing analytics/tracking code
- **Optimization**: Optimize images, CSS, JS for static delivery

### Deployment
- **Development**: Local dev server for initial testing
- **Production plan**: Eventually point recordsdelmundo.es TLD to new version
- **Hosting target**: Cloudflare Pages free tier