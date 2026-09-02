/**
 * Main JavaScript File for Purity M. Omariba Portfolio
 * Handles mobile navigation, active links, and form UX.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFormHandler();
});

/**
 * Mobile Navigation Toggle logic
 */
function initMobileNav() {
  const navbar = document.querySelector('.navbar');
  const navContainer = document.querySelector('.nav-container');

  if (!navContainer) return;

  // Create mobile menu toggle button dynamically if not in HTML
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'nav-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
  toggleBtn.innerHTML = '<span></span><span></span><span></span>';
  
  navContainer.appendChild(toggleBtn);

  const navLinks = document.querySelector('.nav-links');

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    toggleBtn.classList.toggle('active');
  });

  // Close mobile menu on link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        toggleBtn.classList.remove('active');
      });
    });
  }
}

/**
 * Enhances contact form submission UX
 */
function initFormHandler() {
  const contactForm = document.querySelector('.contact-form-card form');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Opening Email Client...';
      setTimeout(() => {
        submitBtn.textContent = 'Submit Inquiry';
      }, 3000);
    }
  });
}