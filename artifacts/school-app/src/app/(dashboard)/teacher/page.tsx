import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const TeacherPage = () => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

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
              href="/list/attendance"
              className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center"
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect width="32" height="32" rx="8" fill="#dcfce7" />
                <circle cx="16" cy="16" r="7" fill="#166534" />
                <path d="M12 16l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-medium text-green-800">Attendance</span>
            </Link>
          </div>
        </div>

        {/* UPLOAD LESSON NOTE */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-700">Upload Lesson Note</h2>
            <Link href="/list/lessons" className="text-xs text-blue-500 hover:underline">View all lessons →</Link>
          </div>
          <div className="border-2 border-dashed border-lamaSky rounded-xl p-6 flex flex-col items-center gap-3 bg-lamaSkyLight text-center">
            <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
              <circle cx="24" cy="24" r="22" fill="#C3EBFA" />
              <path d="M24 14 v14M18 22l6-8 6 8" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="14" y="30" width="20" height="4" rx="2" fill="#0369a1" />
            </svg>
            <p className="text-sm font-medium text-blue-800">Upload Lesson Materials</p>
            <p className="text-xs text-gray-500">
              Create a lesson below to attach documents, slides, and notes.
              Students in your class will be able to see them.
            </p>
            <div className="flex gap-2 mt-1">
              <FormContainer table="lesson" type="create" />
              <span className="text-xs text-gray-400 self-center">Create a new lesson/note</span>
            </div>
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h1 className="text-xl font-semibold mb-2">My Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* TEACHER STATS */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-3">My Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-lamaSkyLight p-3 rounded-xl text-center">
              <p className="text-xs text-gray-500">Classes</p>
              <p className="text-lg font-bold text-blue-600">-</p>
            </div>
            <div className="bg-lamaYellowLight p-3 rounded-xl text-center">
              <p className="text-xs text-gray-500">Students</p>
              <p className="text-lg font-bold text-yellow-600">-</p>
            </div>
            <div className="bg-lamaPurpleLight p-3 rounded-xl text-center">
              <p className="text-xs text-gray-500">Lessons</p>
              <p className="text-lg font-bold text-purple-600">-</p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl text-center">
              <p className="text-xs text-gray-500">Exams</p>
              <p className="text-lg font-bold text-green-600">-</p>
            </div>
          </div>
        </div>
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
