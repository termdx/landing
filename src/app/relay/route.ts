import { NextResponse, type NextRequest } from "next/server";

// Lowercase alias — the canonical page lives at /Relay. A route handler
// (not a page) avoids a route folder that differs only by casing, which
// TypeScript's forceConsistentCasingInFileNames rejects.
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/Relay", request.url), 308);
}
