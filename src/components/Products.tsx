import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Star } from "lucide-react";
import Reveal from "./motion/Reveal";
import { products, type Flow, type FlowNode, type Product } from "@/lib/products";

// A star count only persuades once it's worth bragging about. Below this the
// number reads as anti-social-proof, so the card shows its categories alone.
const MIN_STARS = 100;

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] text-muted">
      {children}
    </span>
  );
}

/** What the product is, in three chips. Stars lead when there are enough of
    them to be worth saying. */
function Badges({ product }: { product: Product }) {
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      {product.stars != null && product.stars >= MIN_STARS ? (
        <Chip>
          <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
          {product.stars}
        </Chip>
      ) : null}
      {product.badges.map((badge) => (
        <Chip key={badge}>{badge}</Chip>
      ))}
    </span>
  );
}

/**
 * One stop on the loop. The accented node is the only bordered token in the
 * readout, so the eye lands on the source of truth everything else feeds.
 */
function Step({ node }: { node: FlowNode }) {
  if (node.accent) {
    return (
      <span className="inline-flex items-baseline gap-1.5 rounded-[5px] border border-[color:var(--td-accent)] bg-bg px-2 py-0.5 text-[color:var(--td-accent)]">
        {node.label}
        {node.detail ? <span className="opacity-70">{node.detail}</span> : null}
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-1.5 text-ink">
      {node.label}
      {node.detail ? <span className="text-faint">{node.detail}</span> : null}
    </span>
  );
}

/** One row of the loop. Wraps at an arrow, so a phone breaks it mid-chain
    rather than overflowing the card. */
function Chain({ nodes }: { nodes: FlowNode[] }) {
  return (
    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5 font-mono text-[12px] leading-[1.5]">
      {nodes.map((node, index) => (
        <Fragment key={node.label}>
          {index > 0 ? (
            <span aria-hidden="true" className="text-line-hover">
              &rarr;
            </span>
          ) : null}
          <Step node={node} />
        </Fragment>
      ))}
    </span>
  );
}

/** Vertical hop between rows. 12px wide so its line lands on x = 6px, which is
    where the branch rail below picks it up. */
function Rail() {
  return (
    <span aria-hidden="true" className="flex h-4 w-3 shrink-0 justify-center">
      <span className="w-px bg-line-strong" />
    </span>
  );
}

/**
 * The featured product's loop, compressed for a card. Same rows as the full
 * FlowDiagram on the product page — including the approval branch, which is
 * the whole pitch — but drawn as mono output lines instead of boxes, since a
 * ~430px column can't hold a three-box chain without breaking mid-arrow.
 */
function LoopReadout({ flow }: { flow: Flow }) {
  const spine = flow.rows.filter((row) => !row.branch);
  const branches = flow.rows.filter((row) => row.branch);

  return (
    // Decorative: folding this into the card's link name would bury the pitch
    // under a diagram. The description below carries the point in prose, and
    // the product page renders the same flow as a real <figure>.
    // Capped below lg, where the card is one column: the readout's longest
    // line is ~400px, so a full-width frame would be mostly empty. The cap
    // lands it on roughly the same measure as the prose above it.
    <div
      aria-hidden="true"
      className="max-w-[480px] overflow-hidden rounded-lg border border-line bg-surface lg:max-w-none"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line-hover" />
          <span className="h-2 w-2 rounded-full bg-line-hover" />
          <span className="h-2 w-2 rounded-full bg-line-hover" />
        </span>
        <span className="ml-1.5 font-mono text-[11.5px] text-faint">
          one signal, end to end
        </span>
      </div>

      <div className="flex flex-col px-4 py-4">
        {spine.map((row, index) => (
          <Fragment key={row.nodes[0].label}>
            {index > 0 ? <Rail /> : null}
            <Chain nodes={row.nodes} />
          </Fragment>
        ))}

        {branches.length > 0 ? (
          <>
            <Rail />
            <div className="ml-[6px] flex flex-col">
              {branches.map((row, index) => (
                <div key={row.nodes[0].label} className="flex items-stretch">
                  {/* ├ / └ elbow: the top half turns into the row, the bottom
                      half carries the rail on to the next branch. */}
                  <span
                    aria-hidden="true"
                    className="flex w-4 shrink-0 flex-col"
                  >
                    <span className="flex-1 rounded-bl-[5px] border-b border-l border-line-strong" />
                    <span
                      className={`flex-1 ${
                        index < branches.length - 1
                          ? "border-l border-line-strong"
                          : ""
                      }`}
                    />
                  </span>
                  <div className="py-1.5 pl-2.5">
                    <Chain nodes={row.nodes} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The hybrid catalog: the commercial product gets a wide feature card with its
 * loop read out beside the copy; the open-source CLIs are terminal windows —
 * title bar, one session line, description as output.
 */
export default function Products() {
  // No repo means you buy it rather than clone it — that's the feature card.
  const featured = products.find((product) => !product.repoUrl);
  const rest = products.filter((product) => product !== featured);

  return (
    // scroll-mt clears the 60px sticky nav when the nav/hero anchors jump here.
    <section
      id="products"
      className="scroll-mt-[60px] border-t border-line bg-surface"
    >
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

        <div className="flex flex-col gap-6">
          {featured ? (
            <Reveal lift className="h-full">
              {/* The whole card is the link. It deliberately holds no inner
                  anchors — nesting one inside a Link is invalid markup, and
                  the inner target would swallow the card's click. */}
              <Link
                href={`/${featured.slug}`}
                style={{ "--td-accent": featured.accent } as CSSProperties}
                className="group grid gap-7 rounded-xl border border-line bg-bg p-7 transition-colors hover:border-line-hover sm:p-9 lg:grid-cols-[1.1fr_1fr] lg:items-center"
              >
                <div className="flex flex-col items-start gap-3.5">
                  {/* The one thing the badge can't say: you can't buy it yet.
                      The dot stays still — td-ping only scales to 1.5x, which
                      on a 6px dot is a 1.5px halo that reads as flicker, not
                      as a pulse. It earns its keep on the 56px demo ring. */}
                  <span className="inline-flex items-center gap-2 font-mono text-[11.5px] text-[color:var(--td-accent)]">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--td-accent)]"
                    />
                    private beta
                  </span>

                  <div className="flex items-center gap-2.5">
                    {featured.logo ? (
                      // Decorative: the name it marks is the next element, so
                      // an alt would just repeat it.
                      <Image
                        src={featured.logo}
                        alt=""
                        width={256}
                        height={256}
                        className="h-8 w-8 shrink-0"
                      />
                    ) : null}
                    <h3 className="m-0 font-mono text-xl font-bold">
                      {featured.name}
                    </h3>
                  </div>

                  <Badges product={featured} />

                  <p className="m-0 max-w-[440px] text-[15px] leading-[1.6] text-body text-pretty">
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[13.5px] font-medium text-[color:var(--td-accent)]">
                    cd {featured.slug}/
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>

                {featured.whatIs.diagram ? (
                  <LoopReadout flow={featured.whatIs.diagram} />
                ) : null}
              </Link>
            </Reveal>
          ) : null}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {rest.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.06} lift className="h-full">
                <Link
                  href={`/${product.slug}`}
                  style={{ "--td-accent": product.accent } as CSSProperties}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-hover"
                >
                  <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-line-hover" />
                      <span className="h-2 w-2 rounded-full bg-line-hover" />
                      <span className="h-2 w-2 rounded-full bg-line-hover" />
                    </span>
                    <span className="ml-1.5 font-mono text-[11.5px] text-faint">
                      ~/products/{product.slug}/
                    </span>
                  </div>

                  {/* The GitHub social preview is the window's screen; cards
                      without one (none today) fall through to the name. */}
                  {product.ogImage ? (
                    <Image
                      src={product.ogImage}
                      alt={`${product.name} on GitHub`}
                      width={1280}
                      height={640}
                      className="block h-auto w-full border-b border-line"
                      sizes="(max-width: 640px) 100vw, 490px"
                    />
                  ) : null}

                  <div className="flex flex-1 flex-col gap-3 px-5 py-5">
                    {/* Carries the name now that the $ prompt line is gone —
                        one step down from the featured card's, so the catalog
                        still has a lead. */}
                    <h3 className="m-0 font-mono text-lg font-bold text-ink">
                      {product.name}
                    </h3>
                    <p className="m-0 text-[14.5px] leading-[1.6] text-body text-pretty">
                      {product.description}
                    </p>
                  </div>

                  {/* Three chips plus the cd link overrun one row on a narrow
                      card, so the link drops below them rather than squeezing. */}
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5 border-t border-line px-5 py-3.5">
                    <Badges product={product} />
                    {/* ml-auto keeps the link on the right once it wraps onto
                        its own line, where justify-between no longer holds it
                        there — a lone flex item starts its line. */}
                    <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[12.5px] text-faint transition-colors group-hover:text-[color:var(--td-accent)]">
                      cd {product.slug}/
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
