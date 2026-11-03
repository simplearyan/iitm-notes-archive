/* ============================================================================
   syllabus.js — Home cards + the Syllabus / Course screens, built from the
   manifest. Markup is created here so index.html stays a shell.
   ========================================================================== */
(function (global) {
  'use strict';

  var M = null;

  function manifest() {
    return M || global.__IITM_MANIFEST__ || null;
  }

  function init(m) {
    M = m;
  }

  // ------------------------------------------------------------------ helpers

  function h(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var CHIP_LABEL = {
    lecture: ['lecture', 'lectures'], activity: ['activity', 'activities'],
    practice: ['practice', 'practice'], tutorial: ['tutorial', 'tutorials'],
    graded: ['graded', 'graded'], exam: ['exam', 'exams'], bank: ['q-bank', 'q-banks'],
  };

  function chip(text, type) {
    return '<span class="r-chip r-chip--' + type + '">' + text + '</span>';
  }

  function chipsFor(items, limit) {
    var counts = {};
    items.forEach(function (it) { counts[it.type] = (counts[it.type] || 0) + 1; });
    var order = ['lecture', 'activity', 'practice', 'tutorial', 'graded', 'bank', 'exam'];
    var out = [];
    order.forEach(function (t) {
      if (!counts[t]) return;
      if (limit && out.length >= limit) return;
      var label = CHIP_LABEL[t] || [t, t];
      out.push(chip(counts[t] + ' ' + (counts[t] === 1 ? label[0] : label[1]), t));
    });
    return out.join('');
  }

  function pagesLabel(n) {
    return n + (n === 1 ? ' page' : ' pages');
  }

  function line(c) {
    var bits = [];
    if (c.weeks) bits.push(c.weeks + ' weeks');
    bits.push(c.pages + ' pages');
    return bits.join(' · ');
  }

  function openItem(path) {
    location.hash = '/p/' + encodeURIComponent(path);
  }

  function courseById(id) {
    return (manifest().courses || []).filter(function (c) { return c.id === id; })[0];
  }

  function termName(id) {
    var t = (manifest().terms || []).filter(function (x) { return x.id === id; })[0];
    return t ? t.name : id;
  }

  var ICON_BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
  var ICON_CHEV = '<svg class="syl-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

  // -------------------------------------------------------------------- home

  function renderHome() {
    var root = document.getElementById('home-root');
    var m = manifest();
    if (!root || !m) return;

    var totals = m.totals || {};
    var wrap = h('<div class="home-wrap"></div>');

    wrap.appendChild(h(
      '<div class="home-head">' +
        '<h1 class="home-title">Notes Archive</h1>' +
        '<p class="home-sub">Every archived page, grouped by term, course and week — readable, searchable, copyable.</p>' +
        '<div class="home-stats">' +
          '<span><b>' + totals.terms + '</b> terms</span>' +
          '<span><b>' + totals.courses + '</b> courses</span>' +
          '<span><b>' + totals.weeks + '</b> weeks</span>' +
          '<span><b>' + totals.pages + '</b> pages</span>' +
        '</div>' +
        '<div class="home-actions">' +
          '<button type="button" class="r-btn r-btn--pri" data-act="syllabus">Open syllabus</button>' +
          '<button type="button" class="r-btn" data-act="browse">Browse all content</button>' +
          '<span class="spacer"></span>' +
          '<a class="r-btn r-btn--quiet" href="markdown/">Reading vault ↗</a>' +
        '</div>' +
      '</div>'
    ));

    (m.terms || []).forEach(function (term) {
      var courses = term.courses.map(courseById).filter(Boolean);
      var pages = courses.reduce(function (n, c) { return n + c.counts.pages; }, 0);
      var block = h('<div class="term-block"></div>');
      block.appendChild(h(
        '<div class="term-head">' +
          '<span class="term-name">' + esc(term.name) + '</span>' +
          '<span class="term-meta">' + courses.length + ' course' + (courses.length === 1 ? '' : 's') +
            ' · ' + pages + ' pages</span>' +
        '</div>'
      ));

      var grid = h('<div class="course-grid"></div>');
      courses.forEach(function (c) {
        var card = h(
          '<button type="button" class="course-card" data-course="' + esc(c.id) + '">' +
            '<div class="course-card-top">' +
              '<span class="course-name">' + esc(c.name) + '</span>' +
              '<span class="course-icon">' + ICON_BOOK + '</span>' +
            '</div>' +
            '<div class="course-line">' + line(c.counts) + '</div>' +
            (c.counts.weeks ? '<div class="week-strip">' + weekStrip(c) + '</div>' : '') +
            '<div class="course-chips">' + chipsFor(c.sections.flatMap(function (s) { return s.items; }), 3) + '</div>' +
          '</button>'
        );
        grid.appendChild(card);
      });
      block.appendChild(grid);
      wrap.appendChild(block);
    });

    root.textContent = '';
    root.appendChild(wrap);

    wrap.querySelector('[data-act="syllabus"]').addEventListener('click', function () {
      location.hash = '/syllabus';
    });
    wrap.querySelector('[data-act="browse"]').addEventListener('click', function () {
      if (global.IITMHost && global.IITMHost.browseAll) global.IITMHost.browseAll();
    });
    wrap.querySelectorAll('.course-card').forEach(function (card) {
      card.addEventListener('click', function () {
        location.hash = '/c/' + encodeURIComponent(card.getAttribute('data-course'));
      });
    });
  }

  function weekStrip(course) {
    var weeks = course.sections.filter(function (s) { return s.kind === 'week'; });
    var total = course.counts.weeks || weeks.length;
    var out = '';
    for (var i = 0; i < total; i++) {
      var has = weeks.some(function (s) { return s.index === i && s.items.length; });
      out += '<i class="' + (has ? 'has' : '') + '" title="Week ' + i + '"></i>';
    }
    return out;
  }

  // ---------------------------------------------------------------- syllabus

  function renderSyllabus(opts) {
    opts = opts || {};
    var view = document.getElementById('syllabus-view');
    var m = manifest();
    if (!view || !m) return;

    var courses = opts.courseId
      ? [courseById(opts.courseId)].filter(Boolean)
      : opts.termId
        ? m.courses.filter(function (c) { return c.term === opts.termId; })
        : m.courses;
    var wrap = h('<div class="syl-wrap"></div>');

    var totals = courses.reduce(function (acc, c) {
      acc.pages += c.counts.pages; acc.weeks += c.counts.weeks;
      return acc;
    }, { pages: 0, weeks: 0 });

    var titleText = opts.courseId ? courses[0].name : opts.termId ? termName(opts.termId) : 'Syllabus';
    var subText = opts.courseId
      ? termName(courses[0].term) + ' · ' + line(courses[0].counts)
      : courses.length + ' courses · ' + totals.weeks + ' weeks · ' + totals.pages + ' pages';

    var head = h(
      '<div class="syl-head">' +
        '<div>' +
          '<h1 class="syl-title">' + esc(titleText) + '</h1>' +
          '<div class="syl-sub">' + esc(subText) + '</div>' +
        '</div>' +
        '<div class="syl-actions"></div>' +
      '</div>'
    );

    var scope = opts.courseId
      ? { kind: 'course', courseId: opts.courseId }
      : opts.termId ? { kind: 'term', termId: opts.termId } : { kind: 'all' };
    var actions = head.querySelector('.syl-actions');
    actions.appendChild(global.IITMUI.copyButton({
      label: opts.courseId ? 'Copy course' : 'Copy',
      build: function (prefs) {
        return global.IITMExport.toSyllabusMarkdown(m, scope, prefs);
      },
    }));
    actions.appendChild(h('<button type="button" class="r-btn" data-act="print">Print</button>'));

    if (opts.courseId || opts.termId) {
      actions.appendChild(h('<button type="button" class="r-btn r-btn--quiet" data-act="allsyl">All courses</button>'));
    }

    var body = h('<div class="syl-body"></div>');
    var index = h('<div class="syl-index"><h4>Jump to week</h4></div>');

    courses.forEach(function (course) {
      var block = h('<div class="syl-course" id="c-' + slug(course.id) + '"></div>');

      // On a course route the page header already names the course and carries
      // the copy action — repeating it as a band reads as a duplicate title.
      var cHead = opts.courseId ? null : h(
        '<div class="syl-course-head">' +
          '<div>' +
            '<h2 class="syl-course-name">' + esc(course.name) + '</h2>' +
            '<div class="syl-course-line">' + esc(termName(course.term)) + ' · ' + line(course.counts) + '</div>' +
          '</div>' +
          '<div class="syl-actions"></div>' +
        '</div>'
      );
      if (cHead) {
        cHead.querySelector('.syl-actions').appendChild(global.IITMUI.copyButton({
          label: 'Copy course',
          primary: false,
          small: true,
          build: function (prefs) {
            return global.IITMExport.toSyllabusMarkdown(m, { kind: 'course', courseId: course.id }, prefs);
          },
        }));
        block.appendChild(cHead);
      }

      var idxGroup = h('<div class="idx-course"><div class="idx-course-name">' + esc(course.name) + '</div></div>');
      if (!opts.courseId) index.appendChild(idxGroup);

      course.sections.forEach(function (section) {
        block.appendChild(sectionEl(course, section));
        if (section.kind === 'week') {
          var link = h('<a href="#" data-target="s-' + slug(course.id + section.id) + '">' +
            esc(section.label) + '<span class="n">' + section.items.length + '</span></a>');
          link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.getElementById('s-' + slug(course.id + section.id));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
          idxGroup.appendChild(link);
        }
      });

      body.appendChild(block);
    });

    var layout = h('<div class="syl-layout' + (opts.courseId ? ' single' : '') + '"></div>');
    if (!opts.courseId) layout.appendChild(index);
    layout.appendChild(body);
    wrap.appendChild(head);
    wrap.appendChild(layout);

    view.textContent = '';
    view.appendChild(wrap);

    actions.querySelector('[data-act="print"]').addEventListener('click', function () { window.print(); });
    if (opts.courseId || opts.termId) {
      actions.querySelector('[data-act="allsyl"]').addEventListener('click', function () {
        location.hash = '/syllabus';
      });
    }
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function sectionEl(course, section) {
    var el = h(
      '<div class="syl-week ' + (section.kind === 'week' ? '' : 'is-special') + '" id="s-' + slug(course.id + section.id) + '">' +
        '<button type="button" class="syl-week-head" aria-expanded="false">' +
          '<span class="syl-week-name">' + esc(section.label) + '</span>' +
          '<span class="syl-week-chips">' + chipsFor(section.items, 4) + '</span>' +
          '<span class="syl-week-pages">' + pagesLabel(section.items.length) + '</span>' +
          ICON_CHEV +
        '</button>' +
        '<div class="syl-items"></div>' +
      '</div>'
    );

    var headBtn = el.querySelector('.syl-week-head');
    var list = el.querySelector('.syl-items');
    var built = false;

    headBtn.addEventListener('click', function () {
      var open = el.classList.toggle('open');
      headBtn.setAttribute('aria-expanded', String(open));
      if (open && !built) {
        built = true;
        var weekCopy = h('<div class="syl-item" style="background:var(--surface-2)">' +
          '<span class="syl-item-title" style="color:var(--ink-3)">Copy this section as Markdown</span>' +
          '<span class="syl-item-acts"></span></div>');
        weekCopy.querySelector('.syl-item-acts').appendChild(global.IITMUI.copyButton({
          label: 'Copy',
          primary: false,
          small: true,
          build: function (prefs) {
            return global.IITMExport.toSyllabusMarkdown(
              manifest(),
              { kind: 'week', courseId: course.id, sectionId: section.id },
              prefs
            );
          },
        }));
        list.appendChild(weekCopy);
        section.items.forEach(function (item) { list.appendChild(itemRow(item)); });
      }
    });

    return el;
  }

  function itemRow(item) {
    var row = h(
      '<div class="syl-item" role="button" tabindex="0">' +
        '<span class="r-chip r-chip--' + item.type + '" title="' + item.type + '">' + typeLabel(item.type) + '</span>' +
        '<span class="syl-item-title">' + esc(item.title) + '</span>' +
        '<span class="syl-item-acts"></span>' +
      '</div>'
    );
    row.querySelector('.syl-item-acts').appendChild(global.IITMUI.copyButton({
      label: 'MD',
      primary: false,
      small: true,
      build: function () { return '- ' + item.title; },
    }));
    row.addEventListener('click', function (e) {
      if (e.target.closest('.r-copywrap')) return;
      openItem(item.path);
    });
    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openItem(item.path); }
    });
    return row;
  }

  function typeLabel(t) {
    return { lecture: 'L', activity: 'AQ', practice: 'P', tutorial: 'T', graded: 'G', bank: 'QB', exam: 'E', page: '·' }[t] || '·';
  }

  global.IITMScreens = {
    init: init,
    renderHome: renderHome,
    renderSyllabus: renderSyllabus,
  };
})(window);
