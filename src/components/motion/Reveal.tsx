"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds. Step it by ~0.06 across a grid to stagger without choreography. */
  delay?: number;
  /** Animate on mount rather than on scroll — for anything above the fold. */
  immediate?: boolean;
  /** Lifts on hover. For cards that are themselves a link. */
  lift?: boolean;
};

const HIDDEN = { opacity: 0, y: 12 };
const SHOWN = { opacity: 1, y: 0 };

/**
 * Scroll (or mount) reveal. `data-reveal` is the hook the no-JS fallback in
 * layout.tsx uses to force these visible — without it, a page that never
 * hydrates would stay at opacity 0.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  immediate,
  lift,
}: Props) {
  return (
    <m.div
      data-reveal=""
      className={className}
      initial={HIDDEN}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      {...(immediate
        ? { animate: SHOWN }
        : {
            whileInView: SHOWN,
            viewport: { once: true, margin: "-64px" },
          })}
      {...(lift
        ? {
            // Its own transition, or the hover would inherit the entrance's
            // half-second and stagger delay.
            whileHover: {
              y: -3,
              transition: { duration: 0.18, delay: 0, ease: "easeOut" },
            },
          }
        : {})}
    >
      {children}
    </m.div>
  );
}
