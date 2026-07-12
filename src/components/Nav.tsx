import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-[rgba(250,250,248,0.88)] backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1060px] items-center justify-between px-7">
        <Link href="#" className="flex items-center text-ink">
          <Image
            src="/logo.png"
            alt="TermDX"
            width={110}
            height={54}
            className="h-[36px] w-auto object-contain"
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
