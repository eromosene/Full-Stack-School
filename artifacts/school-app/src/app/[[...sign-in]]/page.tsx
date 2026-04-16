"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const LandingPage = ({ onRoleSelect }: { onRoleSelect: (role: string) => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-lamaSkyLight via-white to-lamaPurpleLight">
    {/* NAVBAR */}
    <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
          <circle cx="20" cy="20" r="20" fill="#CFCEFF" />
          <path d="M20 8 L32 15 L20 22 L8 15 Z" fill="#7c3aed" />
          <path d="M8 15 L8 26 L20 33 L32 26 L32 15 L20 22 Z" fill="#a78bfa" />
          <rect x="31" y="15" width="2" height="11" rx="1" fill="#7c3aed" />
          <circle cx="32" cy="27.5" r="2.5" fill="#7c3aed" />
        </svg>
        <span className="font-bold text-lg text-gray-800">Saltech Edu</span>
      </div>
      <span className="text-sm text-gray-500 hidden sm:block">School Management System</span>
    </nav>

    {/* HERO */}
    <section className="px-6 py-16 flex flex-col items-center text-center max-w-4xl mx-auto">
      <div className="mb-6">
        <svg viewBox="0 0 120 120" className="w-28 h-28 mx-auto" fill="none">
          <circle cx="60" cy="60" r="58" fill="#EDF9FD" stroke="#C3EBFA" strokeWidth="2" />
          <path d="M60 20 L90 38 L60 56 L30 38 Z" fill="#0369a1" />
          <path d="M30 38 L30 68 L60 86 L90 68 L90 38 L60 56 Z" fill="#0ea5e9" />
          <rect x="88" y="38" width="4" height="26" rx="2" fill="#0369a1" />
          <circle cx="90" cy="67" r="5" fill="#0369a1" />
          <rect x="48" y="62" width="24" height="18" rx="2" fill="white" opacity="0.9" />
          <rect x="52" y="66" width="7" height="1.5" rx="0.75" fill="#0369a1" />
          <rect x="52" y="70" width="12" height="1.5" rx="0.75" fill="#0369a1" />
          <rect x="52" y="74" width="9" height="1.5" rx="0.75" fill="#0369a1" />
        </svg>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
        Welcome to <span className="text-purple-600">Saltech Edu</span>
      </h1>
      <p className="text-gray-500 text-base sm:text-lg max-w-xl mb-2">
        A complete school management platform connecting admins, teachers, students and parents in one place.
      </p>
      <p className="text-gray-400 text-sm mb-10">Select your role below to sign in</p>

      {/* ROLE CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
        {roles.map((role) => (
          <button
            key={role.key}
            onClick={() => onRoleSelect(role.key)}
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

    {/* FOOTER */}
    <footer className="text-center py-6 text-xs text-gray-400">
      &copy; {new Date().getFullYear()} Saltech Edu · School Management System
    </footer>
  </div>
);

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const role = (user?.publicMetadata?.role as string | undefined) || "admin";
    router.replace(`/${role}`);
  }, [isLoaded, isSignedIn, user, router]);

  if (isLoaded && isSignedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
        <div className="bg-white p-12 rounded-2xl shadow-2xl flex flex-col gap-4 items-center">
          <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
            <circle cx="20" cy="20" r="20" fill="#CFCEFF" />
            <path d="M20 8 L32 15 L20 22 L8 15 Z" fill="#7c3aed" />
            <path d="M8 15 L8 26 L20 33 L32 26 L32 15 L20 22 Z" fill="#a78bfa" />
          </svg>
          <h1 className="text-xl font-bold text-gray-800">Saltech Edu</h1>
          <h2 className="text-gray-400">Opening your dashboard...</h2>
        </div>
      </div>
    );
  }

  if (!selectedRole) {
    return <LandingPage onRoleSelect={setSelectedRole} />;
  }

  const roleInfo = roles.find((r) => r.key === selectedRole)!;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lamaSkyLight px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-4 items-center w-full max-w-md">
        <button
          onClick={() => setSelectedRole(null)}
          className="self-start text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
        >
          ← Back
        </button>
        <div className="flex flex-col items-center gap-2 mb-2">
          {roleInfo.icon}
          <h1 className="text-xl font-bold text-gray-800">Sign in as {roleInfo.label}</h1>
          <p className="text-sm text-gray-400">{roleInfo.description}</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none p-0 w-full",
            },
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
