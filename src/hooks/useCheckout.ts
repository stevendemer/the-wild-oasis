import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "@/services/bookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: "checked-out",
        is_paid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out.`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("Error while checking out."),
  });

  return { checkout, isCheckingOut };
}