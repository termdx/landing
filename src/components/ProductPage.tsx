import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Star } from "lucide-react";
import FaqList from "./FaqList";
import FlowDiagram from "./FlowDiagram";
import { StandupFigure } from "./StandupDigest";
import Footer from "./Footer";
import InstallTabs from "./InstallTabs";
import NewsletterForm from "./NewsletterForm";
import ProductNav from "./ProductNav";
import WaitlistButton from "./WaitlistButton";
import Reveal from "./motion/Reveal";
import type { Product } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

type Props = {
  product: Product;
  /**
   * className from a next/font call in the route file. Headings only — body
   * prose stays on Sanchez so a product page still reads as termdx.
   */
  displayFont: string;
};

const SHELL = "mx-auto max-w-[1060px] px-7";

// Every filled/bordered CTA shares this, so a press reads the same everywhere.
const PRESS = "transition-transform active:scale-[0.98]";

function Prompt({ children }: { children: ReactNode }) {
  return (
    <span className="text-[13px] text-[color:var(--td-accent)]">
      {children}
    </span>
  );
}

export default function ProductPage({ product, displayFont }: Props) {
  // Per-page accent, the override globals.css documents.
  const accent = { "--td-accent": product.accent } as CSSProperties;
  const heading = `${displayFont} m-0 font-medium tracking-[-0.02em]`;
  const canonical = `${SITE_URL}/${product.slug}`;

  // Machine-readable page summary for search and answer engines: what the
  // software is, the questions it answers, and where it sits in the site.
  // Only plain-string fields feed it — `description` is a ReactNode and is
  // never serialised. Sanitised per the Next JSON-LD guide.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: product.name,
        url: canonical,
        description: product.seoDescription ?? product.summary,
        applicationCategory: "DeveloperApplication",
        author: { "@id": `${SITE_URL}/#org` },
        publisher: { "@id": `${SITE_URL}/#org` },
        ...(product.repoUrl
          ? {
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              codeRepository: product.repoUrl,
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: product.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "TermDX",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.name,
            item: canonical,
          },
        ],
      },
    ],
  };
  const jsonLdText = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <div style={accent} className="flex min-h-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdText }}
      />
      <ProductNav />

      <main className="flex flex-1 flex-col">
      {/* Hero — animates on mount rather than on scroll, since it's already
          in view. Delays step the eye down the stack. */}
      <header
        className={`${SHELL} flex flex-col items-center pb-[88px] pt-24 text-center`}
      >
        {/* Visible breadcrumb: internal linking for crawlers, orientation
            for readers, and it matches the page's own FAQ JSON-LD above. */}
        <Reveal immediate>
          <nav
            aria-label="Breadcrumb"
            className="mb-7 font-mono text-[12.5px] text-faint"
          >
            <Link href="/" className="transition-colors hover:text-ink">
              termdx
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-muted">
              {product.slug.toLowerCase()}
            </span>
          </nav>
        </Reveal>
        {/* Mark and name read as one lockup. The mark is sized just above the
            heading's cap height so it leads without dwarfing it; a product
            without one simply centres the name. */}
        <Reveal immediate>
          {/* Tight gap on purpose: relay-logo.png carries ~16% transparent
              padding on its right edge, so ~11px of optical space at 72px is
              already baked in before this gap applies. */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {product.logo ? (
              // Decorative: the h1 beside it already names the product.
              <Image
                src={product.logo}
                alt=""
                width={256}
                height={256}
                className="h-14 w-14 shrink-0 sm:h-[72px] sm:w-[72px]"
                // Above the fold. `priority` is deprecated in Next 16; eager
                // is the documented replacement.
                loading="eager"
              />
            ) : null}
            <h1
              className={`${displayFont} m-0 text-[46px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[60px]`}
            >
              {product.name}
            </h1>
          </div>
        </Reveal>

        {/* The tagline carries the hero alone — the long description moved
            down to the "What is …" section, where the question is actually
            asked. mb-9 was on that paragraph, so it moves up here. */}
        <Reveal immediate delay={0.08}>
          <p className="m-0 mt-4 mb-9 max-w-[620px] text-[19px] leading-[1.5] text-ink text-pretty">
            {product.tagline}.
          </p>
        </Reveal>

        {/* Leading action is the repo for the open-source tools and the
            waitlist for the licensed one, so the filled button follows
            whichever this product actually is. */}
        <Reveal immediate delay={0.16}>
          <div className="flex flex-wrap justify-center gap-3">
            {product.repoUrl ? (
              <a
                href={product.repoUrl}
                target="_blank"
                rel="noreferrer"
                className={`${PRESS} inline-flex items-center gap-2 rounded-[7px] bg-ink px-[22px] py-[13px] text-sm text-bg hover:bg-[color:var(--td-accent)] hover:text-white`}
              >
                <Star className="h-4 w-4" fill="currentColor" strokeWidth={0} />{" "}
                on GitHub
              </a>
            ) : null}

            {product.waitlist ? (
              <WaitlistButton
                product={product.slug}
                name={product.name}
                variant={product.repoUrl ? "secondary" : "primary"}
              />
            ) : product.install ? (
              <a
                href="#install"
                className={`${PRESS} group inline-flex items-center gap-2 rounded-[7px] border border-ink bg-surface px-[22px] py-[13px] text-sm text-ink hover:bg-ink hover:text-bg`}
              >
                Install it{" "}
                <span className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            ) : null}

            {product.bookUrl ? (
              <a
                href={product.bookUrl}
                target="_blank"
                rel="noreferrer"
                className={`${PRESS} group inline-flex items-center gap-2 rounded-[7px] border border-ink bg-surface px-[22px] py-[13px] text-sm text-ink hover:bg-ink hover:text-bg`}
              >
                Book a demo{" "}
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            ) : null}
          </div>
        </Reveal>
      </header>

      {/* The product shot sits directly under the hero, which now carries only
          the tagline — the layout the brief pointed at. Built from this
          site's own primitives rather than the referenced shadcn stack. The
          reference's gradient fade is dropped: it bled the frame into the page
          ground, which meant painting over the frame's own bottom border and
          rounded corners. A closed card suits the rest of the site anyway,
          where every surface is a crisp bordered panel. */}
      {product.screenshot ? (
        // Deliberately wider than SHELL's 1060px prose measure: this is a
        // dense app UI, and at the text width its labels stop being legible.
        <div className="mx-auto max-w-[1400px] px-7 pb-[76px]">
          <Reveal immediate delay={0.24}>
            {/* overflow-hidden clips the shot to the same radius, so all four
                corners round together rather than the image squaring them off. */}
            <div className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-24px_rgba(27,29,31,0.22)]">
              <Image
                src={product.screenshot.src}
                alt={product.screenshot.alt}
                width={product.screenshot.width}
                height={product.screenshot.height}
                // Sits in the first viewport on a desktop, so it is the LCP
                // candidate. `priority` is deprecated in Next 16; eager is
                // the documented replacement.
                loading="eager"
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="block h-auto w-full rounded-xl border border-line"
              />
            </div>
          </Reveal>
        </div>
      ) : null}

      {/* Installation options — absent for a product with nothing to install
          yet, which also removes the hero's #install jump above. */}
      {product.install ? (
        // scroll-mt clears the 60px sticky nav when the hero CTA jumps here.
        <section
          id="install"
          className="scroll-mt-[60px] border-t border-line bg-surface"
        >
          <div className={`${SHELL} pb-[84px] pt-[76px]`}>
            <Reveal>
              <Prompt>$ ls install/</Prompt>
              <h2 className={`${heading} mt-3 text-[28px]`}>
                Installation options
              </h2>
              <p className="m-0 mt-3 mb-9 max-w-[620px] text-[15px] leading-[1.6] text-body text-pretty">
                {product.install.lead}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <InstallTabs options={product.install.options} />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Demo section parked, not deleted: the `demo` copy stays in
          lib/products.tsx so restoring it is a revert, not a rewrite. The
          screenshot under the hero stands in for it. */}

      {/* What is <product> */}
      <section id="about" className="border-t border-line bg-surface">
        <div className={`${SHELL} pb-[84px] pt-[76px]`}>
          <Reveal>
            <Prompt>$ cat what-is-{product.slug.toLowerCase()}.txt</Prompt>
            <h2 className={`${heading} mt-3 text-[28px]`}>
              What is {product.name}?
            </h2>
            <p className="m-0 mt-4 max-w-[720px] text-[16px] leading-[1.7] text-body text-pretty">
              {product.whatIs.lead}
            </p>
          </Reveal>

          {/* The output first, then the mechanism. The headline sells a
              standup, so the page should show one before it explains the
              pipeline that produces it. */}
          {product.standup ? <StandupFigure standup={product.standup} /> : null}

          {product.whatIs.diagram ? (
            <Reveal delay={0.08} className="mt-9">
              <FlowDiagram flow={product.whatIs.diagram} />
            </Reveal>
          ) : null}

          {/* One panel of hairline-divided rows rather than a grid of separate
              cards — a wall of equal boxes gave the headline feature the same
              weight as the footnotes. Revealed as a single unit: animating the
              cells independently would slide the dividers they share. */}
          <Reveal delay={0.14} className="mt-9">
            <div className="overflow-hidden rounded-xl border border-line bg-bg md:grid md:grid-cols-2">
              {product.whatIs.points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <article
                    key={point.name}
                    // Borders draw the dividers, so the panel reads as one
                    // surface. Stacked: a rule above every row but the first.
                    // Two-up: that rule belongs to rows 2+, and the right
                    // column gains a left rule. An odd final point would sit
                    // half-width; every product has an even count today.
                    className={[
                      "flex flex-col gap-2.5 border-line p-6 sm:p-7",
                      index > 0 ? "border-t" : "",
                      index === 1 ? "md:border-t-0" : "",
                      index % 2 === 1 ? "md:border-l" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="flex items-center gap-2.5">
                      {Icon ? (
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.9}
                          className="h-[17px] w-[17px] shrink-0 text-[color:var(--td-accent)]"
                        />
                      ) : null}
                      <h3 className="m-0 font-mono text-[15px] font-bold text-ink">
                        {point.name}
                      </h3>
                    </div>
                    <p className="m-0 text-[15px] leading-[1.6] text-body text-pretty">
                      {point.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-line">
        <div className={`${SHELL} py-[76px]`}>
          <Reveal>
            <Prompt>$ man {product.slug.toLowerCase()}</Prompt>
            <h2 className={`${heading} mt-3 mb-7 text-[28px]`}>
              Frequently asked
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <FaqList items={product.faq} />
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section id="subscribe" className="border-t border-line bg-surface">
        <div className={`${SHELL} py-[76px]`}>
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-line bg-bg px-[38px] py-[34px]">
              <div className="flex max-w-[520px] flex-col gap-2">
                <Prompt>
                  $ subscribe --product {product.slug.toLowerCase()}
                </Prompt>
                <h2 className={`${heading} text-2xl`}>
                  Hear about it before your feed does.
                </h2>
                <p className="m-0 text-[15px] leading-[1.6] text-body text-pretty">
                  {product.newsletter}
                </p>
              </div>
              <NewsletterForm product={product.slug} />
            </div>
          </Reveal>
        </div>
      </section>
      </main>

      <Footer currentSlug={product.slug} />
    </div>
  );
}
