"use client";

import { useCallback, useRef, useState } from "react";

const CLONE_CMD = "git clone git@github.com:termdx/Relay.git";

export default function RelayCopyButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(CLONE_CMD);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }, []);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy command: ${CLONE_CMD}`}
      className="inline-flex items-center gap-2.5 rounded-[7px] border border-line-strong bg-surface px-5 py-[13px] font-mono text-sm text-ink transition-colors hover:border-ink"
    >
      <span className="text-[color:var(--td-accent)]">$</span>
      {CLONE_CMD}
      <span className="text-xs text-faint">{copied ? "✓ copied" : "⧉"}</span>
    </button>
  );
}
