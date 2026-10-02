# Handoff: Landing Page — Hero Buttons + Project Cards

## Overview
This package covers two scoped changes to the landing page of alzcezhou.github.io (Astro + Tailwind v4):
1. **Hero CTA buttons**: "VIEW WORK ↓" and "RESUME ↗".
2. **Redesigned project cards** in the `#work` section.

Leave everything else on the page alone: StaggeredMenu, hero name and spinner, the role band, My Toolbox, and the footer.

## About the Design Files
`Landing Page.dc.html` is a **design reference built in HTML**. It is not production code. Recreate these pieces in the existing Astro components and Tailwind theme. Ignore the `{{ }}` template syntax and the logic class in the file; they only drive the prototype.

## Fidelity
**High-fidelity.** Match colors, type, spacing and copy exactly.

---

## 1. Hero CTA buttons

### Placement
- The buttons sit at the **bottom of the hero section**, centered, directly above the dark role band ("product designer & front end developer at enlabel global services").
- They must **never overlap the spinner video**. Restructure the hero as a flex column:
  - Hero `<section>`: `min-height: 88vh; display:flex; flex-direction:column; gap:24px; padding: 96px 24px 28px; overflow:hidden; bg #c8c0b9`.
  - Child 1: a `position:relative; flex:1; min-height:0` wrapper, centered with flex. It holds the spinner video (absolutely centered, `max-height:100%`, `max-width:90vw`, `width:800px`, opacity .35) and the H1.
  - Child 2: the button row, `display:flex; flex-wrap:wrap; justify-content:center; gap:12px`.
- **Remove** any subheading under the name.

### Button specs
Both buttons share these styles:
- `display:inline-flex; align-items:center; justify-content:center`
- `height: 44px; padding: 0 22px; line-height: 1` (VT323's metrics sit off-center otherwise; the fixed height plus flex centering fixes it)
- Font: VT323 (`font-accent`), 24px, uppercase copy
- `border-radius: 999px; border: 1.5px solid #0f0f0f`

| | Primary: VIEW WORK ↓ | Secondary: RESUME ↗ |
|---|---|---|
| Default bg / text | `#0f0f0f` / `#f5f2ed` | transparent / `#0f0f0f` |
| Hover | bg + border `#2f5d7c`, text `#fff` | bg `#0f0f0f`, text `#f5f2ed` |
| Link | `#work` (smooth scroll; `#work` has `scroll-margin-top: 32px`) | Resume Google Doc, `target="_blank" rel="noopener"` |

Resume URL: `https://docs.google.com/document/d/1ccqDIQ8-zdBQ3m-IjK5elowPmIn5jeouF58dEjNE70M/edit?usp=sharing`

Add a visible focus style for both buttons (e.g., `outline: 2px solid #2f5d7c; outline-offset: 3px`).

---

## 2. Project cards (`#work`)

### Section header
- Flex row, `justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:16px`.
  - Left: H2 "Work", Vollkorn 500, `clamp(32px,3.5vw,44px)`.
  - Right: "03 CASE STUDIES", VT323 22px, `#2f5d7c`.
- Gap of 28px between the header and the first card, and between cards.

### Order
**eIFU → SkipLegal → Haven** (was Haven first).

### Card anatomy
The whole card is one `<a>` linking to the case study.
- **Container**:
  - `display:grid; grid-template-columns: repeat(auto-fit, minmax(min(100%,360px), 1fr)); gap:32px; align-items:center`
  - `background:#c8c0b9; border-radius:16px; padding: clamp(24px,4vw,48px); color:#0f0f0f`
  - Text on the left, image on the right. Stacks automatically when narrow.
- **Hover**:
  - `transform: translateY(-4px); box-shadow: 0 18px 40px -20px rgba(15,15,15,.45)`
  - `transition: transform .3s, box-shadow .3s`
  - Respect `prefers-reduced-motion` (drop the translate).
- **Text column**: `display:flex; flex-direction:column; gap:18px`.
  1. **Eyebrow**: VT323 20px, letter-spacing .04em.
  2. **Title (h3)**: Vollkorn 500, `clamp(28px,3vw,40px)`, line-height 1.08, letter-spacing -.01em, `text-wrap: balance`.
  3. **Tags**: flex-wrap, gap 8px. Each pill: VT323 18px, `padding:3px 12px`, radius 999px, bg `#0f0f0f`, text `#fff`.
  4. **Result line**:
     - `display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; padding-top:14px; border-top:1px dashed rgba(15,15,15,.3)`
     - Number: Vollkorn 36px, line-height 1, `#2f5d7c`.
     - Label: 15px Hanken Grotesk, line-height 1.4.
  5. **CTA text**: "READ CASE STUDY →", VT323 20px.
- **Image column**: centered flex. The `img` is `width:100%; max-height:380px; object-fit:contain`.

### Card content

| | eIFU | SkipLegal | Haven |
|---|---|---|---|
| Link | `/work/eifu-marketing-site` | `/work/skiplegal` | `/work/haven` |
| Eyebrow | CASE 01 / EIFU · ENLABEL · 2025 | CASE 02 / SKIPLEGAL · CLIENT CAPSTONE · 2025 | CASE 03 / HAVEN · TUFTS PRODUCTHON · 2024 |
| Title | One component system for a family of B2B marketing sites | Letting users decide how much AI touches their immigration forms | Anonymous incident reporting students actually trust |
| Tags | SHIPPED COMPONENTS · RESPONSIVE WEB · B2B | CLIENT PROJECT · AI TOOLS · MULTI-STEP FORMS | 1ST PLACE · MOBILE · 0 TO 1 |
| Result number | Live | +37% | 1st |
| Result label | as React components across enLabel sites | trust rating, test round 1 → 2 | place, Tufts Spring 2024 Producthon |
| Image | `eifu-cover.png` | `skiplegal-cover.png` | `haven-cover.png` |

The images are the site's existing cover images. They are included in `assets/` for reference.

Note: the prototype links to local `.dc.html` files. In production, use the `/work/...` routes above.

---

## Tokens used

| Token | Value |
|---|---|
| ink | `#0f0f0f` (existing `--color-dark`) |
| card / hero bg | `#c8c0b9` (existing `--color-bg-light`) |
| light text on dark | `#f5f2ed` |
| accent | `#2f5d7c` (new; slate blue) |
| page bg | `#ebe6e0` (new) |

- **Fonts**:
  - Vollkorn (`--font-heading`) and VT323 (`--font-accent`) already exist.
  - **Hanken Grotesk** is new (only for the result label). Add it to the Google Fonts import. If you'd rather not add a font yet, fall back to the current body font.
- **Radii**: 16 (cards), 999 (pills/buttons).

## Files
- `Landing Page.dc.html`: the full landing prototype (reference only; the hero `<section>` and `#work` section are the relevant parts).
- `assets/`: card cover images.
