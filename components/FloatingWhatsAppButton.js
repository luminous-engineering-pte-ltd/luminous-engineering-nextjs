"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_URL = "https://wa.me/6581836772";

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={WHATSAPP_URL}
      className="global-whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Luminous Engineering on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16.02 3.2C9.03 3.2 3.34 8.83 3.34 15.75c0 2.2.58 4.34 1.69 6.23L3.2 28.8l7-1.78a12.8 12.8 0 0 0 5.82 1.41c6.99 0 12.68-5.63 12.68-12.55S23.01 3.2 16.02 3.2Zm0 22.99c-1.86 0-3.68-.5-5.27-1.45l-.38-.23-4.15 1.06 1.1-4.03-.25-.41a10.2 10.2 0 0 1-1.51-5.38c0-5.69 4.7-10.31 10.47-10.31s10.47 4.62 10.47 10.31-4.7 10.44-10.48 10.44Zm5.75-7.72c-.31-.16-1.86-.91-2.15-1.02-.29-.1-.5-.16-.71.16-.21.31-.82 1.02-1 1.22-.18.21-.37.23-.68.08-.31-.16-1.33-.49-2.54-1.55-.94-.83-1.57-1.86-1.75-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.62s1.13 3.04 1.29 3.25c.16.21 2.23 3.38 5.41 4.74.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
