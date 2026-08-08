import Link from "next/link";

const TRUST_INDICATORS = ["Fast response", "Residential & commercial", "Experienced team"];
const CUSTOMER_BENEFITS = [
  ["Fast response", "Priority coordination for requests in your area."],
  ["Professional workmanship", "Neat preparation, careful execution and clean handover."],
  ["Affordable pricing", "Clear quotations with practical options before work starts."],
  ["Trusted local experts", "Singapore-based support for residential and commercial sites."]
];

export default function ServiceLocationPage({ data }) {
  const whatsappUrl = `https://wa.me/6581836772?text=${encodeURIComponent(`Hi Luminous Engineering, I would like a quote for ${data.serviceName} in ${data.location}, Singapore.`)}`;
  const quoteUrl = `/contact?service=${encodeURIComponent(data.serviceName)}&location=${encodeURIComponent(data.location)}`;

  return (
    <main className="service-location-page" id="main">
      <section className="service-location-hero">
        <div className="service-location-pattern" aria-hidden="true" />
        <div className="service-location-shell service-location-hero__grid">
          <div className="service-location-hero__copy">
            <nav className="service-location-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              <Link href={data.route}>{data.serviceName}</Link>
              <span>/</span>
              <span>{data.location}</span>
            </nav>
            <span className="service-location-kicker">Singapore Service Provider</span>
            <span className="service-location-place-badge"><Icon name="map" /> {data.location} Singapore</span>
            <h1>{data.serviceName} in {data.location}, Singapore</h1>
            <p>{data.intro}</p>
            <div className="service-location-actions">
              <a className="service-location-btn service-location-btn--primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><Icon name="message" /> WhatsApp Quote</a>
              <Link className="service-location-btn service-location-btn--secondary" href={quoteUrl}><Icon name="quote" /> Get Free Quote</Link>
            </div>
          </div>
          <aside className="service-location-hero-card" aria-label="Service summary">
            <div className="service-location-card-icon"><Icon name="building" /></div>
            <strong>Local Coverage</strong>
            <span>{data.location} Singapore</span>
            <p>Professional {data.serviceName} for residential and commercial properties, with nearby area support and responsive coordination.</p>
            <div className="service-location-mini-stats">
              <span>Residential</span>
              <span>Commercial</span>
              <span>Fast Quote</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="service-location-section">
        <div className="service-location-shell service-location-two-col">
          <div className="service-location-copy-panel">
            <span className="service-location-label">About Our Service</span>
            <h2>Professional {data.serviceName} for {data.location}</h2>
            {data.about.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="service-location-side-card">
            <div className="service-location-card-icon"><Icon name="spark" /></div>
            <h3>Customer Benefits</h3>
            <ul>
              <li>Fast response for requests in {data.location}</li>
              <li>Professional workmanship and neat handover</li>
              <li>Affordable pricing with clear quotations</li>
              <li>Trusted local experts for {data.location} Singapore</li>
              <li>Residential and commercial support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="service-location-section service-location-section--dark">
        <div className="service-location-shell">
          <div className="service-location-section-head">
            <span className="service-location-label">Why Choose Us</span>
            <h2>Reliable Singapore Service Provider</h2>
          </div>
          <div className="service-location-card-grid">
            {data.benefits.map(([title, copy]) => (
              <article className="service-location-feature-card" key={title}>
                <span aria-hidden="true"><Icon name={iconForBenefit(title)} /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-location-section">
        <div className="service-location-shell">
          <div className="service-location-section-head">
            <span className="service-location-label">Our Process</span>
            <h2>Simple, Clear and Site-Ready</h2>
          </div>
          <div className="service-location-process">
            {data.process.map(([title, copy], index) => (
              <article className="service-location-process-step" key={title}>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-location-section service-location-section--coverage">
        <div className="service-location-shell">
          <div className="service-location-section-head">
            <span className="service-location-label">Service Coverage</span>
            <h2>We proudly provide {data.serviceName} across {data.location} and nearby areas.</h2>
          </div>
          <div className="service-location-chip-row">
            <span className="service-location-chip service-location-chip--active">{data.location}</span>
            {data.nearbyLocations.map((nearby) => (
              <Link className="service-location-chip" href={`/services/${data.slug}/locations/${slugify(nearby)}`} key={nearby}>{nearby}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="service-location-section service-location-section--benefits">
        <div className="service-location-shell">
          <div className="service-location-section-head">
            <span className="service-location-label">Customer Benefits</span>
            <h2>Built for Smooth Service From First Message to Handover</h2>
          </div>
          <div className="service-location-benefit-strip">
            {CUSTOMER_BENEFITS.map(([title, copy]) => (
              <article className="service-location-benefit-card" key={title}>
                <Icon name="check" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-location-section">
        <div className="service-location-shell">
          <div className="service-location-section-head">
            <span className="service-location-label">FAQ</span>
            <h2>{data.serviceName} in {data.location} FAQs</h2>
          </div>
          <div className="service-location-faq-list">
            {data.faqs.map((faq) => (
              <details className="service-location-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="service-location-section service-location-section--related">
        <div className="service-location-shell">
          <div className="service-location-section-head">
            <span className="service-location-label">Related Services</span>
            <h2>More Services From Luminous Engineering</h2>
          </div>
          <div className="service-location-related-grid">
            {data.relatedServices.map((service) => (
              <article className="service-location-related-card" key={service.href}>
                <div className="service-location-card-icon"><Icon name="tools" /></div>
                <h3>{service.label}</h3>
                <p>Explore professional support from the same experienced Singapore Service Provider team.</p>
                <Link href={service.href}>Learn More <Icon name="arrow" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-location-section service-location-final-cta">
        <div className="service-location-shell">
          <h2>Need Professional {data.serviceName} in {data.location}?</h2>
          <p>Contact our experienced team today for a free quotation.</p>
          <div className="service-location-actions">
            <a className="service-location-btn service-location-btn--primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><Icon name="message" /> WhatsApp</a>
            <a className="service-location-btn service-location-btn--secondary" href="tel:+6581836772"><Icon name="phone" /> Call Now</a>
            <Link className="service-location-btn service-location-btn--ghost" href={quoteUrl}><Icon name="quote" /> Get Free Quote</Link>
          </div>
          <div className="service-location-trust-row">
            {TRUST_INDICATORS.map((item) => <span key={item}><Icon name="check" /> {item}</span>)}
          </div>
          <div className="service-location-internal-links">
            <Link href={data.route}>Parent Service Page</Link>
            <Link href="/services">All Services</Link>
            <Link href="/contact">Contact Page</Link>
            {data.relatedServices.map((service) => <Link href={service.href} key={service.href}>{service.label}</Link>)}
          </div>
        </div>
      </section>

    </main>
  );
}

function iconForBenefit(title) {
  if (/licensed/i.test(title)) return "shield";
  if (/fast/i.test(title)) return "bolt";
  if (/affordable/i.test(title)) return "tag";
  if (/materials/i.test(title)) return "spark";
  if (/experienced/i.test(title)) return "users";
  if (/warranty/i.test(title)) return "check";
  return "spark";
}

function Icon({ name }) {
  const icons = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bolt: <path d="m13 2-8 11h6l-1 9 8-12h-6l1-8Z" />,
    building: <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M3 21h18M8 7h4M8 11h4M8 15h4M16 9h2a2 2 0 0 1 2 2v10" />,
    check: <path d="m5 12 4 4L19 6" />,
    map: <><path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" /><path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /></>,
    message: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.8-.9L3 21l1.8-5.1a8.5 8.5 0 1 1 16.2-4.4Z" />,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.7 2.5a2 2 0 0 1-.4 2.1L8.1 9.6a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.6.6 2.5.7a2 2 0 0 1 1.7 2Z" />,
    quote: <path d="M4 7h16M4 12h10M4 17h7" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    spark: <path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15Z" />,
    tag: <path d="M20.6 13.1 13 20.7a2 2 0 0 1-2.8 0L3 13.5V4h9.5l8.1 8.1a2 2 0 0 1 0 2.8Z" />,
    tools: <path d="M14.7 6.3a4 4 0 0 0 5 5L11 20l-5-5 8.7-8.7ZM4 4l4 4M2 6l4-4 4 4-4 4-4-4Z" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>
  };

  return (
    <svg aria-hidden="true" className="service-location-icon" fill="none" focusable="false" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      {icons[name] || icons.spark}
    </svg>
  );
}

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
