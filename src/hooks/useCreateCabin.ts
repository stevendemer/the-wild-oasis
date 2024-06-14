import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "@/services/cabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const client = useQueryClient();

  const {
    mutate: createCabin,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      //refresh the cache
      client.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New cabin added !");
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    isCreating,
    createCabin,
    error,
  };
}
