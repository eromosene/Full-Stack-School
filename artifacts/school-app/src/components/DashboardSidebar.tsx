"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
      <Image src="/yemsol-logo.png" alt="Yemsol Private Schools" width={36} height={36} className="flex-shrink-0 object-contain" />
      <span className="hidden lg:block font-bold text-gray-800 text-sm leading-tight">Yemsol Private Schools</span>
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
          className="lg:hidden fixed top-4 left-4 z-50 bg-violet-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
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
