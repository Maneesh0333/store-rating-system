import { useState } from "react";
import { Eye, EyeOff, Store } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useLogin } from "../../hooks/auth/useLogin";
import type { LoginInput } from "../../types/auth.types";
import { loginSchema } from "../../validations/auth.schema";
import { Link } from "react-router-dom";

const Login = () => {
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
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

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-gray-500 mt-2">Sign in to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>

              <input
                {...register("email")}
                placeholder="Enter email"
                className={`w-full rounded-lg border px-4 py-3 transition
                ${
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
                  className="absolute right-3 cursor-pointer top-3"
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

            <button
              type="submit"
              disabled={loginMutation.isPending || !isValid}
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Signing In..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
