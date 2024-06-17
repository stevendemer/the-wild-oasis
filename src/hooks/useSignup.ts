import { useMutation } from "@tanstack/react-query";
import { signUp as signupApi } from "@/services/auth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success("Account successfully created! Please verify your email.");
    },
  });

  return { signUp, isPending };
}
