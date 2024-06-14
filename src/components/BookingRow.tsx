import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tables } from "@/types/database";
import { useNavigate } from "react-router-dom";
import { format, isToday, startOfDay } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const BookingRow = ({ booking }: { booking: Tables<"bookings"> }) => {
  const {
    id: bookingId,
    created_at,
    start_date,
    end_date,
    num_guests,
    num_nights,
    status,
    total_price,
    guests: { full_name: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  const statusToTagName = {
    unconfirmed: "bg-blue-500",
    "checked-in": "bg-green-500",
    "checked-out": "bg-zinc-500",
  };

  return (
    <TableBody>
      <TableRow className="cursor-pointer" key={bookingId}>
        <TableCell className="font-semibold">{cabinName}</TableCell>
        <TableCell className="font-semibold">
          <div className="flex flex-col items-center text-md w-fit">
            <span>{guestName}</span>
            <span className="text-muted-foreground">{email}</span>
          </div>
        </TableCell>
        <TableCell className="font-semibold w-fit">
          <span className="flex flex-col items-center w-fit">
            {isToday(new Date(start_date!))
              ? "Today"
              : formatDistanceFromNow(start_date!)}{" "}
            &#8594; {num_nights} night stay
          </span>
          {format(new Date(start_date!), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date!), "MMM dd yyyy")}
        </TableCell>
        <TableCell className="font-semibold">
          <Badge className={cn(`text-md uppercase ${statusToTagName[status]}`)}>
            {status?.replace("-", " ")}
          </Badge>
        </TableCell>
        <TableCell className="font-semibold">
          {formatCurrency(total_price!)}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default BookingRow;
