import { buildLlmsFullTxt } from "@/lib/llms";

// Exhaustive companion to /llms.txt: every product's features, install
// commands, and FAQ answers in full, for grounding cited answers.
export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
