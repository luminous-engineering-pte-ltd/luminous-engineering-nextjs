import "./globals.css";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import GoogleTagManager from "../components/GoogleTagManager";

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
        <GoogleTagManager />
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
