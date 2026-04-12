import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();

  const claims = sessionClaims as
    | {
        metadata?: { role?: string };
        publicMetadata?: { role?: string };
        public_metadata?: { role?: string };
      }
    | undefined;

  const role =
    claims?.metadata?.role ||
    claims?.publicMetadata?.role ||
    claims?.public_metadata?.role ||
    (userId ? "admin" : undefined);

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role || "admin"}`, req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
