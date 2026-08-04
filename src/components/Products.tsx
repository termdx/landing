import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Star } from "lucide-react";
import Reveal from "./motion/Reveal";
import { products } from "@/lib/products";

// A star count only persuades once it's worth bragging about. Below this the
// number reads as anti-social-proof, so the badge shows the language alone.
const MIN_STARS = 100;

export default function Products() {
  return (
    // scroll-mt clears the 60px sticky nav when the nav/hero anchors jump here.
    <section id="products" className="scroll-mt-[60px] border-t border-line bg-surface">
      <div className="mx-auto max-w-[1060px] px-7 pb-[84px] pt-[76px]">
        <Reveal>
          <div className="mb-9">
            <span className="text-[13px] text-[color:var(--td-accent)]">
              $ ls products/
            </span>
            {/* Real heading for structure and SEO — the prompt line above is
                decoration. */}
            <h2 className="m-0 mt-3 text-[28px] tracking-[-0.02em] text-ink">
              The product catalog
            </h2>
          </div>
        </Reveal>

        {/* Three products: 3-up on desktop so nothing strands a hole in the
            grid, 2-up on tablet, stacked on a phone. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal
              key={product.slug}
              delay={(index % 3) * 0.06}
              lift
              className="h-full"
            >
              {/* The whole card is the link to the product page. It
                  deliberately holds no inner anchors — nesting one inside a
                  Link is invalid markup, and the inner target would swallow
                  the card's click.

                  --td-accent is overridden per card, so the prompt and the cd
                  line carry the product's own colour (the same variable its
                  product page runs on). */}
              <Link
                href={`/${product.slug}`}
                style={{ "--td-accent": product.accent } as CSSProperties}
                className="group flex h-full flex-col gap-3.5 rounded-xl border border-line bg-bg p-7 transition-colors hover:border-line-hover"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="m-0 font-mono text-xl font-bold">
                    {product.name}
                  </h3>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted">
                    {product.stars != null && product.stars >= MIN_STARS && (
                      <>
                        <Star
                          className="h-3 w-3"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                        {product.stars} ·{" "}
                      </>
                    )}
                    {product.badge}
                  </span>
                </div>

                <p className="m-0 text-[15px] leading-[1.6] text-body text-pretty">
                  {product.description}
                </p>

                {/* Every card draws the same mini terminal: a title bar with
                    the slug and a prompt line with the product's launch
                    command. This replaced the GitHub social previews, whose
                    dark artwork fought the light page — and whose absence on
                    Relay made that card look unfinished. ogImage stays in the
                    data, but only for OG meta tags now. */}
                <div className="mt-auto flex aspect-[2/1] flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors group-hover:border-line-hover">
                  <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-line-hover" />
                      <span className="h-2 w-2 rounded-full bg-line-hover" />
                      <span className="h-2 w-2 rounded-full bg-line-hover" />
                    </span>
                    <span className="ml-1 font-mono text-[11px] text-faint">
                      {product.slug.toLowerCase()}/
                    </span>
                  </div>
                  <div className="flex flex-1 items-center px-4">
                    <span className="font-mono text-[13px] text-ink">
                      <span className="text-[color:var(--td-accent)]">$</span>{" "}
                      {product.prompt}
                      <span
                        aria-hidden="true"
                        className="ml-1.5 inline-block h-[13px] w-[7px] align-text-bottom bg-[color:var(--td-accent)] [animation:td-blink_1.1s_step-end_infinite]"
                      />
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 font-mono text-[13.5px] font-medium text-[color:var(--td-accent)]">
                  cd {product.slug}/
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
