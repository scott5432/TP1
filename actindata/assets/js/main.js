/* ActInData — interactions du site */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Année du footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header au scroll ---------- */
  var header = document.getElementById("header");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Lien actif dans la navigation ---------- */
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]:not(.btn)') : [];
  if ("IntersectionObserver" in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.toggle("is-current", l.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (l) {
      var s = document.querySelector(l.getAttribute("href"));
      if (s) spy.observe(s);
    });
  }

  /* ---------- Apparition au scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Texte animé du hero ---------- */
  var typed = document.getElementById("typed");
  if (typed && !reduceMotion) {
    var words = ["l'action", "la décision", "la performance", "l'innovation"];
    var w = 0, c = words[0].length, deleting = true;
    setTimeout(function tick() {
      var word = words[w];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      var delay = deleting ? 45 : 85;
      if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; word = words[w]; delay = 300; }
      else if (!deleting && c === word.length) { deleting = true; delay = 2200; }
      setTimeout(tick, delay);
    }, 2600);
  }

  /* ---------- Onglets cas d'usage ---------- */
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      document.querySelectorAll(".panel").forEach(function (p) { p.classList.remove("is-active"); p.hidden = true; });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      var panel = document.getElementById(tab.dataset.tab);
      if (panel) { panel.hidden = false; panel.classList.add("is-active"); }
    });
  });

  /* ---------- Formulaire de contact ----------
     Sans back-end : ouvre le client e-mail avec le message pré-rempli.
     Pour un envoi direct, remplacez par un service type Formspree / Netlify Forms. */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        var ok = f.type === "checkbox" ? f.checked : f.value.trim() !== "" && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.classList.toggle("is-invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        status.textContent = "Merci de compléter les champs obligatoires.";
        status.className = "form__status err";
        return;
      }
      var d = new FormData(form);
      var body =
        "Nom : " + d.get("nom") + "\n" +
        "Entreprise : " + (d.get("entreprise") || "-") + "\n" +
        "E-mail : " + d.get("email") + "\n" +
        "Téléphone : " + (d.get("telephone") || "-") + "\n" +
        "Besoin : " + d.get("besoin") + "\n\n" + d.get("message");
      window.location.href = "mailto:contact@actindata.com?subject=" +
        encodeURIComponent("Demande de contact — " + d.get("besoin")) + "&body=" + encodeURIComponent(body);
      status.textContent = "Merci ! Votre messagerie va s'ouvrir pour finaliser l'envoi.";
      status.className = "form__status ok";
      form.reset();
    });
  }

  /* ---------- Réseau de données animé (canvas du hero) ---------- */
  var canvas = document.getElementById("network");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var pts = [], W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, (W * H) / 16000));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .8 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, dist = dx * dx + dy * dy;
          if (dist < 15000) {
            ctx.strokeStyle = "rgba(120,160,255," + (1 - dist / 15000) * .35 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = i % 3 ? "#22D3EE" : "#8B5CF6";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduceMotion) requestAnimationFrame(draw);
    }
    resize(); draw();
    var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () { resize(); if (reduceMotion) draw(); }, 200); });
  }
})();
