import { Tables } from "@/types/database";
import { HiOutlineHomeModern, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { isToday, format } from "date-fns";
import { formatCurrency } from "@/utils/helpers";
import { formatDistanceFromNow } from "@/utils/helpers";
import { CircleCheck } from "lucide-react";

const BookingDataBox = ({ booking }: { booking: Tables<"bookings"> }) => {
  return (
    <section className="bg-gray-100 border border-gray-200 rounded-md overflow-hidden w-full p-4">
      <header className="bg-indigo-700 p-8 text-gray-100 flex items-center justify-between rounded-lg">
        <div className="flex items-center gap-4 font-semibold text-lg">
          <HiOutlineHomeModern className="h-8 w-8" />
          <span className="font-sono text-xl ml-4">
            {booking.num_nights} nights in Cabin {booking.cabins.name}
          </span>
        </div>
        <p className="text-xl">
          {format(new Date(booking.start_date!), "EEE, MMM dd yyyy")} (
          {isToday(new Date(booking.start_date!))
            ? "Today"
            : formatDistanceFromNow(booking.start_date!)}
          ) &mdash; {format(new Date(booking.end_date!), "EEE, MMM dd yyyy")}
        </p>
      </header>

      {/* Section */}
      <section className="p-8 pt-16 flex items-center  space-x-8 text-gray-800 font-sans">
        {booking.guests.country_flag && (
          <img
            className="w-10 h-10 object-contain scale-125"
            src={booking.guests.country_flag}
            alt="Country flag"
          />
        )}
        <p className="text-sm text-slate-600 font-semibold">
          {booking.guests.full_name}{" "}
          {booking.num_guests > 1 ? `+ ${booking.num_guests - 1} guests` : ""}
        </p>
        <span>&bull;</span>
        <p>{booking.guests.email}</p>
        <span>&bull;</span>
        <p>National ID {booking.guests.national_id}</p>
        {/* <Guest booking={booking} /> */}
        {/* Additional sections can be added here */}
      </section>
      <div className="flex items-center  text-slate-700 px-10">
        <CircleCheck className="w-6 h-6 text-blue-500 font-bold" />
        <span className="font-bold mx-2">Breakfast included ? </span>{" "}
        {booking.has_breakfast ? " Yes " : " No "}
      </div>

      {booking.observations && (
        <p className="text-sm ">{booking.observations}</p>
      )}
      <div
        className={`flex items-center  space-x-10 p-6 rounded-sm mt-6 ${
          booking.is_paid
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        <HiOutlineCurrencyDollar className="h-6 w-6" />
        <p>
          <span className="font-semibold text-center">
            Total price {formatCurrency(booking.total_price!)}{" "}
            {`(${formatCurrency(booking.cabin_price!)} cabin${
              booking.has_breakfast
                ? ` + ${formatCurrency(booking.extras_price!)} breakfast`
                : ""
            })`}
          </span>
          {/* {formatCurrency(booking.total_price)} */}
        </p>
        <section className="text-lg sm:text-xl text-blue-500 uppercase font-bold font-mono">
          <p>{booking.is_paid ? "Paid" : "Will pay at property"}</p>
        </section>
      </div>
      <div className="flex items-center text-slate-600/70 justify-end p-2">
        <p>
          Booked {format(new Date(booking.created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </div>
    </section>
  );
};

export default BookingDataBox;
