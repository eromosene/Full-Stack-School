"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const roles = [
  {
    key: "admin",
    label: "Admin",
    description: "Full system control & management",
    color: "bg-lamaPurple",
    textColor: "text-purple-800",
    borderColor: "border-purple-300",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="22" fill="#CFCEFF" />
        <circle cx="24" cy="18" r="7" fill="#7c3aed" />
        <ellipse cx="24" cy="36" rx="12" ry="7" fill="#7c3aed" />
      </svg>
    ),
  },
  {
    key: "teacher",
    label: "Teacher",
    description: "Manage lessons, classes & students",
    color: "bg-lamaSky",
    textColor: "text-blue-800",
    borderColor: "border-blue-300",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="22" fill="#C3EBFA" />
        <rect x="12" y="14" width="24" height="18" rx="2" fill="#0369a1" />
        <rect x="16" y="18" width="10" height="2" rx="1" fill="white" />
        <rect x="16" y="22" width="16" height="2" rx="1" fill="white" />
        <rect x="16" y="26" width="12" height="2" rx="1" fill="white" />
        <rect x="20" y="32" width="8" height="3" rx="1" fill="#0369a1" />
      </svg>
    ),
  },
  {
    key: "student",
    label: "Student",
    description: "View schedule, results & assignments",
    color: "bg-lamaYellow",
    textColor: "text-yellow-800",
    borderColor: "border-yellow-300",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="22" fill="#FAE27C" />
        <path d="M24 10 L36 17 L24 24 L12 17 Z" fill="#92400e" />
        <path d="M12 17 L12 28 L24 35 L36 28 L36 17 L24 24 Z" fill="#b45309" />
        <rect x="35" y="17" width="2" height="14" rx="1" fill="#92400e" />
        <circle cx="36" cy="33" r="3" fill="#92400e" />
      </svg>
    ),
  },
  {
    key: "parent",
    label: "Parent",
    description: "Track your child's progress",
    color: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-300",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="22" fill="#dcfce7" />
        <circle cx="18" cy="18" r="5" fill="#166534" />
        <circle cx="30" cy="18" r="5" fill="#166534" />
        <ellipse cx="18" cy="32" rx="8" ry="5" fill="#166534" />
        <ellipse cx="30" cy="32" rx="8" ry="5" fill="#166534" />
        <circle cx="24" cy="27" r="4" fill="#dcfce7" />
      </svg>
    ),
  },
];

const features = [
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <rect width="32" height="32" rx="8" fill="#CFCEFF" />
        <rect x="8" y="10" width="16" height="12" rx="2" fill="#7c3aed" />
        <rect x="11" y="13" width="6" height="1.5" rx="0.75" fill="white" />
        <rect x="11" y="16" width="10" height="1.5" rx="0.75" fill="white" />
      </svg>
    ),
    title: "Lesson Management",
    desc: "Teachers upload notes, assignments & resources seamlessly",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <rect width="32" height="32" rx="8" fill="#C3EBFA" />
        <rect x="8" y="8" width="16" height="16" rx="2" fill="#0369a1" />
        <path d="M12 14 h8 M12 17 h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Attendance Tracking",
    desc: "Real-time attendance records for every class and student",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <rect width="32" height="32" rx="8" fill="#FAE27C" />
        <circle cx="16" cy="16" r="7" fill="#92400e" />
        <path d="M16 12 v4 l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Exam Scheduling",
    desc: "Plan and manage exams, results & performance tracking",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <rect width="32" height="32" rx="8" fill="#dcfce7" />
        <circle cx="16" cy="13" r="4" fill="#166534" />
        <ellipse cx="16" cy="24" rx="7" ry="4" fill="#166534" />
      </svg>
    ),
    title: "Parent Portal",
    desc: "Parents stay informed about their child's progress & events",
  },
];

type AuthTab = "signin" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [tab, setTab] = useState<AuthTab>("signin");

  // Sign-in state
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siRemember, setSiRemember] = useState(false);
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  // Sign-up state
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [suError, setSuError] = useState("");
  const [suLoading, setSuLoading] = useState(false);

  // Load remembered email
  useEffect(() => {
    const remembered = localStorage.getItem("yps_remembered_email");
    if (remembered) {
      setSiEmail(remembered);
      setSiRemember(true);
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiError("");
    setSiLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: siEmail, password: siPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSiError(data.error || "Login failed");
        return;
      }
      if (siRemember) {
        localStorage.setItem("yps_remembered_email", siEmail);
      } else {
        localStorage.removeItem("yps_remembered_email");
      }
      router.push(`/${data.role}`);
      router.refresh();
    } catch {
      setSiError("Network error. Please try again.");
    } finally {
      setSiLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuError("");
    if (suPassword !== suConfirm) {
      setSuError("Passwords do not match");
      return;
    }
    if (suPassword.length < 6) {
      setSuError("Password must be at least 6 characters");
      return;
    }
    setSuLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: suName,
          email: suEmail,
          phone: suPhone,
          password: suPassword,
          role: selectedRole || "admin",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSuError(data.error || "Sign up failed");
        return;
      }
      router.push(`/${data.role}`);
      router.refresh();
    } catch {
      setSuError("Network error. Please try again.");
    } finally {
      setSuLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lamaSkyLight via-white to-lamaPurpleLight">
        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <img src="/yemsol-logo.png" alt="Yemsol Private Schools" className="w-9 h-9 object-contain" />
            <span className="font-bold text-lg text-gray-800">Yemsol Private Schools</span>
          </div>
          <span className="text-sm text-gray-500 hidden sm:block">School Management System</span>
        </nav>

        {/* HERO */}
        <section className="px-6 py-16 flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
            Welcome to <span className="text-purple-600">Yemsol Private Schools</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mb-2">
            A complete school management platform connecting admins, teachers, students and parents in one place.
          </p>
          <p className="text-gray-400 text-sm mb-10">Select your role below to sign in or sign up</p>

          {/* ROLE CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
            {roles.map((role) => (
              <button
                key={role.key}
                onClick={() => setSelectedRole(role.key)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 ${role.borderColor} ${role.color} hover:scale-105 transition-transform shadow-sm cursor-pointer`}
              >
                {role.icon}
                <span className={`font-bold text-sm ${role.textColor}`}>{role.label}</span>
                <span className="text-xs text-gray-600 text-center leading-tight hidden sm:block">{role.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="px-6 py-12 bg-white/60">
          <h2 className="text-center text-xl font-bold text-gray-700 mb-8">Everything your school needs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-2">
                {f.icon}
                <span className="font-semibold text-sm text-gray-700">{f.title}</span>
                <span className="text-xs text-gray-400">{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center py-6 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Yemsol Private Schools · School Management System
        </footer>
      </div>
    );
  }

  const roleInfo = roles.find((r) => r.key === selectedRole)!;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lamaSkyLight px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-4 w-full max-w-md">
        {/* Back */}
        <button
          onClick={() => setSelectedRole(null)}
          className="self-start text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
        >
          ← Back
        </button>

        {/* Role header */}
        <div className="flex flex-col items-center gap-2 mb-1">
          {roleInfo.icon}
          <h1 className="text-xl font-bold text-gray-800 capitalize">{roleInfo.label} Portal</h1>
          <p className="text-sm text-gray-400">{roleInfo.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${
              tab === "signin" ? "bg-lamaPurple text-purple-800" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${
              tab === "signup" ? "bg-lamaPurple text-purple-800" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Form */}
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Email</label>
              <input
                type="email"
                required
                value={siEmail}
                onChange={(e) => setSiEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lamaPurple"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Password</label>
              <input
                type="password"
                required
                value={siPassword}
                onChange={(e) => setSiPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lamaPurple"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={siRemember}
                onChange={(e) => setSiRemember(e.target.checked)}
                className="accent-purple-600"
              />
              <span className="text-xs text-gray-500">Remember me</span>
            </label>
            {siError && <p className="text-xs text-red-500">{siError}</p>}
            <button
              type="submit"
              disabled={siLoading}
              className="bg-lamaPurple hover:bg-purple-300 text-purple-900 font-semibold py-2 rounded-xl transition-colors disabled:opacity-60"
            >
              {siLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {tab === "signup" && (
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Full Name</label>
              <input
                type="text"
                required
                value={suName}
                onChange={(e) => setSuName(e.target.value)}
                placeholder="John Doe"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lamaPurple"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Email</label>
              <input
                type="email"
                required
                value={suEmail}
                onChange={(e) => setSuEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lamaPurple"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Phone Number <span className="font-normal text-gray-400">(optional)</span></label>
              <input
                type="tel"
                value={suPhone}
                onChange={(e) => setSuPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lamaPurple"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Password</label>
              <input
                type="password"
                required
                value={suPassword}
                onChange={(e) => setSuPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lamaPurple"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Confirm Password</label>
              <input
                type="password"
                required
                value={suConfirm}
                onChange={(e) => setSuConfirm(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lamaPurple"
              />
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500">
              Registering as: <span className="font-semibold capitalize text-purple-700">{selectedRole}</span>
            </div>
            {suError && <p className="text-xs text-red-500">{suError}</p>}
            <button
              type="submit"
              disabled={suLoading}
              className="bg-lamaPurple hover:bg-purple-300 text-purple-900 font-semibold py-2 rounded-xl transition-colors disabled:opacity-60"
            >
              {suLoading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
