import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, createToken, COOKIE_NAME } from "@/lib/auth";
import { randomUUID } from "crypto";

const ALLOWED_ROLES = ["teacher", "student", "parent"] as const;
type AllowedRole = (typeof ALLOWED_ROLES)[number];

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }
    if (!role || !ALLOWED_ROLES.includes(role as AllowedRole)) {
      return NextResponse.json(
        { error: "Role must be one of: teacher, student, parent" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }
    // Note: the unique-constraint check above is best-effort; the transaction
    // below will also surface a P2002 if a concurrent request races through.

    const hashed = await hashPassword(password);
    const id = randomUUID();

    // Derive name parts
    const trimmedName = name.trim();
    const spaceIdx = trimmedName.indexOf(" ");
    const firstName = spaceIdx > -1 ? trimmedName.slice(0, spaceIdx) : trimmedName;
    const lastName = spaceIdx > -1 ? trimmedName.slice(spaceIdx + 1) : trimmedName;

    // Generate a unique username from email prefix
    const emailPrefix = email
      .toLowerCase()
      .trim()
      .split("@")[0]
      .replace(/[^a-z0-9]/g, "");
    const username = `${emailPrefix}_${id.slice(0, 6)}`;

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPhone = phone?.trim() || null;

    // Create User + domain record atomically
    let user: { id: string; name: string; email: string; role: string };

    await prisma.$transaction(async (tx) => {
      user = await tx.user.create({
        data: {
          id,
          name: trimmedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          password: hashed,
          role: role as AllowedRole,
        },
      });

      if (role === "teacher") {
        await tx.teacher.create({
          data: {
            id,
            username,
            name: firstName,
            surname: lastName,
            email: normalizedEmail,
            phone: normalizedPhone,
          },
        });
      } else if (role === "student") {
        await tx.student.create({
          data: {
            id,
            username,
            name: firstName,
            surname: lastName,
            email: normalizedEmail,
            phone: normalizedPhone,
          },
        });
      } else if (role === "parent") {
        await tx.parent.create({
          data: {
            id,
            username,
            name: firstName,
            surname: lastName,
            email: normalizedEmail,
            phone: normalizedPhone,
          },
        });
      }
    });

    const token = createToken({
      id: user!.id,
      name: user!.name,
      email: user!.email,
      role: user!.role,
    });

    const res = NextResponse.json({ ok: true, role: user!.role, name: user!.name });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
