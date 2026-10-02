const SEO_CSS = "content/styles/seo-content-shell.css";

const SEO_ROUTES = [
  ["/blog/pool-leak-repair-cost-singapore-2026", "Pool Leak in Singapore: Signs, Solutions & Repair Cost (2026 Guide)", "Learn the signs of a swimming pool leak in Singapore, repair options, leak detection methods and 2026 cost ranges.", "content/pages/seo__pool__leak__repair__cost__singapore__2026.html"],
  ["/blog/pool-water-loss-causes-fixes-cost-singapore-2026", "Pool Water Loss: Causes, Fixes & Cost Singapore (2026)", "Compare normal pool evaporation with real water loss, common causes, fixes and 2026 repair costs in Singapore.", "content/pages/seo__pool__water__loss__causes__fixes__cost__singapore__2026.html"],
  ["/blog/pool-cracks-repair-cost-singapore-2026", "Pool Cracks: Causes, Repair Options & Cost Singapore (2026)", "Understand pool crack types, structural warning signs, repair options and cost ranges for Singapore pool owners.", "content/pages/seo__pool__cracks__repair__cost__singapore__2026.html"],
  ["/blog/pool-waterproofing-issues-solutions-cost-singapore-2026", "Pool Waterproofing Issues: Solutions & Cost Singapore (2026)", "A practical guide to swimming pool waterproofing failures, repair methods and cost ranges in Singapore.", "content/pages/seo__pool__waterproofing__issues__solutions__cost__singapore__2026.html"],
  ["/blog/cloudy-pool-water-causes-fixes-cost-singapore-2026", "Cloudy Pool Water: Causes, Fixes & Cost Singapore (2026)", "See why pool water turns cloudy in Singapore, what to check first and when professional cleaning or repair is needed.", "content/pages/seo__cloudy__pool__water__causes__fixes__cost__singapore__2026.html"],
  ["/blog/pool-tile-damage-repair-cost-singapore-2026", "Pool Tile Damage: Repair Options & Cost in Singapore (2026 Guide)", "Review common swimming pool tile damage, repair options, regrouting and replacement cost ranges in Singapore.", "content/pages/seo__pool__tile__damage__repair__cost__singapore__2026.html"],
  ["/blog/best-pool-maintenance-companies-singapore-2026", "10 Best Pool Maintenance Companies in Singapore [2026]", "Compare the best pool maintenance companies in Singapore for 2026, including service scope, costs, FAQs and selection tips.", "content/pages/seo__best__pool__maintenance__companies__singapore__2026.html"],
  ["/blog/pool-pump-problems-repair-cost-singapore-2026", "Pool Pump Problems: Solutions & Repair Cost in Singapore (2026 Guide)", "Troubleshoot common pool pump problems and compare repair, replacement and installation costs in Singapore.", "content/pages/seo__pool__pump__problems__repair__cost__singapore__2026.html"],
  ["/blog/pool-renovation-cost-singapore-2026", "Pool Renovation: Problems, Solutions & Cost in Singapore (2026 Guide)", "Plan a swimming pool renovation in Singapore with common problems, upgrade options, timelines and 2026 cost ranges.", "content/pages/seo__pool__renovation__cost__singapore__2026.html"],
  ["/blog/pool-surface-damage-repair-cost-singapore-2026", "Pool Surface Damage: Repair Solutions & Cost in Singapore (2026 Guide)", "Compare pool surface damage types, repair methods and resurfacing cost ranges for Singapore properties.", "content/pages/seo__pool__surface__damage__repair__cost__singapore__2026.html"],
  ["/blog/pool-water-level-dropping-causes-fixes-cost-singapore-2026", "Pool Water Level Dropping: Causes, Fixes & Cost in Singapore (2026 Guide)", "Find out why your pool water level keeps dropping, how to test for leaks and what repairs may cost in Singapore.", "content/pages/seo__pool__water__level__dropping__causes__fixes__cost__singapore__2026.html"],
  ["/blog/pool-leakage-detection-methods-repair-cost-singapore", "Pool Leakage Detection Singapore: Methods & Repair Cost Guide (2026)", "Suspect a pool leak? Learn the professional pool leak detection methods used in Singapore — pressure testing, dye testing, acoustic tracing — plus repair cost guide.", "content/pages/seo__pool__leakage__detection__methods__repair__cost__singapore.html"],
  ["/blog/best-swimming-pool-contractor-singapore", "Best Swimming Pool Contractor Singapore [2026]", "Compare top swimming pool contractors in Singapore and learn why Luminous Engineering is a strong choice for pool projects.", "content/pages/seo__best__swimming__pool__contractor__singapore.html"],
  ["/blog/best-electrician-singapore", "Best Electrician Singapore [2026]", "Compare reliable electricians and electrical service providers in Singapore, with cost guides and selection tips.", "content/pages/seo__best__electrician__singapore.html"],
  ["/blog/best-painting-companies-singapore", "Best Painting Companies in Singapore [2026]", "Review leading painting companies in Singapore, common painting services, pricing factors and how to choose a contractor.", "content/pages/seo__best__painting__companies__singapore.html"],
  ["/services/swimming-pool-repair", "Swimming Pool Repair Singapore - Luminous Engineering", "Swimming pool repair and equipment installation in Singapore for pumps, filters, leaks, plumbing and urgent pool faults.", "content/pages/seo__services__swimming__pool__repair.html"],
  ["/services/swimming-pool-maintenance", "Pool Maintenance Singapore - Luminous Engineering", "Professional pool maintenance in Singapore for residential, condominium, MCST-managed and commercial swimming pools.", "content/pages/seo__services__swimming__pool__maintenance.html"],
  ["/services/emergency-swimming-pool-services", "Emergency Swimming Pool Services Singapore", "Urgent swimming pool support in Singapore for leaks, pump faults, filter failures, unsafe water and emergency triage.", "content/pages/seo__services__emergency__swimming__pool__services.html"]
];

export const SEO_CONTENT_PAGES = Object.fromEntries(
  SEO_ROUTES.flatMap(([route, title, description, content]) => [
    [
      route,
      {
        title: `${title} | Luminous Engineering`,
        description,
        canonical: `https://luminousengineering.com.sg${route}`,
        bodyClass: "seo-content-page bg-gray-900 text-white",
        content,
        css: SEO_CSS,
        source: "Google Docs content update October 2026",
        hasNav: true,
        hasFooter: true,
        wrapWithShell: true
      }
    ],
    [
      `${route}.html`,
      {
        title: `${title} | Luminous Engineering`,
        description,
        canonical: `https://luminousengineering.com.sg${route}`,
        bodyClass: "seo-content-page bg-gray-900 text-white",
        content,
        css: SEO_CSS,
        source: "Google Docs content update October 2026",
        hasNav: true,
        hasFooter: true,
        wrapWithShell: true,
        aliasOf: route
      }
    ]
  ])
);
