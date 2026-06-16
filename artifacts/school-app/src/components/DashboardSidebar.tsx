"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardSidebar({
  dashboardHref,
  menuSlot,
  children,
}: {
  dashboardHref: string;
  menuSlot: React.ReactNode;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Logo = () => (
    <>
      <svg viewBox="0 0 40 40" className="w-8 h-8 flex-shrink-0" fill="none">
        <circle cx="20" cy="20" r="20" fill="#CFCEFF" />
        <path d="M20 8 L32 15 L20 22 L8 15 Z" fill="#7c3aed" />
        <path d="M8 15 L8 26 L20 33 L32 26 L32 15 L20 22 Z" fill="#a78bfa" />
        <rect x="31" y="15" width="2" height="11" rx="1" fill="#7c3aed" />
        <circle cx="32" cy="27.5" r="2.5" fill="#7c3aed" />
      </svg>
      <span className="hidden lg:block font-bold text-gray-800 text-sm">Saltech Edu</span>
    </>
  );

  return (
    <div className="h-screen flex w-full">
      {/* Backdrop — mobile only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={[
          "flex flex-col overflow-y-auto border-r border-gray-100 bg-white p-4",
          sidebarOpen
            ? "fixed inset-y-0 left-0 z-50 w-64 shadow-xl"
            : "hidden lg:flex lg:w-[16%] xl:w-[14%] md:w-[8%] w-[14%]",
        ].join(" ")}
      >
        {/* Close button — mobile overlay only */}
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold lg:hidden"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        )}

        {/* Logo */}
        <Link
          href={dashboardHref}
          className="flex items-center justify-center lg:justify-start gap-2 mb-2"
          onClick={() => setSidebarOpen(false)}
        >
          <Logo />
        </Link>

        {/* Menu rendered server-side, passed as a slot */}
        {menuSlot}
      </div>

      {/* Main content */}
      <div className="flex-1 bg-[#F7F8FA] overflow-scroll flex flex-col min-w-0">
        {children}
      </div>

      {/* Floating hamburger — mobile only, when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-violet-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>
  );
}
