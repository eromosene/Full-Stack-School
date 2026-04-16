import { currentUser } from "@clerk/nextjs/server";

const SettingsPage = async () => {
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string | undefined) || "admin";

  const settingsSections = [
    {
      title: "Notifications",
      items: [
        { label: "Email notifications for new announcements", enabled: true },
        { label: "Email notifications for exam results", enabled: true },
        { label: "Email notifications for attendance updates", enabled: role !== "admin" },
      ],
    },
    {
      title: "Privacy",
      items: [
        { label: "Show profile to other users", enabled: true },
        { label: "Allow messages from other users", enabled: true },
      ],
    },
    {
      title: "Display",
      items: [
        { label: "Compact sidebar mode", enabled: false },
        { label: "Show labels on sidebar icons", enabled: true },
      ],
    },
  ];

  return (
    <div className="flex-1 m-4 mt-0 flex flex-col gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800 mb-1">Settings</h1>
        <p className="text-sm text-gray-400">Manage your account preferences</p>
      </div>

      {settingsSections.map((section) => (
        <div key={section.title} className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-4">{section.title}</h2>
          <div className="flex flex-col gap-4">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <div
                  className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${
                    item.enabled ? "bg-lamaPurple" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                      item.enabled ? "left-6" : "left-1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {role === "admin" && (
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-400">
          <h2 className="text-base font-semibold text-gray-700 mb-2">Admin Controls</h2>
          <p className="text-sm text-gray-400 mb-4">
            As an admin, you have access to user role management via the Clerk dashboard.
            Set user roles by adding <code className="bg-gray-100 px-1 rounded">publicMetadata.role</code> to each user.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["admin", "teacher", "student", "parent"].map((r) => (
              <div key={r} className="bg-gray-50 rounded-lg p-3 text-center">
                <span className="text-xs font-semibold text-gray-600 capitalize">{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
