"use client";

import { useEffect } from "react";

export default function BodyClass({ className = "" }) {
  useEffect(() => {
    const previous = document.body.className;
    document.body.className = className;

    return () => {
      document.body.className = previous;
    };
  }, [className]);

  return null;
}
