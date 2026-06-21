import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Store } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { registerSchema } from "../../validations/auth.schema";
import type { RegisterInput } from "../../types/auth.types";
import { useRegister } from "../../hooks/auth/useRegister";

type RegisterFormData = RegisterInput & {
  confirmPassword: string;
};

const Register = () => {
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...payload } = data;

    registerMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex sticky top-0 left-0 h-screen flex-1 bg-gradient-to-br from-indigo-600 to-blue-700 items-center justify-center text-white p-10">
        <div className="max-w-md">
          <Store size={70} />

          <h1 className="text-5xl font-bold mt-5">Store Rating Platform</h1>

          <p className="mt-4 text-lg text-blue-100">
            Create your account and start managing stores, ratings, and users.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center">Create Account</h2>

          <p className="text-center text-gray-500 mt-2">
            Join the platform today
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>

              <input
                {...register("name")}
                placeholder="Enter full name"
                className={`w-full px-4 py-3 rounded-lg border transition ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus:outline-blue-500"
                }`}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>

              <input
                {...register("email")}
                placeholder="Enter email"
                className={`w-full px-4 py-3 rounded-lg border transition ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:outline-blue-500"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 text-sm font-medium">Address</label>

              <textarea
                rows={3}
                {...register("address")}
                placeholder="Enter address"
                className={`w-full px-4 py-3 rounded-lg border resize-none transition ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-300 focus:outline-blue-500"
                }`}
              />

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
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
                  className={`w-full px-4 py-3 pr-12 rounded-lg border transition ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 focus:outline-blue-500"
                  }`}
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border transition ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 focus:outline-blue-500"
                  }`}
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending || !isValid}
              className="w-full py-3 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registerMutation.isPending ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
