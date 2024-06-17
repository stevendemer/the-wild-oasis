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
import { ModalProvider } from "@/context/MenuContext";
import CabinRow from "./CabinRow";
import Filter from "./Filter";
import SortBy from "./SortBy";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Pagination from "./Pagination";
import { Button } from "./ui/button";
import { useModal } from "@/store";
import { Plus } from "lucide-react";
import Spinner from "./Spinner";

const CabinTable = () => {
  const { isLoading, cabins, error, count } = useCabins();
  const [searchParams] = useSearchParams();
  const [sum, setSum] = useState(0);
  const [finalCabins, setFinalCabins] = useState<Tables<"cabins">[]>([]);

  const { onOpen } = useModal();

  useEffect(() => {
    if (cabins) {
      const filterValue = searchParams.get("discount") || "all";
      const sortBy = searchParams.get("sortBy") || "start_date-asc";
      const [field, direction] = sortBy.split("-");
      const modifier = direction === "asc" ? 1 : -1;

      let filteredCabins = cabins;

      switch (filterValue) {
        case "no-discount":
          filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
          break;
        case "with-discount":
          filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
          break;
        default:
          break;
      }

      const sortedCabins = [...filteredCabins].sort((a, b) => {
        if (typeof a[field] === "string" && typeof b[field] === "string") {
          return a[field].localeCompare(b[field]) * modifier;
        }
        if (typeof a[field] === "number" && typeof b[field] === "number") {
          return (a[field] - b[field]) * modifier;
        }
        return 0;
      });

      setFinalCabins(sortedCabins);

      const totalSum = sortedCabins.reduce((acc, curr) => {
        return (
          acc +
          (curr.discount
            ? curr.regular_price - curr.discount
            : curr.regular_price)
        );
      }, 0);

      setSum(totalSum);
    }
  }, [cabins, searchParams]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins?.length) {
    return (
      <div className="text-2xl sm:text-4xl font-bold font-mono text-center h-full flex justify-center items-center p-2">
        {" "}
        No cabins found !
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    throw new Error("Error fetching the cabins ");
  }

  const getSum = (cabins?: Tables<"cabins">[]) => {
    return cabins?.reduce((acc, curr) => {
      return (
        acc +
        (curr.discount
          ? curr.regular_price - curr.discount
          : curr.regular_price)
      );
    }, 0);
  };

  return (
    <>
      <div className="flex justify-end absolute right-10 z-10">
        <Filter
          filterField="discount"
          options={[
            { value: "all", label: "All" },
            { value: "with-discount", label: "With discount" },
            { value: "no-discount", label: "No discount" },
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
      <Table className="mt-20">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] sm:table-cell">
              <span className="sr-only">Cabin image</span>
            </TableHead>
            <TableHead className="w-[120px]">Name</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        {finalCabins?.map((cabin: Tables<"cabins">) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        ))}
        {/* <CabinTableBody
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        /> */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="text-lg font-semibold space-y-8">
              Total: <span>{sum} $</span>
              <Pagination count={count} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button onClick={onOpen} className="items-center space-x-2" size="sm">
        <Plus />
        <span>Add cabin</span>
      </Button>
    </>
  );
};

export default CabinTable;
