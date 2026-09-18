/* Clement Chang — site behaviour.
   Everything degrades gracefully: without JS the page is fully readable. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- current year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- nav shadow on scroll ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- reveal on scroll ---- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ---- self-healing topology ----
     A service degrades at random; the agent sends a probe out to it and the
     service recovers. Loops forever, pauses when the panel is off-screen. */
  var panel = document.querySelector('.panel');

  function startMesh() {
    var svg = panel.querySelector('.mesh');
    var nodes = Array.prototype.slice.call(svg.querySelectorAll('.node'));
    var probe = svg.querySelector('.mesh__probe');
    var tally = panel.querySelector('.tally');
    if (!nodes.length || !probe) return;

    var AGENT = { x: 180, y: 150 };
    var healed = 0;
    var last = -1;
    var timer = null;
    var running = false;

    function pick() {
      var i;
      do { i = Math.floor(Math.random() * nodes.length); } while (nodes.length > 1 && i === last);
      last = i;
      return nodes[i];
    }

    function cycle() {
      var node = pick();
      var x = parseFloat(node.getAttribute('data-x'));
      var y = parseFloat(node.getAttribute('data-y'));

      node.classList.add('is-degraded');

      // agent notices, then dispatches
      timer = setTimeout(function () {
        probe.classList.add('is-running');
        probe.style.transform = 'translate(' + AGENT.x + 'px,' + AGENT.y + 'px)';

        var trip = probe.animate(
          [
            { transform: 'translate(' + AGENT.x + 'px,' + AGENT.y + 'px)' },
            { transform: 'translate(' + x + 'px,' + y + 'px)' }
          ],
          { duration: 780, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }
        );

        trip.onfinish = function () {
          probe.classList.remove('is-running');
          node.classList.remove('is-degraded');
          node.classList.add('is-healed');

          healed += 1;
          if (tally) tally.textContent = healed;

          timer = setTimeout(function () {
            node.classList.remove('is-healed');
            timer = setTimeout(cycle, 900 + Math.random() * 900);
          }, 900);
        };
      }, 1100);
    }

    function start() {
      if (running) return;
      running = true;
      panel.classList.add('is-live');
      timer = setTimeout(cycle, 900);
    }

    function stop() {
      running = false;
      clearTimeout(timer);
    }

    if (reduced) {
      // a composed still: one service degraded, nothing moving
      panel.classList.add('is-live');
      nodes[2].classList.add('is-degraded');
      if (tally) tally.textContent = '\u2014';
      return;
    }

    if (!('IntersectionObserver' in window) || !probe.animate) { start(); return; }

    var vis = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) start(); else stop();
      });
    }, { threshold: 0.2 });
    vis.observe(panel);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (panel.getBoundingClientRect().top < window.innerHeight) start();
    });
  }

  if (panel) startMesh();

  /* ---- active section in nav ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();
