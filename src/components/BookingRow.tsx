import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { format, isToday, startOfDay } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import { Tables } from "@/types/database";
import { HiTrash } from "react-icons/hi2";
import { MoreVertical, Eye, CircleCheckBig, LogOutIcon } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";
import ConfirmModal from "./ConfirmModal";
import { useDeleteBooking } from "@/hooks/useDeleteBooking";
import { useModal } from "@/store";

const BookingRow = ({ booking }: { booking: Tables<"bookings"> }) => {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { isOpen, onClose, onOpen } = useModal();

  const {
    id: bookingId,
    start_date,
    end_date,
    num_nights,
    status,
    total_price,
    guests: { full_name: guestName, email },
    cabins: { name: cabinName },
  } = booking;

  const statusToTagName = {
    unconfirmed: "bg-indigo-500",
    "checked-in": "bg-green-500",
    "checked-out": "bg-yellow-500",
  };

  return (
    <>
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
            <Badge
              className={cn(`text-md uppercase ${statusToTagName[status]}`)}
            >
              {status?.replace("-", " ")}
            </Badge>
          </TableCell>
          <TableCell className="font-semibold">
            {formatCurrency(total_price!)}
          </TableCell>
          <TableCell className="flex flex-1 space-x-4 sm:table-cell">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="child-hover:cursor-pointer"
              >
                <DropdownMenuItem
                  onClick={() => navigate(`/bookings/${booking.id}`)}
                  className="space-x-2"
                >
                  <span>
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                  <span>See details</span>
                </DropdownMenuItem>
                {booking.status === "unconfirmed" && (
                  <DropdownMenuItem
                    onClick={() => navigate(`/checkin/${booking.id}`)}
                    className="space-x-2"
                  >
                    <span>
                      <CircleCheckBig className="w-3.5 h-3.5" />
                    </span>
                    <span>Check in</span>
                  </DropdownMenuItem>
                )}
                {booking.status === "checked-in" && (
                  <DropdownMenuItem
                    onClick={() => checkout(booking.id)}
                    className="space-x-2"
                    disabled={isCheckingOut}
                  >
                    <span>
                      <LogOutIcon className="w-3.5 h-3.5" />
                    </span>
                    <span>Check out</span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onOpen} className="space-x-2">
                  <span>
                    <HiTrash className="w-3.5 h-3.5" />
                  </span>
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
      <ConfirmModal
        onConfirm={() => deleteBooking(booking.id)}
        disabled={isDeleting}
        resource="booking"
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default BookingRow;
