/* ==========================================================================
   Vicky Kumar — portfolio
   Vanilla JS, no dependencies, no build step.
   Everything here is progressive enhancement: with JS disabled the page still
   renders every section, the nav still works via anchors, and the resume and
   project links still resolve.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- theme ---------- */
  var STORAGE_KEY = "portfolio.theme";
  var toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(theme === "light"));
      toggle.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f7f9fc" : "#0b1020");
  }

  function storedTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null; /* private mode / storage blocked */
    }
  }

  var initial = storedTheme();
  if (initial !== "light" && initial !== "dark") {
    initial =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
  }
  applyTheme(initial);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        /* non-fatal: the theme just will not persist */
      }
    });
  }

  /* ---------- mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });

    /* close after tapping a link, so the menu is not left covering the section */
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    /* a resize past the breakpoint leaves the drawer state stale */
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) closeNav();
    });
  }

  /* ---------- role typewriter ---------- */
  var roleEl = document.querySelector(".role-static");
  var ROLES = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Problem Solver"
  ];
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (roleEl && !reduceMotion) {
    var roleIndex = 0;
    var charIndex = ROLES[0].length;
    var deleting = false;

    var tick = function () {
      var current = ROLES[roleIndex];
      charIndex += deleting ? -1 : 1;
      roleEl.textContent = current.slice(0, charIndex);

      var delay = deleting ? 45 : 85;

      if (!deleting && charIndex === current.length) {
        deleting = true;
        delay = 1600; /* hold the full word before deleting */
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        delay = 350;
      }
      window.setTimeout(tick, delay);
    };

    /* start from the full first role, then delete into the loop */
    window.setTimeout(function () {
      deleting = true;
      tick();
    }, 1800);
  }

  /* ---------- animate skill meters when they scroll into view ---------- */
  var fills = document.querySelectorAll(".meter-fill");

  function fillMeters() {
    for (var i = 0; i < fills.length; i++) {
      var el = fills[i];
      el.style.width = (el.getAttribute("data-value") || "0") + "%";
    }
  }

  if (!fills.length) {
    /* nothing to do */
  } else if (reduceMotion || !("IntersectionObserver" in window)) {
    fillMeters();
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fillMeters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(fills[0].closest(".skills-grid") || fills[0]);
  }

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
