/* =============================================
   SURAJ KUMAR GIRI — PORTFOLIO MAIN.JS
   ============================================= */

// ── Theme Toggle ──
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = btn ? btn.querySelector('i') : null;

  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateIcon(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const curr = html.getAttribute('data-theme');
      const next = curr === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon(next);
    });
  }

  function updateIcon(theme) {
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
})();

// ── Mobile Nav ──
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();

// ── Scroll-based Fade In ──
(function () {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay for grid items
          const delay = (entry.target.dataset.delay || 0) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Add stagger delays to grid children
  document.querySelectorAll(
    '.services-grid, .projects-grid, .deliveries-grid, .skills-grid, .edu-grid, .achievements-row'
  ).forEach(grid => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => {
      el.dataset.delay = i;
    });
  });

  elements.forEach(el => observer.observe(el));
})();

// ── Typed Text Effect ──
(function () {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Python Developer',
    'Automation Expert',
    'Web Scraping Pro',
    'Flask / Django Dev',
    'Freelance Engineer',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pause = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        pause = true;
        setTimeout(() => { pause = false; deleting = true; tick(); }, 2000);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    tick();
  }

  function tick() {
    if (pause) return;
    const speed = deleting ? 40 : 80;
    setTimeout(type, speed);
  }

  tick();
})();

// ── Active Nav Link Highlighting ──
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();

// ── Navbar scroll shadow ──
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
})();

// ── Smooth count-up for stat numbers ──
(function () {
  const statNums = document.querySelectorAll('.stat-num, .achievement-val');
  if (!statNums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');
        if (isNaN(num)) return;

        let start = 0;
        const duration = 1200;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = (num < 10 ? (eased * num).toFixed(1) : Math.round(eased * num)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = text; // restore exact text
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
})();
