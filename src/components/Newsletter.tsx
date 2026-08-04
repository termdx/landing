import NewsletterForm from "./NewsletterForm";
import Reveal from "./motion/Reveal";

/**
 * Studio-wide subscribe panel for the landing page. Posts to the same
 * /api/waitlist webhook as everything else, attributed to product "termdx"
 * (the route allowlists that key for exactly this panel).
 */
export default function Newsletter() {
  return (
    <section id="subscribe" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1060px] px-7 py-[76px]">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-line bg-bg px-[38px] py-[34px]">
            <div className="flex max-w-[520px] flex-col gap-2">
              <span className="text-[13px] text-[color:var(--td-accent)]">
                $ subscribe --studio
              </span>
              <h2 className="m-0 text-2xl tracking-[-0.02em]">
                Ship notes, occasionally.
              </h2>
              <p className="m-0 text-[15px] leading-[1.6] text-body text-pretty">
                What we&rsquo;re building, what shipped, and what we learned
                breaking it. A few emails a year, all signal.
              </p>
            </div>
            <NewsletterForm product="termdx" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
