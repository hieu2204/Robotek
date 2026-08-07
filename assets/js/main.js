document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer Toggle
  const menuToggleBtn = document.getElementById("mobile-menu-toggle");
  const menuCloseBtn = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      document.body.style.overflow = "hidden";
    });

    const closeMenu = () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      document.body.style.overflow = "";
    };

    if (menuCloseBtn) menuCloseBtn.addEventListener("click", closeMenu);
    mobileNavLinks.forEach((link) => link.addEventListener("click", closeMenu));
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  // 2. Mobile Products Level 2 Accordion Toggle
  const mobileProductsToggle = document.getElementById(
    "mobile-products-toggle",
  );
  const mobileProductsSub = document.getElementById("mobile-products-sub");
  const mobileProductsArrow = document.getElementById("mobile-products-arrow");

  if (mobileProductsToggle && mobileProductsSub) {
    mobileProductsToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = mobileProductsSub.classList.contains("hidden");
      if (isHidden) {
        mobileProductsSub.classList.remove("hidden");
        mobileProductsSub.classList.add("flex");
        if (mobileProductsArrow)
          mobileProductsArrow.classList.add("rotate-180");
      } else {
        mobileProductsSub.classList.add("hidden");
        mobileProductsSub.classList.remove("flex");
        if (mobileProductsArrow)
          mobileProductsArrow.classList.remove("rotate-180");
      }
    });
  }

  // 3. Search Popup Toggle
  const searchBtn = document.getElementById("search-btn");
  const searchPopup = document.getElementById("search-popup");

  if (searchBtn && searchPopup) {
    searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      searchPopup.classList.toggle("hidden");
      // Hide lang dropdown if open
      if (langDropdown) langDropdown.classList.add("hidden");
    });
  }

  // 4. Language Dropdown Toggle & Selection
  const langBtn = document.getElementById("lang-btn");
  const langDropdown = document.getElementById("lang-dropdown");
  const currentLang = document.getElementById("current-lang");
  const langOptions = document.querySelectorAll(".lang-option");

  if (langBtn && langDropdown) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("hidden");
      // Hide search popup if open
      if (searchPopup) searchPopup.classList.add("hidden");
    });

    langOptions.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedLang = opt.getAttribute("data-lang");
        if (currentLang && selectedLang) {
          currentLang.textContent = selectedLang;
        }
        langDropdown.classList.add("hidden");
      });
    });
  }

  // Close popups when clicking anywhere outside
  document.addEventListener("click", (e) => {
    if (
      searchPopup &&
      !searchPopup.contains(e.target) &&
      e.target !== searchBtn
    ) {
      searchPopup.classList.add("hidden");
    }
    if (
      langDropdown &&
      !langDropdown.contains(e.target) &&
      e.target !== langBtn
    ) {
      langDropdown.classList.add("hidden");
    }
  });

  // 5. Header Scroll State (Unified Fixed Header Strategy)
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    });
  }

  // 6. Certifications Swiper Carousel
  if (typeof Swiper !== "undefined" && document.querySelector(".cert-swiper")) {
    new Swiper(".cert-swiper", {
      slidesPerView: "auto",
      spaceBetween: 24,
      loop: false,
      navigation: {
        nextEl: "#cert-next",
        prevEl: "#cert-prev",
      },
    });
  }

  // 7. Products Swiper Carousel
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".products-swiper")
  ) {
    new Swiper(".products-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 32,
        },
      },
    });
  }

  // 8. Milestone Tabs Switcher (About Us Page)
  const milestoneTabs = document.querySelectorAll(".milestone-tab");
  const milestoneTitle = document.getElementById("milestone-title");
  const milestoneDesc = document.getElementById("milestone-desc");
  const milestonePrevBtn = document.getElementById("milestone-prev");
  const milestoneNextBtn = document.getElementById("milestone-next");

  if (milestoneTabs.length > 0) {
    let currentIndex = 0;

    const updateMilestone = (index) => {
      currentIndex = index;
      milestoneTabs.forEach((tab, i) => {
        const yearSpan = tab.querySelector("span:first-child");
        if (i === index) {
          tab.classList.add(
            "bg-white",
            "shadow-sm",
            "border",
            "border-primary/20",
          );
          tab.classList.remove("hover:bg-white/80");
          if (yearSpan) {
            yearSpan.classList.add("text-primary");
            yearSpan.classList.remove("text-gray-500");
          }
        } else {
          tab.classList.remove(
            "bg-white",
            "shadow-sm",
            "border",
            "border-primary/20",
          );
          tab.classList.add("hover:bg-white/80");
          if (yearSpan) {
            yearSpan.classList.remove("text-primary");
            yearSpan.classList.add("text-gray-500");
          }
        }
      });

      const activeTab = milestoneTabs[index];
      if (activeTab && milestoneTitle && milestoneDesc) {
        milestoneTitle.textContent = activeTab.getAttribute("data-title");
        milestoneDesc.textContent = activeTab.getAttribute("data-desc");
      }
    };

    milestoneTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => updateMilestone(index));
    });

    if (milestonePrevBtn) {
      milestonePrevBtn.addEventListener("click", () => {
        const newIndex =
          (currentIndex - 1 + milestoneTabs.length) % milestoneTabs.length;
        updateMilestone(newIndex);
      });
    }

    if (milestoneNextBtn) {
      milestoneNextBtn.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % milestoneTabs.length;
        updateMilestone(newIndex);
      });
    }
  }

  // 9. Dynamic CountUp Animation for Key Metrics (.count-up & [data-countup])
  const countUpModule = window.countUp || window.CountUpModule;
  const CountUpClass = countUpModule
    ? countUpModule.CountUp
    : window.CountUp || null;

  if (CountUpClass) {
    const countUpElements = document.querySelectorAll(
      ".count-up, [data-countup]",
    );

    countUpElements.forEach((el) => {
      let rawVal = el.getAttribute("data-countup");
      let suffix = el.getAttribute("data-suffix");
      let prefix = el.getAttribute("data-prefix") || "";

      if (!rawVal) {
        const text = el.textContent.trim();
        const match = text.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
        if (match) {
          prefix = prefix || match[1];
          rawVal = match[2].replace(/,/g, "");
          suffix = suffix !== null ? suffix : match[3];
        }
      }

      const endVal = parseFloat(rawVal);

      if (!isNaN(endVal)) {
        new CountUpClass(el, endVal, {
          prefix: prefix || "",
          suffix: suffix || "",
          duration: 2.2,
          enableScrollSpy: true,
          scrollSpyOnce: false,
        });
      }
    });
  }
});
