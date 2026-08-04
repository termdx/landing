import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * One way to get the thing onto a machine. Rendered as a tab in the install
 * pane, so `label` wants to be one short lowercase token — `note` is where the
 * qualifier goes.
 */
export type InstallOption = {
  label: string;
  /** Requirement, platform, or scope. Sits at the right of the command row. */
  note: string;
  command: string;
};

/** A card in the "What is …" grid. */
export type ProductPoint = {
  name: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** A box in the flow diagram. `accent` marks the one thing everything else points at. */
export type FlowNode = { label: string; detail?: string; accent?: boolean };

/** One left-to-right run. `branch` rows fan out below the spine's last row. */
export type FlowRow = { nodes: FlowNode[]; branch?: boolean };

export type Flow = { rows: FlowRow[]; caption?: string };

export type Product = {
  /**
   * Route segment. Case is part of the URL: Relay's page has always lived at
   * /Relay, and src/proxy.ts redirects the lowercase alias to it.
   */
  slug: string;
  name: string;
  stars?: number;
  badge: string;
  /** Card blurb on the landing page. */
  description: ReactNode;
  /** Public repo. Absent for commercial products — no source to link to. */
  repoUrl?: string;
  /** Sales/demo call for a product you buy rather than clone. */
  bookUrl?: string;
  /** GitHub social-preview image. Absent → the card draws its own panel. */
  ogImage?: string;
  /** Square mark in /public, shown above the product name in the hero. */
  logo?: string;
  /** Per-page --td-accent override; the hook is documented in globals.css. */
  accent: string;
  /** Shell line under the hero mark, printed after a `$`. */
  prompt: string;
  /** Positioning line under the product name. No trailing period. */
  tagline: string;
  /** Hero paragraph. */
  summary: string;
  /** Overrides `summary` for <meta name="description">. */
  seoDescription?: string;
  /** Hero's second CTA opens the waitlist modal instead of pointing at #install. */
  waitlist?: boolean;
  /** Omit to drop the install section entirely — nothing to install yet. */
  install?: {
    lead: string;
    options: InstallOption[];
  };
  demo: {
    /** Title bar of the demo frame's terminal chrome. */
    caption: string;
    /** Body copy under the placeholder while no recording exists. */
    note: string;
    /**
     * Recording (mp4/webm, e.g. /demo-piper.mp4 in /public). Present → the
     * frame plays it; absent → the "coming soon" placeholder draws instead.
     */
    src?: string;
  };
  whatIs: {
    lead: string;
    points: ProductPoint[];
    /** Optional flow figure drawn under the lead. */
    diagram?: Flow;
  };
  faq: FaqItem[];
  newsletter: string;
};

const RELAY_LOOP: Flow = {
  rows: [
    {
      nodes: [{ label: "signal", detail: "commit · PR · meeting · message" }],
    },
    {
      nodes: [
        { label: "client timeline" },
        { label: "knowledge base", detail: "source of truth", accent: true },
      ],
    },
    {
      branch: true,
      nodes: [
        { label: "AI drafts" },
        { label: "you approve" },
        { label: "pushed to your tools" },
      ],
    },
    {
      branch: true,
      nodes: [{ label: "client portal", detail: "+ Relay AI chat" }],
    },
  ],
  caption:
    "Every feature in Relay strengthens this loop. Nothing reaches a client that hasn't passed the approval step — publishing is an explicit act, never a default.",
};

export const products: Product[] = [
  {
    slug: "piper",
    name: "piper",
    stars: 22,
    badge: "TypeScript",
    description:
      "Never leave your terminal to test your API again. Postman can keep the mouse.",
    repoUrl: "https://github.com/termdx/piper",
    ogImage:
      "https://repository-images.githubusercontent.com/1026284063/4ba3053b-39af-49ff-b45b-cc689dc4b830",
    accent: "#0052c9",
    prompt: "piper",
    tagline: "A keyboard-driven API client for your terminal",
    summary:
      "A fast, keyboard-driven API client that runs where you already are. Tab between panels, edit headers and bodies in popups, search your history, read syntax-highlighted JSON — and never reach for the mouse. Postman can keep it.",
    install: {
      lead: "piper runs on Bun. Install it, then type piper to launch the TUI.",
      options: [
        {
          label: "bun",
          note: "global",
          command: "bun install -g @termdx/piper",
        },
        {
          label: "source",
          note: "Bun · MIT",
          command: "git clone https://github.com/termdx/piper",
        },
      ],
    },
    demo: {
      caption: "piper — Ctrl+Enter to send",
      note: "A recording of the TUI in flight: tab, edit, send, read. Until then the README carries the full keymap.",
    },
    whatIs: {
      lead: "piper is an interactive API client that runs inside your terminal, built on OpenTUI. It's protocol-agnostic by design — it starts with HTTP, and chaining, WebSocket streaming, and saved collections are what it grows into. Everything is a keystroke: no mouse, no window management, no context switch.",
      points: [
        {
          name: "interactive TUI",
          description:
            "Tab through panels, edit headers and body in popups, navigate history with search. Ctrl+/ prints the whole keymap when your fingers forget.",
        },
        {
          name: "highlighted JSON",
          description:
            "Request and response bodies are pretty-printed and colour-coded, so a payload is something you read rather than decode.",
        },
        {
          name: "history",
          description:
            "URLs autocomplete from your past requests as you type. The endpoint you hit forty times yesterday is two keystrokes away today.",
        },
        {
          name: "one-key exports",
          description:
            "Copy the current request as cURL, or yank response text straight to the clipboard. Handing a repro to someone costs one keystroke.",
        },
        {
          name: "themes",
          description:
            "Tokyo Night, Catppuccin, Nord, Gruvbox and more, switched with Ctrl+T. It should match the rest of your terminal, not fight it.",
        },
        {
          name: "protocol-agnostic",
          description:
            "HTTP today. Request chaining — piping one response into the next like Unix pipes — plus WebSocket streaming and collections with variables are next.",
        },
      ],
    },
    faq: [
      {
        question: "Do I need Bun?",
        answer:
          "Yes — piper runs on Bun, so bun install -g @termdx/piper is the install path. Once it's on your PATH, plain piper launches it.",
      },
      {
        question: "Is there a mouse mode?",
        answer:
          "There's no need for one. Tab and Shift+Tab cycle panels, Ctrl+Enter sends, Ctrl+M picks the method, Ctrl+B and Ctrl+H open the body and header editors. Ctrl+/ shows the rest.",
      },
      {
        question: "Can I get a request back out as cURL?",
        answer:
          "Ctrl+E exports the current request as a cURL command, and Ctrl+Y yanks selected response text to the clipboard — for the pull request, the bug report, or the colleague who doesn't have piper yet.",
      },
      {
        question: "Does it do WebSockets, chaining, or collections?",
        answer:
          "Not yet, and it's honest about that: those are the next three things on the roadmap. Chaining pipes one response into the next, WebSockets stream in real time, and collections bring saved requests with variable substitution.",
      },
      {
        question: "Is it open source?",
        answer:
          "Yes — MIT, on GitHub. Issues and pull requests are read by people who use it daily.",
      },
    ],
    newsletter:
      "Release notes when piper ships something worth your attention. A few emails a year, all of them changelog.",
  },
  {
    slug: "codrop",
    name: "codrop",
    badge: "Rust · MIT",
    description: (
      <>
        A Dropbox for devs: code, environments, and .envs auto-synced across
        every machine. <span className="font-mono text-[13.5px]">git pull</span>{" "}
        is now decorative.
      </>
    ),
    repoUrl: "https://github.com/termdx/Codrop",
    ogImage:
      "https://repository-images.githubusercontent.com/1281539138/e503672e-6acc-4a45-b031-7f3a3d05a3b5",
    accent: "#b8430f",
    prompt: "codrop run",
    tagline: "Your working state, on every machine you own",
    summary:
      "codrop keeps code, environments, and .env files in step across every machine you work from. Laptop, desktop, the box under the desk — pick one up and it's already where you left off. git pull is now decorative.",
    install: {
      lead: "Unix-only: prebuilt binaries for macOS (Apple Silicon and Intel) and Linux x86-64. Install it on each machine you want in the set, then check it took with codrop --version.",
      options: [
        {
          label: "curl",
          note: "macOS · Linux",
          command:
            "curl --proto '=https' --tlsv1.2 -LsSf https://github.com/termdx/Codrop/releases/latest/download/codrop-installer.sh | sh",
        },
        {
          label: "brew",
          note: "macOS · Linux",
          command: "brew install termdx/tap/codrop",
        },
        {
          label: "cargo",
          note: "Rust ≥ 1.91",
          command: "cargo install codrop",
        },
        {
          label: "source",
          note: "MIT",
          command: "git clone https://github.com/termdx/Codrop.git",
        },
      ],
    },
    demo: {
      caption: "codrop — two machines, one working tree",
      note: "A recording of the boring miracle: save on one machine, open on the other.",
    },
    whatIs: {
      lead: "codrop is a Rust daemon that watches a folder, content-addresses every change, and syncs it to your other devices over an encrypted peer-to-peer connection. Devices are identified and authenticated by public key, so you never deal with IP addresses — and it works across LAN, NAT, and hostile café Wi-Fi. It isn't a replacement for git. It's the layer underneath, where your half-finished branch and your .env file live.",
      points: [
        {
          name: "live, not committed",
          description:
            "Git records commits; codrop mirrors your working folder in real time. An edit on the laptop shows up on the desktop about a second later — new files, changes, deletes.",
        },
        {
          name: "encrypted p2p",
          description:
            "Devices talk directly, addressed and authenticated by Ed25519 public key. Connectivity escalates direct → hole-punched → relayed, so no server sits in the middle by default.",
        },
        {
          name: "conflicts preserved",
          description:
            "Vector clocks — not wall-clock time — order changes, so a newer edit is distinguishable from a concurrent one. One version wins the path; the other is kept under .codrop/conflicts/.",
        },
        {
          name: "only changed chunks move",
          description:
            "Files are split into content-defined chunks stored by hash, so a small edit to a large file transfers a chunk or two, and identical content is deduplicated across files and versions.",
        },
        {
          name: "sane ignores",
          description:
            "node_modules, .git, target, dist, build, and .next are excluded out of the box; gitignore syntax covers the rest. It's the escape hatch for secrets, too.",
        },
        {
          name: "unix, and honest about it",
          description:
            "Exec bits and symlinks travel with the file, and deletes propagate as tombstones. The daemon leans on Unix process APIs, so Windows means WSL.",
        },
      ],
    },
    faq: [
      {
        question: "Isn't this what git is for?",
        answer:
          "Git records commits. codrop mirrors your working folder in real time. Use both: git for history, PRs, and blame; codrop for the uncommitted stuff between commits — the state you'd otherwise shuttle around with git stash, a USB stick, or a desperate Slack file drop.",
      },
      {
        question: "How do two machines find each other?",
        answer:
          "Not by IP address. Each folder has a stable endpoint id — run codrop id to print it — and pairing is mutual: run codrop pair with the other machine's id on both sides, then codrop run. More than two machines pair with each other to form a mesh.",
      },
      {
        question: "Does node_modules sync?",
        answer:
          "No. node_modules, .git, target, dist, build, and .next are ignored by default. Anything else you want kept local goes in .codropignore, which takes gitignore syntax.",
      },
      {
        question: "Who can read my files?",
        answer:
          "Traffic is end-to-end encrypted between devices you've explicitly paired, and a daemon only accepts trusted peers. Blobs are stored unencrypted at rest under .codrop/, though — so don't sync secrets to a device you don't control, and use codrop ignore to keep a file on one machine.",
      },
      {
        question: "Which platforms are supported?",
        answer:
          "Prebuilt binaries for macOS on Apple Silicon and Intel, and Linux x86-64. Linux arm64 and musl build from source. Windows isn't supported — the daemon relies on Unix process and file-permission APIs — so it means WSL, give or take.",
      },
      {
        question: "What's the licence?",
        answer:
          "MIT. Read the source, fork it, run it on hardware we've never heard of.",
      },
    ],
    newsletter:
      "Occasional notes on what codrop learned to sync this month. No drip campaign, no re-engagement emails.",
  },
  {
    slug: "Relay",
    name: "Relay",
    badge: "self-hosted · licensed",
    description:
      "The operating system for client work: one timeline per client, a knowledge base that answers “where are we?”, and a portal your clients actually open.",
    // Commercial and closed-source: no repo to link, a call to book instead.
    bookUrl: "https://cal.com/termdx.studio",
    logo: "/relay-logo.png",
    accent: "#7C5CFF",
    prompt: "relay up",
    tagline: "The operating system for client work",
    summary:
      "Relay connects the tools you already ship with into one timeline per client, a knowledge base that answers “where are we?”, and a portal where your clients watch it all happen. AI drafts, you approve.",
    seoDescription:
      "Relay connects the tools you already ship with into one timeline per client, a knowledge base that answers 'where are we?', and a client portal with an AI that knows your project. Self-hosted.",
    waitlist: true,
    // No install section: Relay is private beta, and the waitlist is the only
    // way in until the repo opens up.
    demo: {
      caption: "Relay — timeline, portal, approval loop",
      note: "A walkthrough of one signal travelling the whole loop. Recording soon; the waitlist gets it first.",
    },
    whatIs: {
      lead: "Relay is the orchestration and knowledge layer over the tools you already ship with. Every commit, PR, meeting, and message lands on a client timeline, gets embedded into a per-project knowledge base, and comes back out as answers with citations — for you in the app, for your client in a portal on your own domain. Nothing reaches a client until a human approves it.",
      diagram: RELAY_LOOP,
      points: [
        {
          name: "timeline",
          description:
            "Every commit, PR, meeting, todo, and decision captured against a client and project. “Where are we?” stops being a meeting.",
        },
        {
          name: "knowledge engine",
          description:
            "Everything tracked is embedded into a per-project knowledge base — the source of truth. Relay AI answers with citations, scoped in SQL, never in prompts.",
        },
        {
          name: "client portal",
          description:
            "relay.yourcompany.com — your clients see live progress, approve work, and ask Relay AI anything about their project. Your branding, your domain.",
        },
        {
          name: "approval loop",
          description:
            "AI drafts, humans decide. Issues land on GitHub, emails get sent — only after you hit approve. External writes are durable and retried.",
        },
        {
          name: "integrations",
          description:
            "GitHub, GitLab, Bitbucket, Slack, Discord, SMTP. Events flow in, notifications flow out — normalized at the edge, never vendor payloads.",
        },
        {
          name: "self-hosted runtime",
          description:
            "Declarative YAML manifests become docker-compose: modules, integrations, encrypted secrets. Your stack, your data, your client's trust.",
        },
      ],
    },
    faq: [
      {
        question: "Is Relay self-hosted?",
        answer:
          "Yes. Declarative YAML manifests compile to docker-compose — modules, integrations, encrypted secrets — and the whole stack runs on infrastructure you control. Client data never has to leave it.",
      },
      {
        question: "Which tools does it connect to?",
        answer:
          "GitHub, GitLab, Bitbucket, Slack, Discord, and SMTP. Events are normalized at the edge, so the timeline stores Relay's own shape rather than whatever a vendor's webhook happened to send.",
      },
      {
        question: "Does the AI act on my tools by itself?",
        answer:
          "No. AI drafts; humans decide. Issues get filed and emails get sent only after you approve them, and external writes go through a durable outbox that retries rather than losing the work.",
      },
      {
        question: "What do clients actually see?",
        answer:
          "A portal on your domain with your branding: live progress, work waiting on their approval, and a chat with Relay AI that answers from their project's knowledge base — with citations, scoped to their project in SQL.",
      },
      {
        question: "How is Relay licensed?",
        answer:
          "Relay is commercial software, not open source. You buy a licence and run the stack on your own infrastructure — the source stays ours, the deployment and the client data stay yours.",
      },
      {
        question: "Can I use it yet?",
        answer:
          "It's in private beta. Join the waitlist or book a call, and we'll come back to you with access, licensing, and what it costs.",
      },
    ],
    newsletter:
      "Build notes from Relay as it comes together, plus first word when licences open up.",
  },
];

export function getProduct(slug: string): Product {
  const product = products.find((candidate) => candidate.slug === slug);
  if (!product) {
    // A page file passed a slug that isn't in this list — a build-time typo,
    // not a runtime condition.
    throw new Error(`Unknown product slug: ${slug}`);
  }
  return product;
}

/** Slugs a signup is allowed to attribute itself to (see api/waitlist). */
export const productSlugs = products.map((product) => product.slug);

export function productMetadata(product: Product): Metadata {
  const title = `${product.name} — ${product.tagline}`;
  const description = product.seoDescription ?? product.summary;

  return {
    title,
    description,
    alternates: { canonical: `/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `https://termdx.studio/${product.slug}`,
      siteName: "TermDX",
      type: "website",
      ...(product.ogImage ? { images: [{ url: product.ogImage }] } : {}),
    },
  };
}
