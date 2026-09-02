document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!menuToggle || !navLinks) return;

  // Function to toggle mobile menu state
  const toggleMenu = (open) => {
    const isExpanded = open !== undefined ? open : menuToggle.getAttribute('aria-expanded') !== 'true';
    
    menuToggle.setAttribute('aria-expanded', isExpanded);
    menuToggle.classList.toggle('active', isExpanded);
    navLinks.classList.toggle('active', isExpanded);

    // Prevent body scrolling when mobile menu drawer is active
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  };

  // Toggle drawer on hamburger click
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking outside of the drawer
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close menu on pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  // Close menu when clicking any link inside the navigation drawer
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });
});