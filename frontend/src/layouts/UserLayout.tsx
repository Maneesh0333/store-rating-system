import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import UserNavbar from "../components/user/UserNavbar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <UserSidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <UserNavbar />

        <main className="flex p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
