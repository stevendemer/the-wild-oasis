import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

export const subtractDates = (date1: Date | string, date2: Date | string) =>
  differenceInDays(parseISO(String(date1)), parseISO(String(date2)));

export const formatDistanceFromNow = (dateString: string) => {
  return formatDistance(parseISO(dateString), new Date(), {
    addSuffix: true,
  })
    .replace("about", "")
    .replace("in", "In");
};

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
