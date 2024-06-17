import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMinute,
  subDays,
} from "date-fns";
import { Tables } from "@/types/database";
import { useTheme } from "./ThemeProvider";

const SalesChart = ({
  bookings,
  numDays,
}: {
  bookings: Tables<"bookings">[];
  numDays: number;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr?.total_price, 0),
      extraSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr?.extras_price, 0),
    };
  });

  const colors = isDark
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <div className="grid h-full w-full mt-6 mb-8  dark:bg-gray-800 bg-gray-50 p-6 rounded-lg">
      <h1 className="text-xl font-bold">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </h1>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ background: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
