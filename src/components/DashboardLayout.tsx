import { useBookings } from "@/hooks/useBookings";
import { useCabins } from "@/hooks/useCabins";
import { useRecentBookings } from "@/hooks/useRecentBookings";
import { useRecentStays } from "@/hooks/useRecentStays";
import Spinner from "./Spinner";
import Filter from "./Filter";
import Stats from "./Stats";
import { Button } from "./ui/button";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";

const DashboardLayout = () => {
  const { bookings, isLoading: recentLoading } = useRecentBookings();
  const { confirmedStays, isLoading: stayLoading, numDays } = useRecentStays();
  const { cabins, isLoading } = useCabins();

  if (isLoading || recentLoading || stayLoading) {
    return <Spinner />;
  }

  console.log("recent stays ", confirmedStays);
  console.log("recent bookings ", bookings);

  return (
    <div className="grid grid-cols-4 grid-rows-2 justify-center place-items-center p-4">
      <div className="w-screen container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-xl sm:text-4xl font-sans  rounded-lg">
            Dashboard
          </h1>
          <div>
            <Filter
              filterField="last"
              options={[
                { value: "7", label: "Last 7 days" },
                { value: "30", label: "Last 30 days" },
                { value: "90", label: "Last 90 days" },
              ]}
            />
          </div>
        </div>
        <Stats
          numDays={numDays}
          bookings={bookings}
          cabinCount={cabins?.length}
          confirmedStays={confirmedStays}
        />
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="col-span-2 h-full">
            <TodayActivity />
          </div>
          <div className="col-span-2">
            <DurationChart confirmedStays={confirmedStays} />
          </div>
        </div>
        <SalesChart bookings={bookings} numDays={numDays} />
      </div>
    </div>
  );
};

export default DashboardLayout;
