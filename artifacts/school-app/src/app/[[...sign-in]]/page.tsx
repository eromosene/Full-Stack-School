"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

type AuthTab = "signin" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<AuthTab>("signin");

  // Sign-in state
  const [siRole, setSiRole] = useState("admin");
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siRemember, setSiRemember] = useState(false);
  const [siShowPw, setSiShowPw] = useState(false);
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  // Sign-up state
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [suShowPw, setSuShowPw] = useState(false);
  const [suError, setSuError] = useState("");
  const [suLoading, setSuLoading] = useState(false);

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
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: siEmail, password: siPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setSiError(data.error || "Login failed"); return; }
      if (siRemember) localStorage.setItem("yps_remembered_email", siEmail);
      else localStorage.removeItem("yps_remembered_email");
      router.push(`/${data.role}`);
      router.refresh();
    } catch (err) {
      setSiError("Network error: " + String(err));
    } finally {
      setSiLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuError("");
    if (suPassword !== suConfirm) { setSuError("Passwords do not match"); return; }
    if (suPassword.length < 6) { setSuError("Password must be at least 6 characters"); return; }
    setSuLoading(true);
    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: suName, email: suEmail, phone: suPhone, password: suPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setSuError(data.error || "Sign up failed"); return; }
      router.push(`/${data.role}`);
      router.refresh();
    } catch (err) {
      setSuError("Network error: " + String(err));
    } finally {
      setSuLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* MAIN */}
      <div className="flex flex-1 flex-col lg:flex-row">

        {/* ── LEFT PANEL (photo collage) ─────────────────────────────── */}
        <div className="relative lg:w-1/2 bg-[#1E0A3C] flex flex-col overflow-hidden min-h-[340px] lg:min-h-screen">

          {/* Logo + school name */}
          <div className="relative z-10 flex items-center gap-3 px-8 pt-8 pb-4">
            <Image src="/yemsol-logo.png" alt="Yemsol" width={44} height={44} className="rounded-full" />
            <div>
              <p className="text-white font-extrabold text-lg leading-tight">Yemsol Private Schools</p>
              <p className="text-[#F59E0B] text-xs font-semibold tracking-wide">Empowering Minds, Building Futures</p>
            </div>
          </div>

          {/* Main large photo */}
          <div className="relative z-10 mx-6 flex-1 rounded-2xl overflow-hidden min-h-[180px] lg:min-h-0">
            <img
              src="/copy of from all of us at yemsol,.jpg"
              alt="Yemsol students"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A3C]/80 via-transparent to-transparent" />
          </div>

          {/* Two small photos side by side */}
          <div className="relative z-10 grid grid-cols-2 gap-3 mx-6 mt-3 mb-4">
            <div className="rounded-xl overflow-hidden h-24 lg:h-32 bg-[#2D1060]">
              <img
                src="/IMG_1757.jpg"
                alt="School event"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div className="rounded-xl overflow-hidden h-24 lg:h-32 bg-[#2D1060]">
              <img
                src="/IMG_4410.jpg"
                alt="School community"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="relative z-10 px-8 pb-8 hidden lg:block">
            <p className="text-white text-xl font-extrabold leading-tight">
              Building Today,<br />Inspiring Tomorrow
            </p>
            <p className="text-[#C4B5FD] text-sm mt-1">
              A complete school management platform for the modern era.
            </p>
          </div>

          {/* Decorative gradient overlay on whole panel */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95]/30 via-transparent to-[#1E0A3C]/60 pointer-events-none" />
        </div>

        {/* ── RIGHT PANEL (form) ─────────────────────────────────────── */}
        <div className="lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-[#1E0A3C]">
                {tab === "signin" ? "Welcome Back!" : "Create Account"}
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                {tab === "signin"
                  ? "Sign in to continue to your Yemsol Private Schools account"
                  : "Set up your Yemsol Private Schools administrator account"}
              </p>
            </div>

            {/* ── SIGN IN FORM ── */}
            {tab === "signin" && (
              <form onSubmit={handleSignIn} className="flex flex-col gap-5">
                {/* Role dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Role</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D28D9]">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </span>
                    <select
                      value={siRole}
                      onChange={(e) => setSiRole(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#6D28D9] appearance-none bg-white"
                    >
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D28D9]">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      value={siEmail}
                      onChange={(e) => setSiEmail(e.target.value)}
                      placeholder="you@yemsol.com"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6D28D9]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D28D9]">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <input
                      type={siShowPw ? "text" : "password"}
                      required
                      value={siPassword}
                      onChange={(e) => setSiPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6D28D9]"
                    />
                    <button
                      type="button"
                      onClick={() => setSiShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {siShowPw ? (
                        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={siRemember}
                      onChange={(e) => setSiRemember(e.target.checked)}
                      className="accent-[#6D28D9] w-4 h-4"
                    />
                    <span className="text-xs text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-xs text-[#6D28D9] font-semibold hover:underline">
                    Forgot Password?
                  </button>
                </div>

                {siError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600">
                    {siError}
                  </div>
                )}

                {/* Sign in button */}
                <button
                  type="submit"
                  disabled={siLoading}
                  className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                >
                  {siLoading ? "Signing in…" : <>Sign In <span>→</span></>}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Support button */}
                <button
                  type="button"
                  className="w-full border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Need Help? Contact Support
                </button>

                {/* Toggle to sign up */}
                <p className="text-center text-xs text-gray-500">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("signup")}
                    className="text-[#6D28D9] font-bold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            )}

            {/* ── SIGN UP FORM ── */}
            {tab === "signup" && (
              <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    value={suName}
                    onChange={(e) => setSuName(e.target.value)}
                    placeholder="John Doe"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6D28D9]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D28D9]">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      placeholder="you@yemsol.com"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6D28D9]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Phone Number <span className="font-normal text-gray-400 normal-case">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={suPhone}
                    onChange={(e) => setSuPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6D28D9]"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D28D9]">
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <input
                      type={suShowPw ? "text" : "password"}
                      required
                      value={suPassword}
                      onChange={(e) => setSuPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6D28D9]"
                    />
                    <button
                      type="button"
                      onClick={() => setSuShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                        {suShowPw
                          ? <><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></>
                          : <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        }
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={suConfirm}
                    onChange={(e) => setSuConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#6D28D9]"
                  />
                </div>

                {suError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600">
                    {suError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={suLoading}
                  className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 text-sm"
                >
                  {suLoading ? "Creating account…" : "Create Account"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("signin")}
                    className="text-[#6D28D9] font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────────────────────── */}
      <div className="bg-[#1E0A3C] text-white px-6 py-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* 4 feature icons */}
          <div className="flex items-center gap-6 sm:gap-8">
            {[
              {
                label: "Secure & Reliable",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                label: "Easy to Use",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                label: "All in One Platform",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
              },
              {
                label: "Dedicated Support",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 text-center">
                <div className="text-[#F59E0B]">{item.icon}</div>
                <span className="text-[10px] text-gray-400 hidden sm:block">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center sm:items-end gap-0.5">
            <p className="text-[11px] text-gray-400">
              © 2026 Yemsol Private Schools • School Management System
            </p>
            <p className="text-[11px] text-[#F59E0B] font-semibold italic">In God We Trust</p>
          </div>
        </div>
      </div>
    </div>
  );
}
