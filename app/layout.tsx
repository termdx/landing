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
	title: {
		default: "termdx — Terminal Developer Experience",
		template: "%s | termdx",
	},
	description:
		"termdx is an open source organization building terminal-native developer tools. Piper is a fast, keyboard-driven API client for the command line.",
	keywords: [
		"terminal",
		"developer tools",
		"CLI",
		"API client",
		"TUI",
		"command line",
		"piper",
		"termdx",
		"open source",
		"terminal-native",
		"HTTP client",
		"REST API",
		"WebSocket",
		"Unix philosophy",
	],
	authors: [{ name: "termdx" }],
	creator: "termdx",
	publisher: "termdx",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://termdx.studio",
		siteName: "termdx",
		title: "termdx — Terminal Developer Experience",
		description:
			"termdx is an open source organization building terminal-native developer tools. Piper is a fast, keyboard-driven API client for the command line.",
	},
	twitter: {
		card: "summary_large_image",
		title: "termdx — Terminal Developer Experience",
		description:
			"termdx is an open source organization building terminal-native developer tools. Piper is a fast, keyboard-driven API client for the command line.",
		creator: "@termdx",
	},
	alternates: {
		canonical: "/",
	},
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
