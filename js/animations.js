// ============================================
// Animations - Scroll Reveal & Interactions
// ============================================

(function() {
  'use strict';

  // ============================================
  // Intersection Observer for Scroll Animations
  // ============================================
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with .animate class
    document.querySelectorAll('.animate').forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // Staggered Grid Animations
  // ============================================
  function initStaggeredAnimations() {
    const grids = document.querySelectorAll('.values-grid, .services-grid, .portfolio-grid, .pricing-grid, .testimonials-grid');

    grids.forEach(grid => {
      const items = grid.children;
      Array.from(items).forEach((item, index) => {
        item.classList.add('animate', 'fade-in-up', `delay-${(index % 6) + 1}`);
      });
    });
  }

  // ============================================
  // Parallax Effect (Simple)
  // ============================================
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        const yPos = -(scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    }, { passive: true });
  }

  // ============================================
  // Image Lazy Loading
  // ============================================
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.classList.add('loaded');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    images.forEach(img => {
      img.classList.add('img-reveal');
      imageObserver.observe(img);
    });
  }

  // ============================================
  // Hover Tilt Effect (Cards)
  // ============================================
  function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ============================================
  // Typing Effect for Hero (Optional)
  // ============================================
  function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;

    const text = typingElement.getAttribute('data-text');
    const speed = 100;
    let i = 0;

    typingElement.textContent = '';

    function type() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        type();
        observer.disconnect();
      }
    });

    observer.observe(typingElement);
  }

  // ============================================
  // Scroll Progress Indicator
  // ============================================
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    }, { passive: true });
  }

  // ============================================
  // Number Counter with Intersection Observer
  // ============================================
  function initNumberCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);

            counter.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ============================================
  // Smooth Reveal for Sections
  // ============================================
  function initSectionReveal() {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
      const header = section.querySelector('.section-header');
      if (header) {
        header.classList.add('animate', 'fade-in');
      }
    });
  }

  // ============================================
  // Initialize All Animations
  // ============================================
  function init() {
    // IMPORTANT: Add animate classes BEFORE setting up observer
    initStaggeredAnimations();
    initSectionReveal();

    // Now set up observer for all animate elements
    initScrollAnimations();

    // Other initializations
    initLazyLoading();
    initNumberCounters();

    // Optional effects (can be resource intensive)
    if (window.matchMedia('(min-width: 1024px)').matches) {
      initTiltEffect();
    }
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
