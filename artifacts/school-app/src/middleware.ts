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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("yps_session")?.value;
  const isAuthPage = pathname === "/";

  // Not logged in → send to landing
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Logged in and on auth page → send to dashboard
  if (token && isAuthPage) {
    const payload = await verifySessionCookie(token);
    if (!payload) {
      // Invalid/expired token — clear cookie and stay on auth page
      const res = NextResponse.next();
      res.cookies.set("yps_session", "", { maxAge: 0, path: "/" });
      return res;
    }
    const role = payload.role || "admin";
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  // Check route-level role access
  if (token) {
    const payload = await verifySessionCookie(token);
    if (!payload) {
      // Invalid token → clear and redirect to login
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
    "/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
