import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useChangePassword } from "../hooks/common/useChangePassword";
import type { ChangePasswordInput } from "../types/common.types";
import { changePasswordSchema } from "../validations/common.schema";

type Props = {
  onClose: () => void;
};

function ChangePasswordForm({ onClose }: Props) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const changePasswordMutation = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: yupResolver(changePasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ChangePasswordInput) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Current Password */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Current Password
        </label>

        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            {...register("oldPassword")}
            className={`w-full rounded-lg border px-4 py-3 pr-12 transition ${
              errors.oldPassword
                ? "border-red-500"
                : "border-gray-300 focus:outline-blue-500"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showOld ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </button>
        </div>

        {errors.oldPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.oldPassword.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          New Password
        </label>

        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            {...register("newPassword")}
            className={`w-full rounded-lg border px-4 py-3 pr-12 transition ${
              errors.newPassword
                ? "border-red-500"
                : "border-gray-300 focus:outline-blue-500"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showNew ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </button>
        </div>

        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.newPassword.message}
          </p>
        )}
      </div>

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
          disabled={
            !isValid ||
            changePasswordMutation.isPending
          }
          className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {changePasswordMutation.isPending
            ? "Updating..."
            : "Update Password"}
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;