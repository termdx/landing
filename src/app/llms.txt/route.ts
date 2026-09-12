import { buildLlmsTxt } from "@/lib/llms";

// Concise plain-text site summary for LLMs, per the llmstxt.org convention:
// served at /llms.txt with a text/plain content type so crawlers and
// assistants ingest it as text rather than sniffing it as HTML.
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
