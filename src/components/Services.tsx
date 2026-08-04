import Reveal from "./motion/Reveal";

// What the studio actually sells, in the same mono/body pairing the product
// "What is" cards use.
const OFFERINGS = [
  {
    name: "ai integrations",
    description:
      "Copilots, RAG over your own data, and workflow automation wired into the stack you already run.",
  },
  {
    name: "developer tools",
    description:
      "CLIs, TUIs, and internal platforms — the kind of software we ship for ourselves, built for your team.",
  },
  {
    name: "custom software",
    description:
      "From MVP to production in TypeScript and Rust, built with the same care as our own products.",
  },
];

export default function Services() {
  return (
    // scroll-mt clears the 60px sticky nav when the nav anchor jumps here.
    <section id="services" className="scroll-mt-[60px] border-t border-line">
      <div className="mx-auto max-w-[1060px] px-7 py-16">
        <Reveal className="rounded-xl border border-line bg-surface px-[38px] py-[34px]">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex max-w-[560px] flex-col gap-2">
              <span className="text-[13px] text-[color:var(--td-accent)]">
                $ cat services.txt
              </span>
              <h2 className="m-0 text-2xl tracking-[-0.02em]">
                We also build things for other people.
              </h2>
              <p className="m-0 text-[15px] leading-[1.6] text-body text-pretty">
                AI integrations and custom software solutions. We reply faster
                than your CI pipeline.
              </p>
            </div>
            <a
              href="https://cal.com/termdx.studio"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-[7px] border border-ink bg-bg px-[22px] py-[13px] text-sm text-ink transition-[background-color,color,transform] hover:bg-ink hover:text-bg active:scale-[0.98]"
            >
              Talk to us
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          {/* The banner used to stop at the pitch — the list is what turns a
              skim into a shortlist. */}
          <div className="mt-8 grid grid-cols-1 gap-5 border-t border-line pt-7 sm:grid-cols-3">
            {OFFERINGS.map((offering) => (
              <div key={offering.name} className="flex flex-col gap-1.5">
                <h3 className="m-0 font-mono text-[14px] font-bold text-ink">
                  {offering.name}
                </h3>
                <p className="m-0 text-[13.5px] leading-[1.6] text-body text-pretty">
                  {offering.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
