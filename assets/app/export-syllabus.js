/* ============================================================================
   export-syllabus.js — manifest -> Markdown, for notes and for AI models.
   Pure functions, no DOM: also loadable from Node for tests.

   scope: { kind: 'all' }
        | { kind: 'term',   termId }
        | { kind: 'course', courseId }
        | { kind: 'week',   courseId, sectionId }
   opts:  { links, counts, paths, frontmatter }
   ========================================================================== */
(function (global) {
  'use strict';

  // keys are item.type values (item.type is 'page' for plain pages)
  var GROUPS = [
    ['lecture', 'Lectures'],
    ['activity', 'Activities'],
    ['tutorial', 'Tutorials'],
    ['practice', 'Practice'],
    ['graded', 'Graded'],
    ['bank', 'Question banks'],
    ['exam', 'Exams & keys'],
    ['other', 'Pages'],
  ];

  function plurals(c) {
    var out = [];
    if (c.weeks) out.push(c.weeks + (c.weeks === 1 ? ' week' : ' weeks'));
    out.push(c.pages + (c.pages === 1 ? ' page' : ' pages'));
    if (c.lectures) out.push(c.lectures + ' lectures');
    if (c.activities) out.push(c.activities + ' activities');
    if (c.practice) out.push(c.practice + ' practice');
    if (c.tutorials) out.push(c.tutorials + ' tutorials');
    if (c.graded) out.push(c.graded + ' graded');
    if (c.exams) out.push(c.exams + ' exam pages');
    return out;
  }

  /** Group a flat item list into the reading order used everywhere. */
  function groupItems(items) {
    var bucket = {};
    items.forEach(function (it) {
      var key = it.type === 'practice' ? 'practice'
        : it.type === 'bank' ? 'bank'
        : it.type === 'page' ? 'other'
        : it.type;
      (bucket[key] = bucket[key] || []).push(it);
    });
    return GROUPS.filter(function (g) { return bucket[g[0]] && bucket[g[0]].length; })
      .map(function (g) { return { key: g[0], label: g[1], items: bucket[g[0]] }; });
  }

  function linkFor(item) {
    return '#/p/' + encodeURIComponent(item.path);
  }

  function groupLine(group, opts) {
    var titles = group.items.map(function (it) {
      var t = it.title;
      if (opts.links) t = '[' + t.replace(/[[\]]/g, '') + '](' + linkFor(it) + ')';
      if (opts.paths) t += ' (`' + it.path + '`)';
      return t;
    });
    // titles carry " · " from normalisation, so the list separator must differ
    return '**' + group.label + ' (' + group.items.length + '):** ' + titles.join('; ');
  }

  function sectionBlock(section, opts) {
    var lines = [];
    var isWeek = section.kind === 'week';
    var heading = isWeek ? section.label : section.label;
    lines.push('## ' + heading + (opts.counts ? ' — ' + section.items.length +
      (section.items.length === 1 ? ' page' : ' pages') : ''));
    if (opts.counts) {
      var c = section.counts || {};
      var bits = [];
      if (c.lectures) bits.push(c.lectures + ' lectures');
      if (c.activities) bits.push(c.activities + ' activities');
      if (c.practice) bits.push(c.practice + ' practice');
      if (c.tutorials) bits.push(c.tutorials + ' tutorials');
      if (c.graded) bits.push(c.graded + ' graded');
      if (bits.length > 1) lines.push(bits.join(' · '));
    }
    groupItems(section.items).forEach(function (g) { lines.push(groupLine(g, opts)); });
    return lines.join('\n');
  }

  function courseBlock(course, opts, level) {
    var h = level === 3 ? '### ' : '## ';
    var lines = [];
    lines.push(h + course.name);
    lines.push('');
    var meta = [courseTermName(course, opts.manifest)];
    if (opts.counts) meta = meta.concat(plurals(course.counts));
    lines.push(meta.filter(Boolean).join(' · '));
    lines.push('');
    course.sections.forEach(function (s) {
      lines.push(sectionBlock(s, opts));
      lines.push('');
    });
    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  function courseTermName(course, manifest) {
    if (!manifest) return '';
    var t = (manifest.terms || []).filter(function (x) { return x.id === course.term; })[0];
    return t ? t.name : '';
  }

  function frontmatter(manifest, scope) {
    return [
      '---',
      'source: IITM Notes Archive',
      'scope: ' + scope.kind,
      'generated: ' + new Date().toISOString().slice(0, 10),
      '---',
      '',
    ].join('\n');
  }

  function toSyllabusMarkdown(manifest, scope, options) {
    var opts = Object.assign({ links: false, counts: true, paths: false, frontmatter: false }, options || {});
    opts.manifest = manifest;
    var out = [];

    var findCourse = function (id) {
      return (manifest.courses || []).filter(function (c) { return c.id === id; })[0];
    };
    var termName = function (id) {
      var t = (manifest.terms || []).filter(function (x) { return x.id === id; })[0];
      return t ? t.name : id;
    };

    if (scope.kind === 'all') {
      out.push('# IITM Archive — syllabus', '');
      var t = manifest.totals || {};
      out.push([t.terms + ' terms', t.courses + ' courses', t.weeks + ' weeks', t.pages + ' pages'].join(' · '), '');
      (manifest.terms || []).forEach(function (term) {
        out.push('## ' + term.name, '');
        term.courses.forEach(function (cid) {
          var c = findCourse(cid);
          if (c) out.push(courseBlock(c, opts, 3), '');
        });
      });
    } else if (scope.kind === 'term') {
      var term = (manifest.terms || []).filter(function (x) { return x.id === scope.termId; })[0];
      out.push('# ' + (term ? term.name : scope.termId) + ' — syllabus', '');
      (term ? term.courses : []).forEach(function (cid) {
        var c = findCourse(cid);
        if (c) out.push(courseBlock(c, opts, 2), '');
      });
    } else if (scope.kind === 'course') {
      var course = findCourse(scope.courseId);
      if (!course) return '';
      out.push('# ' + course.name + ' — syllabus', '');
      out.push([termName(course.term)].concat(plurals(course.counts)).join(' · '), '');
      course.sections.forEach(function (s) { out.push(sectionBlock(s, opts), ''); });
    } else if (scope.kind === 'week') {
      var c2 = findCourse(scope.courseId);
      var sec = c2 && c2.sections.filter(function (s) { return s.id === scope.sectionId; })[0];
      if (!sec) return '';
      out.push('# ' + c2.name + ' — ' + sec.label, '');
      out.push(sectionBlock(sec, Object.assign({}, opts, { counts: true })), '');
    }

    var body = out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
    return (opts.frontmatter ? frontmatter(manifest, scope) : '') + body;
  }

  var api = { toSyllabusMarkdown: toSyllabusMarkdown, groupItems: groupItems, plurals: plurals };
  global.IITMExport = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
