/* ============================================================================
   router.js — hash routes for the shell, with the legacy path shim.

     #/                     Home
     #/syllabus             every term -> course -> week
     #/syllabus/<term>      one term
     #/c/<course id>         one course (syllabus body + its weeks)
     #/w/<course>/<section>  a week (opens the syllabus scrolled to it)
     #/p/<encoded path>     one archived page (iframe)

   Legacy `#content/...u.zip.html` keeps working: it is rewritten to /p/ once.
   ========================================================================== */
(function (global) {
  'use strict';

  var VIEWS = ['home-dashboard', 'syllabus-view', 'iframe-container'];

  function show(which) {
    VIEWS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.toggle('hidden', id !== which);
    });
    if (which !== 'iframe-container') {
      var viewer = document.getElementById('viewer');
      if (viewer) viewer.src = 'about:blank';
    }
  }

  function findCourse(id) {
    var m = global.__IITM_MANIFEST__;
    return m ? (m.courses || []).filter(function (c) { return c.id === id; })[0] : null;
  }

  function findPage(path) {
    var m = global.__IITM_MANIFEST__;
    if (!m) return null;
    for (var i = 0; i < m.courses.length; i++) {
      for (var j = 0; j < m.courses[i].sections.length; j++) {
        var items = m.courses[i].sections[j].items;
        for (var k = 0; k < items.length; k++) {
          if (items[k].path === path) return { item: items[k], course: m.courses[i], section: m.courses[i].sections[j] };
        }
      }
    }
    return null;
  }

  function setTitle(text) {
    var el = document.getElementById('mobile-title');
    if (el) el.textContent = text;
    document.title = text === 'Notes Archive' ? 'IITM Notes Archive' : text + ' · IITM Notes Archive';
  }

  function sidebar(title, subtitle) {
    var t = document.getElementById('sidebar-title');
    var s = document.getElementById('sidebar-subtitle');
    if (t) t.textContent = title;
    if (s) s.textContent = subtitle;
  }

  function go(raw) {
    // raw = "#/p/..." + optional query, without the leading '#'
    var path = raw.split('?')[0].replace(/^\/+/, '');

    if (path === '' || path === 'dashboard') {
      if (global.showDashboard) global.showDashboard();
      return;
    }

    var parts = path.split('/').map(function (p) { return decodeURIComponent(p); });

    if (parts[0] === 'syllabus') {
      show('syllabus-view');
      global.IITMScreens.renderSyllabus(parts[1] ? { termId: parts[1] } : {});
      var t = parts[1] ? decodeURIComponent(parts[1]) : 'Syllabus';
      sidebar('Syllabus', parts[1] ? t : 'All courses');
      setTitle('Syllabus');
      var view = document.getElementById('syllabus-view');
      if (view) view.scrollTop = 0;
      return;
    }

    if (parts[0] === 'c') {
      var course = findCourse(parts[1]);
      show('syllabus-view');
      global.IITMScreens.renderSyllabus({ courseId: parts[1] });
      sidebar(course ? course.name : 'Course', 'Course overview');
      setTitle(course ? course.name : 'Course');
      var v = document.getElementById('syllabus-view');
      if (v) v.scrollTop = 0;
      return;
    }

    if (parts[0] === 'w') {
      var c2 = findCourse(parts[1]);
      show('syllabus-view');
      global.IITMScreens.renderSyllabus({ courseId: parts[1] });
      sidebar(c2 ? c2.name : 'Week', 'Week view');
      setTitle(c2 ? c2.name : 'Week');
      var target = document.getElementById(parts[2]);
      if (target) target.scrollIntoView({ block: 'start' });
      return;
    }

    if (parts[0] === 'p') {
      var pagePath = parts.slice(1).join('/');
      var found = findPage(pagePath);
      show('iframe-container');
      var viewer = document.getElementById('viewer');
      if (viewer) viewer.src = pagePath;

      var label = found ? found.item.title : pagePath.split('/').pop();
      setTitle(label);
      sidebar(found ? found.course.name : 'Page', found ? found.section.label : 'Archive page');

      var back = document.getElementById('back-to-dash');
      if (back) back.classList.remove('hidden');

      // mark the matching sidebar row if that tree is rendered
      document.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.remove('active'); });
      var row = document.querySelector('.nav-btn[data-path="' + pagePath.replace(/"/g, '\\"') + '"]');
      if (row) { row.classList.add('active'); }

      // close the mobile drawer
      if (global.innerWidth < 768) {
        var sb = document.getElementById('sidebar');
        var ov = document.getElementById('mobile-overlay');
        if (sb) sb.classList.add('-translate-x-full');
        if (ov) ov.classList.add('hidden');
      }
      return;
    }

    // unknown route -> home
    location.replace('#/');
  }

  global.IITMRouter = { go: go, findPage: findPage };
})(window);
