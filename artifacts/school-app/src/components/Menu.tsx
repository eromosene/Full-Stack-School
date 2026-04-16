import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "ROLE_HOME",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = async () => {
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string | undefined) || "admin";

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-1" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-3 text-xs uppercase tracking-wider">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (!item.visible.includes(role)) return null;
            return (
              <Link
                href={item.href === "ROLE_HOME" ? `/${role}` : item.href}
                key={item.label}
                className="flex items-center gap-2 text-gray-600 py-2 px-2 rounded-lg hover:bg-lamaSkyLight transition-colors"
              >
                <Image src={item.icon} alt={item.label} width={20} height={20} className="flex-shrink-0" />
                <span className="text-[11px] lg:text-sm font-medium leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      {/* LOGOUT */}
      <div className="mt-4 border-t pt-3">
        <SignOutButton redirectUrl="/">
          <button className="flex items-center gap-2 text-gray-600 py-2 px-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full">
            <Image src="/logout.png" alt="Logout" width={20} height={20} className="flex-shrink-0" />
            <span className="text-[11px] lg:text-sm font-medium">Logout</span>
          </button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default Menu;
