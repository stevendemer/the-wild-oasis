import { useMoveBack } from "@/hooks/useMoveBack";
import { useBooking } from "@/hooks/useBooking";
import { useEffect, useState } from "react";
import { useCheckin } from "@/hooks/useCheckin";
import { useSettings } from "@/hooks/useSettings";
import { HiOutlineHomeModern, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { CircleCheck } from "lucide-react";
import { format, isToday } from "date-fns";
import { formatDistanceFromNow, formatCurrency } from "@/utils/helpers";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { data: booking, isLoading, error } = useBooking();
  const {
    data: settings,
    isLoading: settingLoading,
    error: settingError,
  } = useSettings();

  const moveBack = useMoveBack();
  const { checkIn, isCheckingin } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);

  if (isLoading || settingLoading) {
    return (
      <div className="text-xl text-center font-semibold">
        Booking is loading
      </div>
    );
  }

  if (settingError) {
    throw new Error(settingError.message);
  }

  console.log(settings);

  const optionalBreakfastPrice =
    settings?.breakfast_price * booking?.num_nights * booking?.num_guests;

  function onCheckIn() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId: booking?.id,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: booking?.total_price + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId: booking.id, breakfast: {} });
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/10 p-4 md:gap-8 md:p-10 w-full">
      <Button
        variant="ghost"
        className="w-fit shadow-md rounded-md px-4 py-2"
        onClick={moveBack}
      >
        &larr; Back
      </Button>

      <div className="mx-auto w-full grid max-w-6xl gap-2">
        <div className="flex flex-col items-center justify-between space-y-8">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl sm:text-5xl font-bold">
              Check in booking #{booking?.cabin_id}
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-gray-100 border border-gray-200 rounded-md overflow-hidden w-full p-4 mx-auto grid  max-w-6xl">
        <header className="bg-indigo-700 p-8 text-gray-100 flex items-center justify-between rounded-lg">
          <div className="flex items-center gap-4 font-semibold text-lg">
            <HiOutlineHomeModern className="h-8 w-8" />
            <span className="font-sono text-xl ml-4">
              {booking?.num_nights} nights in Cabin {booking?.cabins.name}
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
        <section className="p-8 pt-12 flex items-center px-20  space-x-4 text-gray-800 font-sans">
          {booking.guests.country_flag && (
            <img
              className="w-14 h-14 object-contain scale-125"
              src={booking.guests.country_flag}
              alt="Country flag"
            />
          )}
          <p className="text-sm font-bold">
            {booking.guests.full_name}{" "}
            {booking.num_guests > 1 ? `+ ${booking.num_guests - 1} guests` : ""}
          </p>
          <span className="text-muted-foreground">&bull;</span>
          <p className="text-muted-foreground">{booking.guests.email}</p>
          <span className="text-muted-foreground">&bull;</span>
          <p className="text-muted-foreground">
            National ID {booking.guests.national_id}
          </p>
          {/* <Guest booking={booking} /> */}
          {/* Additional sections can be added here */}
        </section>

        <div className="flex items-center px-20 text-slate-700 p-6">
          {booking?.observations && (
            <p className="text-sm font-semibold">{booking.observations}</p>
          )}
        </div>

        <div className="flex items-center  text-slate-700 px-20">
          <CircleCheck className="w-6 h-6 text-blue-500 font-bold" />
          <span className="font-bold mx-2">Breakfast included ? </span>{" "}
          {booking.has_breakfast ? " Yes " : " No "}
        </div>

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
              Total price {formatCurrency(booking?.total_price)}{" "}
              {`(${formatCurrency(booking?.cabin_price)} cabin${
                booking?.has_breakfast
                  ? ` + ${formatCurrency(booking?.extras_price)} breakfast`
                  : ""
              })`}
            </span>
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
        <div className="flex items-center p-4 space-x-6 justify-end">
          <Button
            className=""
            onClick={onCheckIn}
            disabled={!confirmPaid || isCheckingin}
            variant="outline"
          >
            Check in booking #{booking?.id}
          </Button>
          <Button onClick={moveBack} variant="secondary">
            &larr; Go back
          </Button>
        </div>
      </section>
      <section className="flex flex-col items-center p-4 space-y-6 cursor-pointer child-hover:cursor-pointer child-hover:bg-muted/20">
        {!booking?.has_breakfast && (
          <div className="flex items-center w-full max-w-6xl relative mx-auto h-16 p-4 rounded-lg bg-muted/40">
            <div className="items-top flex space-x-2">
              <Checkbox
                id="breakfast"
                checked={addBreakfast}
                onChange={() => {
                  setAddBreakfast((add) => !add);
                  setConfirmPaid(false);
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="breakfast"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Want to add breakfast for{" "}
                  {formatCurrency(optionalBreakfastPrice)} ?
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center w-full max-w-6xl relative mx-auto h-16 p-4 rounded-lg bg-muted/40">
          <div className="items-top flex space-x-2">
            <Checkbox
              disabled={confirmPaid || isCheckingin}
              id="confirm"
              checked={confirmPaid}
              onCheckedChange={() => setConfirmPaid((confirm) => !confirm)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="confirm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that {booking.guests.full_name} has paid the total
                amount of{" "}
                {!addBreakfast
                  ? formatCurrency(booking?.total_price)
                  : `${formatCurrency(
                      booking?.total_price + optionalBreakfastPrice
                    )} (${formatCurrency(
                      booking?.total_price
                    )} + ${formatCurrency(optionalBreakfastPrice)})`}
              </label>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckinBooking;
