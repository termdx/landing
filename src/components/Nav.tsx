import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-[rgba(250,250,248,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1060px] items-center justify-between px-7">
        <Link href="#" className="flex items-center">
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
        <div className="flex items-center gap-[26px]">
          <Link
            href="#products"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            Products
          </Link>
          <Link
            href="#services"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            Services
          </Link>
          <a
            href="https://github.com/termdx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-[7px] rounded-md border border-line-strong bg-surface px-3.5 py-[7px] font-mono text-[13px] font-medium text-ink transition-colors hover:border-ink"
          >
            <Star className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} /> on
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
