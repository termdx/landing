import Link from "next/link";
import type { CSSProperties } from "react";
import { products } from "@/lib/products";
import { askLinks, askPromptFor } from "@/lib/seo";
import { ChatGptIcon, ClaudeIcon, PerplexityIcon } from "./LlmIcons";

const LINK = "text-[12.5px] text-muted transition-colors hover:text-ink";
// Section titles speak in the body serif, not the terminal mono — the footer
// is a signpost, not a shell session.
const HEADING = "m-0 mb-3 text-[15px] text-ink";

const ASK_ICONS = {
  chatgpt: ChatGptIcon,
  claude: ClaudeIcon,
  perplexity: PerplexityIcon,
} as const;

type Props = {
  /**
   * Set on a product page. That product keeps its own entry; the rest are
   * dropped, so the footer never hands a reader a route to a competing
   * product from inside one. The Ask-AI prompt also narrows to this product.
   */
  currentSlug?: string;
};

export default function Footer({ currentSlug }: Props) {
  const shown = currentSlug
    ? products.filter((product) => product.slug === currentSlug)
    : products;
  // Prefilled assistant links: each opens with the question already asked,
  // grounded on this page's own canonical URL, so the answer cites us.
  const ask = askLinks(askPromptFor(currentSlug));

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-[1060px] px-7 pb-8 pt-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {/* Studio blurb — the one thing a footer can say that no nav can. */}
          <div>
            <p className={HEADING}>TermDX</p>
            <p className="m-0 max-w-[220px] text-[12.5px] leading-[1.6] text-muted">
              Sharp tools for sharp developers. Terminal-native, no Electron
              wrappers.
            </p>
          </div>

          {/* The catalog is the most useful thing a footer can surface — the
              old termdx.studio link just pointed at the page you were on.
              Driven off `products` so a new one appears here for free. */}
          <nav aria-label="Products">
            <p className={HEADING}>Products</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {shown.map((product) => (
                <li key={product.slug} className="m-0 p-0">
                  <Link
                    href={`/${product.slug}`}
                    className={LINK}
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Studio">
            <p className={HEADING}>Studio</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              <li className="m-0 p-0">
                <a
                  href="https://github.com/termdx"
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  GitHub
                </a>
              </li>
              <li className="m-0 p-0">
                <a href="mailto:support@termdx.studio" className={LINK}>
                  Support
                </a>
              </li>
              <li className="m-0 p-0">
                <a
                  href="https://cal.com/termdx.studio"
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </nav>

          {/* AEO: prefilled prompts send the visitor's assistant straight to
              an answer grounded on our own pages — each link carries the
              canonical URL in the question, so citations point back here.
              The mark and label rest in muted and bloom into the vendor's
              own brand colour on hover. */}
          <nav aria-label="Ask AI about TermDX">
            <p className={HEADING}>Ask your AI</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {ask.map((target) => {
                const Icon = ASK_ICONS[target.icon];
                return (
                  <li key={target.label} className="m-0 p-0">
                    <a
                      href={target.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ "--ask": target.color } as CSSProperties}
                      className="group inline-flex items-center gap-2 text-[12.5px] text-muted transition-colors hover:text-[color:var(--ask)]"
                    >
                      <Icon className="h-[15px] w-[15px] shrink-0 transition-colors group-hover:text-[color:var(--ask)]" />
                      Ask {target.label}
                    </a>
                  </li>
                );
              })}
              <li className="m-0 p-0">
                <Link href="/llms.txt" className={LINK}>
                  llms.txt
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar: legal line plus machine-readable entry points, so both
            readers and crawlers find the sitemap, crawler rules, and the
            full plain-text reference without guessing URLs. */}
        <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-5">
          <span className="text-[12.5px] text-faint">
            © 2026 termdx · exit 0
          </span>
          <nav
            aria-label="Machine-readable site maps"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            <Link href="/sitemap.xml" className={LINK}>
              Sitemap
            </Link>
            <Link href="/robots.txt" className={LINK}>
              robots.txt
            </Link>
            <Link href="/llms.txt" className={LINK}>
              llms.txt
            </Link>
            <Link href="/llms-full.txt" className={LINK}>
              llms-full.txt
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
