import { getSessionUser } from "@/lib/auth";
import { cookies } from "next/headers";

const ProfilePage = async () => {
  const user = await getSessionUser(cookies());
  const role = user?.role || "admin";
  const name = user?.name || "User";
  const email = user?.email || "";

  const roleColors: Record<string, string> = {
    admin: "bg-lamaPurple text-purple-800",
    teacher: "bg-lamaSky text-blue-800",
    student: "bg-lamaYellow text-yellow-800",
    parent: "bg-green-100 text-green-800",
  };

  return (
    <div className="flex-1 m-4 mt-0 flex flex-col gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-lamaPurple flex items-center justify-center text-2xl font-bold text-purple-700">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">{name}</h1>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${roleColors[role] ?? "bg-gray-100 text-gray-600"}`}>
            {role}
          </span>
          {email && (
            <p className="text-sm text-gray-400 mt-1">{email}</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Account Details</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Full Name</span>
            <span className="text-sm font-medium text-gray-800">{name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-800">{email}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-500">Role</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${roleColors[role] ?? "bg-gray-100 text-gray-600"}`}>
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
