import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CreateUserInput } from "../types/admin.types";
import { userSchema } from "../validations/admin.schema";
import { useCreateUser } from "../hooks/admin/useCreateUser";

type Props = {
  onClose: () => void;
};

function UserForm({ onClose }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const createUserMutation = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateUserInput>({
    resolver: yupResolver(userSchema),
    mode: "onChange",
  });

  const onSubmit = (data: CreateUserInput) => {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block mb-2 text-sm font-medium">Full Name</label>

        <input
          {...register("name")}
          placeholder="John Doe"
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
        <label className="block mb-2 text-sm font-medium">Email</label>

        <input
          {...register("email")}
          placeholder="john@gmail.com"
          className={`w-full rounded-lg border px-4 py-3 transition
          ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 focus:outline-blue-500"
          }`}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block mb-2 text-sm font-medium">Address</label>

        <textarea
          rows={4}
          {...register("address")}
          placeholder="Enter address"
          className={`w-full rounded-lg border resize-none px-4 py-3 transition
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

      {/* Password */}
      <div>
        <label className="block mb-2 text-sm font-medium">Password</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter password"
            className={`w-full rounded-lg border px-4 py-3 pr-12 transition
            ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 focus:outline-blue-500"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block mb-2 text-sm font-medium">Role</label>

        <select
          {...register("role")}
          className={`w-full rounded-lg border px-4 py-3
          ${
            errors.role
              ? "border-red-500"
              : "border-gray-300 focus:outline-blue-500"
          }`}
        >
          <option value="">Select Role</option>
          <option value="USER">User</option>
          <option value="STORE_OWNER">Store Owner</option>
          <option value="ADMIN">Admin</option>
        </select>

        {errors.role && (
          <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border cursor-pointer border-gray-300 px-5 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!isValid || createUserMutation.isPending}
          className="rounded-lg bg-blue-600 px-5 cursor-pointer py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createUserMutation.isPending ? "Creating..." : "Create User"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
