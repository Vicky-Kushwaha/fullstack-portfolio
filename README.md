# Full Stack Developer Portfolio

A single-page portfolio site for **Vicky Kumar** — plain HTML, CSS and a small
amount of vanilla JavaScript. No build step, no dependencies, no framework.

## Run it locally

Open `index.html` directly in a browser, or serve the directory:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

There is nothing to install and nothing to compile.

## Structure

```
index.html        all page content and markup
css/styles.css    design tokens, layout, theming, responsive rules
js/main.js        theme toggle, mobile nav, role typewriter, meter animation
```

## Features

- Responsive from 320px up; single column on mobile, multi-column at 620px and 900px.
- Light and dark themes. Defaults to the visitor's `prefers-color-scheme`, then
  remembers an explicit choice in `localStorage`.
- All content is in the HTML. JavaScript only enhances — with JS disabled the
  page still renders every section and every link still works.
- Honours `prefers-reduced-motion`: the typewriter and the skill-bar animation
  are skipped.
- Keyboard accessible: skip link, visible focus rings, `Escape` closes the
  mobile menu, labelled toggle buttons.
- No external requests. Fonts are system fonts, icons are inline SVG, and the
  favicon is a data URI, so the page has no third-party dependencies and can be
  served from any static host.

## Deploying

Any static host works, including GitHub Pages: serve the repository root
directly. No build command and no output directory are needed.

## Content provenance

Profile text, skills, projects and education are taken from the owner's existing
React portfolio (`Vicky-Kushwaha/Portfolio`) and from the public GitHub API for
this account, so nothing here is invented. Two things are worth knowing:

- **Project cards use generated gradient tiles, not screenshots.** The original
  site's images were deliberately not copied into this repository. If you want
  real screenshots, add them to `assets/` and swap the `.project-top` element in
  each card for an `<img>`.
- **The resume link points at the existing PDF** in the `Portfolio` repository
  rather than duplicating the file here.
