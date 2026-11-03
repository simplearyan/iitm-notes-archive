# 05 — Reel Vault: design teardown and adoption plan

`~/Downloads/Reel Vault (1).html` (33 KB, one file, no build step) is a mock-up
of **this archive** designed in the Reel Studio family language: paper-cream
page, near-black ink, one mint signal colour, pill everything, and copy-as-
Markdown wired into every level. It already models the same content as
`data/manifest.json` — 2 terms, 3 courses, 26 weeks, 499 pages.

This doc measures what is actually in that file (not impressions), says which
parts are worth taking, and orders the work against the files that exist today
(`assets/tokens.css`, `assets/app.css`, `assets/app/*.js`, `markdown/index.html`).

---

## 1. What the mock is

| Piece | Implementation |
|---|---|
| Router | `location.hash`: `#/` home, `#/syllabus`, `#/c/<course>`, `#/read/<course>/<week>/<item>` |
| Data | One `const C = [...]` array + `TOT` totals; week tuple = `[label, pages, lectures, activities, practice, tutorials, items]` |
| Screens | Home (term → course cards), Syllabus (sticky jump rail + week accordions), Course (same weeks, one course), Reader (one page + TOC + prev/next) |
| Copy | Four tiers, one builder function `md(courseId, weekIndex)` |
| Chrome | Top bar (brand, search with `/`, Home/Syllabus pills, theme toggle), 264 px sidebar, mobile drawer + scrim |
| Persistence | `rv-theme`, `rv-copy`, `rv-fs`, `rv-done`, `rv-bm`, `rv-last` in `localStorage` |
| Dependencies | Hanken Grotesk + JetBrains Mono (Google Fonts), KaTeX from a CDN. No framework. |

It is a **design reference, not a codebase to port**: the content is three
hardcoded courses, the reader only has body text for its first item, and images
render as dashed placeholders.

---

## 2. Design DNA (measured)

### 2.1 Colour

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#F3EEE4` | `#14121B` | page |
| `--card` | `#FBF8F1` | `#1D1A26` | cards, sidebar, popovers |
| `--field` | `#EFE8DA` | `#262232` | inputs, pressed rows, section bars |
| `--ink` | `#14110D` | `#F4EFE5` | text, primary buttons |
| `--on-ink` | `#F3EEE4` | `#14121B` | text on ink |
| `--mut` | `#5A544A` | `#B6AFC0` | secondary text |
| `--line` | `rgba(20,17,13,.14)` | `rgba(244,239,229,.14)` | every border |
| `--mint` | `#00E0A4` | `#00E0A4` | the only signal colour |
| `--l` lecture | `#5B6CF0` | `#9AA6FF` | kind |
| `--a` activity | `#C97A0A` | `#F2B24C` | kind |
| `--p` practice | `#D9472B` | `#FF8E73` | kind |
| `--t` tutorial | `#0A8F6A` | `#3FE0B5` | kind |

Two rules make it feel like one product: **accent = ink** (buttons are black
pills, not coloured), and **mint is a signal, never decoration** (progress bar,
active TOC edge, week strip, hint border, the mark's inline panel).

### 2.2 Type

- **Hanken Grotesk** 400 / 600 / 800 — UI and headings. Body `15px/1.5`.
- **JetBrains Mono** 500 for every number: counts, `kbd`, file paths, badges.
- Tight, heavy headings: `h1 clamp(30px, 5vw, 44px)` at `-0.05em`/800;
  `h2 22px` at `-0.03em`/800; wordmark `19px` at `-0.04em` with a 400 span
  ("Reel **Vault**").
- Small caps label `.cap`: `11px`, 700, `.08em`, uppercase, `--mut`.
- Reader body is a variable: `--rfs` defaults to `17px`, `1.7` line-height.

### 2.3 Shape and geometry

`--s1 8 / --s2 16 / --s3 24`; `--r 24` (cards, question cards), `--rm 14`
(rows, inputs), `--ctl 40px`. Everything interactive is a pill or a 14 px
rounded rectangle; icon buttons are 40 px circles. Content column
`max-width: 1040px`; reader column `720px` with a `220px` TOC only at ≥1280 px.

### 2.4 Components worth naming

| Component | Detail |
|---|---|
| `.pills` | segmented nav, `aria-current=page` = ink fill; hides under 900 px |
| `.b` / `.b.pri` | 40 px pill button; `pri` = ink; `.sm` = 32 px |
| `.split` | copy split-button: main pill + caret pill, one border between |
| `.pop` | copy-options popover (280 px, r14, 4 checkboxes, "Copy now") |
| `.stat` | pill with mono number first: `<b>499</b>pages` |
| `.seg` | 6 px mint segments — one per week, the card's shape at a glance |
| `.ch` | chip: dot + label, `color-mix` 14 % fill / 30 % border of the kind hue |
| `.wk` | week accordion: 52 px button, `b` label, chips, mono page count, caret |
| `.bar` | section bar inside an open week: field background, "Copy this section as Markdown" + `MD` button |
| `.row` | 44 px item row: `.tp` type tag (34×24, r8, ink-on-kind), title, mono note, `MD` button |
| `.toast` | ink pill, bottom-centre, 1.8 s |
| `.q` / `.opt` | question card (r24, 20 px pad) and its 48 px option rows with a square check |
| `#prog` | 3 px mint reading-progress bar |

### 2.5 Responsive and input behaviour

≤1100 px: jump rail drops, single column. ≤900 px: sidebar becomes a
`min(300px, 86vw)` drawer with scrim, pills and week chips hide. ≤520 px: the
wordmark's second word hides, search `kbd` hides. `pointer: coarse` raises every
control to 44 px. `prefers-reduced-motion` kills transitions. Print hides chrome
and the copy bar.

---

## 3. The copy model (the part actually worth copying)

Four scopes, each one a button the user can reach without opening anything:

| Where | Copies |
|---|---|
| Header split-button | the whole course (or the whole syllabus page) |
| Caret → popover | same, with options: **Include counts**, **Link each page**, **Include file paths**, **YAML frontmatter** — persisted, "Copy now" |
| Week header `.bar` | that one week |
| Item row `MD` | that one page's line |
| Reader `Copy` | the page itself: `# Title` + body, "Page copied as Markdown" |

The builder is a single function (`md(cid, wi)`); frontmatter is
`--- course / term / pages ---`; links are
`[Title](<course>/<slug-week>/<slug-item>.md)`.

**IITM already has this shape** — `assets/app/ui.js` ships the split button, the
options popover and persisted prefs (`iitm.copy.opts`), and
`assets/app/export-syllabus.js` builds course/week scopes. The gaps are: no
per-page copy in the Vault reader, no per-row `MD` in the syllabus rows, no
section bar inside an open week, and the reader does not open from the Vault.
The Vault reader button is now added (`Copy Markdown` in the reading header,
`⌘⇧C`); the rest is phase P3/P4 below.

---

## 4. What to take, what to leave

**Take**

1. The palette and the two rules (accent = ink, mint = signal).
2. Hanken Grotesk + JetBrains Mono pairing; mono for every count.
3. Pill-first chrome: pills, 24/14 radii, 40 px controls, circular icon buttons.
4. The week accordion + chip legend + 6 px segment strip.
5. The four copy tiers and the options popover.
6. Reader tools: `A−/A+` (14–24 px, persisted), focus mode, 3 px progress bar,
   TOC rail, prev/next, question cards with mark-done.
7. Responsive ladder and the `pointer: coarse` / reduced-motion / print rules.

**Leave**

1. The demo dataset and the hardcoded `NOTE` document body.
2. `#/read/...` only working for the first item.
3. The synchronous `execCommand` copy fallback (keep IITM's 1.2 s async
   timeout, which answers on Safari and locked-down Chromium).
4. CDN Tailwind/KaTeX — the shell already self-hosts `libs/lucide.min.js` and
   should keep KaTeX local; the Vault page still pulls both from CDNs (see
   §6, P5).
5. Replacing IITM's semantic chip colours wholesale: the mock reuses the same
   four hues for practice, graded and exam content that the manifest already
   distinguishes. Map five kinds (lecture / activity / graded / tutorial /
   exam) onto the four hues, with `other` on `--ink-3`.

---

## 5. Adoption plan

### P1 — Tokens (`assets/tokens.css`)

Add a palette scope rather than rewriting the default, so screens can be
flipped one at a time:

| Today | Reel Vault |
|---|---|
| `--bg #f7f8fa` | `#F3EEE4` |
| `--surface #ffffff` | `#FBF8F1` |
| `--surface-2 #f1f3f7` | `#EFE8DA` |
| `--sunken`/`--surface-3` | `#E7DFCE` |
| `--line #e4e7ee` | `rgba(20,17,13,.14)` |
| `--ink #12141a` | `#14110D` |
| `--ink-2 #4b5262` | `#5A544A` |
| `--ink-3 #7a8296` / `--ink-4` | `#8A8172` / `#B0A897` |
| `--accent #4f46e5` | `#14110D` (ink), `--accent-ink` `#000` |
| `--accent-soft #eef0ff` | `#EFE8DA` |
| `--lecture #2563eb` | `#5B6CF0` |
| `--activity #d97706` | `#C97A0A` |
| `--graded #e11d48` | `#D9472B` |
| `--tutorial #0d9488` | `#0A8F6A` |
| `--r-4 22px` | `24px` |
| — | new `--mint #00E0A4`, `--on-ink`, `--ctl 40px` |

Dark scope: `--bg #14121B`, `--surface #1D1A26`, `--surface-2 #262232`,
`--ink #F4EFE5`, `--mut #B6AFC0`, kinds `#9AA6FF / #F2B24C / #FF8E73 / #3FE0B5`.
Also drop `--font` to `'Hanken Grotesk'` and add `--mono` for JetBrains Mono;
both must be **vendored locally** under `libs/` (the archive is used offline).

*Acceptance:* flipping `data-palette="vault"` on `<html>` changes every screen
and no stylesheet contains a raw hex outside `tokens.css`.

### P2 — Chrome (`index.html`, `assets/app.css`)

Top bar: brand mark (the mock's rounded-square + line motif in SVG, mint panel),
wordmark "IITM **Vault**", search pill with `/` `kbd`, Home/Syllabus `.pills`,
circular theme button. Rail: `.cap` section labels, 40 px rows with mono counts,
`aria-current` = field fill. Mobile: 300 px drawer, scrim, pills hidden.

*Acceptance:* `/` focuses search, `Escape` closes the drawer, no stray icon
buttons wider than 40 px, contrast ≥ 4.5:1 for `--ink` on `--bg`/`--card`.

### P3 — Syllabus (`assets/app/syllabus.js`)

- Week header → 52 px accordion: bold label, chips, mono `n pages`, caret.
- Open week gains `.bar`: "Copy this section as Markdown" + `MD` button.
- Item rows gain the type tag, mono note and a per-row `MD` (page line copy).
- Courts: strike the duplicated course band on `#/c/<course>` (already done).
- 200 px sticky jump rail at ≥1100 px; segment strip uses `counts.weeks`.

*Acceptance:* Mathematics-II Week 1 = 22 pages, Week 2 = 17, course = 202,
Statistics-II = 295, term = 499 (matches `data/manifest.json`); copying a week
emits one `## Week n` section; per-row copy emits one `- Title` line.

### P4 — Reader (`markdown/index.html`)

- Replace the indigo/slate Tailwind palette with the token scope (cream card,
  ink text, mint progress) — the page keeps its own Tailwind CDN for now.
- 720 px measure + 220 px TOC at ≥1280 px; `A−/A+` persisted; focus mode;
  bottom prev/next; question cards from the existing `.points-badge` pipeline.
- `Copy Markdown` in the reading header + `⌘⇧C` — **done in this change**;
  next is the `Markdown · MDX · Bundle` caret from `03-SYLLABUS-AND-MARKDOWN.md`.

*Acceptance:* a copied page starts with its `#` title and contains no Vault
chrome or rendered-HTML tags; the toast reports a size; `file://` preview still
copies through the fallback.

### P5 — Parity and hygiene

1. Vendor Tailwind (`@tailwindcss/browser` is already a dependency) and KaTeX
   for the Vault page instead of `cdn.tailwindcss.com` / unpkg.
2. Dark theme on the Vault (the mock has one; the Vault has none).
3. `prefers-reduced-motion`, `pointer: coarse` 44 px, print expansion.
4. Wire the syllabus rows to `#/p/<page>` so the Reader and the shell stop
   being two products.

*Acceptance:* `grep -c "cdn.tailwindcss.com\|unpkg.com" markdown/index.html` = 0;
both themes pass contrast; every row in the syllabus opens its page.

---

## 6. Risks

| Risk | Mitigation |
|---|---|
| A cream palette dims long-form reading | Keep `--rfs`/`--measure` at 17 px/72 ch; verify contrast before switching the reader |
| Mint as a signal gets diluted | Allow mint only in: progress bar, segment strip, active TOC edge, hint border, brand mark |
| Fonts add weight to an offline archive | Vendor WOFF2 subsets (Latin) locally, `font-display: swap` |
| Token flip breaks the extracted-page iframe | The iframe is a separate document with its own CSS; tokens do not leak in |
| Two style systems (Vault Tailwind vs shell CSS) | P5 removes the CDN; until then the Vault uses token-mapped arbitrary values only |

---

## 7. Order of work

1. **P4 copy button** — done, smallest useful slice, no visual risk.
2. **P1 tokens** — one file, unblocks everything else.
3. **P2 chrome** — the shell reads as the family product.
4. **P3 syllabus** — the screen the mock is really about.
5. **P4 reader restyle** — the biggest single-file edit.
6. **P5 parity** — offline deps, dark mode, cross-linking.
