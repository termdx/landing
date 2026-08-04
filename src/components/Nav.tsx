import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-[rgba(250,250,248,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1060px] items-center justify-between gap-4 px-7">
        <Link href="#" className="flex shrink-0 items-center">
          {/* Wordmark set in Architype Stedelijk, supplied as artwork — the
              licence covers the font, not the outlines, so no font file ships.
              Source is 353x39 of pure ink (cropped to the glyph bounds), so
              rendering at 20px is ~2x for retina. */}
          <Image
            src="/wordmark.png"
            alt="termdx.studio"
            width={353}
            height={39}
            className="h-[20px] w-auto"
            priority
          />
        </Link>
        {/* Section links drop out below sm so the button can't wrap; the
            button itself must never break to two lines on a phone. */}
        <div className="flex items-center gap-4 sm:gap-[26px]">
          <Link
            href="#products"
            className="hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
          >
            Products
          </Link>
          <Link
            href="#services"
            className="hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
          >
            Services
          </Link>

          {/* No font-bold here: Sanchez ships a 400 face only, so a weight
              utility would synthesise a smeared faux bold (see layout.tsx). */}
          <a
            href="https://cal.com/termdx.studio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-[7px] whitespace-nowrap rounded-md border border-line-strong bg-surface px-3 py-[7px] text-[13px] text-ink transition-colors hover:border-ink sm:px-3.5"
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  );
}
