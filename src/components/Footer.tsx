import Link from "next/link";

const LINK = "text-[12.5px] text-muted transition-colors hover:text-ink";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1060px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-7 py-[26px]">
        <span className="text-[12.5px] text-faint">© 2026 termdx · exit 0</span>
        {/* The catalog is the most useful thing a footer can surface — the
            old termdx.studio link just pointed at the page you were on. */}
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/piper" className={LINK}>
            piper
          </Link>
          <Link href="/codrop" className={LINK}>
            codrop
          </Link>
          <Link href="/Relay" className={LINK}>
            Relay
          </Link>
          <a
            href="https://github.com/termdx"
            target="_blank"
            rel="noreferrer"
            className={LINK}
          >
            GitHub
          </a>
          <a href="mailto:support@termdx.studio" className={LINK}>
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
}
