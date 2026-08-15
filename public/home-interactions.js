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

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const lazyEvents = ["scroll", "pointerdown", "keydown", "touchstart"];
  lazyEvents.forEach((event) => addEventListener(event, initializeBelowFold, { capture: true, passive: true, once: true }));
})();
