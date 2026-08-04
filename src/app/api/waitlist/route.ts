import { NextResponse } from "next/server";
import { productSlugs } from "@/lib/products";

// Deliberately server-only: the webhook URL is a write credential for the
// channel, so it never reaches the client bundle.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LISTS = new Set(["waitlist", "newsletter"]);

// Both fields land in a Discord message, so neither is trusted: they're only
// ever echoed back if they match a value this build already knows about.
function pick(payload: object, key: string, allowed: Set<string>, fallback: string) {
  const value = key in payload ? (payload as Record<string, unknown>)[key] : undefined;
  return typeof value === "string" && allowed.has(value) ? value : fallback;
}

export async function POST(request: Request) {
  const webhook = process.env.DISCORD_WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    console.error(
      "DISCORD_WAITLIST_WEBHOOK_URL is not set — waitlist signup dropped.",
    );
    return NextResponse.json(
      { error: "The waitlist isn’t configured right now." },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email =
    typeof payload === "object" && payload !== null && "email" in payload
      ? (payload as { email: unknown }).email
      : undefined;

  if (typeof email !== "string" || email.length > 254 || !EMAIL.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  // "termdx" is the studio-wide list — the landing page's newsletter panel
  // isn't attributable to any one product.
  const product = pick(
    payload as object,
    "product",
    new Set([...productSlugs, "termdx"]),
    "Relay",
  );
  const list = pick(payload as object, "list", LISTS, "waitlist");

  // Untrusted input into a Discord message: strip backticks so it can't break
  // out of the code span, and disable every mention type.
  const safe = email.replaceAll("`", "");

  const discord = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `New ${product} ${list} signup — \`${safe}\``,
      allowed_mentions: { parse: [] },
    }),
  });

  // Discord answers 204 with an empty body; only `ok` is meaningful, and its
  // response never gets forwarded to the caller.
  if (!discord.ok) {
    console.error(
      `Discord webhook rejected a waitlist signup (${discord.status}).`,
    );
    return NextResponse.json(
      { error: "Couldn’t reach the waitlist. Try again in a moment." },
      { status: 502 },
    );
  }

  return new NextResponse(null, { status: 204 });
}
