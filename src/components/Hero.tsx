import localFont from "next/font/local";
import Reveal from "./motion/Reveal";

// Self-hosted JetBrains Mono subset containing the block/half-block glyphs
// the Google web subset omits — keeps the ASCII banner from falling back to a
// mismatched system font (which caused overlapping rows).
const bannerFont = localFont({
  src: "../app/fonts/JetBrainsMono-Banner.woff2",
  weight: "700",
  display: "swap",
});

const ASCII = `▄▄▄▄▄▄▄▄▄                   ▄▄▄▄▄▄   ▄▄▄   ▄▄▄
▀▀▀███▀▀▀                   ███▀▀██▄ ████▄████
  ███ ▄█▀█▄ ████▄ ███▄███▄ ███  ███  ▀█████▀
   ███ ██▄█▀ ██ ▀▀ ██ ██ ██ ███  ███ ▄███████▄
   ███ ▀█▄▄▄ ██    ██ ██ ██ ██████▀  ███▀ ▀███`;

export default function Hero() {
  return (
    <header className="mx-auto flex max-w-[1060px] flex-col items-center px-7 pb-[88px] pt-24 text-center">
      <Reveal immediate>
        <pre
          aria-hidden="true"
          // Integer-pixel cell sizing (JetBrains Mono cell = 0.6em → 6px at 10px,
          // 12px at 20px) keeps the block glyphs tiling seamlessly; a fractional
          // size (e.g. 13px → 7.8px cells) produces anti-aliased seams and
          // per-row horizontal drift. leading-none makes the half-blocks touch.
          className={`${bannerFont.className} m-0 mb-[34px] select-none overflow-hidden text-[10px] leading-none text-ink sm:text-[20px]`}
        >
          {ASCII}
        </pre>
      </Reveal>

      <Reveal immediate delay={0.1}>
        {/* The ASCII above is decorative (aria-hidden), so this is the page's
            one h1 — the line the metadata already makes the site's promise on. */}
        <h1 className="m-0 mb-5 max-w-[640px] text-[36px] leading-[1.12] tracking-[-0.03em] text-ink text-balance sm:text-[46px]">
          Sharp tools for sharp developers
        </h1>
      </Reveal>

      <Reveal immediate delay={0.18}>
        <p className="m-0 mb-9 max-w-[520px] text-[17px] leading-[1.6] text-body text-pretty">
          We&rsquo;re a software studio building AI products, developer tools,
          and modern software.
        </p>
      </Reveal>

      <Reveal immediate delay={0.26}>
        <div className="flex flex-wrap justify-center gap-3">
          {/* Filled = primary conversion; outlined = on-page browsing. The
              second button used to promise a catalog and open GitHub — now it
              goes where the label says. */}
          <a
            href="https://cal.com/termdx.studio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[7px] bg-ink px-[22px] py-[13px] text-sm text-bg transition-[background-color,color,transform] hover:bg-[color:var(--td-accent)] hover:text-white active:scale-[0.98]"
          >
            Book a Call
          </a>
          <a
            href="#products"
            className="group inline-flex items-center gap-2 rounded-[7px] border border-ink bg-surface px-[22px] py-[13px] text-sm text-ink transition-[background-color,color,transform] hover:bg-ink hover:text-bg active:scale-[0.98]"
          >
            Product catalog
            <span className="transition-transform duration-200 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </Reveal>

      {/* No client logos or testimonials to show yet — these are the honest
          credibility markers: real stack, real licences, real deployment. */}
      <Reveal immediate delay={0.34}>
        {/* Each chip is nowrap so a narrow screen wraps between chips, never
            inside one ("self-/hosted"). */}
        <p className="m-0 mt-9 font-mono text-[12.5px] leading-[1.9] text-faint">
          {["typescript", "rust", "mit licensed", "self-hosted"].map(
            (chip, index, all) => (
              <span key={chip}>
                <span className="whitespace-nowrap">{chip}</span>
                {index < all.length - 1 ? " · " : ""}
              </span>
            ),
          )}
        </p>
      </Reveal>
    </header>
  );
}
