import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Play, Star } from "lucide-react";
import FaqList from "./FaqList";
import FlowDiagram from "./FlowDiagram";
import Footer from "./Footer";
import InstallTabs from "./InstallTabs";
import NewsletterForm from "./NewsletterForm";
import ProductNav from "./ProductNav";
import WaitlistButton from "./WaitlistButton";
import Reveal from "./motion/Reveal";
import type { Product } from "@/lib/products";

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

  return (
    <div style={accent} className="flex min-h-full flex-1 flex-col">
      <ProductNav />

      {/* Hero — animates on mount rather than on scroll, since it's already
          in view. Delays step the eye down the stack. */}
      <header
        className={`${SHELL} flex flex-col items-center pb-[88px] pt-24 text-center`}
      >
        {product.logo ? (
          <Reveal immediate>
            <Image
              src={product.logo}
              alt={product.name}
              width={96}
              height={96}
              className="mb-[26px] h-24 w-24"
              priority
            />
          </Reveal>
        ) : null}

        <Reveal immediate delay={0.05}>
          <div className="mb-5 flex items-center justify-center gap-0.5 text-[15px] text-[color:var(--td-accent)]">
            <span className="opacity-[0.65]">$</span>
            <span>&nbsp;{product.prompt}</span>
            <span
              aria-hidden="true"
              className="ml-1.5 inline-block h-[17px] w-2 align-text-bottom bg-[color:var(--td-accent)] [animation:td-blink_1.1s_step-end_infinite]"
            />
          </div>
        </Reveal>

        <Reveal immediate delay={0.1}>
          <h1
            className={`${displayFont} m-0 text-[46px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[60px]`}
          >
            {product.name}
          </h1>
        </Reveal>

        <Reveal immediate delay={0.16}>
          <p className="m-0 mt-4 max-w-[620px] text-[19px] leading-[1.5] text-ink text-pretty">
            {product.tagline}.
          </p>
        </Reveal>

        <Reveal immediate delay={0.22}>
          <p className="m-0 mt-[18px] mb-9 max-w-[560px] text-[17px] leading-[1.6] text-body text-pretty">
            {product.summary}
          </p>
        </Reveal>

        {/* Leading action is the repo for the open-source tools and the
            waitlist for the licensed one, so the filled button follows
            whichever this product actually is. */}
        <Reveal immediate delay={0.28}>
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

      {/* Demo video placeholder */}
      <section id="demo" className="border-t border-line">
        <div className={`${SHELL} py-[76px]`}>
          <Reveal>
            <Prompt>$ play demo.mp4</Prompt>
            <h2 className={`${heading} mt-3 mb-9 text-[28px]`}>See it run</h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              {/* Terminal chrome, so an empty frame still looks deliberate. */}
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-line-hover" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-hover" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-hover" />
                </span>
                <span className="ml-1.5 font-mono text-xs text-faint">
                  {product.demo.caption}
                </span>
              </div>
              {product.demo.src ? (
                // A recording exists — play it inside the same chrome.
                <video
                  src={product.demo.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-bg"
                />
              ) : (
                /* min-h keeps the caption stack from overflowing the frame on a
                   phone, where 16:9 is only ~180px tall. */
                <div className="flex aspect-video min-h-[280px] items-center justify-center bg-bg px-7 py-8">
                  <div className="flex flex-col items-center gap-4 text-center">
                    {/* The ring breathes so the frame reads as waiting for a
                        recording rather than as a broken embed. */}
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-surface text-[color:var(--td-accent)]">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-[color:var(--td-accent)] [animation:td-ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]"
                      />
                      <Play
                        className="ml-0.5 h-5 w-5"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    </span>
                    <span className="font-mono text-[13px] text-faint">
                      demo recording — coming soon
                    </span>
                    <p className="m-0 max-w-[420px] text-[14px] leading-[1.6] text-muted text-pretty">
                      {product.demo.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

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

          {product.whatIs.diagram ? (
            <Reveal delay={0.08} className="mt-9">
              <FlowDiagram flow={product.whatIs.diagram} />
            </Reveal>
          ) : null}

          <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
            {product.whatIs.points.map((point, index) => (
              <Reveal
                key={point.name}
                // Stagger by column pair so a two-up row arrives together-ish
                // rather than as six separate events.
                delay={(index % 2) * 0.06}
                className="h-full"
              >
                <article className="flex h-full flex-col gap-3.5 rounded-xl border border-line bg-bg p-7 transition-colors hover:border-line-hover">
                  <h3 className="m-0 font-mono text-lg font-bold">
                    {point.name}
                  </h3>
                  <p className="m-0 text-[15px] leading-[1.6] text-body text-pretty">
                    {point.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
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

      <Footer />
    </div>
  );
}
