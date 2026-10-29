/* Clement Poon — Photography
<<<<<<< HEAD
   The see-through header, the full-screen photo viewer (with zoom), the save deterrents,
   and the contact form (which still posts to Web3Forms without JavaScript). */
=======
   Small enhancements. Without JavaScript every photo link still opens the full-size image,
   and the form still posts to Web3Forms. */
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
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

<<<<<<< HEAD
  /* ---- Photo viewer: full screen, with previous / next, arrow keys, swipe, and zoom ----
     Zoom in by clicking the photo (double-tap on a phone), pinching, scrolling, the magnifier
     button, or the + / − / 0 keys. Once zoomed in, drag to look around. */
=======
  /* ---- Photo viewer: full screen, with previous / next, arrow keys, and swipe ---- */
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
  var dlg = document.querySelector(".viewer");
  if (dlg && typeof dlg.showModal === "function") {
    var img = dlg.querySelector(".viewer__img");
    var blank = img.getAttribute("src");
<<<<<<< HEAD
=======
    var titleEl = dlg.querySelector(".viewer__title");
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
    var metaEl = dlg.querySelector(".viewer__meta");
    var countEl = dlg.querySelector(".viewer__count");
    var prevBtn = dlg.querySelector(".viewer__prev");
    var nextBtn = dlg.querySelector(".viewer__next");
<<<<<<< HEAD
    var zoomBtn = dlg.querySelector(".viewer__zoom");
    var stage = dlg.querySelector(".viewer__stage");
    var list = [], index = 0, opener = null;

    /* -- zoom: the photo is drawn at `scale` times its fitted size, shifted by (tx, ty) -- */
    var scale = 1, tx = 0, ty = 0;
    var clamp = function (v, lo, hi) { return Math.min(Math.max(v, lo), hi); };
    var isZoomed = function () { return scale > 1.001; };
    var loading = function () { return img.classList.contains("is-loading"); };
    var fitted = function () {
      // the photo's box before zooming: it's fitted inside the frame's padding and centred there
      var f = stage.getBoundingClientRect(), cs = getComputedStyle(stage);
      var pl = parseFloat(cs.paddingLeft), pr = parseFloat(cs.paddingRight), pt = parseFloat(cs.paddingTop), pb = parseFloat(cs.paddingBottom);
      var cw = f.width - pl - pr, ch = f.height - pt - pb, nw = img.naturalWidth, nh = img.naturalHeight;
      var k = nw && nh ? Math.min(1, cw / nw, ch / nh) : 0;
      var w = k ? nw * k : img.offsetWidth, h = k ? nh * k : img.offsetHeight;
      return { cx: f.left + pl + cw / 2, cy: f.top + pt + ch / 2, w: w, h: h };
    };
    var levels = function (b) {
      var native = b.w ? img.naturalWidth / b.w : 0;   // at this scale, 1 photo pixel = 1 CSS pixel
      return {
        max: clamp(native, 4, 8),
        click: clamp(native / (window.devicePixelRatio || 1), 2, 4)   // about 100% (1 photo pixel per screen pixel)
      };
    };
    var keepInFrame = function (b) {
      // a zoomed photo bigger than the frame can't be dragged past its edges; one that fits stays centred
      var f = stage.getBoundingClientRect();
      var axis = function (t, c, size, lo, hi) {
        var a = lo - c + size / 2, z = hi - c - size / 2;
        return a <= z ? clamp(0, a, z) : clamp(t, z, a);
      };
      tx = axis(tx, b.cx, scale * b.w, f.left, f.right);
      ty = axis(ty, b.cy, scale * b.h, f.top, f.bottom);
    };
    var snapTimer = 0;
    var render = function (ease) {
      var on = isZoomed();
      img.classList.toggle("is-easing", ease === "slow");
      img.classList.toggle("is-easing-fast", ease === "fast");
      img.classList.remove("is-native");
      img.style.transform = on || tx || ty ? "translate(" + tx + "px, " + ty + "px) scale(" + scale + ")" : "";
      stage.classList.toggle("is-zoomed", on);
      zoomBtn.classList.toggle("is-on", on);
      zoomBtn.setAttribute("aria-label", on ? "Zoom out" : "Zoom in");
      clearTimeout(snapTimer);
      if (on) snapTimer = setTimeout(snap, ease === "slow" ? 380 : ease === "fast" ? 180 : 120);
    };
    // once the photo stops moving, line its edges up with whole screen pixels; at exactly 100%
    // (1 photo pixel per screen pixel) also turn off smoothing, so the screen shows the file's own pixels
    var snap = function () {
      var dpr = window.devicePixelRatio || 1, r = img.getBoundingClientRect();
      var fx = r.left * dpr - Math.round(r.left * dpr), fy = r.top * dpr - Math.round(r.top * dpr);
      if (Math.abs(fx) >= 0.01 || Math.abs(fy) >= 0.01) {
        tx -= fx / dpr; ty -= fy / dpr;
        render(false);
        clearTimeout(snapTimer);
      }
      img.classList.toggle("is-native", Math.abs(r.width * dpr - img.naturalWidth) < 0.5);
    };
    // zoom to s, keeping the spot under (x, y) where it is (no point given = the middle of the frame);
    // `loose` lets the photo follow a pinch freely, and settle() tidies it up when the fingers lift
    var zoomTo = function (s, x, y, ease, loose) {
      if (loading()) return;
      var b = fitted();
      if (x == null) { var f = stage.getBoundingClientRect(); x = f.left + f.width / 2; y = f.top + f.height / 2; }
      var s2 = clamp(s, 1, levels(b).max);
      if (s2 < 1.01) s2 = 1;
      tx = x - b.cx - s2 * (x - b.cx - tx) / scale;
      ty = y - b.cy - s2 * (y - b.cy - ty) / scale;
      scale = s2;
      if (!loose) keepInFrame(b);
      render(ease);
    };
    var settle = function () { keepInFrame(fitted()); render("slow"); };
    var toggleZoom = function (x, y) {
      zoomTo(isZoomed() ? 1 : levels(fitted()).click, x, y, "slow");
    };
    var panBy = function (dx, dy) {
      if (!isZoomed() || loading()) return;
      tx += dx; ty += dy;
      keepInFrame(fitted());
      render(false);
    };
    var resetZoom = function () { scale = 1; tx = ty = 0; render(false); };
    var overPhoto = function (x, y) {
      // the photo ignores the pointer (so it can't be right-clicked or dragged out), so hit-test its visible box
      var r = img.getBoundingClientRect(), f = stage.getBoundingClientRect();
      return x >= Math.max(r.left, f.left) && x <= Math.min(r.right, f.right) &&
             y >= Math.max(r.top, f.top) && y <= Math.min(r.bottom, f.bottom);
    };

=======
    var stage = dlg.querySelector(".viewer__stage");
    var list = [], index = 0, opener = null;

>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
    var text = function (fig, sel) {
      var el = fig && fig.querySelector(sel);
      return el ? el.textContent.trim() : "";
    };
    var preload = function (i) {
      var a = list[(i + list.length) % list.length];
<<<<<<< HEAD
      if (a) { var p = new Image(); p.src = a.getAttribute("data-full"); }
    };
    var show = function (i) {
      if (!list.length) return;
      resetZoom();
=======
      if (a) { var p = new Image(); p.src = a.getAttribute("href"); }
    };
    var show = function (i) {
      if (!list.length) return;
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
      index = (i + list.length) % list.length;
      var a = list[index];
      var fig = a.closest("figure");
      var thumb = a.querySelector("img");
      img.classList.add("is-loading");
      img.onload = img.onerror = function () { img.classList.remove("is-loading"); };
<<<<<<< HEAD
      img.src = a.getAttribute("data-full");
      img.alt = thumb ? thumb.alt : "";
=======
      img.src = a.getAttribute("href");
      img.alt = thumb ? thumb.alt : "";
      titleEl.textContent = text(fig, ".shot__title");
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
      metaEl.textContent = text(fig, ".shot__meta");
      var many = list.length > 1;
      countEl.textContent = many ? (index + 1) + " / " + list.length : "";
      prevBtn.hidden = nextBtn.hidden = !many;
      if (many) { preload(index + 1); preload(index - 1); }
    };

    document.addEventListener("click", function (ev) {
<<<<<<< HEAD
      var a = ev.target.closest ? ev.target.closest(".shot__img[data-full]") : null;
      if (!a) return;
      ev.preventDefault();
      var grid = a.closest(".grid") || document;
      list = Array.prototype.slice.call(grid.querySelectorAll(".shot__img[data-full]"));
=======
      var a = ev.target.closest ? ev.target.closest("a.shot__img") : null;
      if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;   // let "open in new tab" through
      ev.preventDefault();
      var grid = a.closest(".grid") || document;
      list = Array.prototype.slice.call(grid.querySelectorAll("a.shot__img"));
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
      opener = a;
      show(list.indexOf(a));
      root.classList.add("viewer-open");
      dlg.showModal();
    });

    prevBtn.addEventListener("click", function () { show(index - 1); });
    nextBtn.addEventListener("click", function () { show(index + 1); });
<<<<<<< HEAD
    zoomBtn.addEventListener("click", function () { toggleZoom(); });
    dlg.querySelector(".viewer__close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("keydown", function (ev) {
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;   // leave the browser's own shortcuts alone
      var k = ev.key;
      if (k === "ArrowLeft") { ev.preventDefault(); show(index - 1); }
      else if (k === "ArrowRight") { ev.preventDefault(); show(index + 1); }
      else if (k === "+" || k === "=") { ev.preventDefault(); zoomTo(scale * 1.6, null, null, "slow"); }
      else if (k === "-" || k === "_") { ev.preventDefault(); zoomTo(scale / 1.6, null, null, "slow"); }
      else if (k === "0") { ev.preventDefault(); zoomTo(1, null, null, "slow"); }
    });

    /* -- touch and mouse: drag around a zoomed photo, pinch to zoom, double-tap to zoom,
          swipe left / right for the next photo, tap the dark area to close -- */
    var pts = new Map(), pinch = null, gest = null, lastTap = null, skipClick = false, lastType = "mouse";
    var twoFingers = function () {
      var p = Array.from(pts.values());
      return { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2, d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1 };
    };
    var startPinch = function () { var c = twoFingers(); pinch = { x: c.x, y: c.y, d: c.d, s: scale }; };

    stage.addEventListener("pointerdown", function (ev) {
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      lastType = ev.pointerType; skipClick = false;
      pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      try { stage.setPointerCapture(ev.pointerId); } catch (e) { /* not important */ }
      if (pts.size === 1) gest = { x: ev.clientX, y: ev.clientY, moved: false, multi: false };
      else { if (gest) gest.multi = true; if (pts.size === 2) startPinch(); }
      stage.classList.toggle("is-panning", isZoomed() && pts.size === 1);
    });
    stage.addEventListener("pointermove", function (ev) {
      var p = pts.get(ev.pointerId);
      if (!p) {   // just hovering: magnifier cursor over the photo
        if (ev.pointerType !== "touch") stage.classList.toggle("on-photo", overPhoto(ev.clientX, ev.clientY));
        return;
      }
      var dx = ev.clientX - p.x, dy = ev.clientY - p.y;
      p.x = ev.clientX; p.y = ev.clientY;
      if (gest && !gest.moved && Math.hypot(ev.clientX - gest.x, ev.clientY - gest.y) > 8) gest.moved = true;
      if (loading()) return;
      if (pinch && pts.size >= 2) {
        var c = twoFingers();
        tx += c.x - pinch.x; ty += c.y - pinch.y;           // the photo follows the fingers…
        pinch.x = c.x; pinch.y = c.y;
        zoomTo(pinch.s * c.d / pinch.d, c.x, c.y, false, true);   // …and grows or shrinks around them
      } else if (pts.size === 1) {
        panBy(dx, dy);
      }
    });
    var endPointer = function (ev) {
      if (!pts.has(ev.pointerId)) return;
      pts.delete(ev.pointerId);
      if (pts.size >= 2) { startPinch(); return; }   // still pinching with the other fingers
      if (pinch) { pinch = null; settle(); }          // pinch over: ease back inside the frame
      if (pts.size === 1) return;                     // one finger left: it keeps dragging
      stage.classList.remove("is-panning");
      var g = gest; gest = null;
      if (!g || ev.type === "pointercancel") return;
      if (g.multi || g.moved) {
        skipClick = true;                             // a drag or a pinch isn't a click
        var dx = ev.clientX - g.x, dy = ev.clientY - g.y;
        if (!g.multi && !isZoomed() && list.length > 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          show(index + (dx < 0 ? 1 : -1));           // swipe
        }
        return;
      }
      if (ev.pointerType === "touch") {               // double-tap: zoom in there, or back out
        var now = Date.now();
        if (lastTap && now - lastTap.t < 350 && Math.hypot(ev.clientX - lastTap.x, ev.clientY - lastTap.y) < 40) {
          lastTap = null; skipClick = true;
          if (isZoomed() || overPhoto(ev.clientX, ev.clientY)) toggleZoom(ev.clientX, ev.clientY);
        } else {
          lastTap = { t: now, x: ev.clientX, y: ev.clientY };
        }
      }
    };
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);

    dlg.addEventListener("click", function (ev) {
      if (skipClick) { skipClick = false; return; }
      if (ev.target !== dlg && ev.target !== stage) return;   // the buttons handle their own clicks
      var on = overPhoto(ev.clientX, ev.clientY);
      if (lastType === "touch") {                              // phones: double-tap zooms (above);
        if (!on) { if (isZoomed()) toggleZoom(); else dlg.close(); }   // a tap beside the photo zooms out or closes
        return;
      }
      if (ev.detail > 1) return;                               // 2nd click of a double-click: already zoomed
      if (isZoomed() || on) toggleZoom(ev.clientX, ev.clientY);    // click the photo to zoom in, again to zoom out
      else dlg.close();                                        // click the dark area to close
    });

    // scroll wheel or trackpad pinch (it arrives as ctrl + wheel) zooms around the pointer
    var gesturing = false;
    stage.addEventListener("wheel", function (ev) {
      ev.preventDefault();
      if (gesturing) return;
      var unit = ev.deltaMode === 1 ? 16 : ev.deltaMode === 2 ? window.innerHeight : 1;
      var dx = ev.deltaX * unit, dy = ev.deltaY * unit;
      if (!ev.ctrlKey && Math.abs(dx) > Math.abs(dy)) { panBy(-dx, 0); return; }   // sideways scroll moves a zoomed photo
      var notch = !ev.ctrlKey && Math.abs(dy) >= 40;   // a mouse-wheel click (smooth it) rather than a trackpad
      zoomTo(scale * Math.exp(-dy * (ev.ctrlKey ? 0.01 : 0.0025)), ev.clientX, ev.clientY, notch ? "fast" : false);
    }, { passive: false });
    if ("GestureEvent" in window) {   // Safari on a Mac sends trackpad pinches as gesture events
      var gestureStart = 1;
      stage.addEventListener("gesturestart", function (ev) { ev.preventDefault(); gesturing = true; gestureStart = scale; });
      stage.addEventListener("gesturechange", function (ev) {
        ev.preventDefault();
        if (pts.size < 2) zoomTo(gestureStart * ev.scale, ev.clientX, ev.clientY, false, true);   // touch screens use the pinch code above
      });
      stage.addEventListener("gestureend", function (ev) {
        ev.preventDefault(); gesturing = false;
        if (pts.size < 2) settle();
      });
    }
    window.addEventListener("resize", function () {
      if (dlg.open && isZoomed()) { keepInFrame(fitted()); render(false); }
=======
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
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
    });

    dlg.addEventListener("close", function () {
      root.classList.remove("viewer-open");
<<<<<<< HEAD
      pts.clear(); pinch = gest = lastTap = null; gesturing = false;
      stage.classList.remove("is-panning", "on-photo");
      resetZoom();
=======
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
      img.src = blank;
      if (opener) opener.focus({ preventScroll: true });
    });
  }

<<<<<<< HEAD
  /* ---- Make the photos harder to save: no right-click or long-press menu, no dragging ---- */
  var PHOTO_AREAS = ".shot__img, .set-card, .hero__media, .viewer";
  document.addEventListener("contextmenu", function (ev) {
    if (ev.target.closest && ev.target.closest(PHOTO_AREAS)) ev.preventDefault();
  });
  document.addEventListener("dragstart", function (ev) {
    if (ev.target.tagName === "IMG") ev.preventDefault();
  });

=======
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
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
