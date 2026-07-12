import localFont from "next/font/local";
import { Star } from "lucide-react";
import CopyButton from "./CopyButton";

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

      <div className="mb-[18px] flex items-center gap-0.5 font-mono text-[15px] text-[color:var(--td-accent)]">
        <span className="opacity-[0.65]">$</span>
        <span>&nbsp;no mouse required</span>
        <span
          aria-hidden="true"
          className="ml-1.5 inline-block h-[17px] w-2 align-text-bottom bg-[color:var(--td-accent)] [animation:td-blink_1.1s_step-end_infinite]"
        />
      </div>

      <p className="m-0 mb-9 max-w-[520px] text-[17px] leading-[1.6] text-muted text-pretty">
        Terminal-native developer tools. No Electron wrappers, no context
        switching, no leaving the command line. Your RAM sends its thanks.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <a
          href="https://github.com/termdx"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-[7px] bg-ink px-[22px] py-[13px] font-mono text-sm font-medium text-bg transition-colors hover:bg-[color:var(--td-accent)] hover:text-white"
        >
          <Star className="h-4 w-4" fill="currentColor" strokeWidth={0} /> on
          GitHub
        </a>
        <CopyButton />
      </div>
    </header>
  );
}
