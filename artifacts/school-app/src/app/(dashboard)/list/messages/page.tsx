import { getSessionUser } from "@/lib/auth";
import { cookies } from "next/headers";

const MessagesPage = async () => {
  const user = await getSessionUser(cookies());
  const role = user?.role || "admin";
  const name = user?.name || "User";

  return (
    <div className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <h1 className="text-lg font-semibold mb-4">Messages</h1>
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-lamaSkyLight flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
            <path
              d="M6 8h28a2 2 0 012 2v18a2 2 0 01-2 2H10l-6 5V10a2 2 0 012-2z"
              fill="#C3EBFA"
              stroke="#0369a1"
              strokeWidth="1.5"
            />
            <path d="M12 16h16M12 21h10" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-700 text-lg">Your Inbox</p>
          <p className="text-gray-400 text-sm mt-1">
            Hi {name} — messaging features are coming soon.
          </p>
          <p className="text-gray-400 text-sm">
            You&apos;ll be able to communicate with{" "}
            {role === "admin"
              ? "all staff and students"
              : role === "teacher"
              ? "students and parents"
              : role === "student"
              ? "your teachers"
              : "your child's teachers"}{" "}
            directly here.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
          <div className="bg-lamaSkyLight p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-xs text-gray-500">Inbox</p>
          </div>
          <div className="bg-lamaYellowLight p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-yellow-600">0</p>
            <p className="text-xs text-gray-500">Sent</p>
          </div>
          <div className="bg-lamaPurpleLight p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-xs text-gray-500">Unread</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
