"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function WaitlistButton() {
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
          body: JSON.stringify({ email: email.trim() }),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error ?? "Something went wrong.");
        }

        setEmail("");
        setStatus("done");
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Something went wrong.");
        setStatus("error");
      }
    },
    [email],
  );

  const sending = status === "sending";

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={open}
        className="inline-flex items-center gap-2 rounded-[7px] border border-ink bg-surface px-[22px] py-[13px] font-mono text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
      >
        Join Waitlist
      </button>

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
            <span className="font-mono text-[13px] text-[color:var(--td-accent)]">
              $ relay waitlist --join
            </span>
            <h2
              id="waitlist-title"
              className="m-0 text-xl font-semibold tracking-[-0.02em]"
            >
              Get early access
            </h2>
            <p className="m-0 text-[15px] leading-[1.6] text-muted text-pretty">
              Drop your email and we’ll tell you the moment Relay is ready to
              run. No noise, no drip campaign.
            </p>
          </div>

          {status === "done" ? (
            <div className="flex flex-col gap-4">
              <p className="m-0 font-mono text-sm text-[color:var(--td-accent)]">
                ✓ You’re on the list.
              </p>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="self-start rounded-[7px] border border-line-strong bg-surface px-[18px] py-2.5 font-mono text-sm text-ink transition-colors hover:border-ink"
              >
                Close
              </button>
            </div>
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

              {error ? (
                <p role="alert" className="m-0 font-mono text-[13px] text-muted">
                  {error}
                </p>
              ) : null}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-[7px] bg-ink px-[22px] py-[13px] font-mono text-sm font-medium text-bg transition-colors hover:bg-[color:var(--td-accent)] hover:text-white disabled:opacity-60"
                >
                  {sending ? "Joining…" : "Join Waitlist"}
                </button>
                <button
                  type="button"
                  onClick={() => dialog.current?.close()}
                  className="font-mono text-[13px] text-muted transition-colors hover:text-ink"
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
