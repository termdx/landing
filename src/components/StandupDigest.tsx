import Reveal from "./motion/Reveal";
import type { Standup } from "@/lib/products";

/**
 * The thing the headline promises, drawn rather than screenshotted — same
 * approach as FlowDiagram, and for the same reason: a real capture would age
 * with the UI, and the point here is the shape of the output, not its chrome.
 */
export default function StandupDigest({ standup }: { standup: Standup }) {
  return (
    // Capped near the prose measure: a posted message is a narrow thing,
    // and at full shell width the lines filled barely half the card.
    <figure className="m-0 max-w-[760px] overflow-hidden rounded-xl border border-line bg-bg">
      {/* Posted-message chrome: enough to read as "this arrived in a channel"
          without impersonating any particular chat product. */}
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-line px-5 py-3 sm:px-7">
        <span
          aria-hidden="true"
          className="h-[18px] w-[18px] shrink-0 rounded-[5px] bg-[color:var(--td-accent)]"
        />
        <span className="font-mono text-[13px] font-bold text-ink">Relay</span>
        <span className="rounded border border-line bg-surface px-1.5 py-px font-mono text-[10px] tracking-[0.08em] text-faint">
          APP
        </span>
        <span className="font-mono text-[12px] text-faint">
          {standup.channel} · {standup.time}
        </span>
      </div>

      <div className="px-5 py-6 sm:px-7">
        <p className="m-0 font-mono text-[13.5px] font-bold text-ink">
          {standup.project}
        </p>

        <div className="mt-5 flex flex-col gap-5">
          {standup.groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <p className="m-0 font-mono text-[11.5px] tracking-[0.08em] text-[color:var(--td-accent)]">
                {group.label}
              </p>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-2.5 text-[14.5px] leading-[1.55] text-body"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-line-hover"
                    />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="m-0 mt-6 border-t border-line pt-4 font-mono text-[12.5px] text-faint">
          {standup.footer}
        </p>
      </div>
    </figure>
  );
}

/** Wrapper so the page can drop it in with its caption and reveal. */
export function StandupFigure({ standup }: { standup: Standup }) {
  return (
    <Reveal delay={0.06} className="mt-9">
      <StandupDigest standup={standup} />
      <p className="m-0 mt-4 max-w-[640px] text-[14.5px] leading-[1.65] text-muted text-pretty">
        {standup.caption}
      </p>
    </Reveal>
  );
}
