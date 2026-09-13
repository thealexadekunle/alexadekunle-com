/* ==========================================================================
   Alex Adekunle — kinetic interaction system
   Vanilla ES2019 + Lenis (CDN, optional). One rAF ticker drives every
   scroll-linked effect; nothing reads layout inside the loop.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* Shared scroll state, written once per frame, read by every module. */
  var scroll = { y: window.scrollY, velocity: 0, direction: 1, height: 1, vw: window.innerWidth, vh: window.innerHeight };
  var lenis = null;

  /* ------------------------------------------------------------------
     Smooth inertial scrolling
     ------------------------------------------------------------------ */
  function initLenis() {
    if (reduced || typeof window.Lenis !== 'function') return null;

    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.09
    });

    lenis.on('scroll', function (e) {
      scroll.y = e.scroll;
      scroll.velocity = e.velocity;
      scroll.direction = e.direction || (e.velocity > 0 ? 1 : -1);
    });

    // Anchor links hand off to Lenis so in-page jumps keep the same easing
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -96, duration: 1.4 });
      history.replaceState(null, '', id);
    });

    return lenis;
  }

  /* ------------------------------------------------------------------
     Split lines — wrap each rendered line so it can stagger independently.
     Runs on real rendered geometry, so it respects the fluid type scale.
     ------------------------------------------------------------------ */
  function splitLines(el) {
    if (el.dataset.split === 'done') return;
    // Splitting rewrites textContent, so anything with inline markup is left alone
    if (el.querySelector('a, em, strong, span, br')) return;
    var text = el.textContent.replace(/\s+/g, ' ').trim();
    if (!text) return;

    var words = text.split(' ');
    el.textContent = '';
    var probes = words.map(function (word, i) {
      var span = document.createElement('span');
      span.textContent = word + (i < words.length - 1 ? ' ' : '');
      span.style.display = 'inline-block';
      el.appendChild(span);
      return span;
    });

    // Group the probes by their rendered top offset: that is a line.
    var lines = [];
    var currentTop = null;
    probes.forEach(function (span) {
      var top = span.offsetTop;
      if (currentTop === null || Math.abs(top - currentTop) > 4) { lines.push([]); currentTop = top; }
      lines[lines.length - 1].push(span.textContent);
    });

    el.textContent = '';
    lines.forEach(function (words, i) {
      var mask = document.createElement('span');
      mask.className = 'line-mask';
      var inner = document.createElement('span');
      inner.textContent = words.join('');
      inner.style.setProperty('--line-delay', (i * 90) + 'ms');
      mask.appendChild(inner);
      el.appendChild(mask);
    });
    el.dataset.split = 'done';
  }

  function initSplit() {
    var targets = $$('[data-split]');
    if (!targets.length) return;
    targets.forEach(splitLines);

    // Re-split on width change, because line breaks move with the viewport
    var last = window.innerWidth;
    var timer;
    window.addEventListener('resize', function () {
      if (Math.abs(window.innerWidth - last) < 60) return;
      last = window.innerWidth;
      clearTimeout(timer);
      timer = setTimeout(function () {
        targets.forEach(function (el) {
          el.dataset.split = '';
          el.textContent = el.textContent;
          splitLines(el);
          el.classList.add('is-visible');
        });
      }, 220);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     Entrance observer — fades, clip wipes and line staggers
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('[data-reveal], .mask, [data-clip], [data-split]');
    if (!items.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

    var vh = window.innerHeight;
    var aboveFold = [];

    items.forEach(function (el) {
      var delay = el.getAttribute('data-delay');
      if (delay) el.style.transitionDelay = delay + 'ms';
      if (el.getBoundingClientRect().top < vh * 0.98) aboveFold.push(el);
      else io.observe(el);
    });

    // Everything already in the first screen plays on load, staggered, rather
    // than waiting for a scroll that may never come.
    aboveFold.forEach(function (el, i) {
      setTimeout(function () { el.classList.add('is-visible'); }, 140 + i * 70);
    });
  }

  /* ------------------------------------------------------------------
     Parallax — cached geometry, transform written once per frame
     ------------------------------------------------------------------ */
  var parallaxItems = [];

  function measureParallax() {
    parallaxItems = $$('[data-parallax]').map(function (el) {
      var rect = el.getBoundingClientRect();
      return {
        el: el,
        speed: parseFloat(el.getAttribute('data-parallax')) || 0.08,
        top: rect.top + scroll.y,
        height: rect.height,
        current: 0
      };
    });
  }

  function updateParallax() {
    for (var i = 0; i < parallaxItems.length; i++) {
      var item = parallaxItems[i];
      var centre = item.top + item.height / 2 - scroll.y - scroll.vh / 2;
      if (centre < -scroll.vh * 1.6 || centre > scroll.vh * 1.6) continue;
      var target = centre * -item.speed;
      item.current = lerp(item.current, target, 0.12);
      item.el.style.transform = 'translate3d(0,' + item.current.toFixed(2) + 'px,0)';
    }
  }

  /* ------------------------------------------------------------------
     Velocity marquee — constant drift, pushed by scroll speed and direction
     ------------------------------------------------------------------ */
  var marquees = [];

  function initMarquee() {
    marquees = $$('.marquee').map(function (wrap) {
      var track = $('.marquee__track', wrap);
      if (!track) return null;
      wrap.classList.add('js-marquee');
      return {
        track: track,
        x: 0,
        half: track.scrollWidth / 2,
        base: wrap.classList.contains('marquee--slow') ? 0.35 : 0.6,
        paused: false
      };
    }).filter(Boolean);

    if (reduced) { marquees.forEach(function (m) { m.track.closest('.marquee').classList.remove('js-marquee'); }); marquees = []; return; }

    marquees.forEach(function (m) {
      var wrap = m.track.closest('.marquee');
      wrap.addEventListener('pointerenter', function () { m.paused = true; });
      wrap.addEventListener('pointerleave', function () { m.paused = false; });
    });
  }

  function updateMarquee() {
    var boost = Math.min(Math.abs(scroll.velocity) * 0.35, 14);
    for (var i = 0; i < marquees.length; i++) {
      var m = marquees[i];
      if (!m.half) { m.half = m.track.scrollWidth / 2; continue; }
      var speed = (m.paused ? m.base * 0.15 : m.base) + boost * m.base;
      m.x -= speed * (scroll.direction >= 0 ? 1 : -1);
      if (m.x <= -m.half) m.x += m.half;
      if (m.x > 0) m.x -= m.half;
      m.track.style.transform = 'translate3d(' + m.x.toFixed(2) + 'px,0,0)';
    }
  }

  /* ------------------------------------------------------------------
     Header: compaction + scroll progress
     ------------------------------------------------------------------ */
  var header, progress;

  function initHeader() {
    header = $('[data-header]');
    progress = $('[data-progress]');
  }

  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', scroll.y > 8);
    if (progress) {
      var max = scroll.height - scroll.vh;
      progress.style.width = (max > 0 ? Math.min(scroll.y / max, 1) * 100 : 0) + '%';
    }
  }

  /* ------------------------------------------------------------------
     The single ticker
     ------------------------------------------------------------------ */
  function frame(time) {
    if (lenis) lenis.raf(time);
    else {
      var y = window.scrollY;
      scroll.velocity = y - scroll.y;
      scroll.direction = scroll.velocity >= 0 ? 1 : -1;
      scroll.y = y;
    }
    updateHeader();
    updateParallax();
    updateMarquee();
    requestAnimationFrame(frame);
  }

  function measure() {
    scroll.vw = window.innerWidth;
    scroll.vh = window.innerHeight;
    scroll.height = document.documentElement.scrollHeight;
    measureParallax();
    marquees.forEach(function (m) { m.half = m.track.scrollWidth / 2; });
  }

  /* ------------------------------------------------------------------
     Magnetic CTAs — spring pull, label trails the shell
     ------------------------------------------------------------------ */
  function initMagnetic() {
    if (reduced || !finePointer) return;

    $$('[data-magnetic]').forEach(function (el) {
      var label = el.querySelector('span');
      var target = { x: 0, y: 0 }, current = { x: 0, y: 0 }, raf = null, active = false;

      function loop() {
        current.x = lerp(current.x, target.x, 0.16);
        current.y = lerp(current.y, target.y, 0.16);
        el.style.transform = 'translate3d(' + current.x.toFixed(2) + 'px,' + current.y.toFixed(2) + 'px,0)';
        if (label) label.style.transform = 'translate3d(' + (current.x * 0.32).toFixed(2) + 'px,' + (current.y * 0.32).toFixed(2) + 'px,0)';
        if (active || Math.abs(current.x - target.x) > 0.1 || Math.abs(current.y - target.y) > 0.1) {
          raf = requestAnimationFrame(loop);
        } else { raf = null; el.style.transform = ''; if (label) label.style.transform = ''; }
      }

      el.addEventListener('pointerenter', function () { active = true; if (!raf) raf = requestAnimationFrame(loop); });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        target.x = (e.clientX - r.left - r.width / 2) * 0.28;
        target.y = (e.clientY - r.top - r.height / 2) * 0.42;
      });
      el.addEventListener('pointerleave', function () {
        active = false; target.x = 0; target.y = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
    });
  }

  /* ------------------------------------------------------------------
     Card tilt + border illumination
     ------------------------------------------------------------------ */
  function initTilt() {
    if (reduced || !finePointer) return;

    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        el.style.transform =
          'perspective(1100px) rotateX(' + ((0.5 - py) * 2.4).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 2.4).toFixed(2) + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------------------
     Cursor label over media tiles
     ------------------------------------------------------------------ */
  function initCursor() {
    var label = $('[data-cursor]');
    var text = $('[data-cursor-text]');
    if (!label || reduced || !finePointer) return;

    var targets = $$('[data-cursor-target]');
    if (!targets.length) return;

    var x = 0, y = 0, cx = 0, cy = 0, raf = null;
    function loop() {
      cx = lerp(cx, x, 0.16); cy = lerp(cy, y, 0.16);
      label.style.translate = cx + 'px ' + cy + 'px';
      raf = requestAnimationFrame(loop);
    }

    targets.forEach(function (el) {
      el.addEventListener('pointerenter', function () {
        if (text) text.textContent = el.getAttribute('data-cursor-target') || 'View';
        label.classList.add('is-active');
        if (!raf) loop();
      });
      el.addEventListener('pointermove', function (e) { x = e.clientX; y = e.clientY; });
      el.addEventListener('pointerleave', function () {
        label.classList.remove('is-active');
        cancelAnimationFrame(raf); raf = null;
      });
    });
  }

  /* ------------------------------------------------------------------
     Page transitions — veil wipes out, navigation follows
     ------------------------------------------------------------------ */
  function initTransitions() {
    var veil = $('[data-veil]');
    if (!veil) return;

    requestAnimationFrame(function () { veil.classList.add('is-open'); });
    // Retire the veil once the entrance is done — unless a navigation is
    // already wiping it back in, which would hide the transition mid-flight.
    var retire = setTimeout(function () {
      if (!veil.classList.contains('is-closing')) veil.classList.add('is-done');
    }, 900);

    if (reduced) { veil.classList.add('is-done'); return; }

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (link.target === '_blank' || link.host !== window.location.host) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      e.preventDefault();
      clearTimeout(retire);
      veil.classList.remove('is-done', 'is-open');
      veil.classList.add('is-closing');
      setTimeout(function () { window.location.href = href; }, 480);
    });

    // Back/forward out of bfcache: make sure the veil is not left closed
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) { veil.classList.remove('is-closing'); veil.classList.add('is-open', 'is-done'); }
    });
  }

  /* ------------------------------------------------------------------
     Mobile drawer
     ------------------------------------------------------------------ */
  function initMenu() {
    var toggle = $('[data-menu-toggle]');
    var menu = $('[data-menu]');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      $('.sr-only', toggle).textContent = open ? 'Close menu' : 'Open menu';
      document.body.style.overflow = open ? 'hidden' : '';
      if (lenis) { open ? lenis.stop() : lenis.start(); }
    }

    toggle.addEventListener('click', function () { setOpen(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------
     Filters (work-free: gallery + any future archive)
     ------------------------------------------------------------------ */
  function initFilters() {
    var chips = $$('[data-filter]');
    var items = $$('[data-category]');
    var count = $('[data-filter-count]');
    if (!chips.length || !items.length) return;

    function apply(value) {
      var shown = 0;
      items.forEach(function (item) {
        var match = value === 'all' || item.getAttribute('data-category').split(' ').indexOf(value) > -1;
        item.hidden = !match;
        if (match) shown++;
      });
      if (count) count.textContent = String(shown).padStart(2, '0');
      measure();
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        apply(chip.getAttribute('data-filter'));
      });
    });
    apply('all');
  }

  /* ------------------------------------------------------------------
     Scope toggle (services): project engagement vs ongoing retainer
     ------------------------------------------------------------------ */
  function initScopeToggle() {
    var buttons = $$('[data-scope]');
    if (!buttons.length) return;

    function apply(mode) {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-scope') === mode)); });
      $$('[data-scope-value]').forEach(function (el) {
        var value = el.getAttribute('data-scope-' + mode);
        if (value) el.textContent = value;
      });
      $$('[data-scope-show]').forEach(function (el) {
        el.hidden = el.getAttribute('data-scope-show') !== mode;
      });
      measure();
    }

    buttons.forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-scope')); }); });
    apply('project');
  }

  /* ------------------------------------------------------------------
     Live availability badge (contact): real clock in Lagos
     ------------------------------------------------------------------ */
  function initAvailability() {
    var clock = $('[data-clock]');
    var status = $('[data-availability]');
    if (!clock && !status) return;

    function tick() {
      var now = new Date();
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short'
      }).formatToParts(now);
      var get = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
      var hour = parseInt(get('hour'), 10);
      var day = get('weekday');
      var weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(day) > -1;
      var open = weekday && hour >= 9 && hour < 18;

      if (clock) clock.textContent = get('hour') + ':' + get('minute') + ' WAT';
      if (status) {
        status.textContent = open ? 'Online now' : 'Offline — replies next working day';
        status.setAttribute('data-state', open ? 'open' : 'closed');
      }
    }
    tick();
    setInterval(tick, 30000);
  }

  /* ------------------------------------------------------------------
     Forms
     ------------------------------------------------------------------ */
  function wire(form, statusEl, successCopy, buttonCopy) {
    if (!form || !statusEl) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = $$('[required]', form).filter(function (f) { return !f.value.trim() || !f.checkValidity(); });
      if (invalid.length) {
        statusEl.textContent = 'One or two fields still need you.';
        invalid[0].focus();
        return;
      }
      var button = $('button[type="submit"]', form);
      var labelEl = button ? button.querySelector('span') || button : null;
      if (button) { button.disabled = true; labelEl.textContent = 'Sending…'; }

      // TODO: POST to a real endpoint, e.g.
      // fetch('/api/contact', { method: 'POST', body: new FormData(form) })
      setTimeout(function () {
        form.reset();
        if (button) { button.disabled = false; labelEl.textContent = buttonCopy; }
        statusEl.textContent = successCopy;
      }, 600);
    });
  }

  function initForms() {
    $$('[data-form]').forEach(function (form) {
      wire(form, $('[data-form-status]', form) || $('[data-form-status]'),
        'Got it. I read everything that comes through here, and I will come back to you.', 'Send it over');
    });

    var news = $('[data-newsletter]');
    var newsStatus = $('[data-newsletter-status]');
    if (news && newsStatus) {
      news.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = $('input[type="email"]', news);
        if (!email.value.trim() || !email.checkValidity()) {
          newsStatus.textContent = 'That address does not look right.';
          email.focus();
          return;
        }
        news.reset();
        newsStatus.textContent = 'You are on the list. Notes from the build, every other week.';
      });
    }
  }

  /* ------------------------------------------------------------------
     In-page section spy
     ------------------------------------------------------------------ */
  function initSectionSpy() {
    var links = $$('[data-spy] a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) map[target.id] = link;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        if (map[entry.target.id]) map[entry.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  function initYear() {
    var el = $('[data-year]');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function boot() {
    initLenis();
    initHeader();
    initSplit();
    initReveal();
    initMarquee();
    initMenu();
    initMagnetic();
    initTilt();
    initCursor();
    initFilters();
    initScopeToggle();
    initAvailability();
    initForms();
    initSectionSpy();
    initTransitions();
    initYear();

    measure();
    requestAnimationFrame(frame);

    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('load', measure);
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
