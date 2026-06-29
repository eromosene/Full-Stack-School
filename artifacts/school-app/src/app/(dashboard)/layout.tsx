import DashboardSidebar from "@/components/DashboardSidebar";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { getSessionUser } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser(cookies());
  const role = user?.role || "admin";
  const dashboardHref = `/${role}`;

  return (
    <DashboardSidebar
      dashboardHref={dashboardHref}
      menuSlot={<Menu role={role} />}
    >
      <Navbar />
      {children}
    </DashboardSidebar>
  );
}
