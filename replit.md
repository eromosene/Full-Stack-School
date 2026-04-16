# Saltech Edu School Management System

## Overview

A school management dashboard cloned from [safak/full-stack-school](https://github.com/safak/full-stack-school) and branded as Saltech Edu. Built with Next.js 14, Prisma, PostgreSQL, Clerk authentication, and Tailwind CSS.

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **Frontend**: Next.js 14.2.5 (App Router)
- **Auth**: Clerk (`@clerk/nextjs`)
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Calendar**: react-big-calendar, react-calendar
- **Forms**: react-hook-form + zod validation
- **Image uploads**: next-cloudinary

## Project Structure

- `artifacts/school-app/` — Main Next.js Saltech Edu school management app
  - `src/app/(dashboard)/` — Dashboard layouts for admin, teacher, student, parent
  - `src/app/(dashboard)/list/` — List pages (teachers, students, classes, subjects, exams, attendance, messages, etc.)
  - `src/app/(dashboard)/profile/` — User profile page (Clerk UserProfile)
  - `src/app/(dashboard)/settings/` — Settings page
  - `src/app/[[...sign-in]]/` — Landing page + Clerk sign-in (role-selection landing page)
  - `src/app/opengraph-image.tsx` — Dynamic OG image for link previews
  - `src/components/` — Shared UI components (charts, calendars, forms, tables)
  - `src/lib/` — Server actions, Prisma client, form schemas, utils
  - `prisma/` — Database schema and seed data
- `artifacts/api-server/` — Express API server (workspace default)

## Key Commands

- `pnpm --filter @workspace/school-app run dev` — run school app locally
- `cd artifacts/school-app && npx prisma db push` — push DB schema changes
- `cd artifacts/school-app && npx prisma db seed` — seed database with sample data
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Environment Variables Required

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk publishable key
- `CLERK_SECRET_KEY` — Clerk secret key
- `DATABASE_URL` — PostgreSQL connection string (auto-provided by Replit)
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` — Sign-in page URL
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` — Redirect after sign-in

## Database

PostgreSQL with Prisma ORM. Models: Admin, Student, Teacher, Parent, Grade, Class, Subject, Lesson, Exam, Assignment, Result, Attendance, Event, Announcement.

## Auth Roles

Users have roles set via Clerk publicMetadata: admin, teacher, student, parent. Middleware enforces route access based on role. Demo Clerk users have been created for all four roles and linked to seeded database records so role dashboards can load real data.
