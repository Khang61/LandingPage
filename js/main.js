// ============================================
// Main JavaScript - Core Functionality
// ============================================

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    headerScrollThreshold: 50,
    mobileBreakpoint: 768
  };

  // DOM Elements (will be set in init)
  let header, menuToggle, navMenu, faqItems, contactForm;

  // ============================================
  // Sticky Header with Shrink Effect
  // ============================================
  function initStickyHeader() {
    if (!header) return;

    let lastScrollY = 0;
    let scrollDelta = 0;
    let ticking = false;
    const hideThreshold = 20;
    const showThreshold = 100;

    function updateHeader() {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Accumulate scroll delta
      scrollDelta += scrollDiff;

      // Hide when scrolling down 20px
      if (scrollDelta > hideThreshold) {
        header.classList.add('header--hidden');
        scrollDelta = 0;
      }
      // Show when scrolling up 50px
      else if (scrollDelta < -showThreshold) {
        header.classList.remove('header--hidden');
        scrollDelta = 0;
      }

      // Reset delta when at top
      if (currentScrollY <= 0) {
        header.classList.remove('header--hidden');
        scrollDelta = 0;
      }

      // Sticky state
      if (currentScrollY > CONFIG.headerScrollThreshold) {
        header.classList.add('header--sticky');
      } else {
        header.classList.remove('header--sticky');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  function initMobileMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // Close Mobile Menu Helper
  // ============================================
  function closeMobileMenu() {
    if (navMenu && menuToggle) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ============================================
  // Force Show Animated Elements in Section
  // ============================================
  function forceShowSection(section) {
    if (!section) return;

    // Find all animate elements in and around the section
    const animateElements = section.querySelectorAll('.animate');
    animateElements.forEach(el => {
      el.classList.add('in-view');
    });

    // Also check section header
    const sectionHeader = section.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.querySelectorAll('.animate').forEach(el => {
        el.classList.add('in-view');
      });
    }
  }

  // ============================================
  // Smooth Scroll for Anchor Links (Event Delegation)
  // ============================================
  function initSmoothScroll() {
    // Use event delegation on document level
    document.addEventListener('click', function(e) {
      // Find closest anchor element
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      // Prevent default anchor behavior
      e.preventDefault();
      e.stopPropagation();

      // Close mobile menu first
      closeMobileMenu();

      // Force show animated elements in target section
      forceShowSection(target);

      // Calculate scroll position
      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    });
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  function initFAQ() {
    if (!faqItems || faqItems.length === 0) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // ============================================
  // Contact Form Handling
  // ============================================
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;

      // Add loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Đang gửi...';

      // Collect form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Simulate form submission (replace with actual API call)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h.');
        contactForm.reset();
      } catch (error) {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
      }
    });
  }

  // ============================================
  // Active Navigation Link
  // ============================================
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections || sections.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // ============================================
  // Counter Animation
  // ============================================
  function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters || counters.length === 0) return;

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (isNaN(target)) return;

      const duration = 2000;
      const start = 0;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        counter.textContent = current + (counter.getAttribute('data-suffix') || '');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    // Observe counters
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // ============================================
  // Initialize All Functions
  // ============================================
  function init() {
    // Query DOM elements after DOM is ready
    header = document.getElementById('header');
    menuToggle = document.querySelector('.menu-toggle');
    navMenu = document.querySelector('.nav-menu');
    faqItems = document.querySelectorAll('.faq-item');
    contactForm = document.getElementById('contactForm');

    // Initialize all features
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initContactForm();
    initActiveNavLink();
    initCounterAnimation();

    console.log('LandingPro initialized successfully!');
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
