import { useBooking } from "@/hooks/useBooking";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "@/hooks/useMoveBack";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  //   const {} =

  const { data: booking, error, isLoading } = useBooking();
  if (!booking) {
    return (
      <div className="text-2xl font-semibold text-center">
        No booking found !
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="block w-20 h-20 bg-blue-500 animate-spin">Loading...</div>
    );
  }

  const statusToTagName = {
    unconfirmed: "bg-indigo-500",
    "checked-in": "bg-green-500",
    "checked-out": "bg-yellow-500",
  };

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/10 p-4 md:gap-8 md:p-10 w-full">
      <Button
        variant="outline"
        className="w-fit shadow-md rounded-md px-4 py-2"
        onClick={moveBack}
      >
        &larr; Back
      </Button>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <div className="flex flex-col items-center justify-between space-y-8">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl sm:text-5xl font-bold">
              Booking #{booking?.cabin_id}
            </h1>
            <Badge
              className={cn(
                `text-md uppercase ${statusToTagName[booking.status]}`
              )}
            >
              {booking.status?.replace("-", " ")}
            </Badge>
          </div>
          <BookingDataBox booking={booking} />
        </div>
        <div className="flex justify-end items-center p-4 space-x-2">
          {booking.status === "unconfirmed" && (
            <Button
              className="bg-indigo-700 text-slate-100 font-semibold drop-shadow-md"
              onClick={() => navigate(`/checkin/${booking.id}`)}
            >
              Check in
            </Button>
          )}
          {booking.status === "checked-in" && (
            <Button size="lg">Check out</Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default BookingDetails;
