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

  // 6a. Certifications Swiper Carousel - Homepage (Frame 2147262621)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".home-cert-swiper")
  ) {
    new Swiper(".home-cert-swiper", {
      slidesPerView: "auto",
      spaceBetween: 24,
      slidesOffsetAfter: 24,
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: "#cert-next",
        prevEl: "#cert-prev",
      },
    });
  }

  // 6b. Certifications Swiper Carousel - Detail Page (Frame 2147264288: Displays exactly 5 cards on large screens)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".detail-cert-swiper")
  ) {
    new Swiper(".detail-cert-swiper", {
      slidesPerView: "auto",
      spaceBetween: 24,
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: "#cert-next-btn",
        prevEl: "#cert-prev-btn",
      },
    });
  }

  // 7. Products Swiper Carousel (Homepage / Index Page)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".products-swiper")
  ) {
    new Swiper(".products-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      navigation: {
        nextEl: "#product-next",
        prevEl: "#product-prev",
      },
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

  // 7b. Power Supplies & USV Page Swiper Carousels (2-row stacked slides)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".ps-page-swiper")
  ) {
    new Swiper(".ps-page-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      speed: 400,
      navigation: {
        nextEl: "#ps-next",
        prevEl: "#ps-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  }

  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".usv-page-swiper")
  ) {
    new Swiper(".usv-page-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      speed: 400,
      navigation: {
        nextEl: "#usv-next",
        prevEl: "#usv-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  }

  // 8. Journey Swiper Carousel (About Us Page)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".journey-swiper")
  ) {
    const journeySwiper = new Swiper(".journey-swiper", {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      speed: 400,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
    });

    const journeyNavItems = document.querySelectorAll(".journey-nav-item");
    const prevBtns = document.querySelectorAll(".journey-prev-btn");
    const nextBtns = document.querySelectorAll(".journey-next-btn");

    const updateActiveJourneyNav = (realIndex) => {
      journeyNavItems.forEach((item, index) => {
        item.classList.toggle("active", index === realIndex);
      });
    };

    journeySwiper.on("slideChange", () => {
      updateActiveJourneyNav(journeySwiper.realIndex);
    });

    journeyNavItems.forEach((navItem) => {
      navItem.addEventListener("click", () => {
        const index = parseInt(navItem.getAttribute("data-index"), 10);
        if (!isNaN(index)) {
          journeySwiper.slideToLoop(index);
        }
      });
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        journeySwiper.slidePrev();
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        journeySwiper.slideNext();
      });
    });
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

  // 8. Our People – Expertise List: click to highlight + swap panel image
  const expertiseList = document.getElementById("expertise-list");
  const peoplePanelImage = document.getElementById("our-people-image");

  if (expertiseList && peoplePanelImage) {
    const items = expertiseList.querySelectorAll(".expertise-item");

    const activateItem = (item) => {
      // Reset all items to default white
      items.forEach((el) => {
        el.classList.remove("text-primary");
        el.classList.add("text-white");
      });
      // Highlight active item
      item.classList.remove("text-white");
      item.classList.add("text-primary");

      // Swap image with fade transition if src changed
      const newSrc = item.getAttribute("data-image");
      if (newSrc && !peoplePanelImage.src.includes(newSrc)) {
        peoplePanelImage.style.opacity = "0";
        setTimeout(() => {
          peoplePanelImage.src = newSrc;
          peoplePanelImage.style.opacity = "1";
        }, 300);
      }
    };

    // Auto-sync initial active item with panel image on load
    const currentImgSrc = peoplePanelImage.getAttribute("src");
    const initialActive =
      Array.from(items).find(
        (item) => item.getAttribute("data-image") === currentImgSrc,
      ) || items[0];

    if (initialActive) {
      items.forEach((el) => {
        el.classList.remove("text-primary");
        el.classList.add("text-white");
      });
      initialActive.classList.remove("text-white");
      initialActive.classList.add("text-primary");
    }

    items.forEach((item) => {
      // Mouse click
      item.addEventListener("click", () => activateItem(item));
      // Keyboard: Enter / Space
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activateItem(item);
        }
      });
    });
  }

  // 10. Product Detail Gallery & Fancybox Modal Preview
  const mainImg = document.getElementById("main-product-img");
  const mainImgLink = document.getElementById("main-product-link");
  const thumbnails = document.querySelectorAll(
    "#product-thumbnails .thumbnail-btn",
  );

  if (thumbnails.length > 0) {
    let currentIndex = 0;

    const galleryItems = Array.from(thumbnails).map((thumb, i) => ({
      src: thumb.getAttribute("data-img"),
      thumb: thumb.getAttribute("data-img"),
      caption: thumb.getAttribute("data-caption") || `Product Image ${i + 1}`,
      width: 800,
      height: 800,
    }));

    const updateGalleryImage = (index) => {
      thumbnails.forEach((t, idx) => {
        if (idx === index) {
          t.classList.remove("thumbnail-btn--inactive");
          t.classList.add("thumbnail-btn--active");
        } else {
          t.classList.remove("thumbnail-btn--active");
          t.classList.add("thumbnail-btn--inactive");
        }
      });
      const newSrc = thumbnails[index].getAttribute("data-img");
      if (mainImg) mainImg.src = newSrc;
      currentIndex = index;
    };

    thumbnails.forEach((thumb, idx) => {
      thumb.addEventListener("click", () => updateGalleryImage(idx));
    });

    const prevImgBtn = document.getElementById("prev-img-btn");
    const nextImgBtn = document.getElementById("next-img-btn");

    if (prevImgBtn) {
      prevImgBtn.addEventListener("click", () => {
        const newIndex =
          (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateGalleryImage(newIndex);
      });
    }

    if (nextImgBtn) {
      nextImgBtn.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % thumbnails.length;
        updateGalleryImage(newIndex);
      });
    }

    if (mainImgLink) {
      mainImgLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof Fancybox !== "undefined") {
          Fancybox.show(galleryItems, {
            startIndex: currentIndex,
            Images: {
              fit: "contain",
              zoom: false,
            },
            Toolbar: {
              display: {
                left: ["infobar"],
                middle: [],
                right: ["slideshow", "fullscreen", "thumbs", "close"],
              },
            },
            Thumbs: {
              autoStart: true,
            },
          });
        }
      });
    }
  }

  // 11. Applications Swiper Carousel
  if (typeof Swiper !== "undefined" && document.querySelector(".app-swiper")) {
    new Swiper(".app-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      navigation: {
        nextEl: "#app-next",
        prevEl: "#app-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // 12. Power Supplies - The Qualities Feature Switcher
  const qualitiesItems = document.querySelectorAll(".qualities-item");
  const qualitiesImg = document.getElementById("qualities-target-img");

  if (qualitiesItems.length > 0 && qualitiesImg) {
    qualitiesItems.forEach((item) => {
      item.addEventListener("click", () => {
        const newImgSrc = item.getAttribute("data-img");
        if (!newImgSrc) return;

        // Reset all items to inactive state
        qualitiesItems.forEach((el) => {
          el.classList.remove(
            "bg-primary",
            "text-white",
            "shadow-sm",
            "is-active",
          );
          el.classList.add("text-gray-900", "hover:border-primary");
          const svg = el.querySelector("svg");
          if (svg) svg.classList.add("text-primary");
        });

        // Activate clicked item
        item.classList.add(
          "bg-primary",
          "text-white",
          "shadow-sm",
          "is-active",
        );
        item.classList.remove("text-gray-900", "hover:border-primary");
        const activeSvg = item.querySelector("svg");
        if (activeSvg) activeSvg.classList.remove("text-primary");

        // Smooth image transition
        qualitiesImg.style.opacity = "0.3";
        setTimeout(() => {
          qualitiesImg.src = newImgSrc;
          qualitiesImg.style.opacity = "1";
        }, 150);
      });
    });
  }
});

// AOS – Animate On Scroll
window.addEventListener("load", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      once: false,
      easing: "ease-out-quad",
    });
  }
});
