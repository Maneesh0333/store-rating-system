import { Store, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToggle } from "../../context/ToggleContext";

const menus = [
  {
    name: "Browse Stores",
    path: "/user",
    icon: Store,
  },
  {
    name: "Profile",
    path: "/user/profile",
    icon: User,
  },
];

const UserSidebar = () => {
  const { logout, user } = useAuth();
  const { toggle, setToggle } = useToggle();
  return (
    <>
      <div
        onClick={() => setToggle((prev) => !prev)}
        className={`${toggle ? "w-0" : "w-full"} md:hidden fixed inset-0 z-10 h-screen bg-black/10 backdrop-blur-lg`}
      />

      <aside
        className={`${toggle ? "w-0" : "w-72"} transition-all sticky top-0 flex h-screen shrink-0 flex-col border-r border-slate-800 bg-slate-900 text-white overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">
            {user?.name[0]}
          </div>

          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-400">Welcome back</p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto p-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="space-y-1">
            {menus.map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  end={menu.path === "/user"}
                  className={({ isActive }) =>
                    `
                  group flex items-center gap-3 rounded-xl px-4 py-3
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `
                  }
                >
                  <Icon
                    size={20}
                    className="transition-transform group-hover:scale-110"
                  />

                  <span className="font-medium">{menu.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4">
          <button
            onClick={logout}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={20} />

            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
