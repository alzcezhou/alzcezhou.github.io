# Handoff: Haven Case Study

## Overview
New layout for `/work/haven` on alzcezhou.github.io (Astro + Tailwind v4). It follows the same case study template as SkipLegal and eIFU (see the earlier `design_handoff_case_study_template` package for the shared component specs). This README covers what's **specific to Haven**.

## About the Design Files
`Haven Case Study.dc.html` is a **design reference built in HTML**. It is not production code. Recreate it in the existing Astro case study page and components. Ignore the `{{ }}` template syntax and the logic class; they only drive the prototype's menu, scrollspy and footer video.

**Reuse, don't rebuild:**
- The existing `StaggeredMenu`, footer (hover video) and prev / All Projects / next nav.
- Prev = **SkipLegal** (`/work/skiplegal`); next = **eIFU Marketing Site** (`/work/eifu-marketing-site`). The order is eIFU → SkipLegal → Haven.

## Fidelity
**High-fidelity.** Match colors, type, spacing and copy.

## Haven accent color (differs from the other case studies)

| Token | Value | Use |
|---|---|---|
| accent | `#4a6b50` (dark sage) | section labels, pins/legend numbers, "Decision →", TL;DR result number, research stats |
| accent-light | `#bcd2b8` | accent on dark surfaces (WHY label, impact number) |
| accent-ring | `rgba(74,107,80,.25)` | pin halo (if used) |

Implement this as a per-page override, e.g. `style="--accent:#4a6b50;--accent-light:#bcd2b8"` on the article, so the shared template stays the same. Other tokens: ink `#0f0f0f`, hero/taupe `#c8c0b9`, page `#ebe6e0`, card `#f5f2ed`, muted `#5f574f`, body-2 `#3d3833`, on-dark `#e6e6e6`.

Fonts: Vollkorn (heading), VT323 (accent), **Hanken Grotesk** (body; new, add to the Google Fonts import).

## Page content (top → bottom)

### Hero (shared template)
- **Eyebrow**: `CASE 03 / HAVEN · TUFTS PRODUCTHON · SPRING 2024`
- **H1**: "Anonymous incident reporting students actually trust"
- **Tags**: 1ST PLACE · MOBILE · 0 TO 1
- **TL;DR rows**:
  - Problem: "Students skip institutional reporting because they fear being identified"
  - My role: "Product Designer · 3 designers, 2 engineers · 36 hours"
  - Shipped: "Mobile MVP prototype: anonymous reports, harm-reduction map, brand"
  - Result: **1st** (Vollkorn 30px, accent) "place, Tufts Spring 2024 Producthon"

### Sticky TOC (right column)
- "← BACK" (to `/#work`), then 01 CONTEXT · 02 RESEARCH · 03 DECISIONS · 04 STATES · 05 COMPARE · 06 REFLECT.
- Active item: bg #0f0f0f, text #f5f2ed. Scrollspy threshold: 200px from the top.

### 01 Context
- Two columns (auto-fit, min 320px).
- Text at 22px: "Going to the police or the school often feels worse than doing nothing. What if students could warn each other — and find help — without going through institutions?"
- Image: `cover.png`.

### 02 Research
- **Label**: `02 RESEARCH · 100-STUDENT ANONYMOUS SURVEY`
- **Stat strip**: ruled grid (auto-fit, min 200px; 2px #0f0f0f gaps/border; radius 14px). Each cell: bg #f5f2ed, padding 24px. Number in Vollkorn 44px, accent; label 15px.
  - **64.6%**: said lack of anonymity kept them from reporting
  - **90.6%**: of those would report if it were anonymous
  - **96.5%**: said multiple anonymous reports would change where they go
- **Personas**: 3-up grid (auto-fit, min 220px, gap 12px): `persona-1/2/3.png` (Nikki Park, Jake Logan, Lani Stevens), radius 10px.
- **Caption** (15px, muted): "Survey findings became 3 personas — and the core of our pitch."
- **Full survey figure**: `survey.png`, radius 10px. Caption 13px muted: "Full survey overview, as presented to judges."

### 03 Key decisions
1. **Featured: "One app, two modes, one toggle"**: two columns (auto-fit, min 300px, gap 32px).
   - Left: two phones side by side, `resource-finder.png` (caption REDUCE HARM) and `incident-1.png` (caption REPORT HARM). Captions in VT323 18px, centered.
   - Right:
     - Vollkorn 28px heading.
     - Legend: **1** Reduce Harm — "nearby clinics and services on one map"; **2** Report Harm — "anonymous incidents pinned to places".
     - Dark WHY callout: "Reporting and getting help usually live in separate systems. A single toggle bridges them while keeping each mode focused."
2. **Two Problem → Decision → Outcome cards** (auto-fit, min 280px, gap 16px; bg #f5f2ed, radius 14px, padding 24px). Each card has **two phone screenshots at the top** (2-col grid, gap 10px, radius 10px).
   - **Anonymity from the first screen**
     - Images: `onboarding-1.png`, `onboarding-2.png`
     - Problem: fear of being identified was the #1 barrier.
     - Decision: verify with a university email; collect nothing identifying.
     - Outcome: trust is set before any sensitive content is asked for.
   - **Crowdsourced trust signals**
     - Images: `resource-finder.png`, `hospital-detail.png`
     - Problem: institutional directories lack peer trust.
     - Decision: map-based resources with crowdsourced ratings and services at a glance.
     - Outcome: students judge a provider's safety fast, in high-stress moments.
3. **Brand & UI kit figure** (12px top margin):
   - Header row: Vollkorn 24px "A color system that encodes meaning" with VT323 18px accent label "BRAND & UI KIT" on the right.
   - Image: `style-guide.png`, radius 12px.
   - Caption (15px): "Greens mark resources; purples and reds mark incidents — so mode is readable at a glance, even on the map."

### 04 Edge cases & states
3-column table (`1fr 1.2fr 1fr`). Header: dark, VT323 18px. Body: bg #f5f2ed, row dividers rgba(15,15,15,.1), cell padding 14px 20px.

| IF THE USER… | THE UI… | BECAUSE… |
|---|---|---|
| signs up | verifies via university email only | membership without identity |
| needs help right now | opens Reduce Harm: resources on one map | less load under stress |
| wants to warn others | files an anonymous report pinned to a place | community accountability |
| checks a venue | sees nearby reports by incident type | 96.5% said reports shape plans |
| files a false report | *open question* — moderation not designed in 36 hrs | named as the next problem |

On mobile, consider stacking each row as a card.

### 05 Before → after: two pairs, each with a VT323 18px muted sub-label
Figure spec:
- Image well: bg #c8c0b9, radius 14px, aspect-ratio 530/561.
- Badge top-left: BEFORE = light pill, AFTER = dark pill (VT323 18px).
- Caption: Vollkorn 24px title + 15px body.
- AFTER wells hold **two phones side by side** (height 100%, max-width 48% each, gap 12px, padding 20px, radius 12px).

1. **RESOURCE FINDER**
   - Before: `wire-1.png`, "Wireframe": "Bare map pins and a text popup; no ratings, no hierarchy."
   - After: `resource-finder.png` + `hospital-detail.png`, "Final MVP": "Resource cards with services, crowdsourced ratings and a branded Help/Harm toggle."
2. **INCIDENT REPORTING**
   - Before: `wire-2.png`, "Wireframe": "Single pin and a long gray form; no incident types on the map."
   - After: `incident-2.png` + `submit-report.png`, "Final MVP": "Color-coded incident pins with details, and a short anonymous report form with emergency resources."

**Impact strip** (dark, radius 14px, padding 24px 28px, 2-col auto-fit):
- Label `IMPACT · JUDGES' PANEL`.
- **1st** (Vollkorn 48px, accent-light) with "of all Producthon teams".
- Bullets: **Research** — survey data carried the pitch · **Design** — two use cases in one calm app · **Viability** — MVP prototype in 36 hours.

### 06 Reflection
- Pull quote (Vollkorn italic, clamp 26–34px): "The survey results didn't just inform the design — they were the pitch."
- Next steps (17px): "Next: pressure-test the anonymity model and design for false reports and misuse."

## Assets (`assets/haven/`)
These are the same images already on the live Haven page, renamed:

| File | Original name |
|---|---|
| `cover.png` | header.png |
| `persona-1/2/3.png` | persona1/2/3.png |
| `survey.png` | survey overview.png |
| `wire-1.png` | haven wireframe 1.png |
| `wire-2.png` | haven wireframe 2.png |
| `style-guide.png` | haven style guide 1.png |
| `onboarding-1/2.png` | same |
| `resource-finder.png` | same |
| `hospital-detail.png` | same |
| `incident-1.png` | incident-date-rape.png |
| `incident-2.png` | incident-physical-fight.png |
| `submit-report.png` | same |

Use alt text from the prototype.

## Responsive
- All grids use `auto-fit / minmax` and collapse on their own.
- The TOC stays a right column on desktop. Below ~768px, hide it or convert it to a horizontal sticky bar; it must never overlap content.

## Files
- `Haven Case Study.dc.html`: full-page design reference.
- `assets/haven/`: all images.
