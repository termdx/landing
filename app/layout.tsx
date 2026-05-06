import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://termdx.studio"),
  title: "termdx — Terminal Developer Experience",
  description: "No mouse required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono">
        <div className="scanlines" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
