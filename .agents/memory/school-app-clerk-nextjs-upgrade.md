---
name: School App Clerk + Next.js Upgrade
description: CVE-blocked packages and Clerk v5→v6 migration patterns for the school-app Next.js artifact.
---

# School App — Clerk + Next.js Upgrade

## Problem
`@clerk/nextjs` 5.4.1 and `next` 14.2.5 were blocked by Replit's Socket Security Policy (Critical CVE). pnpm install fails with 403 on the tarball download.

## Fix Applied
- `next`: 14.2.5 → 14.2.35 (latest safe Next 14 patch; Next 15+ would require additional page-level async params migration)
- `@clerk/nextjs`: 5.4.1 → 6.39.5 (v6 still supports Next 14; v7 requires Next 15+)

**Why:** v7 of @clerk/nextjs drops Next 14 peer support. v6.39.5 is the latest compatible version.

## v5 → v6 Breaking API Changes

### 1. `auth()` is now async
- Before: `const { userId, sessionClaims } = auth();`
- After: `const { userId, sessionClaims } = await auth();`
- Affects: all server components, server actions, and the clerkMiddleware callback (which must also be `async`)

### 2. `clerkClient` is now a function
- Before: `await clerkClient.users.createUser(...)`
- After: `await (await clerkClient()).users.createUser(...)`

### 3. Middleware must be async
- Before: `clerkMiddleware((auth, req) => { const x = auth(); })`
- After: `clerkMiddleware(async (auth, req) => { const x = await auth(); })`

## Env Var Setup
`setupClerkWhitelabelAuth()` provisions `CLERK_PUBLISHABLE_KEY` as a secret. Next.js client code needs `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`. Forward it in `next.config.mjs`:
```js
env: { NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY }
```

## pnpm Build Scripts
Add to `pnpm-workspace.yaml` `onlyBuiltDependencies` to avoid build warnings:
- `@clerk/shared`
- `@prisma/client`
- `@prisma/engines`
- `prisma`

## Security Note
Middleware role fallback `|| (userId ? "admin" : undefined)` is a privilege escalation risk. Authenticated users without role metadata should redirect to `/` (deny), not be granted admin.

**How to apply:** Any time this school app needs @clerk/nextjs or next version changes, check the CVE status of the old version first and apply these patterns.
