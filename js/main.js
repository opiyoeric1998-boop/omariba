/**
 * Main JavaScript File for Purity M. Omariba Portfolio
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

  // Use existing button in HTML or create one dynamically if missing
  let toggleBtn = document.getElementById('mobile-menu-toggle') || document.querySelector('.mobile-menu-toggle');

  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.id = 'mobile-menu-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle navigation');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    
    // Insert toggle button right before <nav>
    const navElement = navContainer.querySelector('nav') || navLinks;
    navContainer.insertBefore(toggleBtn, navElement);
  }

  // Toggle active class on click
  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when clicking any nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Enhances contact form submission UX
 */
function initFormHandler() {
  const contactForm = document.querySelector('.contact-form-card form') || document.querySelector('form');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
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