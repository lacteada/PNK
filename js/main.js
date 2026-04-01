// PNK Real Estate – main.js
(function () {
  'use strict';

  /* ── Navbar scroll effect ─────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Mobile nav toggle ────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active nav link (based on current page) ─────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Search tabs ──────────────────────────────────────── */
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ── Favourite toggle ─────────────────────────────────── */
  document.querySelectorAll('.card-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      btn.setAttribute('aria-pressed', btn.classList.contains('active'));
    });
  });

  /* ── Gallery thumbnails (property detail) ─────────────── */
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImg = document.querySelector('.gallery-main img');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg) {
        mainImg.src = thumb.querySelector('img').src;
        mainImg.alt = thumb.querySelector('img').alt;
      }
    });
  });

  /* ── View toggle (grid / list) ────────────────────────── */
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.querySelector('.property-grid');
      if (grid) {
        grid.style.gridTemplateColumns =
          btn.dataset.view === 'list' ? '1fr' : '';
      }
    });
  });

  /* ── Back to top ──────────────────────────────────────── */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Newsletter form (demo) ───────────────────────────── */
  const nlForm = document.querySelector('.newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nlForm.querySelector('.newsletter-input');
      if (input && input.value) {
        alert('Thank you for subscribing!');
        input.value = '';
      }
    });
  }

  /* ── Contact form (demo) ──────────────────────────────── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your message has been sent! An agent will contact you shortly.');
    });
  }

  /* ── Animate numbers (stats) ──────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  }

  /* IntersectionObserver for stats section */
  const statsSection = document.querySelector('.stats-banner');
  if (statsSection && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(statsSection);
  }

})();
