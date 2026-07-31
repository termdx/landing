import { NextResponse, type NextRequest } from "next/server";

// Lowercase alias: /relay → /Relay (the canonical page).
//
// This deliberately lives in proxy.ts rather than as a route handler under
// src/app/relay/. On a case-insensitive filesystem (macOS, Windows) a
// `relay/` folder resolves to the existing `Relay/` one, so the handler
// lands next to Relay/page.tsx and Next rejects the build with
// "Conflicting route and page at /Relay". Proxy creates no route folder, so
// the casing collision cannot happen.
//
// next.config `redirects` is the usual answer for a plain redirect, but its
// source matching is case-insensitive: /Relay matches a /relay rule and
// redirects to itself forever. The explicit pathname guard below is what
// makes this loop-proof — it holds whether or not `matcher` turns out to be
// case-sensitive, which the Next 16 docs don't specify.
const CANONICAL = "/Relay";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === CANONICAL) {
    return NextResponse.next();
  }

  // clone() preserves the query string; new URL("/Relay", …) would drop it.
  const url = request.nextUrl.clone();
  url.pathname = CANONICAL;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/relay",
};
