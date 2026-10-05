# Handoff: enLabel AI Assistant Case Study

## Overview
New case study page for alzcezhou.github.io (Astro + Tailwind v4), suggested route `/work/ai-assistant`. It uses the same case study template as SkipLegal, Haven and eIFU (see `design_handoff_case_study_template` for the shared component specs). This README covers what's **specific to this page**: content, two new modules (interactive Flow and Component Kit grid) and assets.

Subject: a generic AI chat window designed for use across enLabel's packaging and labeling products, applied first in e-Draw. Status: handed off to developers, **not launched**. Copy must not claim it shipped.

## About the Design Files
`AI Chat Case Study.dc.html` is a **design reference built in HTML**, not production code. Recreate it in the existing Astro case study page and components. Ignore the `{{ }}` template syntax and the logic class; they only drive the prototype's menu, scrollspy, flow tabs and footer video. To preview it, open the file in a browser (`support.js` must sit next to it).

**Reuse, don't rebuild:** the existing `StaggeredMenu`, footer (hover video), sticky TOC with scrollspy, and prev / All Projects / next nav.

## Fidelity
**High-fidelity.** Match colors, type, spacing and copy exactly.

## Design Tokens
Same blue accent as SkipLegal/eIFU:

| Token | Value | Use |
|---|---|---|
| accent | `#2f5d7c` | section labels, legend numbers, "Decision →", TL;DR status word |
| accent-light | `#a9cbe0` | WHY label on dark callout |
| ink | `#0f0f0f` | text, dark surfaces, tags |
| hero | `#c8c0b9` | hero bg, image wells |
| page | `#ebe6e0` | body bg |
| card | `#f5f2ed` | cards, TL;DR panel, table body |
| muted | `#5f574f` | TL;DR labels, "Problem →", "Because" column |
| body-2 | `#3d3833` | secondary paragraphs |
| on-dark | `#e6e6e6` / `#d8d2cb` | text on dark (body / flow description) |

Fonts: Vollkorn (headings, 400/500, italic), VT323 (labels/tags/nav), Hanken Grotesk (body 400–700).
Radii: 14px cards/wells, 12px callouts, 10px screenshots, 999px pills, 8px TOC items.

## Page content (top → bottom)

### Hero (shared template)
- Bg `#c8c0b9`, padding `112px clamp(24px,5vw,72px) 0`; 2-col grid (auto-fit, min 420px, gap 40px, align end), max-width 1240px.
- **Eyebrow** (VT323 24px, .04em): `CASE 04 / AI ASSISTANT · ENLABEL · 2025` (confirm year with Alice)
- **H1** (Vollkorn 500, clamp(40px,5.4vw,64px), lh 1.02, -.015em): "One AI assistant for every product in a labeling ecosystem"
- **Tags** (VT323 20px, padding 4px 14px, ink pill, white text): HANDED OFF TO DEV · AI TOOLS · COMPONENT SYSTEM
- **TL;DR panel** (card bg, radius 14px 14px 0 0, padding 24px 24px 28px, 15px). Rows: grid `96px 1fr`, gap 12px, padding 10px 0, top border 1px dashed rgba(15,15,15,.3).
  - Problem: "Each enLabel product needed AI help, and separate chat UIs would fragment the ecosystem"
  - My role: "UX Designer · flows, states, component kit, dev handoff"
  - Delivered: "A generic chat window, end-to-end states and a reusable component kit, applied first in e-Draw"
  - Status: **Handed off** (Vollkorn 30px, accent) "in development, not yet launched"

### Sticky TOC (right column, 140px, sticky top 96px)
"← BACK" (to `/#work`), then 01 CONTEXT · 02 PRINCIPLES · 03 DECISIONS · 04 STATES · 05 FLOW · 06 KIT · 07 REFLECT. Active: bg ink, text `#f5f2ed`; inactive text `#4a443e`. Scrollspy threshold 200px; force last item active at page bottom.

### Main column
Flex column, gap 88px, padding 64px 0. Section labels: VT323 22px, accent.

**01 Context**: 2-col (auto-fit, min 320px, gap 40px, align center).
- Text 22px/1.45: "enLabel makes packaging and labeling software, from label creation in e-Draw to regulated documents in eIFU. Every product wanted an AI assistant. I designed *one* chat window that works inside any of them, drawing on the data it's opened with."
- Sub 16px body-2: "First in-context application: e-Draw, enLabel's label creation software."
- Image: `landing.png` in a hero-color well (radius 14px, padding 28px, centered, img max-width 340px, radius 10px).

**02 Principles · One shell, many products**: ruled 3-up grid (auto-fit, min 200px; 2px ink gaps + border; radius 14px). Cell: card bg, padding 24px; title Vollkorn 22px; body 15px body-2.
- Context is visible: "The top bar names the data source the AI is working from, so users know what it can see in each product."
- Structure beats a blank box: "Quick prompts and a prompt builder turn domain choices into a complete request."
- Never a black box: "Progress steps, a stop button and token cost show what the AI is doing and what it spends."

**03 Key decisions**
1. Featured 2-col (auto-fit, min 300px, gap 32px): left `prompt-built.png` in hero well (padding 24px); right:
   - H3 Vollkorn 28px: "A prompt builder that writes the hard part"
   - Legend rows (grid `28px 1fr`, 15px; number bold accent):
     - **1 Quick prompts**: one-tap starts for common jobs (product label, packaging, IFU, compliance check)
     - **2 Build Your Prompt**: document type, category and standard dropdowns
     - **3 Editable pills**: choices land in the composer as a sentence ("Shipping Label for Organic Food following FDA 2026") the user can still change or extend
   - Dark WHY callout (ink, radius 12px, padding 16px 18px, 14px; label VT323 18px accent-light): "In regulated labeling, a missing standard or category means a wrong label. Structured inputs make sure the critical details are in every prompt, without taking away free text."
2. Two Problem → Decision → Outcome cards (auto-fit, min 280px, gap 16px; card bg, radius 14px, padding 24px; title Vollkorn 24px; body 15px/1.6):
   - **The AI asks instead of guessing**: Problem → vague prompts produce confident but wrong output. Decision → follow-up question cards with numbered answers, an "Other" field and paging (1 of X). Outcome → missing details get resolved before generation, in a few clicks.
   - **Generation you can see and stop**: Problem → long AI tasks feel like a black box. Decision → step chips (Read guidelines → Check compliance → Generate layout), an always-on Stop and token cost before and after. Outcome → users know what's happening, what it costs and how to bail out.

**04 States & edge cases**: 3-col table (`1fr 1.2fr 1fr`). Header ink, VT323 18px, padding 12px 20px. Rows card bg, divider rgba(15,15,15,.1), padding 14px 20px; first col 600; last col muted.

| STATE | DESIGN RESPONSE | BECAUSE… |
|---|---|---|
| First open, nothing typed | Quick prompts + prompt builder | no blank-page problem |
| Voice input | Live waveform, confirm/cancel, transcript preview before send | users approve what was heard |
| Mic permission blocked | Warning icon with "review microphone permissions" tooltip | clear fix, not a silent failure |
| Different needs per task | Model picker in the composer | trade speed for depth |
| Missing details | Follow-up question card, keyboard-selectable | asks before it guesses |
| Generation fails | Plain-language cause, Retry / Edit Prompt, recovery tip | recover without starting over |

On mobile, stack each row as a card.

**05 The flow (new interactive module)**
- Container: ink bg, radius 14px, padding 24px; 2-col grid (auto-fit, min 280px, gap 28px, **align-items: stretch**).
- Left column: flex column, `justify-content: space-between`, gap 24px. **Tabs pinned to the top, title + description pinned to the bottom** (aligned with the screenshot's bottom edge when side by side).
  - Tabs (role=tablist, wrap, gap 6px): VT323 20px, padding 4px 14px, pill, 1.5px `#f5f2ed` border. Active: bg `#f5f2ed`, ink text. Inactive: transparent, `#f5f2ed` text. Label format `01 START`.
  - Title Vollkorn 28px `#f5f2ed`; description 16px/1.55 `#d8d2cb`, max-width 420px; gap 12px.
- Right: screenshot, max-width 340px, radius 10px, centered.
- State: `step` (0–4, default 0). Click a tab → set step; swap title/body/image (no animation needed; a 150ms crossfade is fine).

| # | Tab | Title | Description | Image |
|---|---|---|---|---|
| 01 | START | Start from structure | Quick prompts for common jobs, or the prompt builder for precise ones. The top bar shows which data source the AI is working from. | landing.png |
| 02 | BUILD | Compose, then refine | Builder choices become editable pills in the composer. Attachments and free text add detail, and the token cost shows before sending. | prompt-built.png |
| 03 | CLARIFY | Answer what's missing | If the request is ambiguous, the AI asks follow-up questions with numbered options, an "Other" field and keyboard support. | followup.png |
| 04 | GENERATE | Watch it work | Step chips track progress from reading guidelines to generating the layout. The output streams in, and Stop is always available. | streaming.png |
| 05 | RECOVER | Fail gracefully | Errors say what went wrong in plain language, with Retry, Edit Prompt and a tip for what to try next. | error.png |

**06 Component kit · Built for reuse (new module)**
- Intro 17px/1.6 body-2, max-width 680px: "Every piece is product-agnostic. Each product swaps in its own data source, quick prompts and builder fields, and the shell stays the same."
- Grid (auto-fit, min 220px, gap 16px, align start). Tiles: card bg, radius 14px, padding 20px, gap 12px; caption VT323 18px.
  - `c-topbar.png`: TOP BAR · CONTEXT
  - `c-status.png` (max 220px): STATUS CHIP · 3 STATES
  - `c-builder-pill.png` (max 180px): PROMPT PILL · DEFAULT / REMOVE
  - `c-quick-pill.png` (max 220px): QUICK PROMPT PILL
  - `c-model.png` (max 220px): MODEL PICKER
  - `c-textbox.png` (tile spans 2 rows; img max-height 520px, object-fit contain, top): COMPOSER · 9 STATES

**07 Status & reflection**
- Pull quote (Vollkorn italic, clamp(26px,3vw,34px), lh 1.25, max-width 820px): "Designing a shell for many products meant deciding what stays fixed and what each product gets to change."
- Body 17px body-2, max-width 640px: "Handed off to developers; launch pending. Next: test with e-Draw users once it's live, then bring the same shell to eIFU and the rest of the ecosystem."

### Prev / next nav
← Haven (`/work/haven`) · All Projects · eIFU → (`/work/eifu-marketing-site`). Confirm final project order with Alice and update neighbors' links to match.

## Interactions & State
- `step` (flow tabs) is the only new state. Menu, scrollspy and footer video reuse existing components.
- Hover: BACK button inverts (ink bg, `#f5f2ed` text); nav links opacity .8.

## Responsive
- All grids use `auto-fit / minmax` and collapse on their own.
- Flow module: when stacked, tabs → title/description → screenshot; drop the space-between gap so text doesn't float.
- TOC: below ~768px, hide or convert to a horizontal sticky bar; it must never overlap content.

## Assets (`assets/aichat/`)
From Alice's "generic ai chat ui" Figma exports, renamed:

| File | Original |
|---|---|
| landing.png | 1.1 - landing A.png |
| prompt-a.png | 2.1 - entered prompt A.png (unused, spare) |
| prompt-built.png | 3 - fully built prompt.png |
| speech.png | 1.3 - speech input.png (unused, spare) |
| model.png | 1.4 - change model.png (unused, spare) |
| thinking.png | 4.1 - thinking.png (unused, spare) |
| followup.png | 4.2 - more context 1.png |
| streaming.png | 5 - streaming response.png |
| error.png | 6.3 - error.png |
| c-topbar.png | components/top bar.png |
| c-status.png | components/status chip.png |
| c-builder-pill.png | components/prompt builder pill.png |
| c-quick-pill.png | components/quick prompt pill.png |
| c-model.png | components/model dropdown options.png |
| c-textbox.png | components/text box.png |

Use the alt text from the prototype.

## Files
- `AI Chat Case Study.dc.html`: full-page design reference.
- `support.js`: runtime needed only to open the prototype locally.
- `assets/aichat/`: all images.
