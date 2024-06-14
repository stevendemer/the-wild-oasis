import { useBookings } from "@/hooks/useBookings";
import toast from "react-hot-toast";
import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";
import { MenuProvider } from "@/context/MenuContext";
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
import BookingTable from "@/components/BookingTable";

const Bookings = () => {
  const { bookings, isLoading, error } = useBookings();

  if (error) {
    toast.error(error.message);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(bookings);

  return (
    <>
      <MenuProvider>
        <div className="flex justify-end absolute right-10 z-10">
          <Filter
            filterField="status"
            options={[
              { value: "all", label: "All" },
              { value: "checked-out", label: "Checked out" },
              { value: "checked-in", label: "Checked in" },
              { value: "unconfirmed", label: "Unconfirmed" },
            ]}
          />
          <SortBy
            options={[
              {
                value: "start_date-desc",
                label: "Sort by date (recent first)",
              },
              {
                value: "start_date-asc",
                label: "Sort by date (earlier first)",
              },
              {
                value: "total_price-desc",
                label: "Sort by amount (high first)",
              },
              { value: "total_price-asc", label: "Sort by amount (low first)" },
            ]}
          />
        </div>
        <BookingTable />
      </MenuProvider>
    </>
  );
};

export default Bookings;
