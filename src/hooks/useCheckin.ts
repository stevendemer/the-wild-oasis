import { updateBooking } from "@/services/bookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const { mutate: checkIn, isPending: isCheckingin } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: {
        has_breakfast: boolean;
        extras_price: number;
        total_price: number;
      };
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in.`);
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      navigate("/");
    },
    onError: () => toast.error("Error while checking in."),
  });

  return { checkIn, isCheckingin };
}
