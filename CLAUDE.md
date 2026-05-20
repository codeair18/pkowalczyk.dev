# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal brand / portfolio + CV site built with Nuxt 3, Nuxt UI Pro, and `@nuxtjs/i18n` (Polish default, English secondary). The site has a portfolio landing page, a structured CV page, a contact page, and an experimental "tree" page.

## Commands

```bash
npm install        # Install dependencies (postinstall runs `nuxt prepare`)
npm run dev        # Dev server, HTTPS on https://localhost:3001
npm run build      # Production build
npm run generate   # Static site generation
npm run preview    # Preview production build
```

There is no test, lint, or typecheck script wired up — `tsconfig.json` just extends Nuxt's generated config.

### HTTPS in dev
`npm run dev` is hard-wired to HTTPS using the committed self-signed cert pair `localhost.crt` / `localhost.key` and runs with `NODE_TLS_REJECT_UNAUTHORIZED=0`. The Nuxt dev port (`devServer.port`) is **3001**, not the default 3000.

## Architecture

### Stack
- Nuxt 3 (extends `@nuxt/ui-pro`) with modules `@nuxt/ui`, `@vueuse/nuxt`, `@nuxtjs/i18n`.
- Components auto-imported from `~/components`.
- Sass available for SCSS in components.
- UI theme set in `app.config.ts` — primary `lime`, gray `neutral`.

### Pages
- `pages/index.vue` — main portfolio landing (hero, experience timeline, skills, social links).
- `pages/cv.vue` — printable CV layout.
- `pages/contact.vue` — contact page.
- `pages/tree.vue` — link-tree style page.

`app.vue` is just `<NuxtPage/>` — no shared layout wrapper; per-page styling is self-contained.

### Data model: experience drives skills
Experience entries are **defined inline in the page components**, not loaded from a shared store or content collection. The list of skills displayed is **derived** from the experience entries (aggregated/deduped at runtime into a `skills` ref), so to surface a new skill chip you add it to an experience entry's stack rather than editing a skills array directly.

`pages/cv.vue` stores experience as **two parallel locale-specific arrays** (`experiencePl` and `experienceEn`) that are merged by a `computed` `experience` based on the current i18n locale. When editing CV experience, update **both** arrays in lockstep — adding to one without the other will desync the locales. `pages/index.vue` instead uses a single `experience` ref and relies on `$t()` keys from `i18n.config.ts` for translatable strings.

### Internationalization
- `i18n.config.ts` holds all `pl`/`en` messages in one file. Default locale is `pl`, legacy mode off (Vue I18n v9+ composition API).
- Index page text flows through `$t()` keys; CV page uses the dual-array approach above. Be aware of which model a page uses before adding copy.

### Theme switching
`components/switcher/` has two day/night toggle variants (`DayNight.vue`, `DayNight2.vue`). Theming uses **custom CSS variables defined per-page in `<style>` blocks**, not Nuxt UI's color-mode classes alone — when adjusting colors, change the CSS variables in the page that owns them rather than expecting a global theme file.

## Notable repo hygiene
- `app_copy.vue` and `test.html` at the repo root are untracked scratch files — ignore them; they aren't part of the build.
- `.env` exists locally; treat as secret and don't commit values from it.