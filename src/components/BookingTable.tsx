import { useBookings } from "@/hooks/useBookings";
import toast from "react-hot-toast";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import BookingRow from "./BookingRow";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import ConfirmModal from "./ConfirmModal";

const BookingTable = () => {
  const { bookings, isLoading, error, count } = useBookings();

  if (error) {
    toast.error(error.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  console.log(bookings);

  if (!bookings?.length) {
    return (
      <div className="text-2xl font-semibold text-center">
        No bookings found !
      </div>
    );
  }

  return (
    <Table className="mt-20 container mx-auto">
      <TableCaption>All bookings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cabin</TableHead>
          <TableHead>Guest</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      {/* {filteredCabins?.map((cabin: Tables<"cabins">) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          ))} */}
      {bookings?.map((booking) => (
        <BookingRow booking={booking} key={booking.id} />
      ))}
      <TableFooter>
        <TableCell colSpan={5}>
          <Pagination count={count} />
        </TableCell>
      </TableFooter>
      <ConfirmModal label="Are you sure you want to delete this booking ?" />
    </Table>
  );
};

export default BookingTable;
