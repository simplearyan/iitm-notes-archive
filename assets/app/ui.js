/* ============================================================================
   ui.js — toast, clipboard, and the Copy split-button (with persisted options).
   ========================================================================== */
(function (global) {
  'use strict';

  var PREF_KEY = 'iitm.copy.opts';
  var DEFAULT_PREFS = { counts: true, links: false, paths: false, frontmatter: false };

  function prefs() {
    try {
      return Object.assign({}, DEFAULT_PREFS, JSON.parse(localStorage.getItem(PREF_KEY) || '{}'));
    } catch (e) {
      return Object.assign({}, DEFAULT_PREFS);
    }
  }

  function setPrefs(next) {
    var p = Object.assign(prefs(), next);
    try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch (e) { /* private mode */ }
    return p;
  }

  function toastHost() {
    var host = document.getElementById('r-toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'r-toast-host';
      host.setAttribute('aria-live', 'polite');
      host.setAttribute('role', 'status');
      document.body.appendChild(host);
    }
    return host;
  }

  var toastTimer = null;
  function toast(message) {
    var host = toastHost();
    host.textContent = '';
    var el = document.createElement('div');
    el.className = 'r-toast';
    el.textContent = message;
    host.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-in'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove('is-in');
      setTimeout(function () { el.remove(); }, 240);
    }, 2200);
  }

  function bytesLabel(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return Math.round(n / 1024) + ' KB';
    return (n / (1024 * 1024)).toFixed(1) + ' MB';
  }

  /** Legacy path: works from file://, in older browsers, and when the async
   *  clipboard API is blocked by permissions policy. */
  function copyViaTextarea(text) {
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;left:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        var ok = document.execCommand('copy');
        ta.remove();
        ok ? resolve() : reject(new Error('execCommand copy failed'));
      } catch (e) {
        ta.remove();
        reject(e);
      }
    });
  }

  /** A clipboard write can hang while the browser waits for permission
   *  (Safari and locked-down Chromium both do this). Do not leave the UI
   *  without feedback: give the async path 1.2 s, then use the legacy path. */
  function withTimeout(promise, ms) {
    return new Promise(function (resolve, reject) {
      var done = false;
      var timer = setTimeout(function () {
        if (!done) { done = true; reject(new Error('clipboard timeout')); }
      }, ms);
      promise.then(function (v) {
        if (done) return;
        done = true; clearTimeout(timer); resolve(v);
      }, function (e) {
        if (done) return;
        done = true; clearTimeout(timer); reject(e);
      });
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return withTimeout(navigator.clipboard.writeText(text), 1200).catch(function () {
        return copyViaTextarea(text);
      });
    }
    return copyViaTextarea(text);
  }

  /** Copy + confirm. `label` is what the toast says after the action. */
  function copy(text, label) {
    if (!text || !text.trim()) {
      toast('Nothing to copy');
      return Promise.reject(new Error('empty'));
    }
    return copyText(text).then(function () {
      toast((label || 'Copied') + ' · ' + bytesLabel(new Blob([text]).size));
    }).catch(function () {
      toast('Copy blocked — select the text and press Ctrl/Cmd+C');
      throw new Error('copy-failed');
    });
  }

  var ICON_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>';
  var ICON_CARET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

  /**
   * Copy split-button.
   * @param {{ label?: string, build: (opts:object)=>string, small?: boolean, primary?: boolean }} cfg
   */
  function copyButton(cfg) {
    var wrap = document.createElement('div');
    wrap.className = 'r-copywrap';

    var main = document.createElement('button');
    main.type = 'button';
    main.className = 'r-btn ' + (cfg.primary === false ? '' : 'r-btn--pri') + (cfg.small ? ' r-btn--sm' : '');
    main.innerHTML = ICON_COPY + '<span>' + (cfg.label || 'Copy') + '</span>';
    main.addEventListener('click', function () {
      var text = cfg.build(prefs());
      copy(text, 'Copied').catch(function (e) { console.error('[copy]', e); });
    });

    var more = document.createElement('button');
    more.type = 'button';
    more.className = 'r-btn ' + (cfg.primary === false ? '' : 'r-btn--pri') + (cfg.small ? ' r-btn--sm' : '');
    more.style.padding = '0 7px';
    more.style.borderLeft = '1px solid rgba(255,255,255,.28)';
    more.setAttribute('aria-label', 'Copy options');
    more.setAttribute('aria-expanded', 'false');
    more.innerHTML = ICON_CARET;

    var menu = document.createElement('div');
    menu.className = 'r-menu';
    menu.hidden = true;
    menu.innerHTML =
      '<div class="r-menu-label">Copy options</div>' +
      '<label class="r-opt"><input type="checkbox" data-pref="counts"> Include counts</label>' +
      '<label class="r-opt"><input type="checkbox" data-pref="links"> Link each page</label>' +
      '<label class="r-opt"><input type="checkbox" data-pref="paths"> Include file paths</label>' +
      '<label class="r-opt"><input type="checkbox" data-pref="frontmatter"> YAML frontmatter</label>' +
      '<div class="r-menu-sep"></div>' +
      '<button type="button" class="r-menu-item" data-act="copy">' + ICON_COPY + ' Copy now</button>';

    function syncBoxes() {
      var p = prefs();
      menu.querySelectorAll('input[data-pref]').forEach(function (box) {
        box.checked = !!p[box.getAttribute('data-pref')];
      });
    }

    menu.addEventListener('change', function (e) {
      var box = e.target.closest('input[data-pref]');
      if (!box) return;
      var next = {};
      next[box.getAttribute('data-pref')] = box.checked;
      setPrefs(next);
    });

    menu.querySelector('[data-act="copy"]').addEventListener('click', function () {
      copy(cfg.build(prefs()), 'Copied').catch(function (e) { console.error('[copy]', e); });
      close();
    });

    function close() {
      menu.hidden = true;
      more.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', onDocClick);
    }
    function onDocClick(e) {
      if (!wrap.contains(e.target)) close();
    }
    more.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.hidden) {
        syncBoxes();
        menu.hidden = false;
        more.setAttribute('aria-expanded', 'true');
        document.addEventListener('click', onDocClick);
      } else {
        close();
      }
    });
    menu.addEventListener('click', function (e) { e.stopPropagation(); });

    wrap.appendChild(main);
    wrap.appendChild(more);
    wrap.appendChild(menu);
    return wrap;
  }

  global.IITMUI = {
    prefs: prefs,
    setPrefs: setPrefs,
    toast: toast,
    copy: copy,
    copyButton: copyButton,
    bytesLabel: bytesLabel,
  };
})(window);
