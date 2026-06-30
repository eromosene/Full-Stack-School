import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { routeAccessMap } from "./lib/settings";

const JWT_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "yps-fallback-secret-change-in-production"
);

async function verifySessionCookie(token: string): Promise<{ id?: string; role?: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id?: string; role?: string };
  } catch {
    return null;
  }
}

const matchers = Object.entries(routeAccessMap).map(([route, allowedRoles]) => ({
  pattern: new RegExp(`^${route}$`),
  allowedRoles,
}));

// Paths that are always public — no token required
const PUBLIC_PREFIXES = ["/auth/", "/"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("yps_session")?.value;

  const isLanding = pathname === "/";
  const isAuthRoute = pathname.startsWith("/auth/");

  // Auth API routes (login/signup/logout) — always pass through
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Not logged in → send to landing
  if (!token && !isLanding) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Logged in and on landing page → redirect to their dashboard
  if (token && isLanding) {
    const payload = await verifySessionCookie(token);
    if (!payload) {
      // Invalid/expired token — clear cookie and stay on landing
      const res = NextResponse.next();
      res.cookies.set("yps_session", "", { maxAge: 0, path: "/" });
      return res;
    }
    const role = payload.role || "admin";
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  // Check route-level role access for authenticated users
  if (token) {
    const payload = await verifySessionCookie(token);
    if (!payload) {
      const res = NextResponse.redirect(new URL("/", req.url));
      res.cookies.set("yps_session", "", { maxAge: 0, path: "/" });
      return res;
    }

    const role = payload.role;
    for (const { pattern, allowedRoles } of matchers) {
      if (pattern.test(pathname)) {
        if (!role || !allowedRoles.includes(role)) {
          return NextResponse.redirect(new URL(role ? `/${role}` : "/", req.url));
        }
        break;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
