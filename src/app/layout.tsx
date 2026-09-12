import type { Metadata, Viewport } from "next";
import { Sanchez, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import { SITE_URL } from "@/lib/seo";
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

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // `template` lets product pages pass a plain string title and still get
  // the studio suffix — see productMetadata in lib/products.tsx.
  title: {
    default: "TermDX — Sharp tools for sharp developers",
    template: "%s | TermDX",
  },
  description:
    "Terminal-native developer tools. No Electron wrappers, no context switching, no leaving the command line. Your RAM sends its thanks.",
  metadataBase: new URL(SITE_URL),
  applicationName: "TermDX",
  keywords: [
    "TermDX",
    "developer tools",
    "terminal",
    "CLI",
    "TUI",
    "command line",
    "API client",
    "file sync",
    "standup automation",
    "client portal",
    "TypeScript",
    "Rust",
    "Bun",
    "piper",
    "codrop",
    "Relay",
  ],
  authors: [{ name: "TermDX" }],
  creator: "TermDX",
  publisher: "TermDX",
  category: "Developer tools",
  // Stops iOS turning version numbers and command flags into phone links.
  formatDetection: {
    telephone: false,
  },
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

// Structured data for the studio: who the site belongs to, what it holds,
// and where crawlers and answer engines can find the plain-text summary.
// Rendered once here; product pages add their own JSON-LD for the software,
// FAQ, and breadcrumbs. The `.replace(/</g, "\\u003c")` neutralises any `<`
// before it reaches the parser, per the Next JSON-LD guide.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "TermDX",
      url: SITE_URL,
      description:
        "A software studio building AI products, developer tools, and modern software.",
      logo: `${SITE_URL}/logo.png`,
      email: "support@termdx.studio",
      sameAs: ["https://github.com/termdx"],
    },
    {
      "@type": "WebSite",
      url: SITE_URL,
      name: "TermDX",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "ItemList",
      name: "TermDX product catalog",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Relay",
          url: `${SITE_URL}/Relay`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "piper",
          url: `${SITE_URL}/piper`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "codrop",
          url: `${SITE_URL}/codrop`,
        },
      ],
    },
  ],
};

const JSON_LD_TEXT = JSON.stringify(JSON_LD).replace(/</g, "\\u003c");

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
        {/* Discovery hint for assistants and crawlers that look for a
            plain-text site summary (the llmstxt.org convention). */}
        <link
          rel="alternate"
          type="text/plain"
          title="TermDX — plain-text site summary for LLMs"
          href="/llms.txt"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD_TEXT }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
