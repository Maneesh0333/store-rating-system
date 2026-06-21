import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth.api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import type { LoginInput, LoginResponse } from "../../types/auth.types";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../../types/common.types";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  
  return useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginInput,
    unknown
  >({
    mutationFn: loginUser,
    onSuccess(data) {
      if (!data.success) {
        toast.error(data.message || "Login Failed");
        return;
      }
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser(data.data.user);
      toast.success(data.message || "Login Success");
      navigate("/");
    },
    onError: (error) => {
      if (!error.response) {
        toast.error("Somthing Went Wrong. Please try again later");
        return;
      }
      toast.error(error.response.data.message || "Login Failed");
    },
  });
};
