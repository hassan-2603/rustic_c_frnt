import { LogOut } from "lucide-react";

interface TopbarProps {
  onLogout?: () => void;
}

export default function Topbar({ onLogout }: TopbarProps) {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminAuth");
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  return (
    <header className="bg-white shadow px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg sm:text-2xl font-bold">
          Restaurant Management System
        </h1>

        <p className="text-sm text-gray-500">
          Rustic Charm
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="text-left sm:text-right">
          <div className="font-semibold">Administrator</div>
          <div className="text-sm text-green-600 font-medium flex items-center gap-1.5 sm:justify-end">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Online
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer"
          title="Sign Out"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}