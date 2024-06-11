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
import { useSearchParams } from "react-router-dom";
import { Database, Tables } from "@/types/database";
import CreateCabinForm from "./CreateCabinForm";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <div className="text-xl text-center">Cabins are loading...</div>;
  }

  if (!cabins?.length) {
    return <div className="text-xl text-center "> No cabins found !</div>;
  }

  const calculateSum = (cabins) => {
    let sum = 0;
    cabins.map((c) => (sum += c.regular_price));
    return sum;
  };

  return (
    <Table>
      <TableCaption>A list of all registered cabins.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Cabin</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cabins.map((cabin: Tables<"cabins">) => (
          <TableRow key={cabin.id}>
            <TableCell className="font-medium">{cabin.name}</TableCell>
            {cabin.image && (
              <TableCell>
                <img src={cabin.image} alt="Cabin Image" />
              </TableCell>
            )}
            <TableCell>{cabin.max_capacity}</TableCell>
            <TableCell>{cabin.regular_price}</TableCell>
            <TableCell>{cabin.discount}</TableCell>
            <TableCell>{cabin.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total: {calculateSum(cabins)} $</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CabinTable;
