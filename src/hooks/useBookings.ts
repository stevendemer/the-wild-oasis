import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { BookingWithCabin, getBookings } from "@/services/bookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
}
