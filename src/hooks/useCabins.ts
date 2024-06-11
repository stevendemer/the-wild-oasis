import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/cabins";

export function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
