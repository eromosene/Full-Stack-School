import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import { getSessionUser } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";

const TeacherPage = async () => {
  const user = await getSessionUser(cookies());
  const userId = user?.id;
  const role = user?.role;

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* QUICK ACTIONS */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/list/lessons"
              className="flex flex-col items-center gap-2 p-3 bg-lamaSkyLight rounded-xl hover:bg-lamaSky transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#C3EBFA" />
                <rect x="8" y="8" width="16" height="16" rx="2" fill="#0369a1" />
                <path d="M11 13h10M11 16h7M11 19h9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-medium text-blue-800">My Lessons</span>
            </Link>
            <Link
              href="/list/assignments"
              className="flex flex-col items-center gap-2 p-3 bg-lamaYellowLight rounded-xl hover:bg-lamaYellow transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#FAE27C" />
                <rect x="9" y="8" width="14" height="16" rx="2" fill="#92400e" />
                <path d="M12 13h8M12 16h6M12 19h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="23" cy="23" r="5" fill="#92400e" />
                <path d="M21 23h4M23 21v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
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
              href="/list/students"
              className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#dcfce7" />
                <circle cx="16" cy="13" r="4" fill="#166534" />
                <ellipse cx="16" cy="24" rx="7" ry="4" fill="#166534" />
              </svg>
              <span className="text-xs font-medium text-green-800">Students</span>
            </Link>
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-3">My Schedule</h2>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
