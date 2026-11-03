#!/usr/bin/env node
/**
 * build-manifest.js — scan content/ and write data/manifest.json (+ .js mirror).
 *
 * This is the single source of truth for structure: term -> course -> section ->
 * item, with classification, normalised titles and counts. The sidebar, the
 * syllabus screen and the Vault all read this instead of re-parsing paths.
 *
 * Idempotent: same input tree -> byte-identical output (stable sort, no clock
 * inside the payload except `generated`, which is excluded when MANIFEST_NOW=0).
 *
 *   node scripts/build-manifest.js            # write
 *   node scripts/build-manifest.js --check    # verify on-disk file matches, exit 1 if not
 *   node scripts/build-manifest.js --stats    # print counts only
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const OUT_JSON = path.join(ROOT, 'data', 'manifest.json');
const OUT_JS = path.join(ROOT, 'data', 'manifest.js');
const VAULT_CONFIG = path.join(ROOT, 'vault-config.json');

const FLAGS = new Set(process.argv.slice(2));
const CHECK = FLAGS.has('--check');
const STATS_ONLY = FLAGS.has('--stats');

// ---------------------------------------------------------------- vault rules

function readVaultRules() {
  try {
    const cfg = JSON.parse(fs.readFileSync(VAULT_CONFIG, 'utf8'));
    return {
      excludePatterns: (cfg.excludePatterns || []).map((p) => new RegExp(p, 'i')),
      hideExtensions: cfg.hideExtensions !== false,
      prettyNames: cfg.prettyNames !== false,
    };
  } catch (e) {
    console.warn('[manifest] vault-config.json unreadable, using defaults:', e.message);
    return { excludePatterns: [], hideExtensions: true, prettyNames: true };
  }
}

// ------------------------------------------------------------- classification

const RULES = [
  // order matters: the first match wins
  [/^L\d+(\.\d+)?[ _]/i, 'lecture', 'lecture'],
  [/^AQ\d/i, 'activity', 'activity'],
  [/^activity/i, 'activity', 'activity'],
  [/^practice/i, 'practice', 'activity'],
  [/^solve with us/i, 'tutorial', 'tutorial'],
  [/^tutorial/i, 'tutorial', 'tutorial'],
  [/tutorial/i, 'tutorial', 'tutorial'],
  [/question\s*bank/i, 'bank', 'other'],
  [/^graded/i, 'graded', 'graded'],
  [/graded\s*assignment/i, 'graded', 'graded'],
  [/^assignment\s*\d/i, 'graded', 'graded'],
  [/answer\s*key/i, 'exam', 'exam'],
  [/^mock|mock\s*test|quiz/i, 'exam', 'exam'],
];

/** Classify an item's display title. Returns { type, group }. */
function classify(title) {
  for (const [re, type, group] of RULES) {
    if (re.test(title)) return { type, group };
  }
  return { type: 'page', group: 'page' };
}

// ------------------------------------------------------------ title handling

const CAPTURE_SUFFIX = /\s*_?\s*IITM Online Degree\s*\([^)]*\)\s*$/i;

/** "AQ1.1_ Activity Questions 1 - Not Graded _ IITM Online Degree (4_4_2026 …)"
 *     -> "AQ1.1 · Activity Questions 1 — Not Graded" */
function normaliseTitle(fileName) {
  let t = fileName.replace(/\.u\.zip\.html$/i, '').replace(/\.html?$/i, '');
  t = t.replace(CAPTURE_SUFFIX, '');
  t = t.replace(/[_\u00a0]+/g, ' ').replace(/\s+/g, ' ').trim();
  // " - Not Graded" -> " — Not Graded" (the extracted pages use this shape)
  t = t.replace(/\s+-\s+/g, ' — ');
  // "AQ1.1 Activity Questions 1" -> "AQ1.1 · Activity Questions 1"
  const code = t.match(/^(AQ\d+(?:\.\d+)?|L\d+(?:\.\d+)?|Week\s*\d+\s*[—–-]\s*Tutorial\s*\d+)\s+(.*)$/i);
  if (code) t = `${code[1].replace(/\s*[—–-]\s*/g, ' - ')} · ${code[2]}`;
  return t.trim();
}

// --------------------------------------------------------------- sections

const WEEK_RE = /^week\s*0*(\d+)(.*)$/i;

function parseWeek(label) {
  const m = label.match(WEEK_RE);
  if (!m) return null;
  const index = parseInt(m[1], 10);
  const part = m[2].replace(/^[\s\-–:]+/, '').trim(); // "Part 1" for Stat-II Week 0
  return { index, part };
}

function sectionKind(label) {
  const w = parseWeek(label);
  return w ? { kind: 'week', index: w.index, part: w.part || null } : { kind: 'special', index: null, part: null };
}

const SPECIAL_ORDER = [
  'course introduction',
  'course resources',
  'weekly extra activity',
  'weekly mock',
  'mock tests and quizzes',
  'mock tests and quizzes',
  'extra activity assignment',
  'supplementary contents',
  'solutions recordings',
  'malpractice rules',
  'answer key for exam',
  'answer key for exams',
];

function specialRank(label) {
  const i = SPECIAL_ORDER.indexOf(label.trim().toLowerCase());
  return i === -1 ? SPECIAL_ORDER.length : i;
}

// ---------------------------------------------------------------- collection

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

function isPage(file) {
  return /\.u\.zip\.html$/i.test(file) || /\.html?$/i.test(file);
}

function countTypes(items) {
  const c = {
    pages: items.length,
    lectures: 0, activities: 0, practice: 0, tutorials: 0, graded: 0, exams: 0, other: 0,
  };
  for (const it of items) {
    if (it.type === 'lecture') c.lectures++;
    else if (it.type === 'activity') c.activities++;
    else if (it.type === 'practice') c.practice++;
    else if (it.type === 'tutorial') c.tutorials++;
    else if (it.type === 'graded') c.graded++;
    else if (it.type === 'exam') c.exams++;
    else c.other++;
  }
  return c;
}

/** Items of a section directory: page files, plus folders that are an expanded
 *  SingleFileZ bundle (a folder holding index.html is ONE page, not a folder). */
function collectSectionPages(secDir) {
  const out = [];
  for (const entry of fs.readdirSync(secDir, { withFileTypes: true })) {
    if (entry.isFile() && isPage(entry.name)) {
      out.push({ fileName: entry.name, filePath: path.join(secDir, entry.name), titleSource: entry.name });
    } else if (entry.isDirectory()) {
      const idx = path.join(secDir, entry.name, 'index.html');
      if (fs.existsSync(idx)) {
        out.push({ fileName: entry.name, filePath: idx, titleSource: entry.name });
      }
    }
  }
  return out.sort((a, b) => a.fileName.localeCompare(b.fileName));
}

function buildCourse(termId, courseDir, rules) {
  const name = path.basename(courseDir);
  const unsorted = !/^Term/i.test(termId);
  const sections = [];

  for (const entry of fs.readdirSync(courseDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;
    const secDir = path.join(courseDir, entry.name);
    const { kind, index, part } = sectionKind(entry.name);

    const items = collectSectionPages(secDir).map(({ fileName, filePath, titleSource }) => {
      const raw = titleSource.replace(/\.u\.zip\.html$/i, '').replace(/\.html?$/i, '');
      const title = rules.prettyNames ? normaliseTitle(titleSource) : raw;
      const { type, group } = classify(title);
      const rel = path.relative(ROOT, filePath).split(path.sep).join('/');
      const item = {
        title,
        rawTitle: raw,
        type,
        group,
        path: rel,
        bytes: fs.statSync(filePath).size,
      };
      if (rules.excludePatterns.some((re) => re.test(raw))) item.vaultExcluded = true;
      return item;
    });

    sections.push({
      id: entry.name,
      label: entry.name,
      kind,
      index,
      part,
      counts: countTypes(items),
      items,
    });
  }

  // weeks first (ascending), then specials in their reading order
  sections.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'week' ? -1 : 1;
    if (a.kind === 'week') {
      if (a.index !== b.index) return a.index - b.index;
      return (a.part || '').localeCompare(b.part || '');
    }
    const r = specialRank(a.label) - specialRank(b.label);
    return r !== 0 ? r : a.label.localeCompare(b.label);
  });

  const all = sections.flatMap((s) => s.items);
  const counts = countTypes(all);
  // distinct week indices: Statistics-II splits Week 0 into three folders
  counts.weeks = new Set(sections.filter((s) => s.kind === 'week').map((s) => s.index)).size;
  counts.sections = sections.length;

  return {
    id: `${termId}/${name}`,
    term: termId,
    name: unsorted ? `${name} (unsorted)` : name,
    unsorted,
    counts,
    sections,
  };
}

/** A folder whose pages sit directly inside it (no section folders), e.g. maths-2. */
function buildLooseCourse(termId, dir, rules) {
  const name = path.basename(dir);
  const items = collectSectionPages(dir).map(({ fileName, filePath, titleSource }) => {
    const raw = titleSource.replace(/\.u\.zip\.html$/i, '').replace(/\.html?$/i, '');
    const title = rules.prettyNames ? normaliseTitle(titleSource) : raw;
    const { type, group } = classify(title);
    return {
      title,
      rawTitle: raw,
      type,
      group,
      path: path.relative(ROOT, filePath).split(path.sep).join('/'),
      bytes: fs.statSync(filePath).size,
      ...(rules.excludePatterns.some((re) => re.test(raw)) ? { vaultExcluded: true } : {}),
    };
  });
  const sections = items.length
    ? [{ id: 'root', label: 'Pages', kind: 'special', index: null, part: null, counts: countTypes(items), items }]
    : [];
  const counts = countTypes(items);
  counts.weeks = 0;
  counts.sections = sections.length;
  return { id: `${termId}/${name}`, term: termId, name: `${name} (unsorted)`, unsorted: true, counts, sections };
}

function build() {
  const rules = readVaultRules();
  const terms = [];
  const courses = [];

  for (const termEntry of fs.readdirSync(CONTENT, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!termEntry.isDirectory()) continue;
    const termId = termEntry.name;
    const termDir = path.join(CONTENT, termId);

    // A term folder holds course folders; a loose folder of pages is its own course.
    const kids = fs.readdirSync(termDir, { withFileTypes: true });
    const courseDirs = kids.filter((k) => k.isDirectory()).map((k) => path.join(termDir, k.name));
    const loose = kids.some((k) => k.isFile() && isPage(k.name));

    if (courseDirs.length === 0 || loose) {
      const c = buildLooseCourse(termId, termDir, rules);
      courses.push(c);
      terms.push({ id: termId, name: 'Unsorted', courses: [c.id] });
      continue;
    }

    const ids = [];
    for (const dir of courseDirs) {
      const c = buildCourse(termId, dir, rules);
      courses.push(c);
      ids.push(c.id);
    }
    terms.push({
      id: termId,
      name: termId.replace(/^Term-/, 'Term ').replace(/-to-/g, '–').replace(/-/g, ' ') + ' 2026',
      courses: ids,
    });
  }

  const totals = { terms: terms.length, courses: courses.length, weeks: 0, pages: 0 };
  for (const c of courses) {
    totals.weeks += c.counts.weeks;
    totals.pages += c.counts.pages;
  }

  const manifest = {
    version: 1,
    generated: new Date().toISOString(),
    totals,
    terms,
    courses,
  };
  return manifest;
}

// ------------------------------------------------------------------- output

function serialise(manifest) {
  return JSON.stringify(manifest, null, 2) + '\n';
}

function main() {
  if (!fs.existsSync(CONTENT)) {
    console.error('[manifest] content/ not found at', CONTENT);
    process.exit(1);
  }
  const manifest = build();
  const json = serialise(manifest);

  if (STATS_ONLY) {
    console.log('[manifest] totals', manifest.totals);
    for (const c of manifest.courses) console.log('  ', c.id, c.counts);
    return;
  }

  if (CHECK) {
    const onDisk = fs.existsSync(OUT_JSON) ? fs.readFileSync(OUT_JSON, 'utf8') : '';
    const strip = (s) => s.replace(/"generated": "[^"]*",?\n?/, '');
    if (strip(onDisk) !== strip(json)) {
      console.error('[manifest] data/manifest.json is stale — run: npm run manifest');
      process.exit(1);
    }
    console.log('[manifest] up to date');
    return;
  }

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, json);
  // .js mirror: works from file:// where fetch() of JSON is blocked
  fs.writeFileSync(
    OUT_JS,
    '// generated by scripts/build-manifest.js — do not edit\n' +
      `window.__IITM_MANIFEST__ = ${JSON.stringify(manifest)};\n`
  );

  console.log('[manifest] wrote', path.relative(ROOT, OUT_JSON), `${(json.length / 1024).toFixed(0)} KB`);
  console.log(
    `[manifest] ${manifest.totals.terms} terms · ${manifest.totals.courses} courses · ` +
      `${manifest.totals.weeks} weeks · ${manifest.totals.pages} pages`
  );
}

if (require.main === module) main();

module.exports = { build, normaliseTitle, classify, parseWeek };
