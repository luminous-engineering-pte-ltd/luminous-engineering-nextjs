"use client";

import { usePageEnhancements } from "../hooks/usePageEnhancements";

export default function PageEnhancements({ route }) {
  usePageEnhancements(route);
  return null;
}
