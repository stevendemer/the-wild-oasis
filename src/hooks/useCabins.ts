import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/cabins";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get("sortBy") || "discount-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction } as const;

  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins", sortBy],
    queryFn: () => getCabins({ sortBy }),
  });

  return { cabins, isLoading, error };
}
