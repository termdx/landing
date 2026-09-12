import { products, type Product } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

/**
 * Builders for the plain-text site summaries consumed by LLMs and answer
 * engines (`/llms.txt` concise, `/llms-full.txt` exhaustive). Driven from
 * `products` so a new product, install method, or FAQ answer appears here
 * for free — a hand-maintained copy would rot within a release.
 *
 * Only plain-string fields are used. `Product.description` is a ReactNode
 * and deliberately never touched here.
 */

function productUrl(product: Product): string {
  return `${SITE_URL}/${product.slug}`;
}

function productBlurb(product: Product): string {
  const description = product.seoDescription ?? product.summary;
  return `- [${product.name}](${productUrl(product)}): ${product.tagline}. ${description}`;
}

function productFull(product: Product): string {
  const lines: string[] = [
    `## ${product.name}`,
    `${productUrl(product)}`,
    "",
    `${product.tagline}.`,
    "",
    product.seoDescription ?? product.summary,
    "",
    product.whatIs.lead,
  ];

  for (const point of product.whatIs.points) {
    lines.push("", `### ${point.name}`, point.description);
  }

  if (product.install) {
    lines.push("", `### Install — ${product.install.lead}`);
    for (const option of product.install.options) {
      lines.push("", `#### ${option.label} (${option.note})`, `\`${option.command}\``);
    }
  } else if (product.waitlist) {
    lines.push("", "### Access", "Private beta — join the waitlist on the product page.");
  }

  if (product.bookUrl) {
    lines.push("", `Book a demo: ${product.bookUrl}`);
  }
  if (product.repoUrl) {
    lines.push(`Source: ${product.repoUrl} (MIT unless stated otherwise)`);
  }

  lines.push("", "### FAQ");
  for (const item of product.faq) {
    lines.push("", `Q: ${item.question}`, `A: ${item.answer}`);
  }

  return lines.join("\n");
}

/** Concise index: what the studio is, the catalog, where to go next. */
export function buildLlmsTxt(): string {
  return [
    "# TermDX",
    "",
    "> Terminal-native developer tools. No Electron wrappers, no context switching, no leaving the command line.",
    "",
    "TermDX (termdx.studio) is a software studio building AI products, developer tools, and modern software.",
    "",
    "## Products",
    "",
    ...products.map(productBlurb),
    "",
    "## Studio",
    "",
    `- [Home](${SITE_URL}): product catalog, services, and studio newsletter signup.`,
    "- Services: AI integrations (copilots, RAG, workflow automation), developer tools and internal platforms, custom software in TypeScript and Rust.",
    "- Book a call: https://cal.com/termdx.studio",
    "- Support: support@termdx.studio",
    "- GitHub: https://github.com/termdx",
    "",
    "## Full detail",
    "",
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): every product's features, install commands, and FAQ in full.`,
    "",
  ].join("\n");
}

/** Exhaustive reference: full copy for grounding cited answers. */
export function buildLlmsFullTxt(): string {
  return [
    "# TermDX — full reference",
    "",
    "> Everything below is public marketing and documentation copy from termdx.studio, reformatted as plain text for retrieval.",
    "",
    "TermDX (termdx.studio) is a software studio building AI products, developer tools, and modern software: AI integrations, developer tools and internal platforms, and custom software in TypeScript and Rust. Book a call: https://cal.com/termdx.studio. Support: support@termdx.studio.",
    "",
    ...products.flatMap((product) => ["", productFull(product)]),
    "",
  ].join("\n");
}
