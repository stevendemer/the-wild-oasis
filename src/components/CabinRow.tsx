import { useDeleteCabin } from "@/hooks/useDeleteCabin";
import { useCreateCabin } from "@/hooks/useCreateCabin";
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
import { Tables } from "@/types/database";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";

const CabinRow = ({ cabin }: { cabin: Tables<"cabins"> }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const onDuplicate = () => {
    createCabin({
      name: `Copy of ${cabin.name}`,
      description: cabin.description,
      image: cabin.image,
      max_capacity: cabin.max_capacity,
      discount: cabin.discount,
      regular_price: cabin.regular_price,
    });
  };

  return (
    <TableBody key={cabin.id} className="mx-auto">
      <TableRow className="cursor-pointer">
        <TableCell>
          <img
            className="aspect-[1/3] object-cover w-40 h-20"
            src={cabin.image || ""}
            alt="Cabin Image"
          />
        </TableCell>
        <TableCell className="font-semibold w-[200px]">{cabin.name}</TableCell>

        <TableCell className="font-semibold whitespace-nowrap">
          Fills up to {cabin.max_capacity}
        </TableCell>
        <TableCell className="font-semibold">{cabin.regular_price}</TableCell>
        <TableCell className="font-semibold">{cabin.discount || "-"}</TableCell>
        <TableCell className="font-regular leading-6">
          {cabin.description || "-"}
        </TableCell>
        <TableCell className="flex items-center flex-1 space-x-4">
          <Button
            disabled={isCreating}
            onClick={() => onDuplicate()}
            variant="outline"
          >
            Duplicate
            <HiSquare2Stack size={10} className="mx-2" />
          </Button>

          <Button
            variant="outline"
            className="bg-indigo-500 text-gray-50 hover:bg-indigo-600"
            disabled={isCreating}
          >
            Edit
            <HiPencil size={10} className="mx-2" />
          </Button>
          <Button
            onClick={() => deleteCabin(cabin.id)}
            variant="destructive"
            disabled={isDeleting}
          >
            Delete
            <HiTrash size={10} className="mx-2" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CabinRow;
