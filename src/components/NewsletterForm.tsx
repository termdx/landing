"use client";

import { useCallback, useState, type FormEvent } from "react";
import { AnimatePresence, m } from "motion/react";

type Status = "idle" | "sending" | "done" | "error";

type Props = {
  /** Product slug the signup is attributed to (see api/waitlist/route.ts). */
  product: string;
  /** "waitlist" on Relay, "newsletter" everywhere else. */
  list?: "newsletter" | "waitlist";
  cta?: string;
};

export default function NewsletterForm({
  product,
  list = "newsletter",
  cta = "Subscribe",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus("sending");
      setError("");

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), product, list }),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error ?? "Something went wrong.");
        }

        setEmail("");
        setStatus("done");
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Something went wrong.",
        );
        setStatus("error");
      }
    },
    [email, list, product],
  );

  if (status === "done") {
    return (
      <m.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="m-0 flex items-center gap-2 text-sm text-[color:var(--td-accent)]"
      >
        <m.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 460,
            damping: 18,
          }}
        >
          ✓
        </m.span>
        You’re on the list. Nothing else to do.
      </m.p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-[420px] flex-col gap-3"
    >
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-[7px] border border-line-strong bg-surface px-3.5 py-[11px] font-mono text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-ink"
        />
        <m.button
          type="submit"
          disabled={status === "sending"}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.12 }}
          className="inline-flex items-center gap-2 rounded-[7px] bg-ink px-[22px] py-[13px] text-sm text-bg transition-colors hover:bg-[color:var(--td-accent)] hover:text-white disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : cta}
        </m.button>
      </div>

      {/* The error slides in rather than jumping the panel's height. */}
      <AnimatePresence initial={false}>
        {error ? (
          <m.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="m-0 overflow-hidden text-[13px] text-body"
          >
            {error}
          </m.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
