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
  desktopButton?.addEventListener("click", () => {
    const open = desktopMenu?.classList.toggle("invisible") === false;
    desktopMenu?.classList.toggle("opacity-0", !open);
    desktopButton.setAttribute("aria-expanded", String(open));
  });

  const initializeBelowFold = () => {
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

    initReviewExpanders();

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

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
        const styles = getComputedStyle(text);
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

      const sync = () => {
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

        const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
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

      const toggleReview = () => {
        animateTo(!state.isExpanded);
      };

      const onTransitionEnd = (event) => {
        if (event.target !== text || event.propertyName !== "max-height") return;
        if (!state.isExpandable) return;

        const next = targetContent();
        render(next.content, next.label);
        text.style.maxHeight = state.isExpanded ? "" : `${next.height}px`;
      };

      toggle.addEventListener("click", toggleReview);
      toggle.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleReview();
      });
      text.addEventListener("transitionend", onTransitionEnd);

      sync();

      if ("ResizeObserver" in window) {
        let resizeTimer = null;
        let observedWidth = Math.round(text.getBoundingClientRect().width);
        const observer = new ResizeObserver(() => {
          const nextWidth = Math.round(text.getBoundingClientRect().width);
          if (nextWidth === observedWidth) return;
          observedWidth = nextWidth;
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(sync, 120);
        });
        observer.observe(text);
        document.fonts?.ready.then(sync).catch(() => {});
      } else {
        addEventListener("resize", () => {
          clearTimeout(text.reviewResizeTimer);
          text.reviewResizeTimer = setTimeout(sync, 120);
        });
      }
    });
  }

  const lazyEvents = ["scroll", "pointerdown", "keydown", "touchstart"];
  lazyEvents.forEach((event) => addEventListener(event, initializeBelowFold, { capture: true, passive: true, once: true }));
})();
