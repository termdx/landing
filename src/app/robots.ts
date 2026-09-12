import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The waitlist/signup endpoint is action, not content — nothing to index.
        disallow: "/api/",
      },
      // Answer-engine and AI-research crawlers are explicitly welcome. The
      // default `*` rule already allows them, but naming them makes the
      // intent deliberate and survives a future tightening of the default.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: "termdx.studio",
  };
}
