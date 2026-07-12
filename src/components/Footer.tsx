export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1060px] flex-wrap items-center justify-between gap-4 px-7 py-[26px]">
        <span className="font-mono text-[12.5px] text-faint">
          © 2026 termdx · exit 0
        </span>
        <div className="flex gap-5">
          <a
            href="https://github.com/termdx"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[12.5px] text-muted"
          >
            GitHub
          </a>
          <a
            href="https://termdx.studio"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[12.5px] text-muted"
          >
            termdx.studio
          </a>
          <a
            href="mailto:shivaraj@termdx.studio"
            className="font-mono text-[12.5px] text-muted"
          >
            Mail
          </a>
        </div>
      </div>
    </footer>
  );
}
