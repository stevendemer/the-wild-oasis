import { Tables } from "@/types/database";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "@/utils/helpers";

const Stats = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings?: Tables<"bookings">[];
  numDays: number;
  cabinCount?: number;
  confirmedStays?: Tables<"bookings">[];
}) => {
  const numBookings = bookings.length;

  const sales = bookings?.reduce((acc, curr) => acc + curr.total_price, 0);

  const checkins = confirmedStays?.length;

  const occupation =
    confirmedStays?.reduce((acc, curr) => acc + curr.num_nights, 0) /
    (numDays * cabinCount);

  return (
    <div className="flex items-center justify-center gap-4">
      <Stat
        title="Bookings"
        color="dark:bg-sky-700 bg-sky-400/40"
        icon={<HiOutlineBriefcase size={30} />}
        value={numBookings}
      />

      <Stat
        title="sales"
        color="dark:bg-green-700 bg-green-400/40"
        icon={<HiOutlineBanknotes size={30} />}
        value={formatCurrency(sales!)}
      />

      <Stat
        title="Check ins"
        color="dark:bg-purple-700 bg-purple-400/40"
        icon={<HiOutlineCalendarDays size={30} />}
        value={checkins}
      />

      <Stat
        title="Occupancy Rate"
        color="dark:bg-orange-700 bg-orange-400/40"
        icon={<HiOutlineChartBar size={30} />}
        value={Math.round(occupation * 100) + "%"}
      />
    </div>
  );
};

export default Stats;
