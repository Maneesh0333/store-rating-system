import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateProfile } from "../hooks/common/useUpdateProfile";

import type { UpdateProfileInput } from "../types/common.types";

import { updateProfileSchema } from "../validations/common.schema";

type Props = {
  onClose: () => void;
  user: {
    name: string;
    email: string;
    address: string;
  };
};

function EditProfileForm({ user, onClose }: Props) {
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      address: user.address,
    },
    mode: "onChange",
  });

  const onSubmit = (data: UpdateProfileInput) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">Full Name</label>

        <input
          {...register("name")}
          className={`w-full rounded-lg border px-4 py-3 transition
          ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 focus:outline-blue-500"
          }`}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <input
          value={user.email}
          disabled
          className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
        />
      </div>

      {/* Address */}
      <div>
        <label className="mb-2 block text-sm font-medium">Address</label>

        <textarea
          rows={4}
          {...register("address")}
          className={`w-full resize-none rounded-lg border px-4 py-3 transition
          ${
            errors.address
              ? "border-red-500"
              : "border-gray-300 focus:outline-blue-500"
          }`}
        />

        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!isValid || !isDirty || updateProfileMutation.isPending}
          className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default EditProfileForm;
