import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string | undefined) || "admin";
  const dashboardHref = `/${role}`;

  return (
    <div className="h-screen flex">
      {/* SIDEBAR */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 border-r border-gray-100 bg-white flex flex-col overflow-y-auto">
        <Link
          href={dashboardHref}
          className="flex items-center justify-center lg:justify-start gap-2 mb-2"
        >
          <svg viewBox="0 0 40 40" className="w-8 h-8 flex-shrink-0" fill="none">
            <circle cx="20" cy="20" r="20" fill="#CFCEFF" />
            <path d="M20 8 L32 15 L20 22 L8 15 Z" fill="#7c3aed" />
            <path d="M8 15 L8 26 L20 33 L32 26 L32 15 L20 22 Z" fill="#a78bfa" />
            <rect x="31" y="15" width="2" height="11" rx="1" fill="#7c3aed" />
            <circle cx="32" cy="27.5" r="2.5" fill="#7c3aed" />
          </svg>
          <span className="hidden lg:block font-bold text-gray-800 text-sm">Saltech Edu</span>
        </Link>
        <Menu />
      </div>
      {/* MAIN CONTENT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
