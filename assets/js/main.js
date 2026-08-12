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

  // 6a. Certifications Swiper Carousel - Homepage (Frame 2147262621 & Frame 2147264332)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".home-cert-swiper")
  ) {
    new Swiper(".home-cert-swiper", {
      slidesPerView: "auto",
      spaceBetween: 12,
      loop: false,
      grabCursor: true,
      navigation: {
        nextEl: "#cert-next",
        prevEl: "#cert-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: "auto",
          spaceBetween: 24,
          slidesOffsetAfter: 24,
        },
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
      spaceBetween: 12,
      loop: false,
      watchOverflow: false,
      grabCursor: true,
      navigation: {
        nextEl: "#cert-next-btn",
        prevEl: "#cert-prev-btn",
      },
      breakpoints: {
        640: {
          slidesPerView: "auto",
          spaceBetween: 24,
          slidesOffsetAfter: 24,
        },
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

  // 7c. Applications Swiper Carousel (Product Detail Pages)
  if (typeof Swiper !== "undefined" && document.querySelector(".app-swiper")) {
    new Swiper(".app-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      speed: 400,
      navigation: {
        nextEl: "#app-next, #app-next-mobile",
        prevEl: "#app-prev, #app-prev-mobile",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  // 8. Journey Swiper Carousel & Timeline Sync (About Us Page)
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".journey-swiper")
  ) {
    let journeyNavSwiper = null;

    if (document.querySelector(".journey-nav-swiper")) {
      journeyNavSwiper = new Swiper(".journey-nav-swiper", {
        slidesPerView: 2,
        spaceBetween: 16,
        allowTouchMove: true,
        grabCursor: true,
        breakpoints: {
          640: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 48,
          },
        },
      });
    }

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
      if (journeyNavSwiper) {
        journeyNavSwiper.slideTo(realIndex);
      }
    };

    journeySwiper.on("slideChange", () => {
      updateActiveJourneyNav(journeySwiper.realIndex);
    });

    journeyNavItems.forEach((navItem) => {
      navItem.addEventListener("click", () => {
        const index = parseInt(navItem.getAttribute("data-index"), 10);
        if (!isNaN(index)) {
          journeySwiper.slideToLoop(index);
          if (journeyNavSwiper) {
            journeyNavSwiper.slideTo(index);
          }
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

  // 10. Product Detail Media Gallery & Fancybox Modal Preview
  const mainImgLink = document.getElementById("main-product-link");
  const thumbnails = document.querySelectorAll(
    "#product-thumbnails .thumbnail-btn",
  );

  if (mainImgLink && thumbnails.length > 0) {
    const mainMediaClass =
      mainImgLink.firstElementChild?.className || "gallery-viewport__img";
    const mediaItems = Array.from(thumbnails).map((thumb, index) => {
      const type =
        thumb.getAttribute("data-type") === "video" ? "video" : "image";
      const src =
        thumb.getAttribute("data-src") || thumb.getAttribute("data-img") || "";
      const poster = thumb.getAttribute("data-poster") || "";
      const caption =
        thumb.getAttribute("data-caption") || `Product media ${index + 1}`;

      return { type, src, poster, caption };
    });

    let currentIndex = Math.max(
      0,
      Array.from(thumbnails).findIndex(
        (thumb) =>
          thumb.getAttribute("aria-current") === "true" ||
          thumb.classList.contains("thumbnail-btn--active"),
      ),
    );

    const stopAndReleaseMainVideo = () => {
      const currentVideo = mainImgLink.querySelector("video");
      if (!currentVideo) return;

      currentVideo.pause();
      currentVideo.removeAttribute("src");
      currentVideo.querySelectorAll("source").forEach((source) => {
        source.removeAttribute("src");
      });
      currentVideo.load();
    };

    const renderMainMedia = (item) => {
      let mediaImg = mainImgLink.querySelector("#main-product-img");
      if (!mediaImg) {
        mediaImg = document.createElement("img");
        mediaImg.id = "main-product-img";
        mediaImg.className = mainMediaClass;
        mainImgLink.replaceChildren(mediaImg);
      } else {
        Array.from(mainImgLink.children).forEach((child) => {
          if (child !== mediaImg && child.id !== "main-product-play-icon") {
            child.remove();
          }
        });
      }

      let playIcon = mainImgLink.querySelector("#main-product-play-icon");

      if (item.type === "video") {
        mediaImg.src = item.poster || item.src;
        mediaImg.alt = item.caption;

        if (!playIcon) {
          playIcon = document.createElement("span");
          playIcon.id = "main-product-play-icon";
          playIcon.className =
            "absolute inset-0 flex items-center justify-center pointer-events-none z-10";
          playIcon.setAttribute("aria-hidden", "true");
          playIcon.innerHTML = `
            <span class="flex size-16 sm:size-20 items-center justify-center rounded-full bg-primary text-white shadow-xl group-hover:scale-110 transition-transform">
              <svg class="size-7 sm:size-9 translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 4.75v10.5L15 10 6 4.75Z" />
              </svg>
            </span>
          `;
          mainImgLink.appendChild(playIcon);
        } else {
          playIcon.classList.remove("hidden");
        }
      } else {
        mediaImg.src = item.src;
        mediaImg.alt = item.caption;

        if (playIcon) {
          playIcon.classList.add("hidden");
        }
      }

      mainImgLink.href = item.src;
      mainImgLink.dataset.caption = item.caption;
      mainImgLink.setAttribute(
        "aria-label",
        `Open ${item.caption} in media gallery`,
      );
    };

    const updateGalleryMedia = (index) => {
      const normalizedIndex = (index + mediaItems.length) % mediaItems.length;

      thumbnails.forEach((thumbnail, thumbnailIndex) => {
        const isActive = thumbnailIndex === normalizedIndex;
        thumbnail.setAttribute("aria-current", String(isActive));

        if (isActive) {
          thumbnail.classList.remove("thumbnail-btn--inactive");
          thumbnail.classList.add("thumbnail-btn--active");
        } else {
          thumbnail.classList.remove("thumbnail-btn--active");
          thumbnail.classList.add("thumbnail-btn--inactive");
        }
      });

      renderMainMedia(mediaItems[normalizedIndex]);
      currentIndex = normalizedIndex;
    };

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => updateGalleryMedia(index));
    });

    const prevImgBtn = document.getElementById("prev-img-btn");
    const nextImgBtn = document.getElementById("next-img-btn");

    prevImgBtn?.addEventListener("click", () => {
      updateGalleryMedia(currentIndex - 1);
    });

    nextImgBtn?.addEventListener("click", () => {
      updateGalleryMedia(currentIndex + 1);
    });

    const fancyboxItems = mediaItems.map((item) => {
      if (item.type === "video") {
        return {
          src: item.src,
          type: "html5video",
          poster: item.poster,
          thumbSrc: item.poster || item.src,
          caption: item.caption,
          html5videoFormat: "video/mp4",
        };
      }

      return {
        src: item.src,
        type: "image",
        thumbSrc: item.src,
        caption: item.caption,
      };
    });

    const pauseFancyboxVideos = (fancybox) => {
      fancybox
        ?.getContainer()
        ?.querySelectorAll("video")
        .forEach((video) => video.pause());
    };

    mainImgLink.addEventListener("click", (event) => {
      event.preventDefault();

      if (typeof Fancybox === "undefined" || Fancybox.getInstance()) {
        return;
      }

      const options = {
        startIndex: currentIndex,
        dragToClose: false,
        Images: {
          fit: "cover",
          zoom: false,
          Panzoom: {
            fit: "cover",
          },
        },
        Video: {
          autoplay: true,
        },
        Toolbar: {
          display: {
            left: ["counter"],
            middle: [],
            right: ["slideshow", "fullscreen", "thumbs", "close"],
          },
        },
        Thumbs: {
          autoStart: true,
        },
        on: {
          "Carousel.change": (fancybox) => pauseFancyboxVideos(fancybox),
          close: (fancybox) => pauseFancyboxVideos(fancybox),
          destroy: (fancybox) => pauseFancyboxVideos(fancybox),
        },
      };

      Fancybox.show(fancyboxItems, options);
    });

    updateGalleryMedia(currentIndex);
  }

  // 11b. Applications Page Swiper Carousels
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".applications-swiper")
  ) {
    document.querySelectorAll(".applications-swiper").forEach((el) => {
      const pag = el.parentElement.querySelector(".swiper-pagination");
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: pag,
          clickable: true,
        },
      });
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

  // 13. Applications Page Tab Switcher
  const appTabs = document.querySelectorAll(".app-tab");
  const appPanels = document.querySelectorAll('[role="tabpanel"]');

  if (appTabs.length > 0) {
    appTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("aria-controls");

        appTabs.forEach((t) => {
          t.setAttribute("aria-selected", "false");
          t.classList.remove("active", "bg-white");
          const svg = t.querySelector("svg");
          if (svg) {
            svg.classList.remove("text-primary");
            svg.classList.add("text-mono-gray-70");
          }
          const span = t.querySelector("span");
          if (span) {
            span.classList.remove("text-primary");
            span.classList.add("text-mono-gray-70");
          }
        });

        tab.setAttribute("aria-selected", "true");
        tab.classList.add("active", "bg-white");
        const activeSvg = tab.querySelector("svg");
        if (activeSvg) {
          activeSvg.classList.add("text-primary");
          activeSvg.classList.remove("text-mono-gray-70");
        }
        const activeSpan = tab.querySelector("span");
        if (activeSpan) {
          activeSpan.classList.add("text-primary");
          activeSpan.classList.remove("text-mono-gray-70");
        }

        // Toggle matching tab panels
        appPanels.forEach((panel) => {
          if (panel.id === targetId) {
            panel.classList.remove("hidden");
            panel.classList.add("block");
            const swiperEl = panel.querySelector(".applications-swiper");
            if (swiperEl && swiperEl.swiper) {
              swiperEl.swiper.update();
            }
          } else {
            panel.classList.add("hidden");
            panel.classList.remove("block");
          }
        });
      });
    });
  }

  // 12. Advantage Items Accordion (Single-Open Dropdown)
  const advantageItems = document.querySelectorAll(".advantage-item");
  if (advantageItems.length > 0) {
    advantageItems.forEach((item) => {
      const toggleBtn = item.querySelector(".advantage-toggle");

      if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
          const isActive = item.classList.contains("is-active");

          // Close all items first (Single-Open behavior)
          advantageItems.forEach((otherItem) => {
            otherItem.classList.remove("is-active");
            const otherBtn = otherItem.querySelector(".advantage-toggle");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          });

          // If the clicked item was NOT active, activate it
          if (!isActive) {
            item.classList.add("is-active");
            toggleBtn.setAttribute("aria-expanded", "true");
          }
        });
      }
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
