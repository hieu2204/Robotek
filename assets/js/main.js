document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const menuToggleBtn = document.getElementById('mobile-menu-toggle');
  const menuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      document.body.style.overflow = '';
    };

    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  // 2. Mobile Products Level 2 Accordion Toggle
  const mobileProductsToggle = document.getElementById('mobile-products-toggle');
  const mobileProductsSub = document.getElementById('mobile-products-sub');
  const mobileProductsArrow = document.getElementById('mobile-products-arrow');

  if (mobileProductsToggle && mobileProductsSub) {
    mobileProductsToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileProductsSub.classList.contains('hidden');
      if (isHidden) {
        mobileProductsSub.classList.remove('hidden');
        mobileProductsSub.classList.add('flex');
        if (mobileProductsArrow) mobileProductsArrow.classList.add('rotate-180');
      } else {
        mobileProductsSub.classList.add('hidden');
        mobileProductsSub.classList.remove('flex');
        if (mobileProductsArrow) mobileProductsArrow.classList.remove('rotate-180');
      }
    });
  }

  // 3. Search Popup Toggle
  const searchBtn = document.getElementById('search-btn');
  const searchPopup = document.getElementById('search-popup');

  if (searchBtn && searchPopup) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchPopup.classList.toggle('hidden');
      // Hide lang dropdown if open
      if (langDropdown) langDropdown.classList.add('hidden');
    });
  }

  // 4. Language Dropdown Toggle & Selection
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const currentLang = document.getElementById('current-lang');
  const langOptions = document.querySelectorAll('.lang-option');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('hidden');
      // Hide search popup if open
      if (searchPopup) searchPopup.classList.add('hidden');
    });

    langOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = opt.getAttribute('data-lang');
        if (currentLang && selectedLang) {
          currentLang.textContent = selectedLang;
        }
        langDropdown.classList.add('hidden');
      });
    });
  }

  // Close popups when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (searchPopup && !searchPopup.contains(e.target) && e.target !== searchBtn) {
      searchPopup.classList.add('hidden');
    }
    if (langDropdown && !langDropdown.contains(e.target) && e.target !== langBtn) {
      langDropdown.classList.add('hidden');
    }
  });

  // 5. Header Scroll State (Fixed top 0, becomes dark blur on scroll)
  const header = document.querySelector('header.header--overlay');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  // 6. Certifications Slider Controls
  const certContainer = document.getElementById('cert-carousel');
  const certPrevBtn = document.getElementById('cert-prev');
  const certNextBtn = document.getElementById('cert-next');

  if (certContainer && certPrevBtn && certNextBtn) {
    certNextBtn.addEventListener('click', () => {
      certContainer.scrollBy({ left: 240, behavior: 'smooth' });
    });
    certPrevBtn.addEventListener('click', () => {
      certContainer.scrollBy({ left: -240, behavior: 'smooth' });
    });
  }
});
