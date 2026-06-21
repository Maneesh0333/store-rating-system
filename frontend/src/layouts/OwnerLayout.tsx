import { Outlet } from "react-router-dom";
import OwnerSidebar from "../components/owner/OwnerSidebar";
import OwnerNavbar from "../components/owner/OwnerNavbar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <OwnerSidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <OwnerNavbar />

        <main className="flex p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
