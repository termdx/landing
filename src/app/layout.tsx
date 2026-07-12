import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  openGraph: {
    title: "TermDX — Sharp tools for sharp developers",
    description:
      "Terminal-native developer tools. No Electron wrappers, no context switching, no leaving the command line.",
    url: "https://termdx.studio",
    siteName: "TermDX",
    type: "website",
  },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
