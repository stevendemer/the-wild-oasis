import { useCabins } from "@/hooks/useCabins";
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
import toast from "react-hot-toast";

const CabinTable = () => {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();
  const [sortedCabins, setSortedCabins] = useState<Tables<"cabins">[]>([]);
  // const [filteredCabins, setFilteredCabins] = useState<Tables<"cabins">[]>([]);
  // const [sum, setSum] = useState(0);

  let filteredCabins: Tables<"cabins">[] = [];

  useEffect(() => {
    const sortCabins = () => {
      // sorting the cabins
      const sortBy = searchParams.get("sortBy") || "start_date-asc";
      const [field, direction] = sortBy.split("-");
      const modifier = direction === "asc" ? -1 : 1;

      const sorted = filteredCabins?.sort((a, b) => {
        // in case of name comparison
        if (typeof a[field] === "string" && typeof b[field] === "string") {
          return (
            (a[field] as string).localeCompare(b[field] as string) * modifier
          );
        }
        if (typeof a[field] === "number" && typeof b[field] === "number") {
          return (a[field] - b[field]) * modifier;
        }
      }) as Tables<"cabins">[];

      setSortedCabins(sorted);
    };

    sortCabins();
  }, [searchParams, cabins, filteredCabins]);

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 4 }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="w-[90px] h-5" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 4 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="w-[400px] h-16" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!cabins?.length) {
    return (
      <div className="text-2xl font-semibold text-center ">
        {" "}
        No cabins found !
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    throw new Error("Error fetching the cabins ");
  }

  const filterValue = searchParams.get("discount") || "all";

  switch (filterValue) {
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
      console.log("Invalid value");
      break;
  }

  const getSum = (cabins: Tables<"cabins">[]) => {
    return cabins.reduce((acc, curr) => {
      return (
        acc +
        (curr.discount
          ? curr.regular_price - curr.discount
          : curr.regular_price)
      );
    }, 0);
  };

  return (
    <MenuProvider>
      <div className="flex justify-end absolute right-10 z-10">
        <Filter
          filterField="discount"
          options={[
            { value: "all" },
            { value: "with-discount" },
            { value: "no-discount" },
          ]}
        />

        <SortBy
          options={[
            { value: "name-asc", label: "sort by name (A-Z)" },
            { value: "name-desc", label: "sort by name (Z-A)" },
            { value: "regular_price-asc", label: "sort by price (low first)" },
            {
              value: "regular_price-desc",
              label: "sort by price (high first)",
            },
            {
              value: "max_capacity-asc",
              label: "sort by capacity (low first)",
            },
            {
              value: "max_capacity-desc",
              label: "sort by capacity (high first)",
            },
          ]}
        />
      </div>
      <Table className="mt-20 container mx-auto">
        <TableCaption>A list of all registered cabins.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead>Cabin</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        {/* {filteredCabins?.map((cabin: Tables<"cabins">) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          ))} */}
        <CabinTableBody
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-lg font-semibold">
              Total: <span>{getSum(filteredCabins)} $</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </MenuProvider>
  );
};

export default CabinTable;
