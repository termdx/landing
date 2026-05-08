import Link from "next/link";
import { Reveal } from "./components/reveal";

function Cursor() {
	return (
		<span className="inline-block w-[0.6em] h-[1.1em] bg-crt-green ml-1 align-text-bottom animate-cursor-blink" />
	);
}

function Prompt({ children }: { children: React.ReactNode }) {
	return <div className="terminal-prompt text-crt-green/90">{children}</div>;
}

function SectionDivider() {
	return (
		<div className="flex items-center gap-4 my-16 opacity-30" role="separator">
			<div className="h-px flex-1 bg-crt-green-dim" />
			<span className="text-crt-green-dim text-xs">* * *</span>
			<div className="h-px flex-1 bg-crt-green-dim" />
		</div>
	);
}

function Comment({ children }: { children: React.ReactNode }) {
	return <span className="terminal-comment">{children}</span>;
}

function JsonLd() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "termdx",
		alternateName: "Terminal Developer Experience",
		url: "https://termdx.studio",
		logo: "https://termdx.studio/icon.png",
		sameAs: ["https://github.com/termdx"],
		description:
			"termdx is an open source organization building terminal-native developer tools.",
		foundingDate: "2024",
		knowsAbout: [
			"Terminal Developer Tools",
			"Command Line Interface",
			"TUI Applications",
			"API Clients",
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}

export default function Home() {
	return (
		<>
			<JsonLd />
			<main className="relative min-h-screen max-w-3xl mx-auto px-6 py-20 md:py-32">
				{/* Header */}
				<header className="flex items-center justify-between mb-24">
					<div className="text-sm tracking-widest uppercase crt-glow">
						termdx
					</div>
					<nav className="flex items-center gap-6 text-xs" aria-label="Social links">
						<Link
							href="https://github.com/termdx"
							className="text-crt-gray hover:text-crt-green transition-colors duration-300"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit termdx GitHub organization"
						>
							github
						</Link>
					</nav>
				</header>

				{/* Hero */}
				<Reveal>
					<section className="mb-28" aria-label="Introduction">
						<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 crt-glow-strong">
							termdx
							<Cursor />
						</h1>
						<p className="text-lg md:text-xl text-crt-green/80 max-w-lg leading-relaxed">
							Terminal Developer Experience.{" "}
							<br className="hidden md:block" />
							We build tools that feel native to the command line.
						</p>
						<div className="mt-8 text-xs text-crt-gray flex items-center gap-4">
							<span>open source</span>
							<span className="text-crt-green-dim">|</span>
							<span>unix philosophy</span>
						</div>
					</section>
				</Reveal>

				<SectionDivider />

				{/* Mission */}
				<Reveal>
					<section className="mb-28" aria-labelledby="mission-heading">
						<div className="flex items-baseline gap-3 mb-8">
							<h2 id="mission-heading" className="text-xl font-bold crt-glow">
								mission
							</h2>
						</div>

						<div className="space-y-6 text-crt-green/70 leading-loose">
							<Prompt>
								<Comment>{"// "}</Comment>
								Why do developers leave the terminal to test an API?
							</Prompt>
							<Prompt>
								<Comment>{"// "}</Comment>
								Why is the best interface for infrastructure a web dashboard?
							</Prompt>
							<Prompt>
								<Comment>{"// "}</Comment>
								We believe the terminal is the ultimate developer environment.
							</Prompt>

							<div className="pl-0 md:pl-8 mt-8 border-l border-crt-green-dim/30">
								<p className="text-crt-green/90">
									termdx is an open source organization dedicated to building
									terminal-native tools that are fast, keyboard-driven, and respect
									the Unix philosophy. No electron wrappers. No context switching.
									Just sharp tools for sharp developers.
								</p>
							</div>
						</div>
					</section>
				</Reveal>

				<SectionDivider />

				{/* Piper Product */}
				<Reveal>
					<section className="mb-28" aria-labelledby="products-heading">
						<div className="flex items-baseline gap-3 mb-8">
							<h2 id="products-heading" className="text-xl font-bold crt-glow">
								products
							</h2>
						</div>

						<article className="crt-border p-6 md:p-8 mb-8">
							<div className="flex items-baseline justify-between mb-4">
								<h3 className="text-2xl font-bold crt-glow">piper</h3>
								<span className="text-xs text-crt-gray">@termdx/piper</span>
							</div>

							<p className="text-crt-green/80 leading-relaxed mb-6">
								A fast, keyboard-driven API client for the terminal.
								Protocol-agnostic by design — start with HTTP, then chain requests,
								stream WebSockets, and script workflows without leaving your shell.
							</p>

							<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs list-none">
								<li className="flex items-start gap-2">
									<span className="text-crt-green-dim mt-0.5">▸</span>
									<span className="text-crt-green/70">
										Interactive TUI — no mouse required
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-crt-green-dim mt-0.5">▸</span>
									<span className="text-crt-green/70">
										Syntax highlighted JSON bodies
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-crt-green-dim mt-0.5">▸</span>
									<span className="text-crt-green/70">
										Ghost URL suggestions from history
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-crt-green-dim mt-0.5">▸</span>
									<span className="text-crt-green/70">
										One-key exports to cURL / clipboard
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-crt-green-dim mt-0.5">▸</span>
									<span className="text-crt-green/70">
										10 built-in themes (Tokyo Night, Nord, Gruvbox...)
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-crt-green-dim mt-0.5">▸</span>
									<span className="text-crt-green/70">
										Request chaining with variable extraction
									</span>
								</li>
							</ul>

							<div className="mt-6 pt-6 border-t border-crt-green-dim/30">
								<div className="flex flex-wrap items-center gap-3 text-xs text-crt-gray">
									<span>built with</span>
									<span className="text-crt-green/80">OpenTUI</span>
									<span>+</span>
									<span className="text-crt-green/80">Bun</span>
									<span>+</span>
									<span className="text-crt-green/80">TypeScript</span>
								</div>
							</div>
						</article>
					</section>
				</Reveal>

				<SectionDivider />

				{/* Install */}
				<Reveal>
					<section className="mb-28" aria-labelledby="install-heading">
						<div className="flex items-baseline gap-3 mb-8">
							<h2 id="install-heading" className="text-xl font-bold crt-glow">
								install
							</h2>
						</div>

						<div className="space-y-4">
							<Prompt>
								bun install -g{" "}
								<span className="terminal-string">@termdx/piper</span>
							</Prompt>

							<div className="crt-border p-4 md:p-6 bg-crt-dark/50">
								<div className="flex items-center gap-2 mb-3 text-xs text-crt-gray">
									<span className="w-2 h-2 rounded-full bg-crt-green-dim inline-block" />
									<span>terminal</span>
								</div>
								<pre className="text-sm text-crt-green/90 overflow-x-auto">
									<code>
										<span className="terminal-comment">
											# Install Piper globally
										</span>
										{"\n"}$ bun install -g @termdx/piper
										{"\n\n"}
										<span className="terminal-comment"># Launch</span>
										{"\n"}$ piper
										{"\n\n"}
										<span className="terminal-comment">
											# Start making requests
										</span>
										{"\n"}$ piper --workspace api-testing
									</code>
								</pre>
							</div>

							<p className="text-xs text-crt-gray mt-2">
								Requires{" "}
								<Link
									href="https://bun.sh"
									className="text-crt-green/70 hover:text-crt-green underline underline-offset-2"
									target="_blank"
									rel="noopener noreferrer"
								>
									Bun
								</Link>
								. MIT Licensed.
							</p>
						</div>
					</section>
				</Reveal>

				<SectionDivider />

				{/* Roadmap / Coming Soon */}
				<Reveal>
					<section className="mb-28" aria-labelledby="roadmap-heading">
						<div className="flex items-baseline gap-3 mb-8">
							<h2 id="roadmap-heading" className="text-xl font-bold crt-glow">
								roadmap
							</h2>
						</div>

						<ul className="space-y-4 text-sm list-none">
							<li className="flex items-start gap-4">
								<span className="text-crt-green-dim text-xs mt-0.5">[ ]</span>
								<span className="text-crt-green/70">
									<span className="text-crt-green/90">WebSocket Support</span> —
									Connect, send, and stream messages in real time
								</span>
							</li>
							<li className="flex items-start gap-4">
								<span className="text-crt-green-dim text-xs mt-0.5">[ ]</span>
								<span className="text-crt-green/70">
									<span className="text-crt-green/90">
										Collections & Environments
									</span>
									— Save and organize requests with variable substitution
								</span>
							</li>
							<li className="flex items-start gap-4">
								<span className="text-crt-green-dim text-xs mt-0.5">[ ]</span>
								<span className="text-crt-green/70">
									<span className="text-crt-green/90">Plugin Architecture</span> —
									Extend Piper with custom protocols and exporters
								</span>
							</li>
							<li className="flex items-start gap-4">
								<span className="text-crt-green-dim text-xs mt-0.5">[ ]</span>
								<span className="text-crt-green/70">
									<span className="text-crt-green/90">More termdx tools</span> — The
									terminal is just getting started
								</span>
							</li>
						</ul>
					</section>
				</Reveal>

				<SectionDivider />

				{/* Footer */}
				<Reveal>
					<footer className="pt-8 border-t border-crt-green-dim/30">
						<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-crt-gray">
							<div className="flex items-center gap-4">
								<span className="text-crt-green/90">termdx</span>
								<span>© {new Date().getFullYear()}</span>
							</div>

							<nav className="flex items-center gap-6" aria-label="Footer links">
								<Link
									href="https://github.com/termdx"
									className="hover:text-crt-green transition-colors duration-300"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="termdx GitHub organization"
								>
									GitHub
								</Link>
								<Link
									href="https://github.com/termdx/piper"
									className="hover:text-crt-green transition-colors duration-300"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Piper product repository"
								>
									Piper
								</Link>
								<span className="text-crt-green-dim">|</span>
								<span>MIT License</span>
							</nav>
						</div>

						<div className="mt-8 text-[10px] text-crt-gray/50 leading-relaxed">
							<Prompt>
								<Comment>
									{"// "}Built for developers who live in the terminal.
								</Comment>
							</Prompt>
							<Prompt>
								<Comment>
									{"// "}No tracking. No cookies. Just code.
								</Comment>
							</Prompt>
						</div>
					</footer>
				</Reveal>
			</main>
		</>
	);
}
