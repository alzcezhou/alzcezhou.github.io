# Handoff: Case Study Template (SkipLegal first)

## Overview
New layout for case study pages on alzcezhou.github.io (Astro + Tailwind v4). It is built first for `/work/skiplegal` and is meant to become the shared template for `/work/eifu-marketing-site` and `/work/haven`. Goals: shorter copy, faster to scan for recruiters, more visuals. It is targeted at a Product Designer role (trust, multi-step flows, edge cases).

## About the Design Files
`SkipLegal Case Study.dc.html` is a **design reference built in HTML**. It shows the intended look and behavior. It is not production code to copy. Recreate it in the existing Astro site using its established patterns: the Tailwind theme tokens in the global CSS, `[slug].astro` case study pages, and markdown/MDX content. Open the HTML file in a browser to see it.

**Reuse, don't rebuild:**
- **Menu:** use the existing `StaggeredMenu` component exactly as-is. The prototype only imitates it.
- **Footer:** use the existing `#site-footer` with its hover-to-play, reverse-on-leave video, exactly as-is.
- **Prev/next nav:** use the existing case study prev / "All Projects" / next nav. Order is now **eIFU → SkipLegal → Haven** (SkipLegal: prev = eIFU, next = Haven).

## Fidelity
**High-fidelity.** Match colors, type, spacing and copy. Responsive behavior is described below.

## Page structure (top → bottom)
1. **Hero** (`bg #c8c0b9`, padding-top 112px, horizontal padding `clamp(24px,5vw,72px)`, max-width 1240px centered). Two columns, `repeat(auto-fit, minmax(min(100%,420px),1fr))`, gap 40px, aligned to the bottom.
   - Left:
     - Eyebrow: VT323 24px, letter-spacing .04em. Text: `CASE 02 / SKIPLEGAL · CLIENT CAPSTONE · SPRING 2025`
     - H1: Vollkorn 500, `clamp(40px,5.4vw,64px)`, line-height 1.02, letter-spacing -.015em, `text-wrap: balance`. Text: "Letting users decide how much AI touches their immigration forms"
     - Tag pills: VT323 20px, padding 4px 14px, radius 999px, bg #0f0f0f, white text. Tags: CLIENT PROJECT · AI TOOLS · MULTI-STEP FORMS
     - 48px bottom padding.
   - Right: **TL;DR card**, bg #f5f2ed, radius 14px 14px 0 0 (sits flush on the hero bottom edge), padding 24px 24px 28px, 15px text.
     - Title "TL;DR" in VT323 22px.
     - Rows: grid `96px 1fr`, gap 12px, padding 10px 0, top border `1px dashed rgba(15,15,15,.3)`. Label color #5f574f.
     - Problem / My role / Shipped / Result. The Result row shows "+37%" in Vollkorn 30px, accent color.
2. **Body**: flex row, **no wrap**, gap `clamp(24px,4vw,48px)`.
   - `main` is `flex:1 1 0; min-width:0`, padding 64px 0, gap 88px between sections.
   - The right TOC is `flex:0 0 140px; position:sticky; top:96px; margin-top:64px`.
3. **Prev / All Projects / Next nav**: the existing component.
4. **Footer**: the existing component.

### Sections
Every section starts with a label: VT323 22px, accent color, uppercase, numbered (`01 CONTEXT` …). Keep body copy short (~60 words max per section).

- **01 Context**: two columns (auto-fit, min 320px).
  - 22px intro paragraph, line-height 1.45.
  - `flowchart.png`, radius 10px.
- **02 Research**: label `02 RESEARCH · 4 INTERVIEWS · 100+ SURVEY`.
  - 3 insight cells in a grid (auto-fit, min 200px) with 2px gap on a #0f0f0f background. Border 2px #0f0f0f, radius 14px, overflow hidden. This gives a "ruled" look.
  - Each cell: bg #f5f2ed, padding 24px, Vollkorn 22px title, 15px body #3d3833.
- **03 Key decisions**:
  - Annotated wireframe (`form-assist.png`) with 4 numbered pins. Pins: 30px circles, accent background, white 14px bold number, `box-shadow 0 0 0 4px rgba(47,93,124,.25)`. Positions (% of image): 1 (4%,4%), 2 (45%,13%), 3 (28%,55%), 4 (2%,67%).
  - Next to it: a legend listing the 4 panels (Documents, Form viewer, AI assistant, To-Do).
  - A dark "WHY" callout: bg #0f0f0f, text #e6e6e6, radius 12px, padding 16px 18px. Label in VT323 18px, light accent.
  - Below: 2 **Problem → Decision → Outcome** cards. bg #f5f2ed, radius 14px, padding 24px, Vollkorn 24px title. Inline labels: Problem/Outcome in #5f574f, Decision in accent.
- **04 Edge cases & states**: a 3-column table (`1fr 1.2fr 1fr`).
  - Header row: bg #0f0f0f, VT323 18px. Columns: IF THE USER… / THE UI… / BECAUSE…
  - Body rows: bg #f5f2ed, 1px rgba(15,15,15,.1) row dividers, cell padding 14px 20px. First column 600 weight; third column #5f574f.
  - Table: radius 14px.
  - On narrow screens, consider stacking each row as a card.
- **05 Before → after**: two figures side by side (auto-fit, min 280px, gap 24px).
  - Image box: bg #c8c0b9, radius 14px, aspect-ratio 555/400. Before image uses object-fit cover; after image uses contain.
  - Pill badge top-left (12px inset), VT323 18px: BEFORE = #f5f2ed bg / dark text; AFTER = #0f0f0f bg / light text.
  - Captions: Vollkorn 24px title ("Round 1" / "Final MVP") + 15px body.
  - **Impact strip** below: bg #0f0f0f, radius 14px, padding 24px 28px, 2-column auto-fit grid.
    - Label `IMPACT · ROUND 2 TESTING` (VT323 18px, #c8c0b9).
    - "+37%" in Vollkorn 48px, light accent, with the text "trust rating vs. round 1".
    - Three bolded one-liners: Control / Clarity / Orientation.
- **06 Reflection**:
  - Pull quote: Vollkorn italic `clamp(26px,3vw,34px)`, line-height 1.25, max-width 820px.
  - One 17px line on next steps.

### Sticky TOC (right column)
- **"← BACK" button at the top**:
  - Links to `/#work`.
  - VT323 20px, padding 6px 10px, 1.5px solid #0f0f0f border, radius 8px, margin-bottom 12px.
  - Hover: bg #0f0f0f, text #f5f2ed.
- Six items, `01 CONTEXT` … `06 REFLECT` (short labels: CONTEXT, RESEARCH, DECISIONS, STATES, COMPARE, REFLECT).
  - VT323 20px, padding 6px 10px, radius 8px.
  - Inactive: transparent bg, #4a443e text. Active: bg #0f0f0f, text #f5f2ed.

## Interactions & Behavior
- **TOC click**: smooth-scroll to the section with a 32px top offset (`scroll-margin-top`).
- **Scrollspy**: the active item is the last section whose top is < 200px from the viewport top. Force the last item active at page bottom. An IntersectionObserver is fine.
- **Menu / footer**: the existing behavior, unchanged.
- **Responsive**: grids use `auto-fit` / `minmax` and collapse on their own. The TOC must stay a right column. Below ~768px, hide it or turn it into a horizontal sticky bar; never let it overlap content.

## Design Tokens
New body font: **Hanken Grotesk** (400/500/600/700). Add it to the Google Fonts import and use it as the new `--font-body`. Keep `--font-heading: Vollkorn` and `--font-accent: VT323`.

| Token | Value | Use |
|---|---|---|
| ink | #0f0f0f | text, dark surfaces (existing `--color-dark`) |
| hero / taupe | #c8c0b9 | hero bg, image wells (existing `--color-bg-light`) |
| page | #ebe6e0 | body background (new) |
| card | #f5f2ed | cards, table body, TL;DR |
| muted | #5f574f | labels, secondary text |
| body-2 | #3d3833 | secondary paragraphs |
| on-dark | #e6e6e6 | text on dark |
| **accent** | **#2f5d7c** | section labels, pins, Decision label |
| accent-light | #a9cbe0 | accent on dark backgrounds |
| accent-ring | rgba(47,93,124,.25) | pin halo |

- **Radii:** 8 (buttons, TOC), 10 (inline images), 12 (callouts), 14 (cards, tables, image wells), 999 (pills).
- **Type scale:** 15 / 16 / 17 / 22 body; 24 / 26 / 28 subheads; H1 clamp(40–64).

## Assets
In `assets/skiplegal/`: `cover.png` (final MVP on a laptop, transparent), `flowchart.png`, `form-assist.png` (round-1 workspace wireframe), `questionnaire.png`. These match the site's existing SkipLegal images (`skiplegal-cover.png`, `immigration flowchart.png`, `form assistance wireframe.png`, `questionnaire wireframe.png`).

## Applying to eIFU and Haven
Use the same section skeleton:

| Section | eIFU | Haven |
|---|---|---|
| Context | the task | the problem |
| Research | SWOT + sales director interview | 100+ student survey, personas |
| Key decisions | pricing cards v1/v2, contact form, reusable components | anonymity-first onboarding, Report/Reduce toggle, map |
| Edge cases & states | stakeholder constraints, CEO vs. Sales pricing needs | false reports, anonymity |
| Before → after | wireframe → final | wireframe → final |
| Reflection | | |

Move each project's numbers (shipped components, 1st place, etc.) into the TL;DR card and the impact strip.

## Files
- `SkipLegal Case Study.dc.html`: full-page design reference. Ignore the `{{ }}` template syntax and the logic class at the bottom; they only drive the prototype's menu, scrollspy and video.
