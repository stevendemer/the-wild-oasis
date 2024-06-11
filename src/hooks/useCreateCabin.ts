import { QueryClient, useMutation } from "@tanstack/react-query";
import { createEditCabin } from "@/services/cabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const client = new QueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin added !");
      //refresh the cache
      client.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    isCreating,
    createCabin,
  };
}
