import { supabase } from "./supabase";
import { getToday } from "@/utils/helpers";
import { Tables } from "@/types/database";
import { PAGE_SIZE } from "@/utils/constants";

type BookingRow = Tables<"bookings">;
type CabinRow = Tables<"cabins">;

export type BookingWithCabin = BookingRow & CabinRow;

export async function getBookings({
  filter,
  sortBy,
  page,
}: {
  filter?: { field: string; value: string; method: string };
  sortBy?: { field: string; direction: string };
  page: number;
}) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(full_name, email)", { count: "exact" })
    .throwOnError();

  if (filter) {
    // load more options (gte, lte)
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    console.log("Field to order by is ", sortBy.field);
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * (PAGE_SIZE - 1);
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data: bookings, count } = await query;

  return { bookings, count };
}

export async function getBooking(id: number) {
  const { data: booking } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single()
    .throwOnError();

  return booking;
}
