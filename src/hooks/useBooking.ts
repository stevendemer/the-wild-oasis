import { getBooking } from "@/services/bookings";
import { Tables } from "@/types/database";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Booking = Tables<"bookings">;

export function useBooking(): UseQueryResult<Booking, Error> {
  const { bookingId } = useParams();

  const queryResult = useQuery<Booking, Error>({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return queryResult;
}
