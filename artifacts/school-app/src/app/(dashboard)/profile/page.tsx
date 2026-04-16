import { currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";

const ProfilePage = async () => {
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string | undefined) || "admin";
  const name = user?.fullName || user?.primaryEmailAddress?.emailAddress || "User";

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
          {user?.primaryEmailAddress?.emailAddress && (
            <p className="text-sm text-gray-400 mt-1">{user.primaryEmailAddress.emailAddress}</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Account Details</h2>
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none p-0 w-full border-0",
              navbar: "hidden",
              navbarMobileMenuRow: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
