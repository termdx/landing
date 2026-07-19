import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Star } from "lucide-react";
import Footer from "@/components/Footer";

const DOWNLOAD_URL =
  "https://relay.termdx.studio/join/FZ3eWvKYlax2Gm7b-5iWAzMpSdfHz29U";

export const metadata: Metadata = {
  title: "Relay — The operating system for client work",
  description:
    "Relay connects the tools you already ship with into one timeline per client, a knowledge base that answers 'where are we?', and a client portal with an AI that knows your project. Self-hosted.",
  alternates: { canonical: "/Relay" },
  openGraph: {
    title: "Relay — The operating system for client work",
    description:
      "Connect. Track. Know. Share. Approve. The orchestration and knowledge layer over the tools you already ship with.",
    url: "https://termdx.studio/Relay",
    siteName: "TermDX",
    type: "website",
  },
};

// Relay brand accent — the design's documented configurability (globals.css).
const RELAY_ACCENT = { "--td-accent": "#7C5CFF" } as CSSProperties;

const features = [
  {
    name: "timeline",
    badge: "Postgres",
    description:
      "Every commit, PR, meeting, todo, and decision captured against a client and project. “Where are we?” stops being a meeting.",
  },
  {
    name: "knowledge engine",
    badge: "pgvector",
    description:
      "Everything tracked is embedded into a per-project knowledge base — the source of truth. Relay AI answers with citations, scoped in SQL, never in prompts.",
  },
  {
    name: "client portal",
    badge: "React",
    description:
      "relay.yourcompany.com — your clients see live progress, approve work, and ask Relay AI anything about their project. Your branding, your domain.",
  },
  {
    name: "approval loop",
    badge: "outbox",
    description:
      "AI drafts, humans decide. Issues land on GitHub, emails get sent — only after you hit approve. External writes are durable and retried.",
  },
  {
    name: "integrations",
    badge: "webhooks",
    description:
      "GitHub, GitLab, Bitbucket, Slack, Discord, SMTP. Events flow in, notifications flow out — normalized at the edge, never vendor payloads.",
  },
  {
    name: "self-hosted runtime",
    badge: "docker",
    description:
      "Declarative YAML manifests become docker-compose: modules, integrations, encrypted secrets. Your stack, your data, your client's trust.",
  },
];

const LOOP = `signal (commit, PR, meeting, message)
      │
      ▼
client timeline ──▶ knowledge base  ← source of truth
      │
      ├──▶ AI drafts ──▶ you approve ──▶ pushed to your tools
      └──▶ client portal + Relay AI chat`;

export default function RelayPage() {
  return (
    <div style={RELAY_ACCENT} className="flex min-h-full flex-1 flex-col">
      {/* Nav — mirrors the main Nav; logo returns to termdx.studio */}
      <nav className="sticky top-0 z-10 border-b border-line bg-[rgba(250,250,248,0.88)] backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-[1060px] items-center justify-between px-7">
          <Link href="/" className="flex items-center text-ink">
            <Image
              src="/logo.png"
              alt="TermDX"
              width={110}
              height={54}
              className="h-[36px] w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-[26px]">
            <Link
              href="/"
              className="font-mono text-[13px] text-muted transition-colors hover:text-ink"
            >
              ← termdx
            </Link>
            <a
              href="https://github.com/termdx/Relay"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-[7px] rounded-md border border-line-strong bg-surface px-3.5 py-[7px] font-mono text-[13px] font-medium text-ink transition-colors hover:border-ink"
            >
              <Star className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />{" "}
              on GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto flex max-w-[1060px] flex-col items-center px-7 pb-[88px] pt-24 text-center">
        <Image
          src="/relay-logo.png"
          alt="Relay"
          width={96}
          height={96}
          className="mb-[30px] h-24 w-24"
          priority
        />

        <div className="mb-[18px] flex items-center gap-0.5 font-mono text-[15px] text-[color:var(--td-accent)]">
          <span className="opacity-[0.65]">$</span>
          <span>&nbsp;relay up</span>
          <span
            aria-hidden="true"
            className="ml-1.5 inline-block h-[17px] w-2 align-text-bottom bg-[color:var(--td-accent)] [animation:td-blink_1.1s_step-end_infinite]"
          />
        </div>

        <p className="m-0 mb-9 max-w-[560px] text-[17px] leading-[1.6] text-muted text-pretty">
          The operating system for client work. Relay connects the tools you
          already ship with into one timeline per client, a knowledge base
          that answers “where are we?”, and a portal where your clients watch
          it all happen. AI drafts, you approve.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/termdx/Relay"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[7px] bg-ink px-[22px] py-[13px] font-mono text-sm font-medium text-bg transition-colors hover:bg-[color:var(--td-accent)] hover:text-white"
          >
            <Star className="h-4 w-4" fill="currentColor" strokeWidth={0} /> on
            GitHub
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-[7px] border border-faint bg-surface px-5 py-[13px] font-mono text-sm text-ink transition-colors hover:border-ink"
          >
            <Download className="h-4 w-4 text-[color:var(--td-accent)]" />
            Download now
            <span className="rounded-full border border-line bg-bg px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[color:var(--td-accent)]">
              beta
            </span>
          </a>
        </div>
      </header>

      {/* Features */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1060px] px-7 pb-[84px] pt-[76px]">
          <div className="mb-9 flex items-baseline gap-3.5">
            <span className="font-mono text-[13px] text-[color:var(--td-accent)]">
              $ ls features/
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.name}
                className="flex flex-col gap-3.5 rounded-xl border border-line bg-bg p-7 transition-colors hover:border-line-hover"
              >
                <div className="flex items-center justify-between">
                  <h2 className="m-0 font-mono text-xl font-bold">
                    {feature.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted">
                    {feature.badge}
                  </span>
                </div>
                <p className="m-0 text-[15px] leading-[1.6] text-muted text-pretty">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core loop */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1060px] px-7 py-[76px]">
          <div className="mb-9 flex items-baseline gap-3.5">
            <span className="font-mono text-[13px] text-[color:var(--td-accent)]">
              $ cat loop.txt
            </span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-line bg-surface px-[38px] py-[34px]">
            <pre className="m-0 font-mono text-[13.5px] leading-[1.7] text-ink">
              {LOOP}
            </pre>
          </div>
          <p className="m-0 mt-5 max-w-[560px] text-[15px] leading-[1.6] text-muted text-pretty">
            Every feature in Relay strengthens this loop. Nothing appears to a
            client that hasn’t passed the approval loop — publishing is an
            explicit act, never a default.
          </p>
        </div>
      </section>

      {/* Quickstart */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1060px] px-7 py-[76px]">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-line bg-bg px-[38px] py-[34px]">
            <div className="flex max-w-[560px] flex-col gap-2">
              <span className="font-mono text-[13px] text-[color:var(--td-accent)]">
                $ relay up
              </span>
              <h2 className="m-0 text-2xl font-semibold tracking-[-0.02em]">
                One command, whole stack.
              </h2>
              <p className="m-0 text-[15px] leading-[1.6] text-muted text-pretty">
                Runtime daemon, Postgres + backend containers, desktop control
                plane. Node ≥ 20, pnpm ≥ 9, Docker. Your RAM still sends its
                thanks.
              </p>
            </div>
            <a
              href="https://github.com/termdx/Relay"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[7px] border border-ink bg-surface px-[22px] py-[13px] font-mono text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              Clone it →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
