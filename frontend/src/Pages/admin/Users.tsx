import { Plus } from "lucide-react";
import { useState } from "react";

import SearchBar from "../../components/admin/SearchBar";
import AddUserModal from "../../components/admin/AddUserModal";
import UsersTable from "../../components/admin/UsersTable";
import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";
import { useUsers } from "../../hooks/admin/useUser";
import type { Role } from "../../types/common.types";
import { useDebounce } from "use-debounce";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<Role | "All">("All");

  const [debouncedSearch] = useDebounce(search, 500);
  const { data, isLoading, isError, refetch } = useUsers(debouncedSearch, role);


  if (isError) {
    return <ErrorPage message="Failed to load users data" refetch={refetch} />;
  }

  return (
    <div className="flex-1 flex flex-col space-y-6 min-w-0">
      {/* Header */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-sm text-gray-500">
            Manage users, roles and permissions
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add User
        </button>
      </section>

      <section>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role | "All")}
            className="h-11 rounded-lg border border-gray-300 focus:outline-blue-500 bg-white px-4 md:w-56"
          >
            <option value="All">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="STORE_OWNER">Store Owner</option>
          </select>
        </div>
      </section>

      {/* Table */}
      <UsersTable users={data?.data} isLoading={isLoading}/>

      {/* Modal */}
      <AddUserModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Users;
