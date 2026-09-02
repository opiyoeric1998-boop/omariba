/**
 * Main JavaScript File for Portfolio
 * Handles mobile navigation toggle and form submission UX.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFormHandler();
});

/**
 * Mobile Navigation Toggle logic
 */
function initMobileNav() {
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.getElementById('nav-links') || document.querySelector('.nav-links');

  if (!navContainer || !navLinks) return;

  // Dynamically inject mobile backdrop overlay if not already present
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  // Use existing button in HTML or create one dynamically if missing
  let toggleBtn = document.getElementById('mobile-menu-toggle') || document.querySelector('.mobile-menu-toggle');

  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.id = 'mobile-menu-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle navigation');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    
    // Insert toggle button right before <nav> or navLinks
    const navElement = navContainer.querySelector('nav') || navLinks;
    navContainer.insertBefore(toggleBtn, navElement);
  }

  // Toggle open/close state
  const setMenuState = (isOpen) => {
    toggleBtn.classList.toggle('active', isOpen);
    navLinks.classList.toggle('active', isOpen);
    overlay.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  // Toggle active class on click
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !toggleBtn.classList.contains('active');
    setMenuState(isOpen);
  });

  // Close menu when clicking the overlay backdrop
  overlay.addEventListener('click', () => {
    setMenuState(false);
  });

  // Close menu on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      setMenuState(false);
    }
  });

  // Close mobile menu when clicking any nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });
}

/**
 * Enhances contact form submission UX
 */
function initFormHandler() {
  const contactForm = document.querySelector('.contact-form') || document.querySelector('form');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', () => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Opening Email Client...';
      setTimeout(() => {
        submitBtn.textContent = originalText;
      }, 3000);
    }
  });
}