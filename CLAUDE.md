# CLAUDE.md

ToolBox is a static online tools website at `pdfsmall.top`, built with HTML5 + CSS3 + vanilla JS. No frameworks, no build step, no dependencies (except QR code library loaded via CDN).

## Project structure

```
index.html                  # Homepage — tool grid with search + category filter
about.html                  # About page
css/style.css               # All styles, CSS variables at :root
js/main.js                  # Shared utilities (nav, search, toast, modal, drop-zone, clipboard)
tools/*.html                # 10 standalone tool pages (each self-contained)
robots.txt                  # Allows all crawlers, points to sitemap
sitemap.xml                 # All 12 pages at pdfsmall.top
baidu_verify_codeva-*.html  # Baidu site verification
```

## Architecture conventions

- **Zero framework**: No React, Vue, jQuery — pure vanilla JS with modern DOM APIs.
- **Self-contained tools**: Each `tools/*.html` has its own inline `<style>` (for tool-specific CSS) and inline `<script>` (for tool logic). They share `css/style.css` and `js/main.js` via relative paths (`../css/style.css`, `../js/main.js`).
- **CSS variables** in `:root` control the design system — colors, shadows, radii, transitions.
- **Responsive**: Three breakpoints at 1024px, 768px, 480px in style.css.
- **PRO gating**: Premium features trigger `showPremiumModal(featureName)` from main.js. Payment is not wired yet.
- **Local processing**: All tools run client-side. No file uploads, no server.

## JS utilities (window-scoped from main.js)

| Function | Purpose |
|---|---|
| `showToast(msg, duration?)` | Bottom toast notification |
| `showPremiumModal(featureName)` | PRO upgrade modal overlay |
| `copyResult(el)` | Copy text from element to clipboard |
| `setupDropZone(dropZone, fileInput, onFile)` | Drag-and-drop file input binding |
| `formatSize(bytes)` | Format bytes to human-readable |

## Adding a new tool

1. Create `tools/new-tool.html` — copy an existing tool page as template
2. Add a card to the tool grid in `index.html` with correct `data-cat` attribute
3. Categories: `image`, `text`, `pdf`, `dev`, `life`
4. Run dev server to verify (see below), then commit and push

## Local dev

```bash
# Python 3
python -m http.server 8080
# Open http://localhost:8080

# Or Node
npx serve .
```

## SEO / analytics

- Baidu analytics (`hm.js`) and auto-push (`push.js`) scripts are in `<head>` of every page
- `robots.txt` and `sitemap.xml` at project root, domain is `pdfsmall.top`
- When creating new pages, include the Baidu scripts, unique `<title>` + `<meta description>`

## Git workflow

- Branch: `master` → push directly to `origin master` at `git@github.com:Seabiscuit/tool-website.git`
- Commit style: `feat:` prefix for features, `fix:` for fixes
- No PR workflow — direct pushes to master
- Always commit and push when changes are confirmed working
