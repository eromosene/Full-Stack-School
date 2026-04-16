import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const StudentPage = async () => {
  const { userId } = auth();

  let classItem: { id: number; name: string } | null = null;

  try {
    const classes = await prisma.class.findMany({
      where: {
        students: { some: { id: userId! } },
      },
      select: { id: true, name: true },
    });
    classItem = classes[0] ?? null;
  } catch {
    classItem = null;
  }

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* QUICK LINKS */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Student Portal</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/list/assignments"
              className="flex flex-col items-center gap-2 p-3 bg-lamaYellowLight rounded-xl hover:bg-lamaYellow transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#FAE27C" />
                <rect x="9" y="8" width="14" height="16" rx="2" fill="#92400e" />
                <path d="M12 13h8M12 16h6M12 19h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-medium text-yellow-800">Assignments</span>
            </Link>
            <Link
              href="/list/exams"
              className="flex flex-col items-center gap-2 p-3 bg-lamaPurpleLight rounded-xl hover:bg-lamaPurple transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#CFCEFF" />
                <rect x="8" y="8" width="16" height="16" rx="2" fill="#7c3aed" />
                <path d="M11 13h10M11 16h7M11 19h9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-medium text-purple-800">Exams</span>
            </Link>
            <Link
              href="/list/results"
              className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#dcfce7" />
                <rect x="8" y="10" width="16" height="12" rx="2" fill="#166534" />
                <path d="M12 16l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-medium text-green-800">My Results</span>
            </Link>
            <Link
              href="/list/attendance"
              className="flex flex-col items-center gap-2 p-3 bg-lamaSkyLight rounded-xl hover:bg-lamaSky transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#C3EBFA" />
                <circle cx="16" cy="16" r="7" fill="#0369a1" />
                <path d="M13 16l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-medium text-blue-800">Attendance</span>
            </Link>
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h1 className="text-xl font-semibold mb-2">
            My Class Schedule {classItem ? `(${classItem.name})` : ""}
          </h1>
          {classItem ? (
            <BigCalendarContainer type="classId" id={classItem.id} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <svg viewBox="0 0 48 48" className="w-14 h-14" fill="none">
                <circle cx="24" cy="24" r="22" fill="#F1F0FF" />
                <rect x="12" y="14" width="24" height="20" rx="3" fill="#CFCEFF" stroke="#7c3aed" strokeWidth="1.5" />
                <path d="M12 20h24" stroke="#7c3aed" strokeWidth="1.5" />
                <path d="M18 12v4M30 12v4" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="font-semibold text-gray-600">No Class Assigned Yet</p>
              <p className="text-sm text-gray-400">
                You haven't been assigned to a class. Please contact your admin.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
