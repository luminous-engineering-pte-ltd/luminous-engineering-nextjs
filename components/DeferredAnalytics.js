"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-TJ9758RG";

export default function DeferredAnalytics() {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    };

    const events = ["pointerdown", "keydown", "touchstart"];
    const options = { capture: true, passive: true, once: true };
    events.forEach((event) => window.addEventListener(event, load, options));
    const fallback = window.setTimeout(load, 90_000);

    function cleanup() {
      window.clearTimeout(fallback);
      events.forEach((event) => window.removeEventListener(event, load, options));
    }

    return cleanup;
  }, []);

  return null;
}
