import { Lock, Pencil } from "lucide-react";
import { useState } from "react";
import EditProfileModal from "../../components/common/EditProfileModal";
import ChangePasswordModal from "../../components/common/ChangePasswordModal";
import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";
import { useProfile } from "../../hooks/owner/useProfile";

function Profile() {
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const { data: user, isLoading, isError, refetch } = useProfile();

  if (isLoading) {
    return <LoadingPage message="Loading profile..." />;
  }

  if (isError) {
    return <ErrorPage message="Failed to load profile" refetch={refetch} />;
  }

  return (
    <div className="space-y-6 flex-1">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>

        <p className="text-gray-500 mt-1">
          Manage your personal information and security settings.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {user?.data?.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{user?.data?.name}</h2>

            <p className="text-gray-500">{user?.data?.email}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{user?.data?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.data?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{user?.data?.address}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>

            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {user?.data?.role}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center cursor-pointer gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit Profile
          </button>

          <button
            onClick={() => setPasswordOpen(true)}
            className="flex items-center cursor-pointer gap-2 rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
          >
            <Lock size={18} />
            Change Password
          </button>
        </div>
      </div>

      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        user={user?.data!}
      />

      <ChangePasswordModal
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </div>
  );
}

export default Profile;
