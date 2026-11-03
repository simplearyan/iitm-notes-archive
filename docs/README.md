# IITM-Pages — redesign & improvement docs

Plans for making the notes archive cleaner, easier to navigate, and useful as a
source you can hand to an AI model or paste into personal notes.

| Doc | What it covers |
|---|---|
| [01-AUDIT.md](01-AUDIT.md) | What the repo actually is today: measured inventory, how the three apps/pipelines fit, and the specific problems worth fixing (with numbers). |
| [02-IA-AND-DESIGN.md](02-IA-AND-DESIGN.md) | The new information architecture (one shell, four screens), a single design-token system, navigation/search spec, and the design-consistency fixes. |
| [03-SYLLABUS-AND-MARKDOWN.md](03-SYLLABUS-AND-MARKDOWN.md) | The two requested features in detail: **one page with every subject → course → week syllabus, copyable as Markdown**, and a **Copy MDX button per page (with images)**. |
| [04-ROADMAP.md](04-ROADMAP.md) | Phased implementation order (P0 → P3), file/script-level task list, acceptance criteria, effort, and risks. |
| [05-REEL-VAULT-DESIGN-PLAN.md](05-REEL-VAULT-DESIGN-PLAN.md) | Teardown of the Reel Vault mock-up (measured tokens, type, components, copy tiers) and the plan to adopt that language across the shell, syllabus and Vault. |

## Read in this order

1. **`01-AUDIT.md`** — what exists today, with counted numbers you can test against.
2. **`02-IA-AND-DESIGN.md`** — what the app should become (screens, tokens, nav).
3. **`03-SYLLABUS-AND-MARKDOWN.md`** — the two features you asked for, in detail.
4. **`04-ROADMAP.md`** — the order to build them, file by file.
5. **`05-REEL-VAULT-DESIGN-PLAN.md`** — the design to build them *with*.

## Status

| Item | State |
|---|---|
| Docs (01–04) | written, counts verified against `content/` |
| `Loading Module…` spinner when opening a page | **removed** (`index.html`: overlay div, `showLoader`/`hideLoader`, `onload` hook all gone — the iframe now shows its own paint) |
| `Copy Markdown` in the Vault reader (`markdown/index.html`) | **added** — reading-header button plus `⌘⇧C`; copies the document's raw markdown |
| Reel Vault visual language | planned in `05-REEL-VAULT-DESIGN-PLAN.md` (P1 tokens → P5 parity) |
| Everything else in `04-ROADMAP.md` | not started |

> Implement P0 → P1 first: those two phases alone deliver the syllabus page and
> the copy-as-Markdown/MDX actions, which are the whole point of this round.

## The one-paragraph version

The archive is strong where it counts — 509 archived course pages, a working
markdown extraction pipeline, an annotator, and a reader — but it is **three
separate front-ends** (iframe shell, dashboard, markdown vault) with **three
overlapping content indexes** (inlined sidebar JSON, `markdown/index.json`,
`extracted-index.tmp.json`), no shared design language, no copy/export of what
you are reading, and no single view of the syllabus. The fix is not a rewrite:
generate **one manifest**, build **one shell** around it, add a **Syllabus
screen** and a **Copy-MDX action**, and converge both existing apps onto shared
tokens. Details and sequencing follow in the numbered docs.
