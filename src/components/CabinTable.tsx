import { useCabins } from "@/hooks/useCabins";
import { Button } from "./ui/button";
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
import { useSearchParams } from "react-router-dom";
import { Database, Tables } from "@/types/database";
import CreateCabinForm from "./CreateCabinForm";
import { MenuProvider } from "@/context/MenuContext";
import CabinOptions from "./CabinOptions";
import { useDeleteCabin } from "@/hooks/useDeleteCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  if (isLoading) {
    return <div className="text-xl text-center">Cabins are loading...</div>;
  }

  if (!cabins?.length) {
    return <div className="text-xl text-center "> No cabins found !</div>;
  }

  const calculateSum = (cabins: Tables<"cabins">[]) => {
    let sum = 0;
    cabins.map((c) => (sum += c.regular_price!));
    return sum;
  };

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((c) => c.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((c) => c.discount > 0);
  }

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <MenuProvider>
      <div className="flex justify-end">
        <CabinOptions />
      </div>
      <Table>
        <TableCaption>A list of all registered cabins.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Cabin</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cabins.map((cabin: Tables<"cabins">) => (
            <TableRow className="cursor-pointer" key={cabin.id}>
              <TableCell colSpan={2}>
                <img
                  className="aspect-[3/2] object-cover w-28 h-20 object-center scale-110"
                  src={cabin.image || ""}
                  alt="Cabin Image"
                />
              </TableCell>
              <TableCell className="font-medium">{cabin.name}</TableCell>
              <TableCell>Fills up to {cabin.max_capacity}</TableCell>
              <TableCell>{cabin.regular_price}</TableCell>
              <TableCell>{cabin.discount || "-"}</TableCell>
              <TableCell>{cabin.description || "-"}</TableCell>
              <TableCell className="flex items-center flex-1 space-x-2">
                <Button>
                  Edit
                  <HiPencil className="mx-2" />
                </Button>
                <Button
                  onClick={() => {
                    console.log(cabin.id);
                    deleteCabin(cabin.id);
                  }}
                  variant="destructive"
                  disabled={isDeleting}
                >
                  Delete
                  <HiTrash className="mx-2" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total: {calculateSum(cabins)} $</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </MenuProvider>
  );
};

export default CabinTable;
