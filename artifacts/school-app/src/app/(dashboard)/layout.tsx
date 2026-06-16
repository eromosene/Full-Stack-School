import DashboardSidebar from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";

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
      <DashboardSidebar dashboardHref={dashboardHref} />
      {/* MAIN CONTENT */}
      <div className="flex-1 bg-[#F7F8FA] overflow-scroll flex flex-col min-w-0">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
