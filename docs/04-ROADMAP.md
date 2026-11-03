# 04 — Roadmap, tasks, risks

> Order chosen so that every phase ships something usable on its own, and no
> phase requires throwing away the current static deployment. Effort is
> solo-dev days; P0/P1 are the ones that answer the original request.

---

## P0 — Foundation: one manifest, one token set (~1–2 days)

Nothing user-visible is big here, but every later feature depends on it.

| # | Task | Files |
|---|---|---|
| 1 | `build-manifest.js`: scan `content/`, classify (`lecture/activity/tutorial/graded/exam/page`), normalise titles, compute counts, write `data/manifest.json` (+ optional per-course split `data/c/<id>.json`) | **new** `scripts/build-manifest.js`, `package.json` (`"manifest": "node scripts/build-manifest.js"`) |
| 2 | Move `vault-config.json` rules (`excludePatterns`, `prettyNames`) into the manifest script so all consumers agree | `vault-config.json`, `scripts/build-manifest.js` |
| 3 | Design tokens + component CSS; replace literals in the shell | **new** `assets/tokens.css`, `src/input.css` |
| 4 | Kill the duplicated annotation CSS block (inline `<style>` in `index.html` duplicates `src/input.css`) | `index.html` |
| 5 | Correct counts on Home; delete `2 Modules / Weeks` | `index.html` |
| 6 | A11y bugs: duplicate `role/tabindex` in `renderTree`, real buttons for folders, `aria-expanded`, focus rings | `index.html`, `src/input.css` |
| 7 | Self-host Lucide (drop `unpkg`); preconnect + `defer` what remains | `libs/`, `index.html` |

**Acceptance:** `npm run manifest` is idempotent; Home shows real per-course
counts; no colour literals in screen markup; keyboard can expand/collapse a
folder; Lucide loads with no network.

---

## P1 — Syllabus screen + Copy as Markdown (~3–4 days)

The requested "one page with all subject/course/week syllabus, copyable as MD".

| # | Task | Files |
|---|---|---|
| 1 | Route `#/syllabus`, `#/syllabus/<term>`, `#/c/<course>` in a small router; keep the legacy `#content/…` hash shim | `index.html` or **new** `assets/app/router.js` |
| 2 | Syllabus view: course summary line, sticky week index, week bars with type chips, expandable item lists | **new** `assets/app/syllabus.js` + template |
| 3 | `toSyllabusMarkdown(scope, opts)` — course / week / everything, with link + count + path toggles | **new** `assets/app/export-syllabus.js` |
| 4 | Copy split-button + options dropdown (persisted) + sized toast | `assets/app/ui.js` (new) |
| 5 | Print stylesheet (expand all, A4 breaks) | `assets/print.css` (new) |
| 6 | Course screen header gets the same summary + `Copy syllabus` | `assets/app/course.js` (new) |

**Acceptance:** the criteria in `03-SYLLABUS-AND-MARKDOWN.md` §4 (Syllabus block);
`#/syllabus` at 390 px / 768 px / 1440 px with no horizontal scroll.

---

## P2 — Reader + Copy MDX with images (~4–6 days)

| # | Task | Files |
|---|---|---|
| 1 | Reader shell: page header (breadcrumb, title, chips), prev/next, `Reading | Original` tabs, markdown render with marked + KaTeX + Prism (reuse the Vault's renderer + semantic injections) | **new** `assets/app/reader.js` |
| 2 | Fallback chain: extracted md → turndown on iframe DOM → original-only | `assets/app/md-from-dom.js` (new) |
| 3 | `toMarkdown(page)` / `toMdx(page)` (frontmatter, `escapeMdx`, artifact cleanup) | `assets/app/export-page.js` (new) |
| 4 | Image pipeline: extracted assets + blob/data URIs from the capture; hash de-dup; size accounting | `assets/app/images.js` (new) |
| 5 | Clipboard (`write` + textarea fallback) and bundle download (store-only ZIP writer) | `assets/app/clipboard.js`, `scripts/zip-lite.js` (new) |
| 6 | Shortcuts `⌘⇧C` / `⌥⌘C`, hover copy on item rows, selection-level copy | `assets/app/reader.js`, `assets/app/syllabus.js` |
| 7 | `⌘K` palette over the manifest (pages + actions) | `assets/app/palette.js` (new) |

**Acceptance:** criteria in §4 (Copy MDX block): self-contained MDX with inline
images renders clean; un-extracted page works; > 8 MB offers the bundle; works
from `file://` via the fallback.

---

## P3 — Converge, polish, harden (~2–3 days)

| # | Task | Notes |
|---|---|---|
| 1 | Fold the Vault into the shell (same rail, tokens, palette) or retire it and keep `markdown/index.json` purely as build output | Removes the third skin and the 2.31 MB inline payload |
| 2 | Split the index: `data/manifest.json` for structure (< 200 KB), lazy per-course search shards | Replaces the 2.31 MB monolith |
| 3 | Dark mode via `data-theme` tokens (fixes the dark-sidebar/white-body mix) | |
| 4 | Bookmarks + "read" progress + continue-reading strip (localStorage) | Cheap, high perceived value |
| 5 | PWA: service worker precaching shell + manifest + extracted md; offline works | Makes the "offline archive" claim true |
| 6 | CI: GitHub Action → `build-manifest`, JSON schema validation, Lighthouse budget, link check | Add `"test"` script for real |
| 7 | Cleanup: archive `extracted-index.tmp.json`, four PDF script generations → one, `handouts/`/`output/`/`versions/` reviewed | Repo hygiene |

---

## Beyond the ask (ideas worth queueing, roughly in value order)

1. **"AI-ready" bundle**: one ZIP per week = `week-1.md` (concatenated) + images.
   Drop it into ChatGPT/Claude and it can explain the whole week.
2. **Per-page "explain" affordance**: a button that copies a formatted prompt +
   the page MDX (`Explain this lecture, then give me 5 practice questions`).
3. **Exam mode**: filter to `graded` + `answer key` + `question bank` for a week,
   copy as one MD.
4. **Progress**: mark pages read, per-course ring on Home, "next unread" action.
5. **Annotation persistence**: today annotations are in-memory; save per page
   (`localStorage`/IndexedDB) and export as SVG/PNG overlay notes.
6. **Page search**: `⌘F`-style highlight inside Reading mode plus next/prev hit.
7. **Question bank extractor**: pull all graded/AQ questions into a CSV/JSON bank.
8. **"Compare weeks"** view for revision — titles only, side by side.
9. **Share link** with `#/p/…` plus `?t=` text-fragment for a specific paragraph.
10. **Term calendar**: week numbers → dates, so "Week 3" means something.

---

## Risks & mitigations

| Risk | Why it matters | Mitigation |
|---|---|---|
| Extraction coverage incomplete | Reader's default mode needs `.md` for every page | Fallback chain (P2 §2); keep `Original` always available; show coverage % in a build log |
| SingleFileZ images are `blob:` inside the capture | Copy-MDX may get empty images | Verify once; fall back to `canvas.toDataURL`; prefer the extracted-asset path |
| Clipboard size limits (Chrome/Safari) | 10 MB+ pages silently truncate | Size check + bundle download instead of silent failure |
| `generate-sidebar.js` rewrites `index.html` in place | Regenerating can clobber hand edits | Manifest is a separate file; sidebar becomes a runtime render from it; the script becomes a one-time migration |
| 2.31 MB index + CDNs on mobile | Slow first paint where it matters most | Split index, self-host libs, PWA cache (P3) |
| No tests today | Refactors of routing/rendering are unverifiable | Add a tiny node test for `build-manifest` + `toSyllabusMarkdown` + `toMdx` (pure functions, no DOM) |
| GitHub Pages = no server | No search API, no redirects | Hash routing + client-side search only (already the model) |

## Suggested first commit series

1. `manifest: add build-manifest script and data/manifest.json`
2. `ui: add design tokens and remove duplicated annotation styles`
3. `home: show real course counts from the manifest`
4. `syllabus: add the term → course → week screen`
5. `export: add copy-as-markdown for syllabus scopes`
6. `reader: add reading mode with copy-mdx and image inlining`
