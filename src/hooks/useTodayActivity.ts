import { getStaysToday } from "@/services/bookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryKey: ["bookings"],
    queryFn: getStaysToday,
  });

  return { activities, isLoading };
}
