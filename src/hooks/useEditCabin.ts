import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "@/services/cabins";
import toast from "react-hot-toast";
import { Tables } from "@/types/database";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: { newCabinData: any; id: number }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    editCabin,
    isEditing,
  };
}
