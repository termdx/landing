import Link from "next/link";
import { products } from "@/lib/products";

const LINK = "text-[12.5px] text-muted transition-colors hover:text-ink";

type Props = {
  /**
   * Set on a product page. That product keeps its own entry; the rest are
   * dropped, so the footer never hands a reader a route to a competing
   * product from inside one.
   */
  currentSlug?: string;
};

export default function Footer({ currentSlug }: Props) {
  const shown = currentSlug
    ? products.filter((product) => product.slug === currentSlug)
    : products;

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1060px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-7 py-[26px]">
        <span className="text-[12.5px] text-faint">© 2026 termdx · exit 0</span>
        {/* The catalog is the most useful thing a footer can surface — the
            old termdx.studio link just pointed at the page you were on.
            Driven off `products` so a new one appears here for free. */}
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {shown.map((product) => (
            <Link key={product.slug} href={`/${product.slug}`} className={LINK}>
              {product.name}
            </Link>
          ))}
          <a
            href="https://github.com/termdx"
            target="_blank"
            rel="noreferrer"
            className={LINK}
          >
            GitHub
          </a>
          <a href="mailto:support@termdx.studio" className={LINK}>
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
}
