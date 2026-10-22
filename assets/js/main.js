/* Clement Poon — portfolio datasheet
   Small progressive enhancements. Every link and section still works with JavaScript off. */
(function () {
  "use strict";
  var root = document.documentElement;
  var each = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };

  /* ---- Light / dark toggle (remembers the visitor's choice) ---- */
  var KEY = "cp-theme";
  var toggle = document.querySelector("[data-theme-toggle]");
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function effectiveTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") return t;
    return mq && mq.matches ? "dark" : "light";
  }
  function syncToggle() {
    if (!toggle) return;
    var dark = effectiveTheme() === "dark";
    var label = dark ? "Switch to light theme" : "Switch to dark theme";
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* storage unavailable: fine */ }
      syncToggle();
    });
  }
  if (mq) {
    if (mq.addEventListener) mq.addEventListener("change", syncToggle);
    else if (mq.addListener) mq.addListener(syncToggle);
  }
  syncToggle();

  /* ---- Underline the tab for the section on screen ---- */
  var tabs = document.querySelectorAll(".tabs a.tab[href^='#']");
  if ("IntersectionObserver" in window && tabs.length) {
    var byId = {};
    Array.prototype.forEach.call(tabs, function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var current = null;
    var setCurrent = function (a) {
      if (a === current) return;
      if (current) current.removeAttribute("aria-current");
      if (a) a.setAttribute("aria-current", "true");
      current = a;
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        setCurrent(byId[en.target.id] || null);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(byId).concat(["top"]).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---- YouTube: load the player only when someone clicks play ---- */
  each("[data-youtube]", function (box) {
    var link = box.querySelector("a");
    var img = box.querySelector("img");
    if (img) {
      var drop = function () { if (img.parentNode) img.parentNode.removeChild(img); };
      img.addEventListener("error", drop);
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("loading") !== "lazy") drop();
    }
    if (!link) return;
    link.addEventListener("click", function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return; // let "open in new tab" through
      ev.preventDefault();
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(box.getAttribute("data-youtube")) + "?autoplay=1&rel=0";
      frame.title = box.getAttribute("data-title") || "YouTube video";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      box.innerHTML = "";
      box.appendChild(frame);
    });
  });

  /* ---- Photo viewer ---- */
  var dlg = document.querySelector(".lightbox");
  if (dlg && typeof dlg.showModal === "function") {
    var dImg = dlg.querySelector("img");
    var dCap = dlg.querySelector("figcaption");
    document.addEventListener("click", function (ev) {
      var a = ev.target.closest ? ev.target.closest("a.zoom") : null;
      if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
      ev.preventDefault();
      var thumb = a.querySelector("img");
      dImg.src = a.getAttribute("href");
      dImg.alt = thumb ? thumb.alt : "";
      dCap.textContent = a.getAttribute("data-caption") || "";
      dlg.showModal();
    });
    dlg.addEventListener("click", function (ev) {
      if (ev.target === dlg || (ev.target.closest && ev.target.closest("[data-close]"))) dlg.close();
    });
    var blank = dImg.getAttribute("src");
    dlg.addEventListener("close", function () { dImg.src = blank; });
  }

  /* ---- Copy-email buttons ---- */
  if (navigator.clipboard && window.isSecureContext) {
    each("[data-copy]", function (btn) {
      btn.hidden = false;
      btn.addEventListener("click", function () {
        var label = btn.textContent;
        navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
          btn.textContent = "Copied";
          setTimeout(function () { btn.textContent = label; }, 1600);
        }, function () { /* clipboard blocked: the mailto link still works */ });
      });
    });
  }

  /* ---- Printing: expand the collapsed notes so nothing is hidden on paper ---- */
  window.addEventListener("beforeprint", function () {
    each("details:not([open])", function (d) { d.setAttribute("open", ""); d.setAttribute("data-print-open", ""); });
  });
  window.addEventListener("afterprint", function () {
    each("details[data-print-open]", function (d) { d.removeAttribute("open"); d.removeAttribute("data-print-open"); });
  });
})();
