import { Bell, MenuIcon, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToggle } from "../../context/ToggleContext";

const AdminNavbar = () => {
  const { user } = useAuth();
  const { setToggle } = useToggle();

  return (
    <header className="bg-white h-16 border-b border-gray-300 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setToggle((prev) => !prev)}
          className="rounded-lg cursor-pointer p-2 hover:bg-gray-100"
        >
          <MenuIcon size={20} />
        </button>
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 hover:bg-gray-100">
          <Search size={20} />
        </button>

        <button className="relative rounded-lg p-2 hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full font-semibold bg-blue-600 text-white flex items-center justify-center">
            {user?.name[0]}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name}</p>

            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
