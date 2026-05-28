/* ============================================================
   David Žalmánek – Mobilní masáže
   Vanilla JS: sticky nav, hamburger menu, smooth scroll
   ============================================================ */
(function () {
  'use strict';

  var navHeader = document.getElementById('nav-header');
  var navToggle = document.getElementById('nav-toggle');
  var navMenu   = document.getElementById('nav-menu');

  /* ── Sticky nav – přidá třídu .scrolled po odrolování ── */
  function onScroll() {
    if (window.scrollY > 50) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // inicializace při načtení stránky

  /* ── Hamburger menu ── */
  function openMenu() {
    navMenu.classList.add('open');
    navToggle.classList.add('open');
    navHeader.classList.add('menu-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Zavřít navigaci');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navHeader.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Otevřít navigaci');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* ── Zavřít menu kliknutím na odkaz ── */
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ── Zavřít menu klávesou Escape ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  /* ── Zavřít menu kliknutím mimo (overlay) ── */
  navMenu.addEventListener('click', function (e) {
    if (e.target === navMenu) {
      closeMenu();
    }
  });

  /* ── Aktivní odkaz podle sekce (IntersectionObserver) ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = navMenu.querySelectorAll('a.nav-link:not(.nav-cta)');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === '#' + id) {
              link.setAttribute('aria-current', 'true');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, {
      rootMargin: '-40% 0px -55% 0px'
    });

    sections.forEach(function (sec) { observer.observe(sec); });
  }

})();
