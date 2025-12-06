// Debug script to test smooth scroll function
// Run this in browser console or as a standalone test

console.log('=== Scroll Debug Test ===');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runTests);
} else {
  runTests();
}

function runTests() {
  console.log('DOM Ready, running tests...');

  // Test 1: Check if sections exist
  console.log('\n--- Test 1: Section IDs ---');
  const sections = ['hero', 'services', 'portfolio', 'pricing', 'faq', 'contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    console.log(`#${id}:`, el ? '✓ Found' : '✗ Missing');
  });

  // Test 2: Check if navigation links exist
  console.log('\n--- Test 2: Navigation Links ---');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  console.log(`Found ${navLinks.length} navigation links`);
  navLinks.forEach((link, i) => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    console.log(`${i + 1}. ${href}:`, target ? '✓ Target exists' : '✗ Target missing');
  });

  // Test 3: Check if event listeners are attached
  console.log('\n--- Test 3: Event Listeners ---');
  const allAnchors = document.querySelectorAll('a[href^="#"]');
  console.log(`Total anchor links: ${allAnchors.length}`);

  // Test 4: Manual click test
  console.log('\n--- Test 4: Manual Click Test ---');
  console.log('Attaching test click handlers...');

  allAnchors.forEach((anchor, i) => {
    const href = anchor.getAttribute('href');
    anchor.addEventListener('click', function(e) {
      console.log(`\nClick detected on link ${i + 1}:`);
      console.log('  href:', href);
      console.log('  Event:', e);
      console.log('  Default prevented:', e.defaultPrevented);

      const target = document.querySelector(href);
      console.log('  Target found:', !!target);

      if (target) {
        console.log('  Target position:', target.getBoundingClientRect().top + window.scrollY);
      }
    }, { capture: true });
  });

  // Test 5: Check header element
  console.log('\n--- Test 5: Header Element ---');
  const header = document.getElementById('header');
  console.log('Header found:', !!header);
  if (header) {
    console.log('Header height:', header.offsetHeight);
    console.log('Header position:', getComputedStyle(header).position);
  }

  // Test 6: Check if main.js initialized
  console.log('\n--- Test 6: Script Initialization ---');
  console.log('Look for "LandingPro initialized successfully!" message above');

  console.log('\n=== Tests Complete ===');
  console.log('Click on "Dịch vụ" or "Portfolio" links and watch console output');
}
