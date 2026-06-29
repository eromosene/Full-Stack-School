import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";

const ParentPage = async () => {
  const user = await getSessionUser(cookies());
  const userId = user?.id;

  let students: { id: string; name: string; surname: string; classId: number }[] = [];

  try {
    students = await prisma.student.findMany({
      where: { parentId: userId! },
      select: { id: true, name: true, surname: true, classId: true },
    });
  } catch {
    students = [];
  }

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* QUICK LINKS */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Parent Portal</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
            <Link
              href="/list/results"
              className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#dcfce7" />
                <rect x="8" y="10" width="16" height="12" rx="2" fill="#166534" />
                <path d="M12 16l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-medium text-green-800">Results</span>
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
              href="/list/announcements"
              className="flex flex-col items-center gap-2 p-3 bg-lamaYellowLight rounded-xl hover:bg-lamaYellow transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#FAE27C" />
                <path d="M8 12h16v8H8z" fill="#92400e" rx="2" />
                <path d="M12 16h8M12 19h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-medium text-yellow-800">Announcements</span>
            </Link>
          </div>
        </div>

        {/* CHILDREN */}
        {students.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-base font-semibold text-gray-700 mb-3">My Children</h2>
            <div className="flex flex-col gap-2">
              {students.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-lamaSkyLight transition-colors">
                  <div className="w-8 h-8 rounded-full bg-lamaYellow flex items-center justify-center text-sm font-bold text-yellow-800">
                    {s.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{s.name} {s.surname}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEDULE - first child */}
        {students[0] && (
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-base font-semibold text-gray-700 mb-3">
              {students[0].name}&apos;s Schedule
            </h2>
            <BigCalendarContainer type="classId" id={students[0].classId} />
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
