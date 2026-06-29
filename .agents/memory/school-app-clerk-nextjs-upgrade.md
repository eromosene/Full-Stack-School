---
name: School App Auth
description: Auth history for the school-app — Clerk removal, custom JWT system, and key lessons.
---

# School App — Auth History

## Phase 1: Clerk CVE Fix (completed)
`@clerk/nextjs` 5.4.1 and `next` 14.2.5 were blocked by Replit's Socket Security Policy (Critical CVE).
- `next`: 14.2.5 → 14.2.35 (latest safe Next 14 patch; Next 15+ would need breaking params migration)
- `@clerk/nextjs`: 5.4.1 → 6.39.5 (v6 supports Next 14; v7 requires Next 15+)

### v5 → v6 Breaking Changes
- `auth()` is now async — all call sites need `await auth()`
- `clerkClient` is now a function — `(await clerkClient()).users.*`
- clerkMiddleware callback must be `async`

## Phase 2: Full Clerk Removal (completed)
Clerk removed entirely. Replaced with custom JWT auth (jsonwebtoken + bcryptjs + jose).

### New Auth Stack
- **`src/lib/auth.ts`**: `hashPassword`, `verifyPassword`, `createToken`, `verifyToken`, `getSessionUser(cookieStore)`
- **Cookie**: `yps_session` (httpOnly JWT, 7-day expiry, signed with `SESSION_SECRET`)
- **Middleware**: uses `jose` `jwtVerify` (Edge-compatible) — full signature verification, clears invalid cookies
- **API routes**: `/api/auth/login`, `/api/auth/signup`, `/api/auth/logout`
- **User model** added to Prisma schema for login accounts

### Key Design Decisions
- Self-signup always creates `role: "admin"`. Teachers/students/parents are provisioned by admins via the management UI (their Teacher/Student records share ID with a User record created in actions.ts).
- `Menu` component is `"use client"` but receives `role` prop from DashboardLayout — never reads the httpOnly cookie client-side.
- All server components call `getSessionUser(cookies())` which verifies JWT signature — provides real data-level security even if middleware is bypassed.
- Middleware verifies JWT with `jose` and clears bad cookies rather than redirecting loop.

### Files Changed
All files under `src/app`, `src/components`, `src/lib`, `src/middleware.ts`, `prisma/schema.prisma`, `package.json`.

**Why:** Clerk was blocked by Replit's CVE firewall; custom JWT is simpler and self-contained.

**How to apply:** Use `getSessionUser(cookies())` in any server component for auth. Never accept `role` from client requests. Menu/client components get role as a prop from the server layout.
