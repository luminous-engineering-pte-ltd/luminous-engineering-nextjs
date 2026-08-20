"use client";

import { useEffect } from "react";

export function usePageEnhancements(route) {
  useEffect(() => {
    return initializePageEnhancements(route);
  }, [route]);
}

export function initializePageEnhancements(route) {
  if (normalizePath(route || "") === "/about") return initOriginalAboutPage();
  if (normalizePath(route || "") === "/blog") return initOriginalBlogPage();

  const cleanups = [
    initLegacyNavigation(),
    initNavbarScroll(),
    initHeroParallax(),
    initWhatsappPulse(),
    setFooterYear(),
    initParticles(),
    initCounters(),
    initScrollReveal(),
    initSmoothScroll(),
    initProjectSliders(),
    initServiceFeatureExpanders(),
    initReviewExpanders(),
    initReviewCarouselDots(),
    initFaqs(),
    initContactForms(),
    initFormFieldEffects(),
    initInteractiveCards(),
    initDateInputs()
  ].filter(Boolean);

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initOriginalAboutPage() {
  const cleanups = [
    initLegacyNavigation(),
    initOriginalAboutParticles(),
    initOriginalAboutCounters(),
    initOriginalAboutScrollReveal(),
    initOriginalAboutSmoothScroll(),
    initOriginalAboutNavbarScroll(),
    initOriginalAboutParallax(),
    initOriginalAboutValueCards(),
    initOriginalAboutTeamCards(),
    initOriginalAboutActiveNavLink(),
    initOriginalAboutStaggeredCards(),
    initOriginalAboutBodyFade(),
    initReviewExpanders(),
    initWhatsappPulse(),
    setFooterYear(),
    initContactForms(),
    initFormFieldEffects(),
    initDateInputs()
  ].filter(Boolean);

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initOriginalBlogPage() {
  const cleanups = [
    initLegacyNavigation(),
    initNavbarScroll(),
    initOriginalBlogScrollReveal(),
    initSmoothScroll(),
    initReviewExpanders(),
    initWhatsappPulse(),
    setFooterYear(),
    initContactForms(),
    initFormFieldEffects(),
    initDateInputs()
  ].filter(Boolean);

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initOriginalBlogNavbarScroll() {
  const navbar = document.querySelector(".glass-nav");
  if (!navbar) return null;

  const update = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
  return () => {
    window.removeEventListener("scroll", update);
    navbar.classList.remove("scrolled");
  };
}

function initOriginalBlogScrollReveal() {
  const elements = [...document.querySelectorAll(".scroll-reveal")];
  elements.forEach((element) => element.classList.add("revealed"));
  return () => elements.forEach((element) => element.classList.remove("revealed"));
}

function initLegacyNavigation() {
  const cleanups = [];
  const mobileButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileButton && mobileMenu) {
    const toggleMobile = (event) => {
      event.preventDefault();
      event.stopPropagation();
      mobileButton.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open", mobileMenu.classList.contains("active"));
    };
    const closeMobile = () => {
      mobileButton.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    };
    const closeOnOutside = (event) => {
      if (!mobileMenu.contains(event.target) && !mobileButton.contains(event.target)) closeMobile();
    };

    mobileButton.addEventListener("click", toggleMobile);
    document.addEventListener("click", closeOnOutside);
    mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobile));

    cleanups.push(() => {
      mobileButton.removeEventListener("click", toggleMobile);
      document.removeEventListener("click", closeOnOutside);
      mobileMenu.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMobile));
      document.body.classList.remove("menu-open");
    });
  }

  const mobileServicesToggle = document.getElementById("mobileServicesToggle");
  const mobileServicesDropdown = document.getElementById("mobileServicesDropdown");

  if (mobileServicesToggle && mobileServicesDropdown) {
    const toggleServices = (event) => {
      event.preventDefault();
      event.stopPropagation();
      mobileServicesToggle.classList.toggle("active");
      mobileServicesDropdown.classList.toggle("hidden");
      mobileServicesDropdown.classList.toggle("flex");
      const icon = mobileServicesToggle.querySelector("svg");
      if (icon) icon.style.transform = mobileServicesToggle.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
    };

    mobileServicesToggle.addEventListener("click", toggleServices);
    cleanups.push(() => mobileServicesToggle.removeEventListener("click", toggleServices));
  }

  const desktopContainer = document.getElementById("desktopServicesContainer");
  const desktopToggle = document.getElementById("desktopServicesToggle");
  const desktopDropdown = document.getElementById("desktopServicesDropdown");
  const desktopIcon = document.getElementById("desktopServicesIcon");
  const submenuPanel = document.getElementById("desktopSubMenuPanel");

  const openDesktop = () => {
    if (!desktopDropdown) return;
    desktopDropdown.classList.remove("opacity-0", "invisible");
    desktopDropdown.classList.add("opacity-100", "visible");
    if (desktopIcon) desktopIcon.style.transform = "rotate(180deg)";
  };

  const closeDesktop = () => {
    if (desktopDropdown) {
      desktopDropdown.classList.add("opacity-0", "invisible");
      desktopDropdown.classList.remove("opacity-100", "visible");
    }
    if (desktopIcon) desktopIcon.style.transform = "rotate(0deg)";
    if (submenuPanel) {
      submenuPanel.classList.add("hidden");
      submenuPanel.querySelectorAll(".submenu-panel").forEach((panel) => panel.classList.add("hidden"));
    }
    document.querySelectorAll(".service-parent-link").forEach((link) => link.classList.remove("bg-gray-800", "text-yellow-400"));
  };

  if (desktopContainer && desktopDropdown) {
    const toggleDesktop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      desktopDropdown.classList.contains("invisible") ? openDesktop() : closeDesktop();
    };
    const closeOnOutside = (event) => {
      if (!desktopContainer.contains(event.target)) closeDesktop();
    };
    const parentHandlers = [...document.querySelectorAll(".service-parent-link")].map((link) => {
      const handler = () => {
        const targetId = link.getAttribute("data-submenu");
        const targetPanel = targetId ? document.getElementById(targetId) : null;

        document.querySelectorAll(".submenu-panel").forEach((panel) => panel.classList.add("hidden"));
        document.querySelectorAll(".service-parent-link").forEach((parentLink) => parentLink.classList.remove("bg-gray-800", "text-yellow-400"));

        if (targetPanel && submenuPanel) {
          submenuPanel.classList.remove("hidden");
          targetPanel.classList.remove("hidden");
          link.classList.add("bg-gray-800", "text-yellow-400");
        } else if (submenuPanel) {
          submenuPanel.classList.add("hidden");
        }
      };
      link.addEventListener("mouseenter", handler);
      return () => link.removeEventListener("mouseenter", handler);
    });

    desktopContainer.addEventListener("mouseenter", openDesktop);
    desktopContainer.addEventListener("mouseleave", closeDesktop);
    desktopToggle?.addEventListener("click", toggleDesktop);
    document.addEventListener("click", closeOnOutside);

    cleanups.push(() => {
      desktopContainer.removeEventListener("mouseenter", openDesktop);
      desktopContainer.removeEventListener("mouseleave", closeDesktop);
      desktopToggle?.removeEventListener("click", toggleDesktop);
      document.removeEventListener("click", closeOnOutside);
      parentHandlers.forEach((cleanup) => cleanup());
    });
  }

  const mobileSubHandlers = [...document.querySelectorAll(".mobile-sub-toggle")].map((toggle) => {
    const handler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const dropdown = toggle.nextElementSibling;
      const icon = toggle.querySelector("svg");
      if (dropdown) {
        dropdown.classList.toggle("hidden");
        dropdown.classList.toggle("flex");
      }
      if (icon) icon.style.transform = dropdown && !dropdown.classList.contains("hidden") ? "rotate(180deg)" : "rotate(0deg)";
    };
    toggle.addEventListener("click", handler);
    return () => toggle.removeEventListener("click", handler);
  });
  cleanups.push(...mobileSubHandlers);

  const normalizedPath = normalizePath(window.location.pathname);
  document.querySelectorAll(".glass-nav a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    if (normalizePath(href) === normalizedPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
  if (normalizedPath.startsWith("/services")) {
    desktopToggle?.classList.add("active", "text-yellow-400");
    mobileServicesToggle?.classList.add("text-yellow-400");
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}

function normalizePath(pathname) {
  const anchor = document.createElement("a");
  anchor.href = pathname;
  return (anchor.pathname || "").replace(/\.html$/, "").replace(/\/$/, "") || "/";
}

function initNavbarScroll() {
  const navbar = document.querySelector(".glass-nav");
  if (!navbar) return null;

  let previous = window.pageYOffset;
  const originalBackground = navbar.style.background;
  const originalBoxShadow = navbar.style.boxShadow;
  const originalTransform = navbar.style.transform;

  const update = () => {
    const current = window.pageYOffset;
    navbar.classList.toggle("scrolled", current > 60);

    if (current > 100) {
      navbar.style.background = "rgba(0, 8, 39, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(0, 8, 39, 0.85)";
      navbar.style.boxShadow = "none";
    }

    navbar.style.transform = current > previous && current > 500 ? "translateY(-100%)" : "translateY(0)";
    previous = current;
  };

  window.addEventListener("scroll", update, { passive: true });
  if (window.pageYOffset > 0) update();

  return () => {
    window.removeEventListener("scroll", update);
    navbar.classList.remove("scrolled");
    navbar.style.background = originalBackground;
    navbar.style.boxShadow = originalBoxShadow;
    navbar.style.transform = originalTransform;
  };
}

function initHeroParallax() {
  const heroContent = document.querySelector(".hero-content-wrapper");
  const heroParticles = document.querySelector(".hero-particles");
  if (!heroContent && !heroParticles) return null;

  const originalContentTransform = heroContent?.style.transform || "";
  const originalContentOpacity = heroContent?.style.opacity || "";
  const originalParticlesTransform = heroParticles?.style.transform || "";

  const update = () => {
    const scroll = window.pageYOffset;
    if (heroContent) {
      heroContent.style.transform = `translateY(${0.5 * scroll}px)`;
      heroContent.style.opacity = String(Math.max(0, 1 - scroll / 700));
    }
    if (heroParticles) {
      heroParticles.style.transform = `translateY(${0.3 * scroll}px)`;
    }
  };

  window.addEventListener("scroll", update, { passive: true });

  return () => {
    window.removeEventListener("scroll", update);
    if (heroContent) {
      heroContent.style.transform = originalContentTransform;
      heroContent.style.opacity = originalContentOpacity;
    }
    if (heroParticles) {
      heroParticles.style.transform = originalParticlesTransform;
    }
  };
}

function initWhatsappPulse() {
  const whatsappFloat = document.querySelector(".whatsapp-float");
  if (!whatsappFloat) return null;

  const originalTransform = whatsappFloat.style.transform;
  let timer = window.setInterval(() => {
    whatsappFloat.style.transform = "scale(1.1)";
    window.setTimeout(() => {
      whatsappFloat.style.transform = "scale(1)";
    }, 300);
  }, 3000);

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  whatsappFloat.addEventListener("mouseenter", stop);

  return () => {
    stop();
    whatsappFloat.removeEventListener("mouseenter", stop);
    whatsappFloat.style.transform = originalTransform;
  };
}

function setFooterYear() {
  document.querySelectorAll("[data-footer-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function initParticles() {
  const containers = [...document.querySelectorAll("#particles, .hero-particles")];
  containers.forEach((container) => {
    if (container.dataset.particlesReady) return;
    container.dataset.particlesReady = "true";
    const count = window.innerWidth < 768 ? 20 : 50;

    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = 2 + Math.random() * 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `floatParticle ${10 + Math.random() * 15}s ease-in-out ${Math.random() * 5}s infinite`;
      container.appendChild(particle);
    }
  });

  return () => {};
}

function initCounters() {
  const counters = [...document.querySelectorAll(".stats-counter[data-count], .stat-number[data-target]")];
  if (!counters.length) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.counterDone) return;
        entry.target.dataset.counterDone = "true";
        const target = Number(entry.target.dataset.count || entry.target.dataset.target || 0);
        const suffix = entry.target.dataset.suffix || "";
        let current = 0;
        const steps = 50;
        const increment = target / steps;
        const timer = window.setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = `${target}${suffix}`;
            window.clearInterval(timer);
          } else {
            entry.target.textContent = `${Math.round(current)}${suffix}`;
          }
        }, 40);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
  return () => observer.disconnect();
}

function initScrollReveal() {
  const elements = [
    ...document.querySelectorAll(
      ".scroll-reveal, .fade-up, .service-card, .benefit-card, .section-header, .value-card, .team-card, .mv-card, .contact-info-card, .faq-item, .concierge-card, .stat-card, .response-timeline-card, .operations-card, .coverage-card, .social-media-card, .feature-item, .electrical-info-card, .electrical-step, .electrical-feature-card, .electrical-price-card"
      + ", .fade-in-up"
    )
  ];
  if (!elements.length) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed", "active", "visible");
        if (!entry.target.closest(".home-google-reviews-section")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((element) => {
    if (!element.classList.contains("scroll-reveal") && !element.classList.contains("fade-in-up")) {
      if (
        document.body.classList.contains("electrical-page") &&
        element.matches(".service-card, .electrical-info-card, .electrical-step, .electrical-feature-card, .electrical-price-card")
      ) {
        element.style.opacity = element.style.opacity || "0";
        element.style.transform = element.style.transform || "translateY(18px)";
        element.style.transition =
          element.style.transition || "opacity 0.45s ease, transform 0.45s ease, box-shadow 0.3s ease, border-color 0.3s ease";
      } else {
        element.style.opacity = element.style.opacity || "0";
        element.style.transform = element.style.transform || "translateY(30px)";
        element.style.transition = element.style.transition || "all 0.6s ease";
      }
    }
    observer.observe(element);
  });

  return () => observer.disconnect();
}

function initSmoothScroll() {
  const links = [...document.querySelectorAll('a[href^="#"]')];
  const handlers = links.map((link) => {
    const handler = (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    };
    link.addEventListener("click", handler);
    return () => link.removeEventListener("click", handler);
  });

  return () => handlers.forEach((cleanup) => cleanup());
}

function initProjectSliders() {
  const sliders = [...document.querySelectorAll("[data-project-slider], .packages-slider")];
  const cleanups = sliders.map((slider) => setupSlider(slider)).filter(Boolean);
  return () => cleanups.forEach((cleanup) => cleanup());
}

function setupSlider(slider) {
  const track = slider.querySelector(".project-photos-track, .packages-container");
  if (!track) return null;
  const slides = [...track.children];
  const dots = slider.querySelector(".project-slider-dots");
  const buttons = [...slider.querySelectorAll("[data-direction], .packages-nav")];
  let index = 0;
  let timer = null;

  const visible = () => {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const maxIndex = () => Math.max(0, slides.length - visible());

  const renderDots = () => {
    if (!dots) return;
    dots.innerHTML = "";
    for (let dotIndex = 0; dotIndex <= maxIndex(); dotIndex += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `project-slider-dot${dotIndex === index ? " active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${dotIndex + 1}`);
      dot.addEventListener("click", () => {
        index = dotIndex;
        update();
        restart();
      });
      dots.appendChild(dot);
    }
  };

  const updateDots = () => {
    dots?.querySelectorAll(".project-slider-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  };

  const update = () => {
    const firstSlide = slides[0];
    if (!firstSlide) return;
    const gap = parseFloat(window.getComputedStyle(track).gap || window.getComputedStyle(track).columnGap || "0");
    const offset = index * (firstSlide.getBoundingClientRect().width + gap);
    slider.style.setProperty("--visible-slides", String(visible()));
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  };

  const move = (direction) => {
    if (slides.length <= visible()) return;
    const max = maxIndex();
    index = direction === "prev" ? (index <= 0 ? max : index - 1) : index >= max ? 0 : index + 1;
    update();
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    if (slides.length > visible()) timer = window.setInterval(() => move("next"), 4000);
  };

  const restart = () => {
    stop();
    start();
  };

  const buttonHandlers = buttons.map((button) => {
    const handler = () => {
      move(button.dataset.direction || (button.classList.contains("prev") ? "prev" : "next"));
      restart();
    };
    button.addEventListener("click", handler);
    return () => button.removeEventListener("click", handler);
  });

  let touchStart = 0;
  const onTouchStart = (event) => {
    touchStart = event.changedTouches[0].screenX;
  };
  const onTouchEnd = (event) => {
    const diff = touchStart - event.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      move(diff > 0 ? "next" : "prev");
      restart();
    }
  };
  const onResize = () => {
    index = Math.min(index, maxIndex());
    renderDots();
    update();
  };

  track.addEventListener("touchstart", onTouchStart, { passive: true });
  track.addEventListener("touchend", onTouchEnd, { passive: true });
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  window.addEventListener("resize", onResize);

  renderDots();
  update();
  start();

  return () => {
    stop();
    buttonHandlers.forEach((cleanup) => cleanup());
    track.removeEventListener("touchstart", onTouchStart);
    track.removeEventListener("touchend", onTouchEnd);
    slider.removeEventListener("mouseenter", stop);
    slider.removeEventListener("mouseleave", start);
    window.removeEventListener("resize", onResize);
  };
}

function initFaqs() {
  const questions = [...document.querySelectorAll(".faq-question")];
  const handlers = questions.map((question) => {
    const handler = () => {
      const item = question.closest(".faq-item");
      if (!item) return;
      const wasActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((node) => node.classList.remove("active"));
      if (!wasActive) item.classList.add("active");
    };
    question.addEventListener("click", handler);
    return () => question.removeEventListener("click", handler);
  });

  return () => handlers.forEach((cleanup) => cleanup());
}

function initServiceFeatureExpanders() {
  const lists = [...document.querySelectorAll(".home-services-grid-section .service-feature-list")]
    .filter((list) => !list.dataset.serviceFeatureExpanderReady);

  if (!lists.length) return null;

  const cards = [...new Set(lists.map((list) => list.closest(".service-card")).filter(Boolean))];
  const setups = [];
  let resizeTimer = null;

  const setInitialCardHeights = () => {
    cards.forEach((card) => {
      if (!card.classList.contains("service-card-features-expanded")) {
        card.style.minHeight = "";
      }
    });

    const tallest = Math.ceil(Math.max(...cards.map((card) => card.getBoundingClientRect().height), 0));
    if (!tallest) return;
    cards.forEach((card) => {
      card.style.minHeight = `${tallest}px`;
    });
  };

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

    const collapsedHeight = () => {
      if (items.length <= 5) return list.scrollHeight;
      const fifth = items[4];
      const listRect = list.getBoundingClientRect();
      const itemRect = fifth.getBoundingClientRect();
      const styles = window.getComputedStyle(list);
      const paddingBottom = parseFloat(styles.paddingBottom) || 0;
      return Math.ceil(itemRect.bottom - listRect.top + paddingBottom);
    };

    const fullHeight = () => {
      const previousMaxHeight = list.style.maxHeight;
      list.style.maxHeight = "none";
      const height = list.scrollHeight;
      list.style.maxHeight = previousMaxHeight;
      return height;
    };

    const setHeight = () => {
      const expanded = list.classList.contains("service-feature-list-expanded");
      list.style.maxHeight = `${expanded ? fullHeight() : collapsedHeight()}px`;
    };

    const sync = () => {
      const shouldToggle = items.length > 5;
      button.hidden = !shouldToggle;
      list.classList.toggle("service-feature-list-has-more", shouldToggle);
      setHeight();
    };

    const toggle = () => {
      const shouldExpand = !list.classList.contains("service-feature-list-expanded");

      if (shouldExpand) {
        list.style.maxHeight = `${collapsedHeight()}px`;
        list.classList.add("service-feature-list-expanded");
        card?.classList.add("service-card-features-expanded");
        requestAnimationFrame(() => {
          list.style.maxHeight = `${fullHeight()}px`;
        });
      } else {
        list.style.maxHeight = `${fullHeight()}px`;
        requestAnimationFrame(() => {
          list.classList.remove("service-feature-list-expanded");
          card?.classList.remove("service-card-features-expanded");
          list.style.maxHeight = `${collapsedHeight()}px`;
        });
      }

      button.textContent = shouldExpand ? "See Less" : "See More";
      button.setAttribute("aria-expanded", String(shouldExpand));
    };

    button.addEventListener("click", toggle);
    sync();

    setups.push({
      cleanup: () => {
        button.removeEventListener("click", toggle);
        button.remove();
        list.classList.remove("service-feature-list-collapsible", "service-feature-list-expanded", "service-feature-list-has-more");
        list.style.maxHeight = "";
        card?.classList.remove("service-card-features-expanded");
        delete list.dataset.serviceFeatureExpanderReady;
      },
      sync
    });
  });

  requestAnimationFrame(setInitialCardHeights);

  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      setups.forEach((setup) => setup.sync());
      setInitialCardHeights();
    }, 120);
  };

  window.addEventListener("resize", onResize);

  return () => {
    window.clearTimeout(resizeTimer);
    window.removeEventListener("resize", onResize);
    cards.forEach((card) => {
      card.style.minHeight = "";
      card.classList.remove("service-card-features-expanded");
    });
    setups.forEach((setup) => setup.cleanup());
  };
}

function initReviewExpanders() {
  const reviewTexts = [
    ...document.querySelectorAll(".home-google-review-text, .testimonial-card p")
  ].filter((text) => !text.dataset.reviewExpanderReady && text.textContent.trim().length);

  if (!reviewTexts.length) return null;

  const cards = [...new Set(reviewTexts.map((text) => text.closest(".home-google-review-card, .testimonial-card")).filter(Boolean))];
  const cleanups = [];
  let resizeTimer = null;
  let resizeObserver = null;

  const setInitialCardHeights = () => {
    cards.forEach((card) => {
      if (!card.classList.contains("review-card-expanded")) {
        card.style.minHeight = "";
      }
    });

    const collapsedCards = cards.filter((card) => !card.classList.contains("review-card-expanded"));
    const tallest = Math.ceil(Math.max(...collapsedCards.map((card) => card.getBoundingClientRect().height), 0));
    if (!tallest) return;
    collapsedCards.forEach((card) => {
      card.style.minHeight = `${tallest}px`;
    });
  };

  const setups = reviewTexts.map((text, index) => {
    text.dataset.reviewExpanderReady = "true";
    text.classList.add("review-expand-text");
    text.id = text.id || `review-text-${Date.now()}-${index}`;

    const card = text.closest(".home-google-review-card, .testimonial-card");
    const fullReview = text.textContent.trim();
    const textNode = document.createTextNode(fullReview);
    const toggle = document.createElement("span");
    const state = {
      isExpandable: false,
      isExpanded: false,
      collapsedText: fullReview
    };
    toggle.className = "review-expand-toggle";
    toggle.setAttribute("role", "button");
    toggle.setAttribute("tabindex", "0");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", text.id);

    const collapsedHeight = () => {
      const styles = window.getComputedStyle(text);
      const lineHeight = parseFloat(styles.lineHeight) || parseFloat(styles.fontSize) * 1.6 || 24;
      return Math.ceil(lineHeight * 5);
    };

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

    const measuredHeight = (content, label = "") => {
      const width = text.getBoundingClientRect().width;
      if (!width) return 0;

      const clone = text.cloneNode(true);
      clone.classList.remove("review-expanded", "review-has-overflow");
      clone.removeAttribute("id");
      clone.removeAttribute("style");
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.pointerEvents = "none";
      clone.style.maxHeight = "none";
      clone.style.height = "auto";
      clone.style.overflow = "visible";
      clone.style.display = "block";
      clone.style.width = `${width}px`;
      clone.replaceChildren(document.createTextNode(label ? `${content} ${label}` : content));
      text.insertAdjacentElement("afterend", clone);
      const height = clone.scrollHeight;
      clone.remove();
      return height;
    };

    const fullHeight = () => measuredHeight(fullReview, "See Less");

    const buildCollapsedReview = () => {
      const limit = collapsedHeight();
      let low = 0;
      let high = fullReview.length;
      let best = "";

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const candidate = fullReview.slice(0, mid).trimEnd();
        if (measuredHeight(`${candidate}...`, "See More") <= limit + 1) {
          best = candidate;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      const trimmed = best.replace(/[\s.,;:!?-]+$/, "");
      return trimmed ? `${trimmed}...` : "...";
    };

    const measureState = () => {
      const limit = collapsedHeight();
      state.isExpandable = measuredHeight(fullReview) > limit + 2;
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
      label: state.isExpandable ? (state.isExpanded ? "See Less" : "See More") : "",
      height: state.isExpanded ? fullHeight() : collapsedHeight()
    });

    const syncVisibility = () => {
      measureState();

      if (!state.isExpandable) {
        render(fullReview);
        text.style.maxHeight = "";
        return;
      }

      const next = targetContent();
      render(next.content, next.label);
      text.style.maxHeight = state.isExpanded ? "" : `${next.height}px`;
    };

    const updateTextHeight = () => {
      measureState();

      if (!state.isExpandable) {
        render(fullReview);
        text.style.maxHeight = "";
        return;
      }

      const next = targetContent();
      render(next.content, next.label);
      text.style.maxHeight = state.isExpanded ? "" : `${next.height}px`;
    };

    const animateTo = (nextExpanded) => {
      if (!state.isExpandable) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const startHeight = Math.ceil(text.getBoundingClientRect().height);
      state.isExpanded = nextExpanded;
      text.classList.toggle("review-expanded", state.isExpanded);
      card?.classList.toggle("review-card-expanded", state.isExpanded);
      toggle.setAttribute("aria-expanded", String(state.isExpanded));

      if (reduceMotion) {
        const next = targetContent();
        render(next.content, next.label);
        text.style.maxHeight = state.isExpanded ? "" : `${next.height}px`;
        return;
      }

      text.style.maxHeight = `${startHeight}px`;

      if (state.isExpanded) {
        const next = targetContent();
        render(next.content, next.label);
        requestAnimationFrame(() => {
          text.style.maxHeight = `${next.height}px`;
        });
      } else {
        const targetHeight = collapsedHeight();
        requestAnimationFrame(() => {
          text.style.maxHeight = `${targetHeight}px`;
        });
      }
    };

    const onTransitionEnd = (event) => {
      if (event.target !== text || event.propertyName !== "max-height") return;
      if (!state.isExpandable) return;

      const next = targetContent();
      render(next.content, next.label);
      text.style.maxHeight = state.isExpanded ? "" : `${next.height}px`;
    };

    const toggleReview = () => {
      animateTo(!state.isExpanded);
    };

    const onKeydown = (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleReview();
    };

    toggle.addEventListener("click", toggleReview);
    toggle.addEventListener("keydown", onKeydown);
    text.addEventListener("transitionend", onTransitionEnd);
    syncVisibility();

    return {
      cleanup: () => {
        toggle.removeEventListener("click", toggleReview);
        toggle.removeEventListener("keydown", onKeydown);
        text.removeEventListener("transitionend", onTransitionEnd);
        text.replaceChildren(document.createTextNode(fullReview));
        text.classList.remove("review-expand-text", "review-expanded", "review-has-overflow");
        text.style.maxHeight = "";
        delete text.dataset.reviewExpanderReady;
      },
      syncVisibility,
      updateTextHeight
    };
  });

  requestAnimationFrame(setInitialCardHeights);

  const syncAll = () => {
    setups.forEach((setup) => {
      setup.syncVisibility();
      setup.updateTextHeight();
    });
    setInitialCardHeights();
  };

  const scheduleSyncAll = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      syncAll();
    }, 120);
  };

  if ("ResizeObserver" in window) {
    const observedWidths = new WeakMap();
    resizeObserver = new ResizeObserver((entries) => {
      const changed = entries.some((entry) => {
        const width = Math.round(entry.target.getBoundingClientRect().width);
        if (observedWidths.get(entry.target) === width) return false;
        observedWidths.set(entry.target, width);
        return true;
      });

      if (changed) scheduleSyncAll();
    });

    reviewTexts.forEach((text) => {
      observedWidths.set(text, Math.round(text.getBoundingClientRect().width));
      resizeObserver.observe(text);
    });
  } else {
    window.addEventListener("resize", scheduleSyncAll);
  }

  document.fonts?.ready.then(scheduleSyncAll).catch(() => {});

  cleanups.push(() => {
    window.clearTimeout(resizeTimer);
    window.removeEventListener("resize", scheduleSyncAll);
    resizeObserver?.disconnect();
    cards.forEach((card) => {
      card.style.minHeight = "";
      card.classList.remove("review-card-expanded");
    });
    setups.forEach((setup) => setup.cleanup());
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initReviewCarouselDots() {
  const carousel = document.querySelector(".home-google-reviews-grid");
  if (!carousel || carousel.dataset.reviewCarouselDotsReady) return null;

  const cards = [...carousel.querySelectorAll(".home-google-review-card")];
  if (cards.length < 2) return null;

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
      const paddingLeft = parseFloat(window.getComputedStyle(carousel).paddingLeft) || 0;
      carousel.scrollTo({
        left: Math.max(0, card.offsetLeft - carousel.offsetLeft - paddingLeft),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
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
  window.addEventListener("resize", scheduleUpdate);
  requestAnimationFrame(updateActiveDot);

  return () => {
    carousel.removeEventListener("scroll", scheduleUpdate);
    carousel.removeEventListener("scrollend", updateActiveDot);
    window.removeEventListener("resize", scheduleUpdate);
    dots.remove();
    delete carousel.dataset.reviewCarouselDotsReady;
  };
}

function initContactForms() {
  const forms = [...document.querySelectorAll("form#contactForm, form.contact-form")];
  const cleanups = forms.map((form) => setupContactForm(form)).filter(Boolean);
  return () => cleanups.forEach((cleanup) => cleanup());
}

function setupContactForm(form) {
  if (form.dataset.reactContactReady) return null;
  form.dataset.reactContactReady = "true";

  const handler = async (event) => {
    event.preventDefault();
    const submit = form.querySelector('button[type="submit"], .submit-btn');
    const originalHtml = submit?.innerHTML;
    const message = findMessageNode(form);
    clearFieldErrors(form);

    const data = new FormData(form);
    const validation = validateForm(form, data);
    if (!validation.ok) {
      showFormMessage(message, validation.message, "error");
      validation.field?.focus();
      return;
    }

    const botcheck = form.querySelector('[name="botcheck"], #botcheck');
    if (botcheck?.value) {
      showFormMessage(message, "Thank you! We will be in touch soon.", "success");
      form.reset();
      return;
    }

    submit?.setAttribute("disabled", "true");
    if (submit) {
      submit.innerHTML = '<span class="inline-block animate-spin mr-2">○</span> Sending...';
      submit.classList.add("opacity-70", "cursor-not-allowed");
    }

    try {
      data.delete("botcheck");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.success === false) {
        throw new Error(payload.message || "Submission failed.");
      }
      showFormMessage(message, "Thank you for reaching out! We will get back to you within 24 hours.", "success");
      form.reset();
    } catch {
      showFormMessage(message, "Something went wrong. Please try again or contact us directly at +65 8183 6772.", "error");
    } finally {
      submit?.removeAttribute("disabled");
      if (submit && originalHtml) submit.innerHTML = originalHtml;
      submit?.classList.remove("opacity-70", "cursor-not-allowed");
    }
  };

  form.addEventListener("submit", handler);
  return () => form.removeEventListener("submit", handler);
}

function validateForm(form, data) {
  const name = String(data.get("fullName") || data.get("firstName") || "").trim();
  const lastName = String(data.get("lastName") || "").trim();
  const email = String(data.get("email") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const details = String(data.get("projectDetails") || data.get("message") || "").trim();

  if (!name || name.length < 2) return fieldError(form, "Please enter your full name.", "fullName", "firstName");
  if (form.querySelector('[name="lastName"]') && !lastName) return fieldError(form, "Please enter your last name.", "lastName");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fieldError(form, "Please enter a valid email address.", "email");
  if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,5}[-\s.]?[0-9]{0,5}$/.test(phone) || phone.replace(/\D/g, "").length < 7) {
    return fieldError(form, "Please enter a valid phone number.", "phone");
  }
  if (details.length < 10) return fieldError(form, "Please describe your project (at least 10 characters).", "projectDetails", "message");
  return { ok: true };
}

function fieldError(form, message, ...names) {
  const field = names.map((name) => form.querySelector(`[name="${name}"], #${name}`)).find(Boolean);
  if (field) markFieldError(field, message);
  return { ok: false, message, field };
}

function markFieldError(field, message) {
  field.classList.add("border-red-500");
  const error = document.createElement("span");
  error.className = "field-error text-red-400 text-sm mt-1 block";
  error.textContent = message;
  field.parentElement?.appendChild(error);
}

function clearFieldErrors(form) {
  form.querySelectorAll(".field-error").forEach((node) => node.remove());
  form.querySelectorAll(".border-red-500").forEach((node) => node.classList.remove("border-red-500"));
}

function findMessageNode(form) {
  let message = form.querySelector("#formMessage, .form-message");
  if (!message) {
    message = document.createElement("div");
    message.className = "form-message";
    form.appendChild(message);
  }
  return message;
}

function showFormMessage(node, text, type) {
  if (!node) return;
  node.textContent = text;
  node.hidden = false;
  node.className =
    type === "success"
      ? "form-message text-center p-4 rounded-lg mt-2 bg-green-900/60 text-green-300 border border-green-500/30"
      : "form-message text-center p-4 rounded-lg mt-2 bg-red-900/60 text-red-300 border border-red-500/30";
  node.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function initInteractiveCards() {
  const cards = [...document.querySelectorAll(".service-card, .team-card")];
  const cleanups = cards.map((card) => {
    const move = (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      const icon = card.querySelector(".service-icon, .value-number");
      const number = card.querySelector(".service-number");
      if (icon) icon.style.transform = `translate(${x * 8}px, ${y * 8}px) scale(1.08)`;
      if (number) number.style.transform = `translate(${-x * 5}px, ${-y * 5}px) scale(1.2)`;
    };
    const leave = () => {
      const icon = card.querySelector(".service-icon, .value-number");
      const number = card.querySelector(".service-number");
      if (icon) icon.style.transform = "";
      if (number) number.style.transform = "";
    };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mousemove", move);
      card.removeEventListener("mouseleave", leave);
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initFormFieldEffects() {
  const cleanups = [];

  document.querySelectorAll(".form-group input, .form-group select, .form-group textarea").forEach((field) => {
    const parent = field.parentElement;
    if (!parent) return;
    const originalTransform = parent.style.transform;
    const originalTransition = parent.style.transition;
    const focus = () => {
      parent.style.transform = "scale(1.02)";
      parent.style.transition = "transform 0.3s ease";
    };
    const blur = () => {
      parent.style.transform = "scale(1)";
    };

    field.addEventListener("focus", focus);
    field.addEventListener("blur", blur);
    cleanups.push(() => {
      field.removeEventListener("focus", focus);
      field.removeEventListener("blur", blur);
      parent.style.transform = originalTransform;
      parent.style.transition = originalTransition;
    });
  });

  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value) => /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,5}[-\s.]?[0-9]{1,5}$/.test(value);

  [
    { input: emailInput, validate: validateEmail },
    { input: phoneInput, validate: validatePhone }
  ].forEach(({ input, validate }) => {
    if (!input) return;
    const originalBorder = input.style.borderColor;
    const blur = () => {
      if (!input.value) return;
      input.style.borderColor = validate(input.value) ? "#4CAF50" : "#f44336";
    };
    const inputHandler = () => {
      if (input.style.borderColor === "rgb(244, 67, 54)") {
        input.style.borderColor = "rgba(212, 175, 55, 0.2)";
      }
    };

    input.addEventListener("blur", blur);
    input.addEventListener("input", inputHandler);
    cleanups.push(() => {
      input.removeEventListener("blur", blur);
      input.removeEventListener("input", inputHandler);
      input.style.borderColor = originalBorder;
    });
  });

  const message = document.getElementById("message");
  if (message && !message.parentElement?.querySelector("[data-message-character-count]")) {
    const counter = document.createElement("div");
    counter.dataset.messageCharacterCount = "true";
    counter.style.cssText = "text-align: right; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;";
    counter.textContent = "0 characters";
    message.parentElement?.appendChild(counter);

    const update = () => {
      const count = message.value.length;
      counter.textContent = `${count} characters`;
      counter.style.color = count < 10 && count > 0 ? "#f44336" : count >= 10 ? "#4CAF50" : "var(--text-muted)";
    };

    message.addEventListener("input", update);
    cleanups.push(() => {
      message.removeEventListener("input", update);
      counter.remove();
    });
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initOriginalAboutParticles() {
  const container = document.getElementById("particles");
  if (!container || container.dataset.particlesReady) return null;

  container.dataset.particlesReady = "true";
  const count = window.innerWidth < 768 ? 20 : 50;

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("div");
    const size = 2 + Math.random() * 4;
    const duration = 15 + Math.random() * 10;
    const delay = Math.random() * 5;

    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            background: var(--primary-gold);
            border-radius: 50%;
            opacity: 0.3;
        `;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
    container.appendChild(particle);
  }

  return () => {
    container.querySelectorAll(".particle").forEach((particle) => particle.remove());
    delete container.dataset.particlesReady;
  };
}

function initOriginalAboutCounters() {
  const counters = [...document.querySelectorAll(".stat-number")];
  if (!counters.length) return null;

  let hasAnimated = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || hasAnimated) return;
        hasAnimated = true;
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"), 10);
          const suffix = counter.getAttribute("data-suffix") || "";
          if (Number.isNaN(target)) return;

          const increment = target / 125;
          let current = 0;
          const animate = () => {
            current += increment;
            if (current < target) {
              counter.textContent = `${Math.ceil(current)}${suffix}`;
              window.requestAnimationFrame(animate);
            } else {
              counter.textContent = `${target}${suffix}`;
            }
          };
          animate();
        });
        observer.disconnect();
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
  return () => observer.disconnect();
}

function initOriginalAboutScrollReveal() {
  const elements = [...document.querySelectorAll(".scroll-reveal")];
  if (!elements.length) return null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}

function initOriginalAboutSmoothScroll() {
  const links = [...document.querySelectorAll('a[href^="#"]')];
  const handlers = links.map((link) => {
    const handler = (event) => {
      const href = link.getAttribute("href");
      if (href !== "#" && href?.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
        }
      }
    };
    link.addEventListener("click", handler);
    return () => link.removeEventListener("click", handler);
  });

  return () => handlers.forEach((cleanup) => cleanup());
}

function initOriginalAboutNavbarScroll() {
  const navbar = document.querySelector(".glass-nav");
  if (!navbar) return null;

  let previous = 0;
  const originalBackground = navbar.style.background;
  const originalBoxShadow = navbar.style.boxShadow;
  const originalTransform = navbar.style.transform;
  const update = () => {
    const current = window.pageYOffset;
    if (current > 100) {
      navbar.style.background = "rgba(0, 8, 39, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(0, 8, 39, 0.85)";
      navbar.style.boxShadow = "none";
    }
    navbar.style.transform = current > previous && current > 500 ? "translateY(-100%)" : "translateY(0)";
    previous = current;
  };

  window.addEventListener("scroll", update, { passive: true });
  return () => {
    window.removeEventListener("scroll", update);
    navbar.style.background = originalBackground;
    navbar.style.boxShadow = originalBoxShadow;
    navbar.style.transform = originalTransform;
  };
}

function initOriginalAboutParallax() {
  const heroContent = document.querySelector(".hero-content-wrapper");
  const heroParticles = document.querySelector(".hero-particles");
  const storyImageOne = document.querySelector(".story-img-1");
  const storyImageTwo = document.querySelector(".story-img-2");
  const storySection = document.querySelector(".our-story-section");
  if (!heroContent && !heroParticles && !storyImageOne && !storyImageTwo) return null;

  const originalHeroTransform = heroContent?.style.transform || "";
  const originalHeroOpacity = heroContent?.style.opacity || "";
  const originalParticlesTransform = heroParticles?.style.transform || "";
  const originalStoryOneTransform = storyImageOne?.style.transform || "";
  const originalStoryTwoTransform = storyImageTwo?.style.transform || "";
  const update = () => {
    const scroll = window.pageYOffset;
    if (heroContent) {
      heroContent.style.transform = `translateY(${0.5 * scroll}px)`;
      heroContent.style.opacity = 1 - scroll / 700;
    }
    if (heroParticles) {
      heroParticles.style.transform = `translateY(${0.3 * scroll}px)`;
    }
    if (storyImageOne && storyImageTwo && storySection) {
      const rect = storySection.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      if (progress > 0 && progress < 1) {
        storyImageOne.style.transform = `translateY(${50 * progress}px)`;
        storyImageTwo.style.transform = `translateY(${-30 * progress}px)`;
      }
    }
  };

  window.addEventListener("scroll", update, { passive: true });
  return () => {
    window.removeEventListener("scroll", update);
    if (heroContent) {
      heroContent.style.transform = originalHeroTransform;
      heroContent.style.opacity = originalHeroOpacity;
    }
    if (heroParticles) heroParticles.style.transform = originalParticlesTransform;
    if (storyImageOne) storyImageOne.style.transform = originalStoryOneTransform;
    if (storyImageTwo) storyImageTwo.style.transform = originalStoryTwoTransform;
  };
}

function initOriginalAboutValueCards() {
  const cleanups = [...document.querySelectorAll(".value-card")].map((card) => {
    const number = card.querySelector(".value-number");
    const originalColor = number?.style.color || "";
    const originalTransform = number?.style.transform || "";
    const enter = () => {
      if (!number) return;
      number.style.color = "rgba(212, 175, 55, 0.15)";
      number.style.transform = "scale(1.2) rotate(5deg)";
    };
    const leave = () => {
      if (!number) return;
      number.style.color = originalColor;
      number.style.transform = originalTransform || "scale(1) rotate(0deg)";
    };

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
      if (number) {
        number.style.color = originalColor;
        number.style.transform = originalTransform;
      }
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initOriginalAboutTeamCards() {
  const cleanups = [...document.querySelectorAll(".team-card")].map((card) => {
    const originalTransform = card.style.transform;
    const move = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY;
      const rotateY = (x - centerX) / centerX;
      card.style.transform = `perspective(1000px) rotateY(${rotateY * 5}deg) rotateX(${rotateX * -5}deg) translateY(-10px)`;
    };
    const leave = () => {
      card.style.transform = originalTransform;
    };

    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mousemove", move);
      card.removeEventListener("mouseleave", leave);
      card.style.transform = originalTransform;
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initOriginalAboutActiveNavLink() {
  const sections = [...document.querySelectorAll("section[id]")];
  const links = [...document.querySelectorAll(".nav-link")];
  if (!sections.length || !links.length) return null;

  const update = () => {
    let current = "";
    sections.forEach((section) => {
      if (window.pageYOffset >= section.offsetTop - 200) {
        current = section.getAttribute("id") || "";
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  return () => window.removeEventListener("scroll", update);
}

function initOriginalAboutStaggeredCards() {
  const groups = [
    { selector: ".mv-card", threshold: 0.2, delay: 200, transform: "translateY(50px)", transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)" },
    { selector: ".value-card", threshold: 0.1, delay: 100, transform: "translateY(30px)", transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }
  ];

  const cleanups = groups
    .map(({ selector, threshold, delay, transform, transition }) => {
      const cards = [...document.querySelectorAll(selector)];
      if (!cards.length) return null;
      const originals = cards.map((card) => ({
        card,
        opacity: card.style.opacity,
        transform: card.style.transform,
        transition: card.style.transition
      }));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;
            window.setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, delay * index);
            observer.unobserve(entry.target);
          });
        },
        { threshold }
      );

      cards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = transform;
        card.style.transition = transition;
        observer.observe(card);
      });

      return () => {
        observer.disconnect();
        originals.forEach(({ card, opacity, transform: originalTransform, transition: originalTransition }) => {
          card.style.opacity = opacity;
          card.style.transform = originalTransform;
          card.style.transition = originalTransition;
        });
      };
    })
    .filter(Boolean);

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initOriginalAboutBodyFade() {
  const originalOpacity = document.body.style.opacity;
  const originalTransition = document.body.style.transition;
  document.body.style.opacity = "0";
  const timer = window.setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  return () => {
    window.clearTimeout(timer);
    document.body.style.opacity = originalOpacity;
    document.body.style.transition = originalTransition;
  };
}

function initDateInputs() {
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    if (!input.getAttribute("min")) {
      input.setAttribute("min", new Date().toISOString().split("T")[0]);
    }
  });
}
