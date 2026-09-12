/**
 * Single source of truth for the absolute URLs the SEO/AEO layer emits.
 * sitemap.ts, robots.ts, llms.txt routes, JSON-LD, and the footer's Ask-AI
 * links all build from here so the origin can never drift between them.
 */
export const SITE_URL = "https://termdx.studio";
export const SITE_NAME = "TermDX";

/** Prefilled question used for the footer's "Ask your AI" links. */
export function askPromptFor(currentSlug?: string): string {
  switch (currentSlug) {
    case "piper":
      return "What is piper by TermDX (https://termdx.studio/piper)? What does this terminal API client do, and is it right for me?";
    case "codrop":
      return "What is codrop by TermDX (https://termdx.studio/codrop)? How does its encrypted peer-to-peer folder sync work, and is it right for me?";
    case "Relay":
      return "What is Relay by TermDX (https://termdx.studio/Relay)? How does its automated-standup and client-portal platform work, and is it right for my agency?";
    default:
      return "What is TermDX (https://termdx.studio)? Summarize its products — piper, codrop, and Relay — and who each one is for.";
  }
}

export type AskTarget = {
  label: string;
  href: string;
  /** Brand colour the footer link blooms into on hover. */
  color: string;
  icon: "chatgpt" | "claude" | "perplexity";
};

/**
 * "Ask your AI" deep links. Each target honours a `?q=` prefill parameter,
 * so the link opens the assistant with the question already asked — the
 * visitor only has to read the cited answer.
 */
export function askLinks(question: string): AskTarget[] {
  const q = encodeURIComponent(question);
  return [
    {
      label: "ChatGPT",
      href: `https://chatgpt.com/?q=${q}`,
      color: "#10a37f",
      icon: "chatgpt",
    },
    {
      label: "Claude",
      href: `https://claude.ai/new?q=${q}`,
      color: "#d97757",
      icon: "claude",
    },
    {
      label: "Perplexity",
      href: `https://www.perplexity.ai/search?q=${q}`,
      color: "#20b8cd",
      icon: "perplexity",
    },
  ];
}
