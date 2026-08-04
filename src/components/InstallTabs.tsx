"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, m } from "motion/react";
import { Check, Copy } from "lucide-react";
import type { InstallOption } from "@/lib/products";

type Props = {
  options: InstallOption[];
  /** Scopes the tab/panel ids — one pane per page today, but ids must be unique. */
  id?: string;
};

// useLayoutEffect warns during SSR; the measurement it does is client-only.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function InstallTabs({ options, id = "install" }: Props) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [indicator, setIndicator] = useState<{
    x: number;
    width: number;
  } | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const list = useRef<HTMLDivElement>(null);

  const option = options[active];

  // The underline is one element that slides, rather than a border per tab.
  // domAnimation has no layout projection, so measure the active tab instead
  // of reaching for layoutId (and the bundle that comes with it).
  useIsomorphicLayoutEffect(() => {
    const node = tabs.current[active];
    if (!node) return;

    const measure = () =>
      setIndicator({ x: node.offsetLeft, width: node.offsetWidth });

    measure();

    // Re-measure when the row reflows: viewport resize, or the webfont
    // landing after first paint and changing every tab's width.
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    if (list.current) observer.observe(list.current);
    return () => observer.disconnect();
  }, [active, options]);

  const select = useCallback((index: number) => {
    setActive(index);
    setCopied(false);
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(option.command);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }, [option.command]);

  // Arrow keys move between tabs, which is what a tablist is expected to do
  // once roving tabIndex takes the inactive tabs out of the tab order.
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const step =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;

      event.preventDefault();
      const next = (active + step + options.length) % options.length;
      select(next);
      tabs.current[next]?.focus();
    },
    [active, options.length, select],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg">
      <div
        ref={list}
        role="tablist"
        aria-label="Installation methods"
        onKeyDown={onKeyDown}
        // Tabs scroll rather than wrap on a phone; `relative` is what the
        // absolutely-positioned indicator measures against.
        className="relative flex overflow-x-auto border-b border-line px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {options.map((candidate, index) => (
          <button
            key={candidate.label}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`${id}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
            className={`shrink-0 px-3.5 pb-[13px] pt-[15px] font-mono text-sm transition-colors ${
              index === active ? "text-ink" : "text-faint hover:text-muted"
            }`}
          >
            {candidate.label}
          </button>
        ))}

        {indicator ? (
          <m.span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] rounded-full bg-[color:var(--td-accent)]"
            initial={false}
            animate={{ x: indicator.x, width: indicator.width }}
            transition={{
              type: "spring",
              stiffness: 520,
              damping: 42,
              mass: 0.6,
            }}
          />
        ) : null}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="flex items-center gap-3 px-5 py-[22px] sm:px-6"
      >
        <span
          aria-hidden="true"
          className="font-mono text-[15px] text-[color:var(--td-accent)]"
        >
          $
        </span>

        {/* mode="wait" so the outgoing command clears before the next one
            arrives — a crossfade in place reads as a glitch at this size. */}
        <AnimatePresence mode="wait" initial={false}>
          <m.code
            key={option.command}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[15px] text-ink [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {option.command}
          </m.code>
        </AnimatePresence>

        <span className="hidden shrink-0 text-xs text-faint sm:inline">
          {option.note}
        </span>

        <m.button
          type="button"
          onClick={copy}
          aria-label={`Copy command: ${option.command}`}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.12 }}
          className="shrink-0 rounded-md p-1.5 text-faint transition-colors hover:bg-surface hover:text-ink"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={copied ? "copied" : "idle"}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.13, ease: "easeOut" }}
              className="block"
            >
              {copied ? (
                <Check
                  className="h-4 w-4 text-[color:var(--td-accent)]"
                  strokeWidth={2}
                />
              ) : (
                <Copy className="h-4 w-4" strokeWidth={1.75} />
              )}
            </m.span>
          </AnimatePresence>
        </m.button>

        {/* Outside the button: a live region has to exist before it changes,
            and text inside the button would leak into its accessible name. */}
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? "Copied" : ""}
        </span>
      </div>
    </div>
  );
}
