# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal brand / portfolio + CV site built with Nuxt 4, Nuxt UI, and `@nuxtjs/i18n` (Polish default, English secondary). It pairs a portfolio landing page with an AI assistant that gathers visitor project requirements, plus dedicated experience, certifications, CV, contact, and "tree" pages.

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

### Environment
The AI chat needs OpenRouter credentials. Copy `.env.example` to `.env` and set `NUXT_OPENROUTER_API_KEY` (optional `NUXT_OPENROUTER_MODEL`, default `anthropic/claude-haiku-4.5`). Nitro maps these env vars onto `runtimeConfig.openrouterApiKey` / `openrouterModel`. Without a key the chat endpoint streams a bilingual "temporarily unavailable" message instead of erroring.

## Architecture

### Stack
- Nuxt 4 with modules `@nuxt/ui` (v4, not Pro), `@vueuse/nuxt`, `@nuxtjs/i18n`. Global CSS at `~/assets/css/main.css`.
- Components auto-imported from `~/components`.
- Sass available for SCSS in components.
- UI theme set in `app.config.ts` — primary `lime`, gray `neutral`.

### Pages
- `pages/index.vue` — main landing (hero, static skills list, social links). Hosts the AI chat widget (`<AgentChat/>`).
- `pages/experience.vue` — work-history timeline; **source of truth for experience data**.
- `pages/certifications.vue` — certifications list.
- `pages/cv.vue` — printable CV layout.
- `pages/contact.vue` — contact page.
- `pages/tree.vue` — link-tree style page.

`app.vue` is just `<NuxtPage/>` — no shared layout wrapper; per-page styling is self-contained.

### AI assistant (lead-gathering chat)
A streaming chat that interviews visitors and forwards their project requirements. Four pieces work together:
- `components/AgentChat.vue` — UI. POSTs the message history to `/api/chat` and reads a **newline-delimited JSON (NDJSON)** stream, appending `{type:"token"}` deltas into the live assistant bubble and flipping a "submitted" flag on `{type:"submitted"}`.
- `server/api/chat.post.ts` — streaming OpenRouter proxy. Prepends the system prompt, runs a first completion with the `submit_requirements` tool enabled, and if the model calls it, forwards the args to `/api/lead`, emits `{type:"submitted"}`, then runs a **second completion (tools disabled)** so the model writes a natural confirmation. The exact NDJSON event types are documented at the top of that file.
- `server/utils/agent.ts` — shared `SYSTEM_PROMPT` and the OpenAI-style `SUBMIT_TOOL` schema (`contact` + `description` required).
- `server/api/lead.post.ts` — **mock** lead sink: logs the payload to the server console and returns `{ok,id}`. Swapping in a real channel (Slack/email/CRM) is a one-file change here.

### Data model: experience drives skills (per page)
There is no shared store or content collection — experience data is **defined inline in each page component**, and each page derives its own skills.
- `pages/experience.vue` holds a single `experience` ref; the skill chips are **derived** at runtime (concat every entry's `skills`, then dedupe with `new Set`). To surface a new skill, add it to an entry's `skills` rather than editing a skill list.
- `pages/cv.vue` keeps experience as **two parallel locale-specific arrays** (`experiencePl` / `experienceEn`) merged by a `computed` based on the i18n locale. Edit **both** in lockstep — updating one desyncs the locales.
- `pages/index.vue` is different: its `skills` ref is a **static, hand-maintained list** (not derived) and it does not own experience data.

### Internationalization
- `i18n.config.ts` holds all `pl`/`en` messages in one file. Default locale is `pl`, strategy `no_prefix` (no locale URL prefix), legacy mode off (Vue I18n v9+ composition API).
- Pages mix two approaches: text routed through `$t()` keys vs. the dual-array / `locale`-conditional rendering used in `cv.vue` and `experience.vue`. Check which model a page uses before adding copy.

### Theme switching
`components/switcher/` has two day/night toggle variants (`DayNight.vue`, `DayNight2.vue`). Theming uses **custom CSS variables defined per-page in `<style>` blocks** (e.g. `--sun-link-color`, `--moon-link-color`), not Nuxt UI's color-mode classes alone — when adjusting colors, change the CSS variables in the page that owns them rather than expecting a global theme file.

## Notable repo hygiene
- `.env` exists locally; treat as secret and don't commit values from it.