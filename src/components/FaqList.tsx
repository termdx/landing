"use client";

import { useState } from "react";
import { m } from "motion/react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/products";

/**
 * Disclosure list. This replaced a <details> element to get an animated
 * height, and pays for that with two obligations it now handles by hand:
 * every answer stays mounted (so crawlers and no-JS readers still see it,
 * just clipped to height 0), and `inert` keeps the closed ones out of the
 * focus order and the accessibility tree.
 */
export default function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-[760px] border-t border-line">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.question} className="border-b border-line">
            <button
              type="button"
              id={`faq-q-${index}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[16.5px] text-ink transition-colors hover:text-[color:var(--td-accent)]"
            >
              {item.question}
              <m.span
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 text-faint"
              >
                <Plus className="h-4 w-4" />
              </m.span>
            </button>

            <m.div
              data-faq-panel=""
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-q-${index}`}
              inert={!isOpen}
              // initial={false} so the closed state renders flat on the
              // server instead of animating shut on hydration.
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="m-0 max-w-[680px] pb-5 text-[15px] leading-[1.7] text-body text-pretty">
                {item.answer}
              </p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
