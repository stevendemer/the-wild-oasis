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
    .select("*, cabins(id, name), guests(full_name, email)", { count: "exact" })
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

export async function updateBooking(
  id: number,
  obj: {
    status: "checked-in" | "checked-out" | "unconfirmed";
    is_paid: boolean;
  }
) {
  const { data } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single()
    .throwOnError();

  return data;
}

export async function deleteBooking(id: number) {
  const { data } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .throwOnError();

  console.log("dATA IS ", data);

  return data;
}

export async function getStaysToday() {
  const { data } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag")
    .or(
      `and(status.eq.unconfirmed, start_date.eq.${getToday()}), and(status, eq.checked_in, end_date.eq.${getToday()})`
    )
    .order("created_at")
    .throwOnError();

  return data;
}

export async function getStaysAfterDate(date: Date) {
  const { data } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday())
    .throwOnError();

  return data;
}

export async function getBookingsAfterDate(date: Date) {
  const { data } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }))
    .throwOnError();

  return data;
}
