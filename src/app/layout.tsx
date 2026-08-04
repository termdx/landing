import type { Metadata } from "next";
import { Sanchez, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import "./globals.css";

// Sanchez ships a single 400 face. Nothing set in --font-sans may carry a
// weight utility: 500 would silently resolve back to 400, and 600+ would make
// the browser synthesise a faux bold, which smears a slab's stems. Sans
// hierarchy is built from size, colour, and tracking instead. Italic exists
// upstream (add `style: ["normal", "italic"]`) but nothing uses it yet.
const sanchez = Sanchez({
  variable: "--font-sanchez",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "TermDX — Sharp tools for sharp developers",
  description:
    "Terminal-native developer tools. No Electron wrappers, no context switching, no leaving the command line. Your RAM sends its thanks.",
  metadataBase: new URL("https://termdx.studio"),
  applicationName: "TermDX",
  keywords: [
    "developer tools",
    "terminal",
    "CLI",
    "command line",
    "TypeScript",
    "Rust",
  ],
  authors: [{ name: "TermDX" }],
  creator: "TermDX",
  publisher: "TermDX",
  category: "Developer tools",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "TermDX — Sharp tools for sharp developers",
    description:
      "Terminal-native developer tools. No Electron wrappers, no context switching, no leaving the command line.",
    url: "https://termdx.studio",
    siteName: "TermDX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "termdx.studio — the TermDX wordmark on the studio blue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TermDX — Sharp tools for sharp developers",
    description:
      "Terminal-native developer tools. No Electron wrappers, no context switching, no leaving the command line.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "termdx.studio — the TermDX wordmark on the studio blue",
      },
    ],
  },
};

// Structured data for the studio: who the site belongs to and where it
// lives. Rendered once here; product pages add their own OG metadata only.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://termdx.studio/#org",
      name: "TermDX",
      url: "https://termdx.studio",
      logo: "https://termdx.studio/logo.png",
      sameAs: ["https://github.com/termdx"],
    },
    {
      "@type": "WebSite",
      url: "https://termdx.studio",
      name: "TermDX",
      publisher: { "@id": "https://termdx.studio/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sanchez.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Entrance animations start at opacity 0 and the FAQ panels at
            height 0. Without JS nothing would ever animate them in, so pin
            them open for that case. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-faq-panel]{height:auto!important;opacity:1!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
