"use client";

import { useEffect } from "react";

export default function PageEnhancements({ route }) {
  useEffect(() => {
    let disposed = false;
    let cleanup;

    const initialize = () => {
      removeListeners();
      import("../hooks/usePageEnhancements").then(({ initializePageEnhancements }) => {
        if (!disposed) cleanup = initializePageEnhancements(route);
      });
    };

    const events = ["pointerdown", "keydown", "touchstart", "scroll", "focusin"];
    const options = { capture: true, passive: true, once: true };
    const removeListeners = () => events.forEach((event) => window.removeEventListener(event, initialize, options));
    events.forEach((event) => window.addEventListener(event, initialize, options));

    return () => {
      disposed = true;
      removeListeners();
      cleanup?.();
    };
  }, [route]);

  return null;
}
