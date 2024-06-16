import { logIn } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const client = useQueryClient();

  const navigate = useNavigate();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      logIn({ email, password }),
    onSuccess: (user) => {
      // manually set the cache
      client.setQueryData(["user"], user.user);
      navigate("/dashboard", {
        replace: true,
      });
    },
    onError: (error) => {
      console.error("Error: ", error.message);
      toast.error("Invalid credentials");
    },
  });

  return { login, isLogging };
}
