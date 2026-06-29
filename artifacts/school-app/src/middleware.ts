import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

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
    undefined;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If user is authenticated but has no role, redirect to home rather than
    // granting admin access (least-privilege: deny unknown roles).
    if (matcher(req) && (!role || !allowedRoles.includes(role))) {
      return NextResponse.redirect(new URL(role ? `/${role}` : "/", req.url));
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
