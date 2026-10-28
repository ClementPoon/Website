/* Clement Poon — Photography
   Small enhancements. Without JavaScript every photo link still opens the full-size image,
   and the form still posts to Web3Forms. */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- Header: see-through while the cover is behind it ---- */
  var head = document.querySelector(".site-head");
  var hero = document.querySelector(".hero");
  if (head && hero) {
    var ticking = false;
    var update = function () {
      ticking = false;
      head.classList.toggle("is-top", window.scrollY < hero.offsetHeight - head.offsetHeight - 24);
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---- Underline the menu item for the section on screen ---- */
  var navLinks = document.querySelectorAll(".nav a[href^='#']");
  if ("IntersectionObserver" in window && navLinks.length) {
    var byId = {};
    Array.prototype.forEach.call(navLinks, function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var a = byId[en.target.id] || null;
        if (a === current) return;
        if (current) current.removeAttribute("aria-current");
        if (a) a.setAttribute("aria-current", "true");
        current = a;
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).concat(["top"]).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---- Photo viewer: full screen, with previous / next, arrow keys, and swipe ---- */
  var dlg = document.querySelector(".viewer");
  if (dlg && typeof dlg.showModal === "function") {
    var img = dlg.querySelector(".viewer__img");
    var blank = img.getAttribute("src");
    var titleEl = dlg.querySelector(".viewer__title");
    var metaEl = dlg.querySelector(".viewer__meta");
    var countEl = dlg.querySelector(".viewer__count");
    var prevBtn = dlg.querySelector(".viewer__prev");
    var nextBtn = dlg.querySelector(".viewer__next");
    var stage = dlg.querySelector(".viewer__stage");
    var list = [], index = 0, opener = null;

    var text = function (fig, sel) {
      var el = fig && fig.querySelector(sel);
      return el ? el.textContent.trim() : "";
    };
    var preload = function (i) {
      var a = list[(i + list.length) % list.length];
      if (a) { var p = new Image(); p.src = a.getAttribute("href"); }
    };
    var show = function (i) {
      if (!list.length) return;
      index = (i + list.length) % list.length;
      var a = list[index];
      var fig = a.closest("figure");
      var thumb = a.querySelector("img");
      img.classList.add("is-loading");
      img.onload = img.onerror = function () { img.classList.remove("is-loading"); };
      img.src = a.getAttribute("href");
      img.alt = thumb ? thumb.alt : "";
      titleEl.textContent = text(fig, ".shot__title");
      metaEl.textContent = text(fig, ".shot__meta");
      var many = list.length > 1;
      countEl.textContent = many ? (index + 1) + " / " + list.length : "";
      prevBtn.hidden = nextBtn.hidden = !many;
      if (many) { preload(index + 1); preload(index - 1); }
    };

    document.addEventListener("click", function (ev) {
      var a = ev.target.closest ? ev.target.closest("a.shot__img") : null;
      if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;   // let "open in new tab" through
      ev.preventDefault();
      var grid = a.closest(".grid") || document;
      list = Array.prototype.slice.call(grid.querySelectorAll("a.shot__img"));
      opener = a;
      show(list.indexOf(a));
      root.classList.add("viewer-open");
      dlg.showModal();
    });

    prevBtn.addEventListener("click", function () { show(index - 1); });
    nextBtn.addEventListener("click", function () { show(index + 1); });
    dlg.querySelector(".viewer__close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowLeft") { ev.preventDefault(); show(index - 1); }
      else if (ev.key === "ArrowRight") { ev.preventDefault(); show(index + 1); }
    });

    // swipe left / right on touch screens; a tap on the dark area closes
    var startX = null, startY = null, swiped = false;
    stage.addEventListener("pointerdown", function (ev) { startX = ev.clientX; startY = ev.clientY; swiped = false; });
    stage.addEventListener("pointerup", function (ev) {
      if (startX === null) return;
      var dx = ev.clientX - startX, dy = ev.clientY - startY;
      startX = startY = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && list.length > 1) { swiped = true; show(index + (dx < 0 ? 1 : -1)); }
    });
    dlg.addEventListener("click", function (ev) {
      if (swiped) { swiped = false; return; }
      if (ev.target === dlg || ev.target === stage) dlg.close();
    });

    dlg.addEventListener("close", function () {
      root.classList.remove("viewer-open");
      img.src = blank;
      if (opener) opener.focus({ preventScroll: true });
    });
  }

  /* ---- Contact form → Web3Forms ---- */
  var form = document.getElementById("contact-form");
  if (form && window.fetch) {
    var statusEl = form.querySelector(".form__status");
    var submitBtn = form.querySelector("button[type=submit]");
    var setStatus = function (msg, state) {
      statusEl.textContent = msg;
      if (state) statusEl.setAttribute("data-state", state); else statusEl.removeAttribute("data-state");
    };
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = typeof v === "string" ? v.trim() : v; });
      if (data.botcheck) { form.reset(); setStatus("Thanks! Your message was sent.", "ok"); return; }   // spam trap
      delete data.botcheck;
      submitBtn.disabled = true;
      setStatus("Sending…");
      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (json) {
          if (!res.ok || json.success === false) throw new Error(json.message || "Request failed");
        });
      }).then(function () {
        form.reset();
        setStatus("Thanks! Your message was sent. I'll get back to you soon.", "ok");
      }).catch(function () {
        setStatus("Sorry, that didn't go through. Please email me at ClementP@utexas.edu.", "err");
      }).then(function () {
        submitBtn.disabled = false;
      });
    });
  }
})();
