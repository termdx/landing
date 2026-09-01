import Image from "next/image";
import Link from "next/link";

/**
 * Nav for the product pages. Mirrors the landing Nav's geometry (60px tall,
 * 1060px container). The wordmark is itself the route back to the studio, so
 * there is no separate back link beside the CTA.
 */
export default function ProductNav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-[rgba(250,250,248,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1060px] items-center justify-between px-7">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/wordmark.png"
            alt="termdx.studio"
            width={353}
            height={39}
            className="h-[20px] w-auto"
            priority
          />
        </Link>
        {/* Same mobile rule as the landing nav: the button must never wrap. */}
        <a
          href="https://cal.com/termdx.studio"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-[7px] whitespace-nowrap rounded-md border border-line-strong bg-surface px-3 py-[7px] text-[13px] text-ink transition-colors hover:border-ink sm:px-3.5"
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}
