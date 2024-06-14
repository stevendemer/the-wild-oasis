import { useBookings } from "@/hooks/useBookings";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";
import { useSearchParams } from "react-router-dom";
import { Tables } from "@/types/database";
import { MenuProvider } from "@/context/MenuContext";
import CabinRow from "./CabinRow";
import Filter from "./Filter";
import SortBy from "./SortBy";
import CabinTableBody from "./TableBody";
import { useEffect, useState } from "react";
import BookingRow from "./BookingRow";

const BookingTable = () => {
  const { bookings, isLoading, error } = useBookings();

  if (error) {
    toast.error(error.message);
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
    <MenuProvider>
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
      </Table>
    </MenuProvider>
  );
};

export default BookingTable;
