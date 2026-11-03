# 03 — Syllabus page & Copy-as-Markdown / MDX

Two features, one shared foundation: a **generated manifest** that finally carries
real metadata (`term`, `course`, `week`, `type`, `title`, `path`). Today every
screen re-parses a path string; this doc assumes `data/manifest.json` exists
(schema in §1, generator task in `04-ROADMAP.md`).

---

## 1. The manifest (foundation for both features)

`scripts/build-manifest.js` scans `content/` (and optionally the extracted
markdown tree) once and writes `data/manifest.json`.

```json
{
  "version": 2,
  "generated": "2026-11-02T10:00:00.000Z",
  "stats": { "terms": 2, "courses": 3, "weeks": 26, "pages": 509 },
  "terms": [
    {
      "id": "Term-Feb-to-May",
      "name": "Term Feb–May 2026",
      "courses": ["Term-Feb-to-May/Mathematics-II", "Term-Feb-to-May/Statistics-II"]
    },
    { "id": "maths-2", "name": "Maths-2 (unsorted)", "courses": ["maths-2"] }
  ],
  "courses": [
    {
      "id": "Term-Feb-to-May/Mathematics-II",
      "term": "Term-Feb-to-May",
      "name": "Mathematics-II",
      "counts": { "weeks": 13, "pages": 202, "lectures": 56, "activities": 51,
                  "practice": 12, "tutorials": 30, "graded": 12, "exams": 8, "other": 33 },
      "sections": [
        {
          "id": "intro", "label": "Course Introduction", "kind": "special",
          "items": [
            {
              "title": "Grading policy",
              "type": "page",
              "path": "content/Term-Feb-to-May/Mathematics-II/Course%20Introduction/Grading%20policy%20…%.u.zip.html",
              "md": "extracted/Term-Feb-to-May/Mathematics-II/Course Introduction/Grading policy.md",
              "bytes": 41211
            }
          ]
        },
        {
          "id": "Week 1", "label": "Week 1", "kind": "week", "index": 1,
          "groups": [
            { "type": "lecture",  "label": "Lectures", "items": [ { "title": "L1.1 Vectors", "type": "lecture", "path": "…" } ] },
            { "type": "activity", "label": "Activities", "items": [ … ] },
            { "type": "tutorial", "label": "Tutorials", "items": [ … ] },
            { "type": "graded",   "label": "Graded",   "items": [ … ] },
            { "type": "other",    "label": "Other",    "items": [ … ] }
          ]
        }
      ]
    }
  ]
}
```

### 1.1 Classification rules (single source of truth)

Derived from the file name, first match wins — these are the patterns actually
present in `content/`:

| Rule (case-insensitive) | `type` | Chip colour |
|---|---|---|
| `^L\d+(\.\d+)?[ _]` | `lecture` | `--lecture` |
| `^AQ\d` / `Activity` | `activity` | `--activity` |
| `Practice` (assignment) | `practice` → group `activity` | `--activity` |
| `Graded`, `Assignment \d` | `graded` | `--graded` |
| `Tutorial` | `tutorial` | `--tutorial` |
| `Solve with us` | `tutorial` | `--tutorial` |
| `Question Bank` | `bank` → group `other` | `--ink-3` |
| `Answer Key` | `exam` | `--exam` |
| `Mock`, `Quiz` | `exam` | `--exam` |
| `Malpractice`, `Instructions`, `About`, `Grading`, `Supplementary` | `page` | `--ink-3` |

### 1.2 Title normalisation

Do it once at build time, not in the UI (today it happens in three places):

```
"AQ1.1_ Activity Questions 1 - Not Graded _ IITM Online Degree (4_4_2026 8_44_18 am)"
  → "AQ1.1 · Activity Questions 1 — Not Graded"
"L2.1 Determinants (part 3) _ IITM Online Degree (…)"
  → "L2.1 · Determinants (part 3)"
"maths-2" → "Maths-2 (unsorted)"
```

Rules: strip the `_ IITM Online Degree (…)` suffix and the trailing
`u.zip.html`; `[ _]+` → ` · `; keep parentheticals; collapse whitespace; keep
the original name in `rawTitle` for search. `vault-config.json`'s
`excludePatterns` should move into this script so the sidebar, the Vault and the
syllabus agree on what is hidden.

---

## 2. Feature A — the Syllabus screen (`#/syllabus`)

### 2.1 Purpose

One page where you can see **every subject → course → week → what is in it**,
scan it in 20 seconds, and copy the whole thing as Markdown for an AI model or
your notes.

### 2.2 Layout

```
Syllabus                                                    [ Term ▾ ]  [ Copy all ]
Term Feb–May 2026 · 2 courses · 26 weeks · 499 pages

┌ Week index (sticky, 180px) ┐  ┌ Course: Mathematics-II ────────────────────────┐
│ Mathematics-II             │  │ 13 weeks · 202 pages · 56 lectures · 12 graded │
│  W0  W1  W2 … W12          │  │                                                │
│ Statistics-II              │  │ ▸ Week 1                              22 pages │
│  W1 … W12                  │  │   Lectures (5)  Activities (5)  Tutorials (8)  │
│                            │  │   Graded (1)    Question bank (1)              │
│                            │  │ ▾ Week 2                              17 pages │
│                            │  │   • L2.1 Determinants (part 3)      lecture    │
│                            │  │   • L2.2 Cramer's Rule              lecture    │
│                            │  │   …                                            │
└────────────────────────────┘  └────────────────────────────────────────────────┘
```

- Weeks collapsed by default; click a week bar to expand its items.
- Each week row shows type chips with counts; each item row shows its type chip
  and a hover action set: `Open · Copy MD · Original`.
- Sticky left index jumps to weeks (`scroll-behavior: smooth`, honours
  `prefers-reduced-motion`).
- Special sections (Course Introduction, Answer Keys, Mock tests, Malpractice,
  Supplementary) appear in their own group above/below the weeks — they are not
  weeks and should not be numbered like one.
- Mobile: one column, index becomes a horizontal scroll strip under the title.
- Empty state for a term with one course: skip the term layer.
- Print stylesheet: expand all weeks, hide chips and buttons, A4 margins, page
  break before each course. (This is the "printable syllabus" for free.)

### 2.3 Copy as Markdown (three scopes)

A single `Copy` split-button in the syllabus header:

| Scope | Output |
|---|---|
| **This course** | one `# Course — syllabus` doc with all weeks + items |
| **This week** | just that week |
| **Everything** | every course in every term (the "paste into an AI" doc) |

Options in the dropdown (persisted in localStorage):

- ☑ include page links
- ☑ include counts
- ☐ include file paths (off by default — noise for an LLM)
- ☐ include frontmatter (`---` block with term/course/generated)

Example output (course scope, links off):

```markdown
# Mathematics-II — syllabus

Term Feb–May 2026 · 13 weeks · 202 pages
56 lectures · 51 activities · 30 tutorials · 12 graded · 8 exam pages

## Week 1 — 22 pages
**Lectures (5):** L1.1 Vectors · L1.2 Matrices · L1.3 Systems of Linear Equations ·
L1.4 Determinants (part 1) · L1.5 Determinants (part 2)
**Activities (5):** AQ1.1 … AQ1.5 (Activity Questions 1–5, not graded)
**Tutorials (8):** Week 01 Tutorial 01 … 08
**Graded (1):** Week 1 – Graded Assignment 1
**Question bank (1):** Week 1 – Question Bank

## Week 2 — 17 pages
…
```

Why this shape: one heading per week, one line per type group. It fits a prompt's
context window, reads fine in Notion/Obsidian, and stays diff-friendly when the
archive grows. The full-archive version of this (~30 KB for 499 pages) is the
single most useful artifact for "ask an AI about my course".

### 2.4 Where the syllabus lives besides its own screen

- Course screen header shows the same summary line + `Copy syllabus`.
- Home course cards link to `#/syllabus/<course>`.
- The old dashboard's wrong `2 Modules / Weeks` line is deleted, not fixed.

---

## 3. Feature B — Copy Markdown / MDX of a page, with images

### 3.1 The three outputs

| Action | What lands in the clipboard | When to use |
|---|---|---|
| **Copy Markdown** (`⌘C` on selection, `⌘⇧C` page) | clean markdown, images as `![alt](assets/name.png)`, plus an appendix listing the asset filenames | pasting into Obsidian/Notes that resolves images separately, or a chat that does not need pictures |
| **Copy MDX** (`⌥⌘C`) | self-contained: YAML frontmatter + markdown, every image inlined as `data:image/png;base64,…` | pasting into an AI model, a gist, a single-file MDX doc — nothing else needed |
| **Download bundle** | `.md` + `/assets` folder in one `.zip` | big pages (images over ~8 MB) where a clipboard write would be truncated |

Automatic fallback: if MDX payload > **8 MB** (Chrome's async clipboard starts
failing well before that), do not silently truncate — show
`This page is 14 MB with images → Download .zip` with the button that does it.

### 3.2 Where the button appears

- **Reader header**: `⤓ Copy` with a caret (`Markdown · MDX · Bundle`), plus
  `⌘⇧C` / `⌥⌘C` shortcuts and a `Copied · 12 KB · 6 images` toast.
- **Every item row** in Course/Syllabus: hover icon "copy MD" (fast path: copy a
  single lecture without opening it).
- **Week header**: copies the week as one MDX (frontmatter per page preserved as
  `##` sections).
- **Selection**: selecting text in Reading mode shows a tiny floating
  `Copy as Markdown` (only for selections > 1 paragraph).

### 3.3 Source of the markdown

Preference order (cheap → expensive):

1. **Extracted markdown** already on disk (`manifest.courses[].sections[].items[].md`).
   This is clean, has frontmatter, has images already named. Nothing to compute —
   just `fetch()` and post-process.
2. **Turndown at runtime** on the in-Reader iframe DOM (same origin — the capture
   is a local file, so no cross-origin wall). `turndown` is already a dependency.
3. **Iframe DOM → clone → sanitize** for pages where the capture's JS needs to run
   first (`iframe.contentDocument` after `load`).

Pipeline for 2/3:

```js
// same-origin iframe; the capture is a local HTML file
const doc  = iframe.contentDocument;
const root = doc.querySelector('main, #content, .course-content') || doc.body;

// strip the capture's own chrome (verify per page family)
['header','nav','footer','.navbar','.site-header','.footer','#topbar','.back-to-top']
  .forEach(sel => root.querySelectorAll(sel).forEach(n => n.remove()));

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
td.addRule('katex', {
  filter: n => n.classList?.contains('katex'),
  replacement: (_c, n) => {
    const tex = n.querySelector('annotation[encoding="application/x-tex"]')?.textContent
             || n.textContent;
    return n.closest('.katex-display') ? `\n$$\n${tex.trim()}\n$$\n` : `$${tex.trim()}$`;
  },
});
let md = td.turndown(root.innerHTML);
```

Then normalise: collapse 3+ blank lines, convert `\-   ` bullets to `- `, fix
`[Hint: …]` spacing, keep the extracted `title:` frontmatter if present.

### 3.4 Images

Two cases, both needed:

- **Extracted assets exist** (`markdown/extracted/assets/<name>.png`): fetch the
  file, `arrayBuffer → base64` for MDX, or keep the relative link for Markdown.
- **Only the archive has them** (image inlined in the `.u.zip.html` as
  `data:`/`blob:`): read `img.currentSrc` from the iframe, `fetch()` it (blob URLs
  created by a same-origin document are readable by the parent — verify once, and
  fall back to `canvas.drawImage → toDataURL('image/png')`, which never hits the
  network), then use that data URI.

Alt text: `img.alt || caption sibling || 'figure'`. Emit width/height from
`naturalWidth/naturalHeight` as an HTML `<img>` only in MDX (keeps `![]()` valid
Markdown elsewhere). De-duplicate by content hash so the same diagram used twice
is inlined once per file.

### 3.5 Frontmatter (MDX)

```yaml
---
title: "L1.2 · Matrices"
course: "Mathematics-II"
term: "Term Feb–May 2026"
week: 1
type: lecture
pages: 6
source: "content/Term-Feb-to-May/Mathematics-II/Week%201/L1.2_%20Matrices….u.zip.html"
exported: "2026-11-02"
---
```

`source` is the canonical path so you can always get back. No timestamps of the
original scrape (they are noise), only `exported`.

### 3.6 MDX safety

MDX treats `<` and `{` as JSX. Escape in prose (not inside code fences):

```js
const escapeMdx = s => s.replace(/</g, '&lt;').replace(/\{/g, '\\{');
// skip: fenced code blocks, inline `code`, math $…$, and existing HTML tags in MDX mode
```

Also collapse the two known scrape artifacts before export
(`"JavaScript should be enabled to grade this question."`, duplicated "Level 1:"
headers) — the Vault renderer already strips the first one; the exporter needs
the same rule.

### 3.7 Clipboard plumbing

```js
async function copyRich(text, html) {
  const ok = await navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' }),
      'text/html':  new Blob([html], { type: 'text/html' }), // optional: rendered preview
    }),
  ]).then(() => true).catch(() => false);
  if (!ok) fallbackTextarea(text);            // Safari/permission edge cases
}
```

- Clipboard API requires a secure context — GitHub Pages is HTTPS, but
  `file://` previews are not: keep the textarea fallback so local testing works.
- Large writes: chunk-base64 in one `Blob`, never string-concatenate megabytes.
- Toast reports the real size: `Copied 412 KB · 14 images` (compute from blobs).

### 3.8 ZIP writer for bundles (no dependency)

A store-only (no compression) ZIP is ~80 lines: local file header + central
directory + CRC32. Images are already compressed PNG/JPEG, so *store* is correct.
Ship it as `scripts/zip-lite.js` used only by the browser (`Blob` output,
`URL.createObjectURL` download). Alternative if you prefer: `fflate` (~8 KB) —
but a local writer keeps the zero-dependency, offline-friendly promise.

---

## 4. Acceptance criteria

**Syllabus**
- [ ] `#/syllabus` lists every term → course → week → item, with counts matching
      the manifest (spot-check: Mathematics-II Week 1 = 22 pages, Week 2 = 17,
      course total = 202; Statistics-II = 295; term = 499).
- [ ] No screen anywhere still prints `2 Modules / Weeks`.
- [ ] Copy-as-Markdown for course/week/everything produces valid Markdown that
      renders identically in GitHub and Obsidian.
- [ ] Sticky week index jumps correctly; works at 390 px, 768 px, 1440 px.
- [ ] Print view is readable on A4.

**Copy MDX**
- [ ] `⌘⇧C` copies the page as Markdown; `⌥⌘C` copies self-contained MDX;
      both confirm with a sized toast.
- [ ] A page with figures produces an MDX file with N inline `data:` images that
      renders in a plain MDX viewer with no broken images.
- [ ] An un-extracted page works through the turndown path (fallback 2).
- [ ] Oversized page offers Download `.zip` instead of failing silently.
- [ ] Works from the app shell and from the Vault; `file://` fallback works.

## 5. Edge cases to handle explicitly

| Case | Behaviour |
|---|---|
| Page not yet extracted to markdown | turndown path; show "Original capture" chip in Reader |
| Images over 8 MB total | Download bundle instead of clipboard; explain why |
| Clipboard permission denied | textarea fallback, then a "select all" dialog |
| `math` in KaTeX but no annotation tag | fall back to `textContent` inside `$…$` |
| Duplicate scrape names (`AQ1.1` in Week 1 and `maths-2/AQ1.1`) | `courseId` in frontmatter disambiguates (e.g. `maths-2 (unsorted)`) |
| Non-Latin/emoji in titles | UTF-8 frontmatter; no escaping of unicode |
| Very long course (53 pages) | MDX per week only; course-level export stays Markdown |
