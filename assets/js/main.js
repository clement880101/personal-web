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

  /* ---- generative flow field ----
     Particles drift through a slowly evolving vector field and leave fading
     trails. Decorative only: the canvas is aria-hidden and the page loses
     nothing without it. */
  var field = document.querySelector('.field');

  function startField() {
    var canvas = field.querySelector('.field__canvas');
    var ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;

    var INK = '8,9,10';
    var w = 0, h = 0, dpr = 1;
    var particles = [];
    var t = 0;
    var vel = { x: 0, y: 0 };
    var raf = null;
    var running = false;

    function resize() {
      var rect = field.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = 'rgb(' + INK + ')';
      ctx.fillRect(0, 0, w, h);

      seed();
      return true;
    }

    function spawn() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        life: 0,
        max: 140 + Math.random() * 260,
        speed: 0.34 + Math.random() * 0.72,
        weight: Math.random() < 0.22 ? 1.9 : 1.1,
        warm: Math.random() < 0.22
      };
    }

    function seed() {
      var area = w * h;
      var count = Math.round(Math.min(430, Math.max(150, area / 560)));
      particles = [];
      for (var i = 0; i < count; i++) {
        var p = spawn();
        p.life = Math.random() * p.max;   // stagger so nothing pulses in unison
        particles.push(p);
      }
    }

    // A scalar potential built from layered sines. Taking its perpendicular
    // gradient (the curl) gives a divergence-free field, so the flow
    // circulates inside the frame instead of sweeping everything into one
    // corner and leaving the rest bare.
    function potential(x, y, time) {
      var s = 0.0041;
      return (
        Math.sin(x * s + time * 0.19) * Math.cos(y * s * 1.12 - time * 0.15) +
        Math.sin((x + y) * s * 0.58 + time * 0.11) * 0.62 +
        Math.cos((x - y) * s * 0.77 - time * 0.08) * 0.44
      );
    }

    var EPS = 1.2;
    function velocityAt(x, y, time, out) {
      var dpdy = (potential(x, y + EPS, time) - potential(x, y - EPS, time)) / (2 * EPS);
      var dpdx = (potential(x + EPS, y, time) - potential(x - EPS, y, time)) / (2 * EPS);
      var vx = dpdy, vy = -dpdx;
      var m = Math.sqrt(vx * vx + vy * vy) || 1;
      out.x = vx / m;
      out.y = vy / m;
    }

    function step(dt) {
      t += dt;

      // fade the previous frame instead of clearing: this is what makes trails
      ctx.fillStyle = 'rgba(' + INK + ',0.020)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        velocityAt(p.x, p.y, t, vel);
        var nx = p.x + vel.x * p.speed * 2.1;
        var ny = p.y + vel.y * p.speed * 2.1;

        // fade in and out over the particle's life so nothing pops
        var k = p.life / p.max;
        var alpha = Math.sin(Math.min(k, 1) * Math.PI) * 0.95;

        ctx.strokeStyle = p.warm
          ? 'rgba(255,196,128,' + (alpha * 0.42).toFixed(3) + ')'
          : 'rgba(201,247,90,' + (alpha * 0.62).toFixed(3) + ')';
        ctx.lineWidth = p.weight;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        p.life += 1;

        if (p.life > p.max || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          particles[i] = spawn();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    }

    var lastTs = 0;
    function frame(ts) {
      if (!running) return;
      var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0.016;
      lastTs = ts;
      step(dt);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || !w) return;
      running = true;
      lastTs = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    if (!resize()) return;

    if (reduced) {
      // one composed still frame — the field without the motion
      for (var n = 0; n < 420; n++) step(0.016);
      return;
    }

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 220);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    if ('IntersectionObserver' in window) {
      var vis = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) start(); else stop();
        });
      }, { threshold: 0.05 });
      vis.observe(field);
    } else {
      start();
    }
  }

  if (field) startField();

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
