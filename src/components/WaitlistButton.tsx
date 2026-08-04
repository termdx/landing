"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m } from "motion/react";

type Status = "idle" | "sending" | "done" | "error";

type Props = {
  /** Product slug the signup is attributed to (see api/waitlist/route.ts). */
  product?: string;
  /** Display name used in the dialog copy. */
  name?: string;
  /** "primary" when the waitlist is the page's leading action. */
  variant?: "primary" | "secondary";
};

const TRIGGER = {
  primary: "bg-ink text-bg hover:bg-[color:var(--td-accent)] hover:text-white",
  secondary: "border border-ink bg-surface text-ink hover:bg-ink hover:text-bg",
};

export default function WaitlistButton({
  product = "Relay",
  name = "Relay",
  variant = "secondary",
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const open = useCallback(() => {
    setStatus("idle");
    setError("");
    // showModal() (not the `open` attribute) is what gives us the backdrop,
    // focus trap, and Escape-to-close for free.
    dialog.current?.showModal();
  }, []);

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus("sending");
      setError("");

      try {
        const response = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            product,
            list: "waitlist",
          }),
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
    [email, product],
  );

  const sending = status === "sending";

  return (
    <>
      <m.button
        ref={trigger}
        type="button"
        onClick={open}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.12 }}
        className={`inline-flex items-center gap-2 rounded-[7px] px-[22px] py-[13px] text-sm transition-colors ${TRIGGER[variant]}`}
      >
        Join Waitlist
      </m.button>

      <dialog
        ref={dialog}
        aria-labelledby="waitlist-title"
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto w-[min(420px,calc(100vw-2rem))] rounded-xl border border-line bg-bg p-0 text-ink backdrop:bg-[rgba(27,29,31,0.35)] backdrop:backdrop-blur-[2px]"
      >
        <div className="flex flex-col gap-4 px-7 py-7 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-[13px] text-[color:var(--td-accent)]">
              $ {product.toLowerCase()} waitlist --join
            </span>
            <h2 id="waitlist-title" className="m-0 text-xl tracking-[-0.02em]">
              Get early access
            </h2>
            <p className="m-0 text-[15px] leading-[1.6] text-body text-pretty">
              Drop your email and we’ll tell you the moment {name} is ready to
              run. No noise, no drip campaign.
            </p>
          </div>

          {status === "done" ? (
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <p className="m-0 flex items-center gap-2 text-sm text-[color:var(--td-accent)]">
                <m.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.08,
                    type: "spring",
                    stiffness: 460,
                    damping: 18,
                  }}
                >
                  ✓
                </m.span>
                You’re on the list.
              </p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="self-start rounded-[7px] border border-line-strong bg-surface px-[18px] py-2.5 text-sm text-ink transition-colors hover:border-ink"
              >
                Close
              </button>
            </m.div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                required
                autoFocus
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="rounded-[7px] border border-line-strong bg-surface px-3.5 py-[11px] font-mono text-sm text-ink outline-none placeholder:text-faint focus:border-ink"
              />

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

              <div className="flex items-center gap-3">
                <m.button
                  type="submit"
                  disabled={sending}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="inline-flex items-center gap-2 rounded-[7px] bg-ink px-[22px] py-[13px] text-sm text-bg transition-colors hover:bg-[color:var(--td-accent)] hover:text-white disabled:opacity-60"
                >
                  {sending ? "Joining…" : "Join Waitlist"}
                </m.button>
                <button
                  type="button"
                  onClick={() => dialog.current?.close()}
                  className="text-[13px] text-muted transition-colors hover:text-ink"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
