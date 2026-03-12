# Alice Zhou — Portfolio Website

This is Alice's personal portfolio site. It shows your work, your about page, and individual case study pages for each project. It's a static website — meaning it's just files, no database, no server to manage. It builds itself and publishes to the web every time you push changes.

**Live at:** https://alzcezhou.github.io

---

## How the site is organized

```
Your projects live here (as simple text files):
  src/content/work/haven.md
  src/content/work/skiplegal.md
  src/content/work/eifu-marketing-site.md

The pages you see:
  src/pages/index.astro        ← Home page (hero + project cards)
  src/pages/about.astro        ← About page (bio, photo, contact)
  src/pages/work/[...slug].astro  ← Auto-generates a page for each project

Shared pieces (header, footer, cards):
  src/components/

Colors, fonts, and styling:
  src/styles/global.css

Images go here:
  public/images/
```

The most important thing to know: **your case study content lives in plain text files** (the `.md` files in `src/content/work/`). You don't need to touch any code to add or edit a project.

---

## How to run it on your computer

You need [Node.js](https://nodejs.org/) installed (version 22 recommended — matches the CI pipeline).

1. Open a terminal in this folder
2. Run `npm install` (only needed the first time)
3. Run `npm run dev`
4. Open http://localhost:4321 in your browser

That's it. The site updates live as you make changes.

When you're done, press `Ctrl+C` in the terminal to stop it.

---

## How to add a new project

1. Create a new file in `src/content/work/` — name it something like `my-project.md`
2. Paste this template at the top of the file and fill it in:

```
---
title: "Project Name"
subtitle: "A short tagline"
year: "2025"
role: "Product Designer"
category: "Project Type | Design Discipline"
description: "One sentence that appears on the home page card."
order: 4
coverAlt: "Describe what the cover image shows"
responsibilities:
  - "User Research"
  - "UI/UX Design"
  - "Prototyping"
results:
  - "What you delivered"
  - "Any awards or metrics"
---
```

3. Below that `---`, write your case study using headings and paragraphs:

```
## Discovery

Write about the problem you were solving...

## Research

What you learned from users...

## Design

How you approached the solution...

## Outcome & Reflection

What happened and what you'd do differently...
```

4. That's it. The home page will show a new card for this project, and it gets its own page at `/work/my-project` automatically.

**The `order` number controls where it appears on the home page.** Lower numbers show up first. The current projects use 1, 2, and 3, so use 4 for the next one (or rearrange by changing the numbers).

---

## How to edit an existing project

Open the `.md` file in `src/content/work/` and change whatever you want. The top section between the `---` marks controls the card and header info. Everything below is the case study content.

---

## How to add images

1. Put your image files in `public/images/` (you can organize by project, like `public/images/haven/`)
2. In your markdown file, add: `![description of image](/images/haven/photo.jpg)`
3. To replace the placeholder images in the site layout, you'll need to edit the component files — see `AGENT.md` for details

---

## How to change the about page

Edit `src/pages/about.astro`. Your bio text, education info, interests, and contact links are all right there in plain English — find the text you want to change and update it.

---

## How it gets published

Every time you push changes to the `main` branch on GitHub, a robot (GitHub Actions) automatically:

1. Builds the site into plain HTML files
2. Publishes those files to GitHub Pages

You don't need to do anything special. Just push your changes and wait about a minute.

### First-time setup for GitHub Pages

If the site isn't live yet, you need to flip one switch:

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under "Build and deployment", set the **Source** to **GitHub Actions**
3. Push any change to `main` to trigger the first deployment

---

## How to use an AI agent to edit the site

The file `AGENT.md` in this repo is a detailed instruction manual written specifically for AI coding agents (like Cursor, Claude, Copilot, etc.). It explains every file, every component, every design choice, and how to modify anything.

**To set up your agent:**

1. Open this project in Cursor (or your AI-enabled editor)
2. When you ask the agent to make changes, tell it: "Read AGENT.md first for context on how this site works"
3. The agent will understand the full architecture and can make changes confidently

**Things you can ask an agent to do:**
- "Add a new case study for my XYZ project"
- "Change the background color to a lighter beige"
- "Replace the placeholder images with these files I uploaded"
- "Update my bio on the about page"
- "Change the fonts to something more modern"
- "Add a new page for my resume"
- "Make the project cards show a hover animation"

The `AGENT.md` file covers everything the agent needs: colors (with exact hex codes), fonts, component props, file locations, and step-by-step instructions for every common task.

---

## Quick reference

| What you want to do | Where to go |
|---|---|
| Add or edit a project | `src/content/work/your-project.md` |
| Change the home page | `src/pages/index.astro` |
| Change the about page | `src/pages/about.astro` |
| Change colors or fonts | `src/styles/global.css` |
| Change the navigation links | `src/components/Nav.astro` |
| Change the footer | `src/components/Footer.astro` |
| Add images | `public/images/` folder |
| Agent instructions | `AGENT.md` |

---

## Tech details (for the curious)

- Built with [Astro](https://astro.build/) — a tool that turns your files into a fast static website
- Styled with [Tailwind CSS](https://tailwindcss.com/) — a system for styling with small utility classes
- Hosted on [GitHub Pages](https://pages.github.com/) — free hosting for static sites
- Fonts from [Google Fonts](https://fonts.google.com/): UnifrakturMaguntia (the fancy title), Cormorant Garamond (headings), DM Sans (body text)
