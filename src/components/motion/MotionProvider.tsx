"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps the app once so every `m.*` element downstream can load its features.
 *
 * `domAnimation` (not `domMax`) is deliberate: it carries animation, exit,
 * inView, hover, tap and focus, which is everything this site uses. Layout
 * projection is the expensive half of the bundle and the only thing that
 * needed it — the install tab indicator — measures itself instead.
 *
 * `strict` makes `motion.*` throw, so nothing can quietly pull the full
 * feature set back in.
 *
 * This is a client component taking `children`, so the server components it
 * wraps stay server components.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* reducedMotion="user" drops transforms for anyone whose OS asks for
          less motion; opacity still resolves, so nothing stays invisible. */}
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
