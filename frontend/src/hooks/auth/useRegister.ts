import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import { registerUser } from "../../api/auth.api";

import type { RegisterInput, RegisterResponse } from "../../types/auth.types";
import type { ErrorResponse } from "../../types/common.types";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    RegisterInput,
    unknown
  >({
    mutationFn: registerUser,

    onSuccess(data) {
      if (!data.success) {
        toast.error(data.message || "Registration Failed");
        return;
      }

      toast.success(data.message || "Registration Success");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },

    onError(error) {
      if (!error.response) {
        toast.error("Something went wrong. Please try again later");
        return;
      }

      toast.error(error.response.data.message || "Registration Failed");
    },
  });
};
