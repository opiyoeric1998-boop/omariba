/**
 * Main JavaScript File for Portfolio
 * Handles mobile navigation toggle, CV download, and contact form UX.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFormHandler();
  initCVDownload();
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

  // Prevent double-binding if this script ever runs twice on the same page
  if (toggleBtn.dataset.navBound === 'true') return;
  toggleBtn.dataset.navBound = 'true';

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
 * Robust CV download handling.
 * Fixes the mobile "Download failed" issue by fetching the PDF as a
 * blob and triggering the save that way, which works reliably across
 * Android Chrome and iOS Safari (both of which can ignore or mishandle
 * a plain `download` attribute on a same-page link). If the fetch
 * itself fails (e.g. the file truly isn't reachable), it falls back
 * to simply opening the PDF in a new tab so the visitor can still
 * view/save it manually instead of seeing a dead-end error.
 */
function initCVDownload() {
  const cvLinks = document.querySelectorAll('a[href$=".pdf"]');
  if (!cvLinks.length) return;

  cvLinks.forEach(link => {
    if (link.dataset.cvBound === 'true') return;
    link.dataset.cvBound = 'true';

    link.addEventListener('click', function (e) {
      const url = this.getAttribute('href');
      const filename = this.getAttribute('download') || 'Purity_Omariba_CV.pdf';

      // Only intervene for same-origin PDF links; let anything unusual
      // fall through to normal browser behavior.
      e.preventDefault();

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error('CV file not reachable: ' + res.status);
          return res.blob();
        })
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          const tempLink = document.createElement('a');
          tempLink.href = blobUrl;
          tempLink.download = filename;
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
        })
        .catch(() => {
          // Fallback: open the PDF directly so the visitor can use the
          // browser/OS share or save option instead of getting nothing.
          window.open(url, '_blank', 'noopener,noreferrer');
        });
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