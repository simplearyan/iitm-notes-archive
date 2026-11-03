# 02 — Information architecture & design system

> Goal: one product, four screens, one look. Everything here is compatible with
> the current no-build static deployment (plain HTML/CSS/JS on GitHub Pages).

## 1. Navigation model

Today: a 320 px sidebar that is *sometimes* a tree, *sometimes* a filtered course
tree, plus a dashboard overlay, plus a second app with its own sidebar.

Proposed: **a slim global rail + one screen body + a command palette.**

```
┌─────────────────────────────────────────────────────────────────────┐
│  IITM Archive ·  Term Feb–May 2026            ⌘K   ◐   ⤓   ⌖        │  ← top bar, 56 px
├──────┬──────────────────────────────────────────────────────────────┤
│  ⌂   │                                                              │
│  ▤   │   screen body (Home · Syllabus · Reader)                     │
│  ⌗   │                                                              │
│  ◑   │                                                              │
│      │                                                              │
│  ⓘ   │                                                              │
└──────┴──────────────────────────────────────────────────────────────┘
  64 px rail (icons + tooltip), collapses to a bottom bar under 768 px
```

| Rail item | Screen | Purpose |
|---|---|---|
| ⌂ Home | `#/` | Courses & terms, real counts, "continue reading", search |
| ▤ Syllabus | `#/syllabus` | **The requested one-page outline** — all subjects → courses → weeks, copy as MD |
| ⌗ Course | `#/c/<course>` | One course: weeks, item lists, progress |
| ◑ Reader | `#/p/<path>` | One page, content-first, with Copy MDX |
| ⓘ About / Vault | `#/vault` | Notes on the archive, the old vault index (or fold into Reader) |

Rules that kill the current confusion:

- **The tree stops being primary navigation.** It becomes a *secondary* "Contents"
  panel inside Course screens, collapsed by default on mobile.
- **One default route per entity**, all hash-based so GitHub Pages keeps working:
  `#/`, `#/syllabus`, `#/syllabus/<term>`, `#/c/<course>`, `#/p/<encoded path>`,
  `#/w/<course>/<week>`.
- **Back = history**, and every screen has a breadcrumb
  (`Term Feb–May › Mathematics-II › Week 1`).
- **Legacy links must keep working.** A tiny shim maps the current
  `#content/…/index.html` hashes onto `#/p/<encoded path>` so old bookmarks and
  the inlined sidebar data do not break (`handleHashChange` already tolerates
  arbitrary hashes; add a redirect before the route match).

## 2. Screens

### 2.1 Home
- Header block: term switcher (pills), then a 2-up course grid.
- Each course card: name, weeks count, pages count, a 12-segment week strip
  showing where content exists, and one honest line
  (`13 weeks · 212 pages · 5 exam keys`) — replaces the wrong `2 Modules / Weeks`.
- Continue-reading strip: last 3 pages opened (localStorage).
- One search field that is the same palette as ⌘K.

### 2.2 Syllabus (the new page — full spec in `03`)
Single scroll, prints cleanly, copy-as-Markdown at three levels
(term / course / week). Sticky left index of weeks; count chips per section.

### 2.3 Course
- Week list, each row: `Week 1 · 22 pages` with type chips (`5 lectures`,
  `5 activities`, `8 tutorials`, `1 graded`, `1 question bank`).
- Expand a week → item list (title, type icon, "open" / "copy MD" per item).
- Right column (desktop only): "Contents" tree (the old sidebar, reused).

### 2.4 Reader
Two modes, one route:
- **Reading (default)** — the extracted markdown, rendered with KaTeX + Prism,
  max-width 72ch, real headings, sticky page header
  (`Mathematics-II › Week 1 › L1.2 Matrices`), prev/next, `⌘K`, **Copy MDX**.
- **Original** — the existing `.u.zip.html` iframe, kept as a tab
  (`Reading | Original`) plus the annotator. Nothing is lost; the archive stays
  the source of truth, the reader becomes the pleasant default.

Why Reading can be default: `scripts/extract-to-markdown.js` already turns the
same archive into markdown with images and frontmatter. When a page has no
extraction yet, the Reader falls back to Original automatically (and shows a
small "extracting next build" note instead of an error).

## 3. Command palette (⌘K / Ctrl-K)

One input, ranked results from the manifest:

```
Week 1 › L1.2 Matrices            Mathematics-II · lecture
AQ1.1 Activity Questions          Mathematics-II · activity
Syllabus · Statistics-II          screen
Copy current page as MDX          action
Toggle theme                      action
```

- Fuzzy match on title + course + week + type; `>` prefix runs actions, `/`
  filters to pages.
- Enter opens; `⌘↵` opens the Original tab; `⌥↵` copies MD.
- Debounced 60 ms, keyboard-first, works on mobile (top sheet).

This alone removes most of the "hard to navigate" problem: 509 pages do not need
a tree if they are searchable in 2 keystrokes.

## 4. Design system

### 4.1 Tokens (one file, `assets/tokens.css`)

```css
:root {
  /* surfaces — light */
  --bg:        #f7f8fa;
  --surface:   #ffffff;
  --surface-2: #f1f3f7;
  --line:      #e4e7ee;
  --line-2:    #d5dae4;

  /* ink */
  --ink:       #12141a;
  --ink-2:     #4b5262;
  --ink-3:     #7a8296;

  /* accent — one hue for the whole product (indigo) */
  --accent:      #4f46e5;
  --accent-ink:  #4338ca;
  --accent-soft: #eef0ff;
  --accent-line: #cbcdff;

  /* semantic chips */
  --lecture:  #2563eb;  --lecture-soft:  #e8f0ff;
  --activity: #d97706;  --activity-soft: #fff4e2;
  --graded:   #e11d48;  --graded-soft:   #ffe9ee;
  --tutorial: #0d9488;  --tutorial-soft: #e2fbf7;
  --exam:     #7c3aed;  --exam-soft:     #f2eaff;

  /* geometry */
  --r-1: 8px; --r-2: 12px; --r-3: 16px; --r-4: 22px;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px;
  --shadow-1: 0 1px 2px rgba(16,18,26,.05);
  --shadow-2: 0 6px 24px -12px rgba(16,18,26,.18);
  --rail: 64px; --topbar: 56px; --measure: 72ch;
}

[data-theme="dark"] {
  --bg: #0e1016; --surface: #161922; --surface-2: #1d212c;
  --line: #262b38; --line-2: #333a4a;
  --ink: #eef1f7; --ink-2: #b3bbcc; --ink-3: #808aa0;
  --accent: #8b8cf7; --accent-ink: #a5a6ff; --accent-soft: #1e2040; --accent-line: #343873;
  --shadow-1: 0 1px 2px rgba(0,0,0,.4); --shadow-2: 0 8px 30px -14px rgba(0,0,0,.7);
}
```

Rules: **no colour literals in screens** — only tokens. Chips are the one place
semantic hues appear; everything else is `--ink` / `--accent`. This is what makes
the dashboard, the sidebar, the Vault and the reader finally look like one thing.

### 4.2 Type

- One family: **Inter** (already imported in `src/input.css`) with a system
  fallback stack; reader uses a second, softer face (e.g. `Source Serif 4`) for
  body copy only.
- Scale: `12 / 13 / 15 / 17 / 20 / 24 / 32` px. Sizes 12 and 13 are for labels and
  metadata; **body is 15–17**, never 10 px like the current uppercase eyebrows.
- Weights: 400 body, 500 UI, 600 titles, 700 only for page titles.
- Numbers in counts use `font-variant-numeric: tabular-nums`.

### 4.3 Components (build once, 8 total)

| Component | Used by | Notes |
|---|---|---|
| `row` | week/item lists, palette | 44 px min height, 1 px `--line` divider, hover `--surface-2` |
| `chip` | type/count badges | `--x-soft` bg + `--x` text, 11–12 px, radius 999 |
| `card` | home, syllabus cards | `--surface`, `--line`, `--shadow-1`, radius `--r-3` |
| `btn` (`pri` / `ghost` / `quiet` / `danger`) | everywhere | 36 px height, radius `--r-2`, focus ring 2 px `--accent` |
| `field` | search, copy dialog | `--surface-2`, no inner shadow |
| `code/math` | reader | KaTeX + Prism, one background (`--surface-2`) |
| `sheet` | mobile panels | bottom sheet, drag handle, `--surface` |
| `toast` | copy confirmations | bottom-center, 2 s, `Copied 24 KB · 6 images` |

Delete: the dashed indigo "Markdown Vault" card (it is a screen now, not a card),
the gradient hero card, the duplicated annotation CSS block in `index.html`.

### 4.4 Reader typography for archived pages

Until Reading mode covers 100 % of pages, wrap the iframe with an injected
stylesheet (same-origin, so injection is allowed) or keep a `zoom` control:

- `max-width: var(--measure)` content column with `padding-inline: 24px`
- `font-size: 16px`, `line-height: 1.65`, `color: var(--ink)`
- hide the captured page's own header/nav/footer via a small selector list
  (`header`, `nav.site-nav`, `.footer`, `#topbar` — verified per capture)
- fluid images, `figure { margin: 24px 0 }`

## 5. Navigation details that make it feel clean

1. **Breadcrumbs** on every screen, monospace-free, one line, truncating from the
   middle (`Term Feb–May › Mathematics-II › Week 1 › L1.2 Matr…`).
2. **Prev / next page** in the Reader footer with titles, not arrows only.
3. **Sticky week jump bar** in the Syllabus screen.
4. **Sidebar → "Contents"** panel, only on Course/Reader, remembers open folders
   (already in the Vault via `STATE.expandedFolders`; port that idea).
5. **No dead ends**: empty week, missing extraction, and 404 all get a designed
   state with one primary action ("Open original", "Back to syllabus").
6. **Theme**: light default, `data-theme` on `<html>`, respects
   `prefers-color-scheme`, toggle in the top bar, persisted. Fixes the current
   mix of a dark sidebar with a white body, and the Vault's third theme.

## 6. Accessibility & mobile (cheap, high value)

- Real `<button>`s for folders; `aria-expanded`; `Enter`/`Space` handlers. (Fixes
  the duplicate `role/tabindex` attributes in `renderTree`.)
- Visible focus ring on every interactive element (`outline: 2px solid var(--accent)`).
- Touch targets ≥ 44 px; hamburger rail becomes a bottom bar `< 768 px`.
- `prefers-reduced-motion` respected (currently only the Reel apps do this).
- Skip-link to the content column; `aria-live="polite"` for the copy toast.

## 7. Visual "cleaner" checklist (what a reviewer should notice)

- [ ] One accent colour visible at a time; semantic colours only inside chips.
- [ ] Consistent 8 px spacing rhythm; nothing below 12 px text.
- [ ] Uniform card radius; no dashed/filled/gradient mix.
- [ ] One icon family (Lucide) and a single mapping per page type.
- [ ] Reader has a comfortable measure and real headings.
- [ ] Light mode by default; dark mode is a token swap, not a second stylesheet.
- [ ] Every screen has a breadcrumb, a title, and a way back.
