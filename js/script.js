/**
 * Main JavaScript File for Portfolio
 * Handles mobile navigation (compact dropdown drawer), CV download, and contact form UX.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFormHandler();
  initCVDownload();
});

/**
 * Compact dropdown-style mobile navigation.
 * Unlike a full-screen slide-over, this opens a small rounded panel
 * anchored under the hamburger button (top-right), so it never
 * covers the whole viewport. Closes on: toggle click again, any
 * click outside the panel/button, ESC key, or tapping a nav link.
 */
function initMobileNav() {
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.getElementById('nav-links') || document.querySelector('.nav-links');

  if (!navContainer || !navLinks) return;

  let toggleBtn = document.getElementById('mobile-menu-toggle') || document.querySelector('.mobile-menu-toggle');

  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.id = 'mobile-menu-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle navigation');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    const navElement = navContainer.querySelector('nav') || navLinks;
    navContainer.insertBefore(toggleBtn, navElement);
  }

  // Prevent double-binding if this script ever runs twice on the same page
  if (toggleBtn.dataset.navBound === 'true') return;
  toggleBtn.dataset.navBound = 'true';

  const setMenuState = (isOpen) => {
    toggleBtn.classList.toggle('active', isOpen);
    navLinks.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  };

  const isMenuOpen = () => toggleBtn.classList.contains('active');

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuState(!isMenuOpen());
  });

  // Close when clicking/tapping anywhere outside the compact panel
  document.addEventListener('click', (e) => {
    if (!isMenuOpen()) return;
    if (navLinks.contains(e.target) || toggleBtn.contains(e.target)) return;
    setMenuState(false);
  });

  // Close on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      setMenuState(false);
    }
  });

  // Close the dropdown when a nav link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Close on resize back to desktop width, so it never gets stuck open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 850 && isMenuOpen()) {
      setMenuState(false);
    }
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