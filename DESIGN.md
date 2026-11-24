---
name: "Motion Graphic Studio"
description: "Cosmic-emerald creator workbench for browsing 110 official motion graphic styles and assembling two-stage Gemini Web Task Mode prompts."
colors:
  emerald-accent: "#33E092"
  emerald-hover: "#0CCE6B"
  emerald-deep: "#16A34A"
  space-ground: "#09090B"
  space-surface: "#111114"
  space-elevated: "#18181B"
  space-border: "#27272A"
  border-hover: "#3F3F46"
  text-muted: "#A1A1AA"
  text-secondary: "#D4D4D8"
  text-emphasis: "#E4E4E7"
  text-bright: "#F4F4F5"
  text-primary: "#FAFAFA"
typography:
  display:
    fontFamily: "Incognito, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Incognito, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Incognito, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: "normal"
  mono:
    fontFamily: "GitLab Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
rounded:
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  compact: "12px"
  md: "16px"
  card: "20px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section-sm: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.emerald-accent}"
    textColor: "{colors.space-ground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.emerald-hover}"
  button-secondary:
    backgroundColor: "{colors.space-elevated}"
    textColor: "{colors.text-bright}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "44px"
  button-secondary-hover:
    textColor: "{colors.emerald-accent}"
  input-field:
    backgroundColor: "{colors.space-ground}"
    textColor: "{colors.text-bright}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  navbar-shell:
    backgroundColor: "{colors.space-ground}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    padding: "0 24px"
    height: "64px"
  station-chip:
    backgroundColor: "{colors.space-elevated}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  station-chip-active:
    textColor: "{colors.text-primary}"
  style-card:
    backgroundColor: "{colors.space-surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "20px"
  prompt-output-panel:
    backgroundColor: "{colors.space-surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.mono}"
    rounded: "{rounded.lg}"
    padding: "20px"
  timeline-step:
    backgroundColor: "{colors.space-surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Motion Graphic Studio

## Overview

**Creative North Star: "The Cosmic Emerald Workbench"**

Motion Graphic Studio is a calm, high-precision creator workbench modeled after a cosmic-emerald developer portfolio rather than a noisy video-editing timeline or generic dark-amber SaaS template. Set over a deep space-black canvas (`#09090B`) animated by subtle star particles, constellation lines, and faint cyan-indigo meteor trails, the interface frames 110 official motion graphic styles (`@bang-motion` and `@lemo-opuscar`), a two-stage Voice Over prompt studio, a sandboxed HTML stage preview, and a vertical skill-installation timeline inside crisp zinc containers (`#111114`) bounded by `1px` hairline borders (`#27272A`).

Every visual decision prioritizes operational clarity and scanability for Indonesian creators working alongside Gemini Web Task Mode (`Mode Tugas`). A single vibrant emerald accent (`#33E092`) signals active selections, primary actions, skill handles, and telemetry indices, while squared geometric display typography (`Incognito`), neutral UI prose (`Inter`), and tabular monospace metadata (`GitLab Mono`) keep dense controls legible without visual clutter. Confirmed rejections include warm amber studio themes, decorative multi-color gradients, circular status dots, native browser alert/confirm dialogs, and raw inline SVG icons inside application source files.

**Key Characteristics:**
- Deep space-black ground (`#09090B`) with a fixed, pauseable cosmic starfield canvas and an interactive 3D isometric emerald wireframe cube cluster in the hero.
- Single-accent emerald hierarchy (`#33E092` resting, `#0CCE6B` hover, `#16A34A` deep anchor) paired with dark `#09090B` ink on active fills.
- Flat-by-default tonal layering (`#09090B` → `#111114` → `#18181B`) separated by `1px` zinc hairlines (`#27272A`) instead of heavy drop shadows.
- Three-font technical pairing: `Incognito` for geometric display headings, `Inter` for readable Indonesian UI copy, and `GitLab Mono` for handles, counts, ratios, and prompt output.
- Contribution-graph-inspired 17-station activity matrix and vertical timeline installation guide with `prefers-reduced-motion` support throughout.

## Colors

A disciplined dark-zinc neutral architecture anchored by a single high-luminance emerald accent (`#33E092`) that reserves color strictly for active state, primary actions, and skill telemetry.

### Primary
- **Emerald Accent** (`#33E092`): Primary CTA fills (`Mulai Buat Prompt`, `Salin Prompt`, `Buka Gemini Web`), active tab and ratio-tile fills, selected card and input focus borders, skill handle text (`@bang-motion`, `@lemo-opuscar`), numbered step indices (`01.`–`04.`), active icons, text selection highlight, scrollbar hover thumb, `1.5px` navbar scroll progress hairline, isometric cube wireframe peak, and the highest-intensity cell in the 17-station matrix.
- **Emerald Hover** (`#0CCE6B`): Hover fill state for all primary emerald buttons and the lower-right gradient endpoint of the hero isometric wireframe cube.
- **Emerald Deep** (`#16A34A`): Deep emerald theme anchor registered in global CSS tokens for dark-green tonal continuity.

### Neutral
- **Space Ground** (`#09090B`): Root page canvas, body background, recessed input/select/textarea/code-block wells, scrollbar track, mobile drawer background, and high-contrast foreground ink on active emerald buttons and tabs.
- **Space Surface** (`#111114`): Primary container surface for catalog cards, workflow step cards, station matrix panel, prompt studio form and output panels, saved drafts drawer, live stage panes, guide cards, and modal dialogs (often rendered at `85%`–`95%` opacity so the starfield subtly breathes behind).
- **Space Elevated** (`#18181B`): Secondary interactive surface for elevated buttons, inactive repository tabs, aspect-ratio and duration tiles, quick-brief preset chips, timeline icon boxes, and inactive switch tracks.
- **Space Border** (`#27272A`): Universal `1px` hairline border and section/card divider across the entire workspace, plus resting scrollbar thumb.
- **Border Hover** (`#3F3F46`): Subtle border elevation on hovered cards, secondary buttons, and inactive checkbox strokes.
- **Text Muted** (`#A1A1AA`): Secondary descriptions, helper captions, input placeholders, metadata rows, inactive icons, and footer legal notes.
- **Text Secondary** (`#D4D4D8`): Desktop and mobile navigation links, inactive tab labels, checkbox descriptions, and secondary prompt output text.
- **Text Emphasis** (`#E4E4E7`): Inline code snippets, emphasized strong terms (`Mode Tugas`, `Keahlian`), secondary button labels, and prompt `<pre>` content.
- **Text Bright** (`#F4F4F5`): Card subheadings, form field labels, footer source links, and starfield particle luminance.
- **Text Primary** (`#FAFAFA`): Primary display headlines, section titles, card titles, modal titles, and default body foreground.

Contextual non-brand colors observed in specialized surfaces include the recessed stage viewport well (`#070709`) and black iframe frame (`#000000`) in Live Stage Preview, the 5-step Station Matrix heatmap scale (`#1F1F23` idle, `#0E4429` low, `#006D32` mid, `#26A641` high, `#33E092` active), subtle cyan (`#38BDF8`) and indigo (`#818CF8`) shooting-star trails in the background canvas, and soft red (`#F87171`) hover feedback on the draft delete icon.

### Named Rules
**The Single Emerald Voice Rule.** Emerald Accent (`#33E092`) is the sole interactive brand accent across the entire workspace; never introduce secondary amber, purple, or multi-hue brand gradients into the UI shell.

**The Dark-Ink-On-Emerald Rule.** Whenever Emerald Accent (`#33E092`) or Emerald Hover (`#0CCE6B`) fills a button, active tab, or selected ratio tile, pair it exclusively with Space Ground (`#09090B`) text and icons to preserve crisp contrast.

## Typography

**Display Font:** Incognito (with Inter, ui-sans-serif, system-ui, sans-serif fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui, sans-serif fallback)
**Label/Mono Font:** GitLab Mono (with ui-monospace, SFMono-Regular, monospace fallback)

**Character:** Squared, architectural display letterforms (`Incognito`) give headlines and card titles an unmistakable technical edge, balanced by clean `Inter` prose and crisp `GitLab Mono` telemetry for handles, counts, and prompt code.

### Hierarchy
- **Display** (`800` bold, `clamp(2.25rem, 4vw, 3.25rem)` scaling `36px` mobile → `48px` tablet → `52px` desktop, `1.08` line-height, `-0.025em` tracking): Hero `<h1>` headline only, balanced across lines.
- **Headline** (`700` condensed, `clamp(1.5rem, 2.5vw, 2.25rem)` scaling `24px` mobile → `30px` tablet → `36px` desktop, `1.15` line-height, `-0.025em` tracking): Major section `<h2>` headings (`Katalog 110 Gaya Visual`, `Studio Prompt Mode Tugas Gemini Web`, `Live Stage Preview HTML`, `Panduan Instalasi Skill Gemini Web`).
- **Title** (`700` condensed / `600` medium, `18px` base spanning `16px`–`20px`, `1.35` line-height, `-0.025em` tracking): Navbar wordmark (`18px`–`20px`), modal titles (`20px`), catalog card titles (`18px`), panel headers (`16px`), and workflow step titles (`14px`).
- **Body** (`400` regular / `500` medium, `14px` base scaling to `16px` on `sm:` section leads, `1.625` relaxed line-height, `max-w-xl` to `max-w-2xl` measure): Section introductions, card descriptions, form inputs, primary buttons, and installation step instructions.
- **Label** (`500` medium / `600` semibold, `12px`, `1.33` line-height): Form field labels, station matrix chip names, secondary compact buttons, helper notes, and footer links.
- **Mono** (`400`–`600`, `12px`, `1.5` line-height, `tabular-nums`): Skill handles (`@bang-motion`, `@lemo-opuscar`), station counts, aspect ratios, duration buttons (`15s`–`60s`), step indices (`01.`–`04.`), generated prompt `<pre>` blocks, HTML code editor, and CLI commands.
- **Caption** (`400`–`500`, `11px`, `1.375` line-height): Micro-sublabels inside aspect-ratio tiles (`Vertikal`, `Lanskap`, `Persegi`), duration scene estimates (`~6 scene`), SFX and Running Text helper descriptions, and fallback preview card metadata.

### Named Rules
**The Geometric Display Anchor Rule.** Reserve Incognito strictly for headings, card titles, and the navbar wordmark; keep all body copy, form controls, and helper captions in Inter so dense prompt controls remain effortless to scan.

**The Tabular Telemetry Rule.** Render every skill handle (`@bang-motion`, `@lemo-opuscar`), style count, aspect ratio, duration, timecode, and generated prompt block in GitLab Mono (`12px`) with tabular numerals so telemetry aligns cleanly across cards and panels.

## Layout

The workspace uses a centered `1200px` maximum container width with responsive horizontal gutters (`16px` mobile, `24px` at `640px`, `32px` at `1024px`) beneath a `64px` sticky header (`72px` scroll-padding-top and `64px` section scroll-margin-top). Major sections stack vertically with generous breathing room (`56px`–`96px` vertical padding in the Hero, `64px`–`96px` across Catalog, Prompt Studio, Live Stage Preview, and Skill Guide, and `40px` in the Footer), each separated by a `1px` Space Border (`#27272A` at `80%` opacity) top rule.

Desktop layouts (`1024px` and above) rely on asymmetric 12-column splits tailored to each task: `7/5` in the Hero (copy and CTAs left, 3D isometric cube canvas right), `9/3` in the Station Matrix (17-station heatmap left, vertical repository selector stack right), `7/5` in the Prompt Studio (controls form left, sticky output panel pinned at `80px` top offset right), `5/7` in Live Stage Preview (HTML editor left, sandboxed stage viewport right), and `7/5` in the Gemini Web Guide (vertical timeline left, ZIP download and install prompt card right). Multi-item grids step cleanly across breakpoints (`640px`, `768px`, `1024px`, `1280px`, `1536px`): `1 → 2 → 3` columns for the style catalog (`20px` gap) and `1 → 2 → 4` columns for the workflow strip (`16px` gap) and Gemini Web reference screenshots (`20px` gap).

## Elevation & Depth

This system uses **tonal layering and `1px` hairline borders, flat-by-default**, rather than multi-tier drop shadows. Depth is established by stepping surfaces from Space Ground (`#09090B`) to translucent Space Surface (`#111114` at `85%`–`95%` opacity) and Space Elevated (`#18181B`), allowing the fixed `z-0` cosmic starfield canvas to remain subtly visible behind `z-10` workspace cards.

Interactive overlays add atmospheric blur without heavy elevation shadows: the sticky `z-40` navbar applies a `12px` backdrop blur over `85%` Space Ground, while `z-50` modal dialogs sit over an `80%`–`85%` black scrim with a `4px` backdrop blur.

### Shadow Vocabulary
- **Stage Frame** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)`): Applied exclusively to the sandboxed `iframe` stage container inside the `#070709` recessed preview well to separate live motion output from the surrounding chrome.
- **Focus Ring** (`box-shadow: 0 0 0 2px #33E092`): Crisp `2px` emerald keyboard focus ring on inputs, chips, tabs, and secondary buttons; primary emerald CTAs add a `2px` `#09090B` offset (`0 0 0 2px #09090B, 0 0 0 4px #33E092`).

### Named Rules
**The Hairline-Over-Shadow Rule.** Surfaces are flat by default and separated by `1px` Space Border (`#27272A`) hairlines and tonal steps (`#09090B` → `#111114` → `#18181B`); reserve box shadows strictly for the sandboxed Live Stage Preview frame and keyboard focus rings.

## Shapes

Forms are crisp, technical, and rectilinear, using a tight 5-step corner radius scale (`2px`, `4px`, `6px`, `8px`, `9999px`) paired with `1px` hairline strokes (`#27272A`) that shift to `#3F3F46` on hover or `#33E092` when active or focused.

- **Micro-Squares (`2px` radius):** Heatmap intensity cells in the Station Matrix (`10px × 10px`) and 4-color palette swatches on catalog cards (`10px × 10px`).
- **Small Technical (`4px` radius):** Scrollbar thumbs, checkbox inputs, navbar wordmark focus outline, and modal palette swatches (`14px × 14px`).
- **Interactive Controls (`6px` radius):** All primary and secondary buttons, text inputs, selects, textareas, code `<pre>` blocks, tablist containers, aspect-ratio and duration tiles, station filter chips, download ZIP cards, and screenshot thumbnails.
- **Structural Containers (`8px` radius):** Catalog cards, workflow step cards, station matrix panel, prompt studio panels, saved drafts drawer, live stage panes, guide cards, modal dialogs, and `48px × 48px` timeline icon boxes.
- **Full Pill (`9999px` radius):** Strictly reserved for the `36px × 36px` circular ambient motion toggle in the navbar and the `48px × 28px` Voice Over toggle switch.

Media containers enforce consistent aspect ratios: `16:10` for catalog style thumbnails (with a `55%` black bottom gradient scrim and `1.03` hover zoom over `200ms`–`300ms`) and Gemini Web guide screenshots, and dynamic `9:16`, `16:9`, or `1:1` framing inside Live Stage Preview.

### Named Rules
**The Square-Swatch Discipline Rule.** Use crisp `2px`-radius micro-squares for heatmap cells and style palette swatches, and reserve full pill radii (`9999px`) exclusively for the circular ambient motion toggle and the Voice Over switch.

## Components

### Buttons
Tactile, high-contrast rectangular controls (`6px` radius) with `150ms` color transitions and `34px`–`44px` minimum touch heights.
- **Shape:** Crisp rectangular corners (`6px` radius), `whitespace-nowrap` labels, `14px` semibold (`600`) on primary CTAs and `12px`–`14px` medium (`500`) on compact/secondary actions.
- **Primary:** Emerald Accent (`#33E092`) fill with Space Ground (`#09090B`) text and `10px 20px` padding (`44px` min-height; `34px`–`38px` in compact toolbars).
- **Hover / Focus:** Shifts fill to Emerald Hover (`#0CCE6B`) on hover; displays a `2px` `#33E092` focus-visible ring with `2px` `#09090B` offset.
- **Secondary / Ghost:** Space Elevated (`#18181B`) fill with `1px` `#27272A` border and `#F4F4F5` or `#D4D4D8` text; hover shifts border to `#33E092` (`60%` opacity) or `#3F3F46` and text to `#33E092` or `#FAFAFA`. Icon-only square buttons (`32px`–`40px`) follow the same elevated border treatment.

### Chips
Compact filter and preset triggers (`6px` radius) built for rapid scanning across 17 stations and 4 quick briefs.
- **Style:** Station Matrix chips pair a `10px × 10px` `2px`-radius heatmap square (`#1F1F23` to `#33E092`), `12px` medium label, and `12px` `GitLab Mono` count inside `#18181B` (`70%` opacity) with `1px` `#27272A` border and `6px 10px` padding. Quick-brief preset chips use `#18181B` fill, `1px` `#27272A` border, `12px` medium `#D4D4D8` text, and `6px 12px` padding (`38px` min-height).
- **State:** Selected station chips switch to `#33E092` border, `10%` `#33E092` tint fill, and `#FAFAFA` text; dimmed cross-repo chips drop to `#111114` (`60%` opacity) and `#A1A1AA` text.

### Cards / Containers
Translucent dark-zinc containers (`8px` radius) anchored by `1px` `#27272A` hairlines.
- **Corner Style:** `8px` radius across all cards, panels, drawers, and modals.
- **Background:** Space Surface (`#111114` at `85%`–`95%` opacity).
- **Shadow Strategy:** Flat by default (`box-shadow: none`); relies on tonal contrast against `#09090B` and `1px` borders.
- **Border:** `1px` `#27272A` (`90%` opacity on cards), shifting to `#3F3F46` on hover or `#33E092` when a style card is selected.
- **Internal Padding:** `16px` on compact workflow cards, `20px` on catalog cards and prompt output panels, and `20px`–`28px` on studio forms, guide cards, and modals.

### Inputs / Fields
Recessed dark wells (`#09090B`) that sit one tonal step deeper than their `#111114` parent panel.
- **Style:** `1px` `#27272A` stroke, `#09090B` background, `6px` radius, `40px`–`44px` height (`104px` min-height for topic textarea, `320px`–`460px` for HTML code editor), `#F4F4F5` text, and `#A1A1AA` placeholders.
- **Focus:** Border shifts cleanly to `#33E092` with `outline: none`.
- **Checkboxes & Switch:** `16px × 16px` checkboxes (`4px` radius, `#3F3F46` border, `#09090B` fill, `#33E092` accent); Voice Over toggle uses a `48px × 28px` pill track (`#33E092` active, `#18181B` inactive) with a `20px` thumb. Disabled controls (such as Running Text when VO is off) drop to `45%` opacity with `not-allowed` cursor.

### Navigation
Three-zone sticky header (`64px` height) and source-attributed footer anchored by `1px` `#27272A` (`80%` opacity) borders.
- **Navbar:** Left `Incognito` wordmark (`18px`–`20px` bold `#FAFAFA`, hover `#33E092`), 4 centered `14px` medium `#D4D4D8` anchor links (`Katalog Gaya`, `Studio Prompt`, `Live Preview`, `Panduan Skill`), and right action cluster (`36px` circular `#111114` ambient motion toggle with `#33E092` icon + primary `Buka Gemini Web` CTA + mobile menu button below `768px`). A `1.5px` `#33E092` (`90%` opacity) scroll-progress hairline tracks page scroll along the bottom edge.
- **Footer:** Horizontal attribution row (`bang-motion`, `lemo-opuscar`, `Gemini Web` with `react-icons` brand marks), copyright telemetry (`12px` `#A1A1AA`), and secondary anchor links separated by a `1px` `#27272A` (`60%` opacity) divider.

### Signature Components
- **Cosmic Starfield & Isometric Cube Canvases:** Full-viewport `z-0` `<canvas>` rendering seeded stars, constellation edges, and cyan/indigo shooting stars, paired with a hero `3D` isometric wireframe cube cluster stroked in a zinc-to-emerald (`#33E092` → `#0CCE6B`) gradient with pointer parallax and reduced-motion static fallback.
- **17-Station Activity Matrix:** Contribution-graph-inspired filter grid mapping all 110 styles across 17 stations using the 5-step emerald intensity scale (`#1F1F23` → `#0E4429` → `#006D32` → `#26A641` → `#33E092`) alongside a 3-tab vertical repository selector (`Semua`, `bang-motion`, `lemo-opuscar`).
- **Sticky Prompt Output Panel:** Pinned `top: 80px` panel displaying active `@handle · style · ratio · ~scenes` telemetry, `Simpan Draft` trigger, scrollable `#09090B` `12px` monospace `<pre>` prompt block, dual copy/launch CTAs, numbered `01.`–`03.` Task Mode checklist, and conditional Phase 2 follow-up prompt card.
- **Vertical Skill Installation Timeline:** Four-step vertical timeline pairing `48px × 48px` (`8px` radius) `#18181B` icon boxes (`#33E092` icons) connected by `1px` `#27272A` vertical lines with ZIP download cards, copyable installation prompt (`Tolong install kedua skill ini`), and zoomable `16:10` Gemini Web UI screenshots.

## Do's and Don'ts

### Do:
- **Do** layer translucent Space Surface (`#111114` at `85%`–`95%` opacity) cards with `1px` Space Border (`#27272A`) hairlines over the fixed `#09090B` cosmic starfield canvas.
- **Do** pair active Emerald Accent (`#33E092`) fills with Space Ground (`#09090B`) foreground text and shift hover fills to Emerald Hover (`#0CCE6B`).
- **Do** bind all headings to `Incognito`, body copy and controls to `Inter`, and skill handles, counts, ratios, and prompt blocks to `GitLab Mono` (`12px`) with tabular numerals.
- **Do** use the documented `11px` caption step for micro-sublabels inside aspect-ratio and duration tiles, SFX and Running Text helper descriptions, and fallback card metadata.
- **Do** honor `prefers-reduced-motion` across GSAP timelines, smooth scrolling, the starfield canvas, and the isometric cube canvas, alongside the manual navbar pause toggle.
- **Do** use `react-icons` in application source components and keep modal dismissal wired to backdrop click plus `Escape` key handling.

### Don't:
- **Don't** reintroduce warm amber accents, decorative multi-color gradients, or heavy drop shadows onto cards, buttons, or navigation bars.
- **Don't** use full pill (`9999px`) status dots anywhere in the catalog, matrix, or studio; use `2px`-radius or `4px`-radius squares for swatches and heatmap cells.
- **Don't** invent unindexed micro font sizes (such as `9px` or `10px`) or arbitrary corner radii outside the `2px / 4px / 6px / 8px / 9999px` scale.
- **Don't** embed raw inline `<svg>` elements, `lucide-react` imports, or native `window.alert()` / `window.confirm()` dialogs inside `src/`.
- **Don't** place `motion`, `breakpoints`, or `shadows` keys at the top level of `DESIGN.md` YAML frontmatter; keep those extensions in `.impeccable/design.json`.
