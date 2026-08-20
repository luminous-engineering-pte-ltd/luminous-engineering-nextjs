(() => {
  const mobileButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  mobileButton?.addEventListener("click", () => {
    const open = mobileMenu?.classList.toggle("active") || false;
    mobileButton.classList.toggle("active", open);
    mobileButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  const servicesButton = document.getElementById("mobileServicesToggle");
  const servicesMenu = document.getElementById("mobileServicesDropdown");
  servicesButton?.addEventListener("click", () => {
    const open = servicesMenu?.classList.toggle("hidden") === false;
    servicesButton.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".mobile-sub-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const menu = button.nextElementSibling;
      const open = menu?.classList.toggle("hidden") === false;
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const desktopButton = document.getElementById("desktopServicesToggle");
  const desktopMenu = document.getElementById("desktopServicesDropdown");
  const desktopContainer = document.getElementById("desktopServicesContainer");
  const desktopSubmenu = document.getElementById("desktopSubMenuPanel");
  const desktopParents = desktopContainer ? [...desktopContainer.querySelectorAll(".service-parent-link")] : [];
  const desktopPanels = desktopSubmenu ? [...desktopSubmenu.querySelectorAll(".submenu-panel")] : [];

  const showDesktopPanel = (link) => {
    const targetId = link?.getAttribute("data-submenu");
    const target = targetId ? document.getElementById(targetId) : null;

    desktopPanels.forEach((panel) => panel.classList.add("hidden"));
    desktopParents.forEach((parent) => parent.classList.remove("bg-gray-800", "text-yellow-400"));

    if (!target || !desktopSubmenu) {
      desktopSubmenu?.classList.add("hidden");
      return;
    }

    desktopSubmenu.classList.remove("hidden");
    target.classList.remove("hidden");
    link.classList.add("bg-gray-800", "text-yellow-400");
  };

  const openDesktopMenu = () => {
    if (!desktopMenu) return;
    desktopMenu.classList.remove("invisible", "opacity-0");
    desktopMenu.classList.add("visible", "opacity-100");
    desktopMenu.style.visibility = "visible";
    desktopMenu.style.opacity = "1";
    desktopButton?.setAttribute("aria-expanded", "true");
    if (desktopSubmenu && !desktopPanels.some((panel) => !panel.classList.contains("hidden"))) {
      showDesktopPanel(desktopParents[0]);
    }
  };

  const closeDesktopMenu = () => {
    if (!desktopMenu) return;
    desktopMenu.classList.add("invisible", "opacity-0");
    desktopMenu.classList.remove("visible", "opacity-100");
    desktopMenu.style.visibility = "hidden";
    desktopMenu.style.opacity = "0";
    desktopButton?.setAttribute("aria-expanded", "false");
    desktopSubmenu?.classList.add("hidden");
    desktopPanels.forEach((panel) => panel.classList.add("hidden"));
    desktopParents.forEach((parent) => parent.classList.remove("bg-gray-800", "text-yellow-400"));
  };

  desktopButton?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const open = desktopMenu?.classList.contains("invisible");
    if (open) {
      openDesktopMenu();
    } else {
      closeDesktopMenu();
    }
  });

  desktopParents.forEach((link) => {
    const handler = () => showDesktopPanel(link);
    link.addEventListener("mouseenter", handler);
    link.addEventListener("pointerenter", handler);
    link.addEventListener("focus", handler);
  });

  document.addEventListener("click", (event) => {
    if (!desktopContainer?.contains(event.target)) {
      closeDesktopMenu();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDesktopMenu();
    }
  });

  desktopMenu?.classList.toggle("opacity-100", desktopMenu.classList.contains("visible"));
  if (!desktopContainer && desktopButton) {
    desktopButton.addEventListener("click", () => {
      const open = desktopMenu?.classList.toggle("invisible") === false;
      desktopMenu?.classList.toggle("opacity-0", !open);
      if (desktopMenu) {
        desktopMenu.style.visibility = open ? "visible" : "hidden";
        desktopMenu.style.opacity = open ? "1" : "0";
      }
      desktopButton.setAttribute("aria-expanded", String(open));
    });
  }

  let belowFoldInitialized = false;

  const initializeBelowFold = () => {
    if (belowFoldInitialized) return;
    belowFoldInitialized = true;
    lazyEvents.forEach((event) => removeEventListener(event, initializeBelowFold, true));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "120px 0px", threshold: 0.01 });
    document.querySelectorAll(".scroll-reveal").forEach((element) => revealObserver.observe(element));

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = Number(entry.target.dataset.count || entry.target.dataset.target || 0);
        entry.target.textContent = `${target}${entry.target.dataset.suffix || ""}`;
        observer.unobserve(entry.target);
      });
    });
    document.querySelectorAll("[data-count], [data-target]").forEach((element) => counterObserver.observe(element));

    document.querySelectorAll("[data-footer-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });

    initServiceFeatureExpanders();
    initReviewExpanders();
    initReviewCarouselDots();

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  function initServiceFeatureExpanders() {
    const lists = [...document.querySelectorAll(".home-services-grid-section .service-feature-list")]
      .filter((list) => !list.dataset.serviceFeatureExpanderReady);

    lists.forEach((list, index) => {
      const items = [...list.children].filter((item) => item.matches("li"));
      list.dataset.serviceFeatureExpanderReady = "true";
      list.id = list.id || `service-feature-list-${Date.now()}-${index}`;
      list.classList.add("service-feature-list-collapsible");

      const card = list.closest(".service-card");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "service-feature-toggle";
      button.textContent = "See More";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", list.id);
      button.hidden = items.length <= 5;
      list.insertAdjacentElement("afterend", button);

      const sync = () => {
        const hasMore = items.length > 5;
        button.hidden = !hasMore;
        list.classList.toggle("service-feature-list-has-more", hasMore);
      };

      const toggle = () => {
        const shouldExpand = !list.classList.contains("service-feature-list-expanded");
        list.classList.toggle("service-feature-list-expanded", shouldExpand);
        card?.classList.toggle("service-card-features-expanded", shouldExpand);

        button.textContent = shouldExpand ? "See Less" : "See More";
        button.setAttribute("aria-expanded", String(shouldExpand));
      };

      button.addEventListener("click", toggle);
      sync();

      addEventListener("resize", sync, { passive: true });
    });
  }

  function initReviewExpanders() {
    const reviewTexts = [...document.querySelectorAll(".home-google-review-text")]
      .filter((text) => !text.dataset.reviewExpanderReady && text.textContent.trim().length);

    reviewTexts.forEach((text, index) => {
      text.dataset.reviewExpanderReady = "true";
      text.classList.add("review-expand-text");
      text.id = text.id || `home-review-text-${Date.now()}-${index}`;

      const card = text.closest(".home-google-review-card");
      const fullReview = text.textContent.trim();
      const textNode = document.createTextNode(fullReview);
      const toggle = document.createElement("span");
      const state = {
        isExpandable: fullReview.length > 180,
        isExpanded: false,
        collapsedText: fullReview
      };
      toggle.className = "review-expand-toggle";
      toggle.setAttribute("role", "button");
      toggle.setAttribute("tabindex", "0");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", text.id);

      const render = (content, label = "") => {
        text.replaceChildren();
        textNode.nodeValue = content;
        text.append(textNode);
        if (label) {
          toggle.textContent = label;
          toggle.setAttribute("aria-expanded", String(state.isExpanded));
          text.append(" ", toggle);
        }
      };

      const buildCollapsedReview = () => {
        const best = fullReview.slice(0, 180).trimEnd();
        const trimmed = best.replace(/[\s.,;:!?-]+$/, "");
        return trimmed ? `${trimmed}...` : "...";
      };

      const measureState = () => {
        state.collapsedText = state.isExpandable ? buildCollapsedReview() : fullReview;

        if (!state.isExpandable) {
          state.isExpanded = false;
        }

        text.classList.toggle("review-has-overflow", state.isExpandable);
        text.classList.toggle("review-expanded", state.isExpanded);
        card?.classList.toggle("review-card-expanded", state.isExpanded);
        toggle.setAttribute("aria-expanded", String(state.isExpanded));
      };

      const targetContent = () => ({
        content: state.isExpanded ? fullReview : state.collapsedText,
        label: state.isExpandable ? (state.isExpanded ? "See Less" : "See More") : ""
      });

      const sync = () => {
        measureState();

        if (!state.isExpandable) {
          render(fullReview);
          return;
        }

        const next = targetContent();
        render(next.content, next.label);
      };

      const animateTo = (nextExpanded) => {
        if (!state.isExpandable) return;

        state.isExpanded = nextExpanded;
        text.classList.toggle("review-expanded", state.isExpanded);
        card?.classList.toggle("review-card-expanded", state.isExpanded);
        toggle.setAttribute("aria-expanded", String(state.isExpanded));

        const next = targetContent();
        render(next.content, next.label);
      };

      const toggleReview = () => {
        animateTo(!state.isExpanded);
      };

      toggle.addEventListener("click", toggleReview);
      toggle.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleReview();
      });

      sync();
    });
  }

  function initReviewCarouselDots() {
    const carousel = document.querySelector(".home-google-reviews-grid");
    if (!carousel || carousel.dataset.reviewCarouselDotsReady) return;

    const cards = [...carousel.querySelectorAll(".home-google-review-card")];
    if (cards.length < 2) return;

    carousel.dataset.reviewCarouselDotsReady = "true";

    const dots = document.createElement("div");
    dots.className = "home-google-review-dots";
    dots.setAttribute("aria-label", "Google review carousel pagination");

    const buttons = cards.map((card, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "home-google-review-dot";
      button.setAttribute("aria-label", `Show review ${index + 1} of ${cards.length}`);
      button.setAttribute("aria-current", index === 0 ? "true" : "false");
      button.addEventListener("click", () => {
        const paddingLeft = parseFloat(getComputedStyle(carousel).paddingLeft) || 0;
        carousel.scrollTo({
          left: Math.max(0, card.offsetLeft - carousel.offsetLeft - paddingLeft),
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
        });
      });
      dots.append(button);
      return button;
    });

    carousel.insertAdjacentElement("afterend", dots);

    let activeIndex = 0;
    let ticking = false;

    const nearestCardIndex = () => {
      const carouselRect = carousel.getBoundingClientRect();
      const center = carouselRect.left + carouselRect.width / 2;
      return cards.reduce((nearest, card, index) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - center);
        return distance < nearest.distance ? { index, distance } : nearest;
      }, { index: 0, distance: Infinity }).index;
    };

    const setActiveDot = (index) => {
      if (index === activeIndex && buttons[index]?.getAttribute("aria-current") === "true") return;
      activeIndex = index;
      buttons.forEach((button, buttonIndex) => {
        button.setAttribute("aria-current", buttonIndex === activeIndex ? "true" : "false");
      });
    };

    const updateActiveDot = () => {
      ticking = false;
      setActiveDot(nearestCardIndex());
    };

    const scheduleUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveDot);
    };

    carousel.addEventListener("scroll", scheduleUpdate, { passive: true });
    carousel.addEventListener("scrollend", updateActiveDot);
    addEventListener("resize", scheduleUpdate);
    requestAnimationFrame(updateActiveDot);
  }

  const lazyEvents = ["pointerdown", "keydown", "touchstart"];
  lazyEvents.forEach((event) => addEventListener(event, initializeBelowFold, { capture: true, passive: true, once: true }));

  const scheduleIdleBelowFold = () => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(initializeBelowFold, { timeout: 9000 });
      return;
    }
    setTimeout(initializeBelowFold, 9000);
  };

  if (document.readyState === "complete") {
    scheduleIdleBelowFold();
  } else {
    addEventListener("load", scheduleIdleBelowFold, { once: true });
  }
})();
