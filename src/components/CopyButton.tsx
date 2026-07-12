"use client";

import { useCallback, useRef, useState } from "react";

const BREW_CMD = "brew tap termdx/tap";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(BREW_CMD);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }, []);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy command: ${BREW_CMD}`}
      className="inline-flex items-center gap-2.5 rounded-[7px] border border-line-strong bg-surface px-5 py-[13px] font-mono text-sm text-ink transition-colors hover:border-ink"
    >
      <span className="text-[color:var(--td-accent)]">$</span>
      brew tap termdx/tap
      <span className="text-xs text-faint">{copied ? "✓ copied" : "⧉"}</span>
    </button>
  );
}
