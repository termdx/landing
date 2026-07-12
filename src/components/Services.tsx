export default function Services() {
  return (
    <section id="services" className="border-t border-line">
      <div className="mx-auto max-w-[1060px] px-7 py-16">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl border border-line bg-surface px-[38px] py-[34px]">
          <div className="flex max-w-[560px] flex-col gap-2">
            <span className="font-mono text-[13px] text-[color:var(--td-accent)]">
              $ cat services.txt
            </span>
            <h2 className="m-0 text-2xl font-semibold tracking-[-0.02em]">
              We also build things for other people.
            </h2>
            <p className="m-0 text-[15px] leading-[1.6] text-muted text-pretty">
              AI integrations and custom software solutions. We reply faster
              than your CI pipeline.
            </p>
          </div>
          <a
            href="https://cal.com/shivaraj-termdx.studio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[7px] border border-ink bg-bg px-[22px] py-[13px] font-mono text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            Talk to us →
          </a>
        </div>
      </div>
    </section>
  );
}
