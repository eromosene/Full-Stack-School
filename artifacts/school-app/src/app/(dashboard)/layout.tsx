import DashboardSidebar from "@/components/DashboardSidebar";
import Menu from "@/components/Menu";
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
    <DashboardSidebar
      dashboardHref={dashboardHref}
      menuSlot={<Menu />}
    >
      <Navbar />
      {children}
    </DashboardSidebar>
  );
}
