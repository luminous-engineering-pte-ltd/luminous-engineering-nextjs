import "./globals.css";
import DeferredAnalytics from "../components/DeferredAnalytics";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";

export const metadata = {
  metadataBase: new URL("https://luminousengineering.com.sg"),
  title: "Luminous Engineering",
  description: "Luminous Engineering provides professional renovation, electrical, plumbing, painting, waterproofing, flooring, pool and handyman services across Singapore.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FACC15"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJ9758RG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <DeferredAnalytics />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
