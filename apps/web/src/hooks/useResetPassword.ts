import { api } from "@/api";
import { errorToast } from "@/lib/toasts";
import { ResetPasswordParams } from "@repo/exapi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useResetPassword = () => {
  const router = useRouter();

  const { data, isPending, isError, isSuccess, mutate } = useMutation({
    mutationKey: ["resetPassword"],

    mutationFn: async (params: Omit<ResetPasswordParams, "token">) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      console.log('====================================');
      console.log('data', params);
      console.log('====================================');
      return api.api().auth.resetPassword({ ...params, token });
    },

    onSuccess: () => {
      console.log("Password reset successful:", data);
      router.push("/login");
    },

    onError: (error) => {
      errorToast(error.message);
      console.log("Error resetting password:", error);
    },
  });

  return {
    isSuccess,
    isError,
    isPending,
    mutate,
  };
};
