# Alice Zhou Portfolio — Agent Guide

## Quick Reference

| What | Where |
|------|-------|
| Framework | Astro 5 + Tailwind v4 |
| Dev server | `npm run dev` → localhost:4321 |
| Build | `npm run build` → `dist/` |
| Preview | `npm run preview` |
| Deploy | Push to `main` → GitHub Actions → GitHub Pages |
| Live URL | https://alzcezhou.github.io |
| Add project | Create `src/content/work/<slug>.md` |
| Edit project | Edit markdown in `src/content/work/` |
| Edit styles | `src/styles/global.css` |
| Edit layout | `src/layouts/BaseLayout.astro` or `CaseStudyLayout.astro` |
| Node version | 22 (set in CI) |

---

## Architecture

### Directory Structure

```
alzcezhou.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions → GitHub Pages
├── public/
│   ├── favicon.svg               # SVG favicon (rosette pattern)
│   └── images/                   # Static images (create when adding images)
│       └── <slug>/               # e.g. images/haven/, images/eifu-marketing-site/
├── src/
│   ├── components/
│   │   ├── Footer.astro          # Dark footer with "THANKS FOR VISITING"
│   │   ├── InsightCard.astro     # Insight/action card for usability findings
│   │   ├── Nav.astro             # Fixed nav bar with responsive mobile menu
│   │   ├── ProjectCard.astro     # Dark card linking to a case study
│   │   ├── SectionHeading.astro  # Styled heading for case study sections
│   │   └── Spinner.astro         # Decorative overlapping-ellipses SVG rosette
│   ├── content/
│   │   └── work/
│   │       ├── haven.md               # Case study: Haven (order: 1)
│   │       ├── eifu-marketing-site.md # Case study: eIFU Marketing Website (order: 2)
│   │       └── skiplegal.md           # Case study: SkipLegal (order: 3)
│   ├── layouts/
│   │   ├── BaseLayout.astro      # Root layout — Nav + Footer + <head>
│   │   └── CaseStudyLayout.astro # Case study wrapper — header + prose area
│   ├── pages/
│   │   ├── index.astro           # Home — hero + tagline + project cards
│   │   ├── about.astro           # About — bio, education, contact
│   │   └── work/
│   │       └── [slug].astro      # Dynamic route for case studies
│   ├── styles/
│   │   └── global.css            # Tailwind import + @theme tokens + base styles
│   └── content.config.ts         # Zod schema for the "work" content collection
├── astro.config.mjs              # Astro config: site URL, Tailwind Vite plugin
├── package.json                  # Dependencies: astro, tailwindcss, @tailwindcss/vite
├── tsconfig.json                 # Extends astro/tsconfigs/strict
├── AGENT.md                      # This file
└── README.md                     # Human-facing readme
```


### How Pages Work

- Astro generates **static HTML** at build time (`output: "static"` in `astro.config.mjs`)
- Each `.astro` file in `src/pages/` maps to one route:
  - `src/pages/index.astro` → `/`
  - `src/pages/about.astro` → `/about`
- Case studies use a **dynamic route**: `src/pages/work/[slug].astro`
  - This file queries the `work` content collection and renders each entry
  - Content comes from markdown files in `src/content/work/`
- The `site` field in `astro.config.mjs` is set to `https://alzcezhou.github.io`

### How Styling Works

- **Tailwind v4** is loaded via the Vite plugin (`@tailwindcss/vite`), not PostCSS
- There is **no `tailwind.config.js`** — all customization lives in `@theme {}` inside `src/styles/global.css`
- Custom tokens are registered in the `@theme` block and usable as Tailwind utilities:
  - Colors: `bg-taupe-300`, `text-charcoal-600`, `border-taupe-400/50`, etc.
  - Fonts: `font-display`, `font-heading`, `font-body`
- Base styles (body font, background, scrollbar, link hover, selection) are in `global.css` below the `@theme` block
- The `.img-placeholder` class is a temporary gradient placeholder — replace with real `<img>` tags when images are available

### How Content Collections Work

- Defined in `src/content.config.ts` using Astro's `defineCollection` + `glob` loader
- The loader reads `**/*.md` from `./src/content/work`
- Each markdown file is validated against a Zod schema at build time
- The file name (minus `.md`) becomes the slug and the collection entry `id`
- Body content (below the `---` frontmatter) is rendered as HTML inside `CaseStudyLayout`

### How the Home Page Loads Projects

In `src/pages/index.astro`:

```astro
const projects = (await getCollection("work")).sort(
  (a, b) => a.data.order - b.data.order,
);
```

Projects are sorted by the `order` field (ascending). Each is rendered via `<ProjectCard>`. The `href` is `/work/${project.id}` where `id` = the filename without `.md`.

---

## Content Schema Reference

Defined in `src/content.config.ts`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Project name displayed in card and case study header |
| `subtitle` | `string` | Yes | Italicized tagline below the title on the case study page |
| `year` | `string` | Yes | Year or range, e.g. `"2024"` or `"2023–2024"` |
| `role` | `string` | Yes | Role title, e.g. `"Product Designer"` |
| `category` | `string` | Yes | Category badge, e.g. `"Hackathon Project \| Product Design"` |
| `description` | `string` | Yes | One-sentence summary shown on the home page card |
| `order` | `number` | Yes | Sort order on the home page (1 = first) |
| `coverAlt` | `string` | Yes | Alt text for the cover image placeholder |
| `responsibilities` | `string[]` | Yes | List of responsibilities shown in the case study sidebar |
| `results` | `string[]` | Yes | List of results shown in the case study sidebar |

All fields are **required**. A missing or mistyped field will cause a build error with a clear Zod validation message.

---

## Design Tokens

### Colors

| Token | Hex | Tailwind utility examples |
|-------|-----|--------------------------|
| `taupe-50` | `#FAF7F4` | `bg-taupe-50`, `text-taupe-50` |
| `taupe-100` | `#F0EBE4` | `bg-taupe-100` |
| `taupe-200` | `#D4C8B8` | `bg-taupe-200`, scrollbar track |
| `taupe-300` | `#C4B5A4` | `bg-taupe-300` — **body background** |
| `taupe-400` | `#B8A998` | `bg-taupe-400` — tagline strip |
| `taupe-500` | `#9E9285` | `text-taupe-500` — muted labels |
| `taupe-600` | `#7A6F63` | `text-taupe-600` — secondary text |
| `taupe-700` | `#5C544A` | `text-taupe-700` |
| `charcoal-50` | `#F5F5F5` | `bg-charcoal-50` |
| `charcoal-100` | `#E0E0E0` | `text-charcoal-100` |
| `charcoal-200` | `#ABABAB` | `text-charcoal-200` |
| `charcoal-300` | `#757575` | `text-charcoal-300` |
| `charcoal-400` | `#4A4A4A` | `text-charcoal-400` |
| `charcoal-500` | `#3A3A3A` | `bg-charcoal-500` — project cards; `text-charcoal-500` |
| `charcoal-600` | `#2D2D2D` | `bg-charcoal-600` — footer bg; `text-charcoal-600` — body text, selection bg |
| `charcoal-700` | `#1A1A1A` | `text-charcoal-700` — headings, primary text |

### Fonts

| Token | Font Family | Usage | Tailwind class |
|-------|-------------|-------|----------------|
| `font-display` | UnifrakturMaguntia (blackletter) | Hero name on home page | `font-display` |
| `font-heading` | Cormorant Garamond (serif) | Section headings, case study titles | `font-heading` |
| `font-body` | DM Sans (sans-serif) | Body text, labels, navigation | `font-body` |

Fonts are loaded from Google Fonts via a `<link>` tag in `BaseLayout.astro`.

### Visual Conventions

- **Background:** `taupe-300` (warm sandy beige)
- **Primary text:** `charcoal-700` (near-black)
- **Secondary text:** `charcoal-600` or `taupe-600`
- **Muted labels:** `taupe-500`, uppercase, `tracking-widest`, `text-xs`
- **Cards:** `bg-charcoal-500` with taupe text — dark-on-light inversion
- **Footer:** `bg-charcoal-600` dark section
- **Hover:** Links fade to `opacity: 0.7` on hover (global CSS)
- **Selection:** `charcoal-600` background with `taupe-50` text
- **Border radius:** `rounded-2xl` on cards, `rounded-xl` on images, `rounded-lg` on smaller elements

---

## Component Reference

### BaseLayout

**File:** `src/layouts/BaseLayout.astro`
**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page `<title>` tag |
| `description` | `string?` | `"Portfolio of Alice Zhou — UX Designer"` | Meta description |

**Provides:** `<head>` (charset, viewport, fonts, favicon), `<Nav />`, `<main>` slot, `<Footer />`

### CaseStudyLayout

**File:** `src/layouts/CaseStudyLayout.astro`
**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Project title |
| `subtitle` | `string?` | — | Italicized subtitle |
| `year` | `string` | — | Year or range |
| `role` | `string` | — | Role title |
| `category` | `string?` | — | Category badge |
| `responsibilities` | `string[]` | `[]` | Responsibility list |
| `results` | `string[]` | `[]` | Results list |

**Provides:** Header with metadata sidebar + cover placeholder, prose-styled `<slot />` for markdown content, "← All Projects" link at the bottom. Wraps in `BaseLayout`.

**Prose styling** is applied via Tailwind arbitrary variants on the `<section>` wrapper:
- `h2`: serif italic, 3xl–4xl, with top/bottom margins
- `h3`: serif, 2xl, charcoal-600
- `p`: body font, relaxed leading, charcoal-600
- `ul`/`ol`: disc/decimal lists with spacing
- `blockquote`: left border, italic, taupe-600
- `img`: rounded-xl, full width, vertical margins
- `strong`: charcoal-700, semibold

### Nav

**File:** `src/components/Nav.astro`
**Props:** None

Fixed to top of viewport (`fixed top-0 inset-x-0 z-50`). Contains:
- Logo link ("Alice Zhou") → `/`
- Desktop links: hidden on mobile (`hidden md:flex`)
- Mobile hamburger menu with animated bars (pure JS, no framework)

**Navigation links** are defined at the top of the file:

```astro
const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Resume", href: "#" },
  { label: "Contact", href: "/about#contact" },
];
```

To add/remove/edit nav links, modify this array.

### Footer

**File:** `src/components/Footer.astro`
**Props:** None

Dark section (`bg-charcoal-600`) with serif italic "THANKS FOR VISITING" (`font-heading`) and a bottom bar with "Designed & Coded by Alice" plus Resume/Email/LinkedIn links.

### ProjectCard

**File:** `src/components/ProjectCard.astro`
**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Project name |
| `description` | `string` | One-line description |
| `category` | `string` | Category badge |
| `href` | `string` | Link to case study page |
| `coverAlt` | `string` | Alt text for cover image |

Dark card (`bg-charcoal-500`) with two-column layout: text left, 4:3 image placeholder right. Category badge, title, and description. Lifts on hover (`group-hover:-translate-y-1`).

To replace the placeholder with a real image, replace the `.img-placeholder` div with:

```html
<img src="/images/<slug>/cover.jpg" alt={coverAlt} class="aspect-[4/3] md:aspect-auto w-full object-cover" />
```

### Spinner

**File:** `src/components/Spinner.astro`
**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `200` | Width and height in px |
| `class` | `string?` | `""` | Additional CSS classes |

Decorative SVG rosette with:
- 12 outer ellipses at 30° intervals (radius 120 from center)
- 8 inner ellipses at 45° intervals (radius 70 from center)
- Two concentric circles (r=140, r=50)
- 24 radial tick marks

Color is set via `currentColor` — pass a text color class to change it (e.g. `text-charcoal-700 opacity-40`).

### SectionHeading

**File:** `src/components/SectionHeading.astro`
**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Heading text |

Renders an italic serif `<h2>` with a short horizontal rule below. Use inside case study bodies or custom pages.

### InsightCard

**File:** `src/components/InsightCard.astro`
**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `insight` | `string` | — | The insight text |
| `action` | `string` | — | The recommended action |
| `label` | `string?` | `"Insight"` | Label above the insight |

Bordered card with two sections separated by a divider. Designed for usability testing findings in case studies.

---

## Case Study Markdown Template

Copy this into `src/content/work/<slug>.md` and fill in the values:

```markdown
---
title: "Project Name"
subtitle: "Brief tagline"
year: "2024"
role: "Product Designer"
category: "Project Type | Design Discipline"
description: "One sentence for the home page card."
order: 4
coverAlt: "Description of cover image"
responsibilities:
  - "User Research"
  - "UI/UX Design"
  - "Prototyping"
results:
  - "Key outcome 1"
  - "Key outcome 2"
---

## Overview

A paragraph introducing the project, the problem space, and your role.

## Research

What you discovered through user research, competitive analysis, etc.

## Design Process

How you approached the solution — wireframes, iterations, testing.

## Solution

The final design and key features.

## Results & Reflections

Outcomes, metrics, and what you learned.
```

### Frontmatter Rules

- All fields are **required** (Zod will fail the build if any are missing)
- `order` determines home page sort position (lower = higher on page)
- `title` and `description` appear on the `ProjectCard` on the home page
- `subtitle`, `year`, `role`, `category`, `responsibilities`, `results` appear on the case study header
- `coverAlt` is used as alt text for the cover image placeholder

### Markdown Body

- Use `## Heading` for major sections (styled as italic serif headings)
- Use `### Subheading` for subsections
- Standard markdown: `**bold**`, `*italic*`, `[links](url)`, lists, blockquotes
- Images: `![alt text](/images/<slug>/filename.jpg)` — place files in `public/images/<slug>/`
- The body renders inside `CaseStudyLayout`'s prose-styled `<section>`

---

## Common Tasks

### Adding a New Case Study

1. Create `src/content/work/<slug>.md` using the template above
2. Set `order` to position it on the home page (existing: haven=1, eifu=2, skiplegal=3)
3. Add images to `public/images/<slug>/`
4. The home page card appears automatically (sorted by `order`)
5. The route `/work/<slug>` is generated automatically by the dynamic route
6. Run `npm run build` to verify — Zod will catch any frontmatter errors

### Removing a Case Study

1. Delete the `.md` file from `src/content/work/`
2. Optionally delete the corresponding `public/images/<slug>/` folder
3. The home page and routes update automatically

### Changing the Color Palette

1. Edit the `@theme {}` block in `src/styles/global.css`
2. Token names (`taupe-*`, `charcoal-*`) are used throughout all components
3. Change hex values — keep the names to avoid updating every component
4. To add a new color family, add `--color-newname-*` entries in the `@theme` block

### Changing Fonts

1. Update the Google Fonts `<link>` URL in `src/layouts/BaseLayout.astro` (line 24)
2. Update `--font-display`, `--font-heading`, `--font-body` in `src/styles/global.css`
3. Three font roles:
   - **display** — hero name, footer display text (blackletter)
   - **heading** — section headings, case study titles (serif)
   - **body** — paragraphs, labels, navigation (sans-serif)

### Adding Images

1. Place images in `public/images/` (organized by project slug)
2. Reference in markdown: `![alt text](/images/<slug>/filename.jpg)`
3. Reference in components: `<img src="/images/<slug>/filename.jpg" alt="..." />`
4. Replace `.img-placeholder` elements in components with real `<img>` tags:
   - `ProjectCard.astro` — cover image (16:9 aspect)
   - `CaseStudyLayout.astro` — header cover image (16:10 aspect)
   - `about.astro` — profile photo (3:2 aspect) and full-width photo (3:2 aspect)

### Editing the Navigation

Edit the `links` array at the top of `src/components/Nav.astro`:

```astro
const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Resume", href: "#" },
  { label: "Contact", href: "/about#contact" },
];
```

### Editing the Footer

Edit `src/components/Footer.astro`. Update:
- Display text: the `<p class="font-display ...">` element
- Links: the `<a>` tags for email and LinkedIn (update `href` values)

### Editing the Home Page Hero

Edit `src/pages/index.astro`:
- Hero name: the `<h1>` inside the hero `<section>`
- Spinner: adjust `size` or `class` on the `<Spinner>` component
- Tagline: the `<p>` inside the `bg-taupe-400` div

### Changing the About Page Bio

Edit `src/pages/about.astro`:
- Bio text: the `<p class="font-body text-base ...">` in the left column
- Education: the `<p>` elements in the right column
- Interests: the `<p>` in the `#contact` section
- Contact links: the `<a>` tags at the bottom of the contact section
- Profile photo: replace the `.img-placeholder` in the right column
- Bottom photo: replace the `.img-placeholder` in the last section

### Replacing a Placeholder with a Real Image

Find the `.img-placeholder` div and replace it. Example for `ProjectCard`:

**Before:**
```html
<div class="img-placeholder aspect-[4/3] md:aspect-auto w-full order-1 md:order-2" role="img" aria-label={coverAlt}>
  <span class="text-taupe-600/60 text-xs font-body px-4 text-center" aria-hidden="true">{coverAlt}</span>
</div>
```

**After:**
```html
<img src={`/images/${slug}/cover.jpg`} alt={coverAlt} class="aspect-[4/3] md:aspect-auto w-full object-cover order-1 md:order-2" />
```

You'll need to add the `slug` to the component's props or derive it from the `href`.

---

## Creating the Dynamic Route Page

The dynamic route page at `src/pages/work/[slug].astro` already exists. Here's its code for reference:

```astro
---
import { getCollection, render } from "astro:content";
import CaseStudyLayout from "../../layouts/CaseStudyLayout.astro";

export async function getStaticPaths() {
  const entries = await getCollection("work");
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<CaseStudyLayout
  title={entry.data.title}
  subtitle={entry.data.subtitle}
  year={entry.data.year}
  role={entry.data.role}
  category={entry.data.category}
  responsibilities={entry.data.responsibilities}
  results={entry.data.results}
>
  <Content />
</CaseStudyLayout>
```

This file at `src/pages/work/[slug].astro`:
1. Queries all entries in the `work` collection
2. Generates a static page for each at `/work/<slug>`
3. Renders the markdown body inside `CaseStudyLayout`

---

## Configuration Files

### `astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://alzcezhou.github.io",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- `site` — used for canonical URLs and sitemap; update if deploying to a custom domain
- `output: "static"` — pre-renders all pages at build time
- Tailwind is a Vite plugin, not a PostCSS plugin (Tailwind v4 approach)

### `tsconfig.json`

```json
{ "extends": "astro/tsconfigs/strict" }
```

Strict TypeScript — component props are typed via `interface Props`.

### `package.json` Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `astro dev` | Start dev server at localhost:4321 |
| `build` | `astro build` | Build static site to `dist/` |
| `preview` | `astro preview` | Preview the built site locally |
| `astro` | `astro` | Run any Astro CLI command |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `astro` | `^5.5.0` | Framework |
| `tailwindcss` | `^4.1.0` | CSS framework (dev) |
| `@tailwindcss/vite` | `^4.1.0` | Tailwind Vite integration (dev) |

---

## Deployment

### GitHub Actions Workflow

The workflow at `.github/workflows/deploy.yml`:
1. Triggers on push to `main` (or manual dispatch)
2. Checks out code, sets up Node 22, runs `npm ci` + `npm run build`
3. Uploads `dist/` as a Pages artifact
4. Deploys to GitHub Pages

### GitHub Pages Setup

1. Go to the repo **Settings → Pages**
2. Under "Build and deployment", set **Source** to **GitHub Actions**
3. Push to `main` to trigger the first deployment
4. The site will be live at `https://alzcezhou.github.io`

### Custom Domain (Optional)

1. Create `public/CNAME` containing the domain (e.g. `alicezhou.design`)
2. Update `site` in `astro.config.mjs` to match
3. Configure DNS: CNAME record pointing to `alzcezhou.github.io`
4. In repo Settings → Pages, enter the custom domain and enable HTTPS

### Local Development

```bash
npm install          # install dependencies
npm run dev          # start dev server at localhost:4321
npm run build        # build for production
npm run preview      # preview the production build
```

The dev server supports hot module replacement — changes to `.astro`, `.css`, and `.md` files reflect immediately.

---

## Troubleshooting

### Build fails with Zod validation error

```
[ERROR] [content] "work/example.md" frontmatter does not match schema
```

**Fix:** Every field in the schema is required. Check the markdown file's frontmatter against the schema table above. Common issues:
- Missing a field entirely
- Wrong type (e.g. `order: "1"` instead of `order: 1`)
- Typo in field name (`responsibility` vs `responsibilities`)

### Case study page returns 404

**Fix:** Ensure `src/pages/work/[slug].astro` exists. See "Dynamic Route Page" section above for the full code.

### Styles not applying

- Tailwind v4 uses the Vite plugin, not PostCSS. Ensure `@tailwindcss/vite` is in `devDependencies`.
- Custom tokens must be inside the `@theme {}` block in `global.css`.
- If a class like `bg-taupe-300` doesn't work, verify the token is defined as `--color-taupe-300` in the `@theme` block.

### Fonts not loading

- Fonts are loaded via Google Fonts `<link>` in `BaseLayout.astro`
- If changing fonts, update both the `<link>` URL and the `--font-*` values in `global.css`
- Check the browser Network tab for 404s on font requests

### Images not appearing

- Images must be in `public/` (not `src/`)
- Reference with an absolute path: `/images/haven/cover.jpg` (no `public/` prefix)
- Astro copies `public/` to the root of `dist/` at build time

### Mobile menu not working

The hamburger menu uses a `<script>` tag at the bottom of `Nav.astro` with vanilla JS. If it breaks:
- Check the element IDs match: `menu-toggle`, `mobile-menu`, `bar-top`, `bar-mid`, `bar-bot`
- The script runs on page load (no `DOMContentLoaded` wrapper — Astro scripts are deferred by default)

### Dev server port conflict

If port 4321 is in use: `npx astro dev --port 3000`

### Node version mismatch

The CI uses Node 22. If you see build errors locally, ensure your local Node version matches:
```bash
node --version   # should be v22.x
```

---

## Existing Case Studies

| Slug | Title | Order | Year | Category |
|------|-------|-------|------|----------|
| `haven` | Haven | 1 | 2024 | Hackathon Project \| Product Design |
| `eifu-marketing-site` | eIFU Marketing Website | 2 | Jan – Mar 2025 | B2B SaaS Website \| UX Design |
| `skiplegal` | SkipLegal | 3 | Spring 2025 | Capstone Project & Contract Role \| Product Design |

All three have full markdown body content with multiple `## Section` headings covering the complete case study narrative.

---

## File-by-File Reference

| File | Lines | Purpose |
|------|-------|---------|
| `astro.config.mjs` | 10 | Site URL, static output, Tailwind Vite plugin |
| `package.json` | 19 | Scripts, dependencies |
| `tsconfig.json` | 3 | Extends Astro strict config |
| `.gitignore` | 4 | Ignores node_modules, dist, .astro, .DS_Store |
| `src/content.config.ts` | 20 | Zod schema for work collection with glob loader |
| `src/styles/global.css` | 86 | Tailwind import, @theme tokens, base styles, scrollbar, placeholders |
| `src/layouts/BaseLayout.astro` | 37 | Root layout: head, fonts, Nav, main slot, Footer |
| `src/layouts/CaseStudyLayout.astro` | 96 | Case study layout: header, sidebar, prose slot, back link |
| `src/components/Nav.astro` | 94 | Fixed nav, desktop links, mobile hamburger menu |
| `src/components/Footer.astro` | 10 | Dark footer with display text and social links |
| `src/components/ProjectCard.astro` | 31 | Dark card with cover placeholder, category, title, description |
| `src/components/Spinner.astro` | 49 | SVG rosette: 12+8 ellipses, 2 circles, 24 tick marks |
| `src/components/SectionHeading.astro` | 13 | Italic serif h2 with decorative rule |
| `src/components/InsightCard.astro` | 28 | Insight/action card with divider |
| `src/pages/index.astro` | 47 | Home: hero with Spinner, tagline strip, project card grid |
| `src/pages/about.astro` | 69 | About: bio, education, photo placeholder, contact, interests |
| `src/content/work/haven.md` | ~120 | Haven case study (full content) |
| `src/content/work/eifu-marketing-site.md` | ~120 | eIFU Marketing Website case study (full content) |
| `src/content/work/skiplegal.md` | ~110 | SkipLegal case study (full content) |
| `src/pages/work/[slug].astro` | 28 | Dynamic route for case studies |
| `.npmrc` | 1 | Overrides npm registry to public (local dev) |
| `.github/workflows/deploy.yml` | ~43 | GitHub Actions deployment workflow |
