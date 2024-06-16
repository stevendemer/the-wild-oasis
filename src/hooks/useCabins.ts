import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "@/services/cabins";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";

export function useCabins() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const sortByRaw = searchParams.get("sortBy") || "discount-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction } as const;

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { cabins, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins", sortBy, page],
    queryFn: () => getCabins({ sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", sortBy, page + 1],
      queryFn: () => getCabins({ sortBy, page }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", sortBy, page - 1],
      queryFn: () => getCabins({ sortBy, page }),
    });
  }

  return { cabins, isLoading, error, count };
}
