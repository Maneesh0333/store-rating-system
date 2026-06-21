import LoadingPage from "../../Pages/common/LoadingPage";
import type { User } from "../../types/admin.types";

type Props = {
  users: User[] | undefined;
  isLoading: boolean;
};

const UsersTable = ({ users, isLoading }: Props) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-sm">
      <table className="relative w-full min-w-[700px] min-h-32">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Address</th>
            <th className="p-4 text-left">Role</th>
          </tr>
        </thead>

        <tbody className="relative">
          {isLoading ? (
            <div className="absolute top-0 left-0 inset-0 bg-black/10 flex items-center justify-center">
              <LoadingPage className="h-5! w-5!" />
            </div>
          ) : (
            <>
              {users?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                <>
                  {users?.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-gray-300 hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.address}</td>

                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium
                    ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-700"
                        : user.role === "STORE_OWNER"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
