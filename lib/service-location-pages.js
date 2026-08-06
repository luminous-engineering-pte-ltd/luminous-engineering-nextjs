import { PAGES } from "./pages.js";
import { serviceGroups } from "./navigation.js";

export const LOCATIONS = [
  "Ang Mo Kio",
  "Bedok",
  "Bishan",
  "Bukit Batok",
  "Bukit Merah",
  "Bukit Timah",
  "Clementi",
  "Geylang",
  "Hougang",
  "Jurong East",
  "Jurong West",
  "Kallang",
  "Marine Parade",
  "Novena",
  "Orchard",
  "Pasir Ris",
  "Punggol",
  "Queenstown",
  "Sengkang",
  "Serangoon",
  "Tampines",
  "Toa Payoh",
  "Woodlands",
  "Yishun",
  "CBD"
];

const NEARBY_LOCATIONS = {
  "Ang Mo Kio": ["Bishan", "Serangoon", "Hougang", "Yishun", "Toa Payoh", "Sengkang", "Novena", "Kallang"],
  Bedok: ["Tampines", "Pasir Ris", "Marine Parade", "Geylang", "Kallang", "Punggol", "Sengkang", "CBD"],
  Bishan: ["Ang Mo Kio", "Toa Payoh", "Serangoon", "Novena", "Hougang", "Kallang", "Orchard", "Sengkang"],
  "Bukit Batok": ["Jurong East", "Jurong West", "Clementi", "Bukit Timah", "Queenstown", "Bukit Merah", "Woodlands"],
  "Bukit Merah": ["Queenstown", "CBD", "Orchard", "Bukit Timah", "Clementi", "Jurong East", "Kallang"],
  "Bukit Timah": ["Clementi", "Bukit Batok", "Queenstown", "Orchard", "Novena", "Bukit Merah", "Jurong East"],
  Clementi: ["Jurong East", "Bukit Timah", "Queenstown", "Bukit Batok", "Jurong West", "Bukit Merah", "Orchard"],
  Geylang: ["Kallang", "Marine Parade", "Bedok", "Toa Payoh", "Novena", "Serangoon", "CBD"],
  Hougang: ["Serangoon", "Sengkang", "Punggol", "Ang Mo Kio", "Bishan", "Tampines", "Pasir Ris"],
  "Jurong East": ["Jurong West", "Clementi", "Bukit Batok", "Bukit Timah", "Queenstown", "Bukit Merah", "Woodlands"],
  "Jurong West": ["Jurong East", "Bukit Batok", "Clementi", "Bukit Timah", "Queenstown", "Woodlands", "Bukit Merah"],
  Kallang: ["Geylang", "Novena", "Toa Payoh", "Marine Parade", "CBD", "Bishan", "Orchard"],
  "Marine Parade": ["Bedok", "Geylang", "Kallang", "Tampines", "CBD", "Pasir Ris", "Punggol"],
  Novena: ["Toa Payoh", "Bishan", "Orchard", "Kallang", "Bukit Timah", "Serangoon", "CBD"],
  Orchard: ["Novena", "CBD", "Queenstown", "Bukit Timah", "Bukit Merah", "Toa Payoh", "Kallang"],
  "Pasir Ris": ["Tampines", "Bedok", "Punggol", "Sengkang", "Hougang", "Marine Parade", "Geylang"],
  Punggol: ["Sengkang", "Pasir Ris", "Hougang", "Tampines", "Bedok", "Serangoon", "Ang Mo Kio"],
  Queenstown: ["Bukit Merah", "Clementi", "Orchard", "Bukit Timah", "Jurong East", "CBD", "Novena"],
  Sengkang: ["Punggol", "Hougang", "Serangoon", "Ang Mo Kio", "Pasir Ris", "Tampines", "Bishan"],
  Serangoon: ["Hougang", "Bishan", "Ang Mo Kio", "Sengkang", "Toa Payoh", "Novena", "Kallang"],
  Tampines: ["Bedok", "Pasir Ris", "Sengkang", "Punggol", "Hougang", "Marine Parade", "Geylang"],
  "Toa Payoh": ["Bishan", "Novena", "Kallang", "Serangoon", "Ang Mo Kio", "Orchard", "Geylang"],
  Woodlands: ["Yishun", "Ang Mo Kio", "Sengkang", "Bukit Batok", "Jurong West", "Hougang", "Bishan"],
  Yishun: ["Woodlands", "Ang Mo Kio", "Bishan", "Sengkang", "Hougang", "Serangoon", "Toa Payoh"],
  CBD: ["Orchard", "Bukit Merah", "Kallang", "Queenstown", "Marine Parade", "Novena", "Geylang"]
};

const INTRO_VARIANTS = [
  ({ serviceName, location }) =>
    `Luminous Engineering provides professional ${serviceName} in ${location}, Singapore for homeowners, landlords, facility managers and commercial operators who need dependable workmanship without slow coordination. If you are comparing a Singapore Service Provider for work in ${location} Singapore, our team can review your requirements, advise on the right scope and prepare a clear quotation before work begins.`,
  ({ serviceName, location }) =>
    `For customers searching for ${serviceName} in ${location}, Luminous Engineering delivers practical support across residential and commercial properties in ${location} Singapore. Our crews combine responsive scheduling, careful site protection and experienced trade knowledge so each project is handled by a trusted Singapore Service Provider.`,
  ({ serviceName, location }) =>
    `Need professional ${serviceName} in ${location}? We support homes, offices, retail units and managed properties throughout ${location} Singapore with prompt communication, transparent pricing and workmanship planned around your site conditions. Luminous Engineering is a Singapore Service Provider focused on reliable results and clean handover.`
];

const ABOUT_OPENERS = [
  "Our work begins with understanding the site, the urgency and the standard of finish expected.",
  "Every property has different access, usage and timing constraints, so we plan the scope before sending a team.",
  "Good service is more than arriving with tools; it means giving clear advice and completing the job with care."
];

const BENEFITS = [
  ["Licensed Professionals", "Qualified teams for careful residential and commercial work."],
  ["Fast Response", "Prompt coordination for inspections, quotes and urgent requests."],
  ["Affordable Pricing", "Clear quotations with practical options for your budget."],
  ["High Quality Materials", "Suitable products selected for Singapore property conditions."],
  ["Experienced Team", "Hands-on specialists who understand renovation and maintenance sites."],
  ["Warranty Available", "Workmanship support available where the service scope allows it."]
];

const PROCESS = [
  ["Contact Us", "Share your service requirement, location, photos and preferred timing."],
  ["Free Inspection", "Where needed, we inspect the site and confirm the practical scope."],
  ["Receive Quotation", "You get a clear quote with timing, inclusions and next steps."],
  ["Work Starts", "Our team arrives prepared and protects the surrounding work area."],
  ["Final Quality Check", "We review the completed work and keep the handover clean."]
];

export function getServiceLocationPage(route) {
  const match = route.replace(/\.html$/, "").match(/^\/services\/([^/]+)\/locations\/([^/]+)$/);
  if (!match) return null;

  const [, serviceSlug, locationSlug] = match;
  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(locationSlug);
  if (!service || !location) return null;

  return buildServiceLocationPage(service, location);
}

export function getServiceLocationStaticSlugs() {
  return getServiceEntries().flatMap((service) =>
    LOCATIONS.map((location) => ({
      slug: ["services", service.slug, "locations", slugify(location)]
    }))
  );
}

export function getServiceEntries() {
  return Object.entries(PAGES)
    .filter(([route, page]) => route.startsWith("/services/") && !route.endsWith(".html") && !page.aliasOf)
    .filter(([route]) => !route.includes("/locations/") && route !== "/services/index")
    .map(([route, page]) => ({
      route,
      slug: route.split("/").pop(),
      name: getServiceNameFromTitle(route, page.title),
      title: page.title,
      description: page.description,
      css: page.css,
      bodyClass: page.bodyClass || ""
    }));
}

export function rewriteServiceLocationLinks(html, serviceSlug) {
  return html.replace(/href=(["'])\/locations\/([^"']+)\1/g, `href=$1/services/${serviceSlug}/locations/$2$1`);
}

export function getServiceNameFromTitle(route, title = "") {
  const titleBase = title
    .split(/\s(?:[|-]|\u2013|\u2014|\u00e2).*/u)[0]
    .split(",")[0]
    .replace(/\[[^\]]+\]/g, "")
    .replace(/#\d+\s*/g, "")
    .replace(/^(best|professional|licensed|trusted)\s+/i, "")
    .replace(/\bSingapore\b/gi, "")
    .replace(/\bLuminous\b/gi, "")
    .replace(/\bEngineering\b/gi, "")
    .replace(/\b(quality guaranteed|quick fix|rated|expert|service team)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (titleBase && !/^(best|our services|services)$/i.test(titleBase)) return ensureServiceSuffix(titleBase);

  const slug = route.replace(/\.html$/, "").split("/").filter(Boolean).pop() || "service";
  return ensureServiceSuffix(toTitleCase(slug.replace(/-/g, " ")));
}

export function buildServiceLocationMetadata(data) {
  const title = `${data.serviceName} in ${data.location}, Singapore | Luminous Engineering`;
  const description = `Professional ${data.serviceName} in ${data.location}, Singapore for residential and commercial clients. Fast response from a trusted Singapore Service Provider.`;
  const canonical = `https://luminousengineering.com.sg${data.url}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Luminous Engineering"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

function buildServiceLocationPage(service, location) {
  const nearbyLocations = getNearbyLocations(location);
  const relatedServices = getRelatedServices(service);
  const intro = INTRO_VARIANTS[stableIndex(`${service.slug}:${location}:intro`, INTRO_VARIANTS.length)]({
    serviceName: service.name,
    location
  });
  const about = buildAboutCopy(service.name, location, stableIndex(`${service.slug}:${location}:about`, 3));
  const faqs = buildFaqs(service.name, location);
  const url = `/services/${service.slug}/locations/${slugify(location)}`;

  return {
    ...service,
    serviceName: service.name,
    location,
    locationSlug: slugify(location),
    nearbyLocations,
    relatedServices,
    intro,
    about,
    benefits: BENEFITS,
    process: PROCESS,
    faqs,
    url,
    jsonLd: buildJsonLd({ service, location, nearbyLocations, faqs, url, intro })
  };
}

function buildAboutCopy(serviceName, location, variant) {
  const opener = ABOUT_OPENERS[variant];
  return `${opener} For ${serviceName} in ${location}, our service can include assessment, preparation, repair or installation work, finishing, cleanup and practical maintenance advice depending on the job type. We serve both landed homes, HDB flats, condominiums, offices, retail units and managed facilities in ${location} Singapore, so our team is used to balancing neat workmanship with access rules, noise control and daily operating needs.

Residential ${serviceName} often requires extra care around furniture, finishes, family routines and shared building spaces. We help homeowners understand what needs immediate attention, what can be planned later and how to avoid unnecessary disruption. Commercial ${serviceName} usually needs a different rhythm: faster scheduling, clearer documentation, safe working areas and coordination with tenants, staff or building management. Luminous Engineering plans around those realities so the work can move efficiently while keeping the site orderly.

Customers choose us because we combine responsive communication with experienced professionals who understand renovation, maintenance and repair work across Singapore. If the request is urgent, our team will advise the fastest practical next step and arrange emergency support where the service scope allows it. For planned projects, we focus on quality workmanship, suitable materials, transparent quotations and a final quality check before handover. As a Singapore Service Provider, our goal is to make professional ${serviceName} feel straightforward: clear advice, dependable execution and support for both residential and commercial clients in ${location}.`;
}

function buildFaqs(serviceName, location) {
  return [
    {
      question: `Do you provide ${serviceName} in ${location}?`,
      answer: `Yes. We provide ${serviceName} in ${location}, Singapore for residential and commercial clients.`
    },
    {
      question: `How much does ${serviceName} in ${location} cost?`,
      answer: `Pricing depends on site condition, job scope, materials and urgency. Share photos and details with us for a free quotation.`
    },
    {
      question: `How quickly can your team arrive in ${location} Singapore?`,
      answer: `Response time depends on schedule and location, but we prioritise fast coordination and urgent requests whenever possible.`
    },
    {
      question: "Do you work on weekends?",
      answer: `Weekend arrangements may be available for ${serviceName}, especially for urgent or commercial work that needs careful scheduling.`
    },
    {
      question: "Is there a warranty?",
      answer: "Warranty availability depends on the service scope, materials and site condition. We will explain the applicable workmanship support before work starts."
    },
    {
      question: "Do you provide free quotations?",
      answer: `Yes. Contact us with your property type, location and photos so we can advise on ${serviceName} in ${location}.`
    },
    {
      question: `Can you handle commercial ${serviceName}?`,
      answer: `Yes. We support offices, retail spaces, managed properties and other commercial sites across ${location} and nearby areas.`
    }
  ];
}

function buildJsonLd({ service, location, nearbyLocations, faqs, url, intro }) {
  const absoluteUrl = `https://luminousengineering.com.sg${url}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://luminousengineering.com.sg/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://luminousengineering.com.sg/services" },
        { "@type": "ListItem", position: 3, name: service.name, item: `https://luminousengineering.com.sg${service.route}` },
        { "@type": "ListItem", position: 4, name: location, item: absoluteUrl }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Luminous Engineering",
      url: "https://luminousengineering.com.sg",
      telephone: "+6581836772",
      areaServed: [location, ...nearbyLocations].map((name) => ({ "@type": "Place", name: `${name}, Singapore` }))
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.name} in ${location}, Singapore`,
      serviceType: service.name,
      provider: { "@type": "LocalBusiness", name: "Luminous Engineering" },
      areaServed: { "@type": "Place", name: `${location}, Singapore` },
      description: intro,
      url: absoluteUrl
    }
  ];
}

function getServiceBySlug(serviceSlug) {
  return getServiceEntries().find((service) => service.slug === serviceSlug) || null;
}

function getLocationBySlug(locationSlug) {
  return LOCATIONS.find((location) => slugify(location) === locationSlug) || null;
}

function getNearbyLocations(location) {
  return (NEARBY_LOCATIONS[location] || LOCATIONS.filter((item) => item !== location)).slice(0, 8);
}

function getRelatedServices(service) {
  const group = serviceGroups.find((item) => item.items.some(([, href]) => href === service.route));
  const groupItems = group?.items || [];
  const related = groupItems
    .filter(([, href]) => href !== service.route)
    .slice(0, 4)
    .map(([label, href]) => ({ label, href }));

  if (related.length >= 4) return related;

  return related.concat(
    getServiceEntries()
      .filter((item) => item.route !== service.route && !related.some((relatedItem) => relatedItem.href === item.route))
      .slice(0, 4 - related.length)
      .map((item) => ({ label: item.name, href: item.route }))
  );
}

function ensureServiceSuffix(name) {
  return /\b(services?|repair|installation|renovation|construction|maintenance|painting|waterproofing|plumbing|polishing|hacking)\b$/i.test(name)
    ? name
    : `${name} Services`;
}

function stableIndex(value, modulo) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash % modulo;
}

function toTitleCase(value) {
  return value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

export function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
