import { updateCurrentUser } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const client = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated.");
      client.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    updateUser,
    isUpdating,
  };
}
