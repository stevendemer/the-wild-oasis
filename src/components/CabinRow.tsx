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

  // const {
  //   id,
  //   name,
  //   max_capacity,
  //   discount,
  //   image,
  //   description,
  //   created_at,
  //   regular_price,
  // } = cabin;

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
    <TableBody>
      <TableRow className="cursor-pointer" key={cabin.id}>
        <TableCell colSpan={2}>
          <img
            className="aspect-[3/2] object-cover w-28 h-20 object-center scale-110"
            src={cabin.image || ""}
            alt="Cabin Image"
          />
        </TableCell>
        <TableCell className="font-semibold">{cabin.name}</TableCell>
        <TableCell className="font-semibold">
          Fills up to {cabin.max_capacity}
        </TableCell>
        <TableCell className="font-semibold">{cabin.regular_price}</TableCell>
        <TableCell className="font-semibold">{cabin.discount || "-"}</TableCell>
        <TableCell className="font-semibold">
          {cabin.description || "-"}
        </TableCell>
        <TableCell className=" space-x-4">
          <Button
            disabled={isCreating}
            onClick={() => onDuplicate()}
            variant="secondary"
          >
            Duplicate
            <HiSquare2Stack size={10} className="mx-2" />
          </Button>

          <Button disabled={isCreating}>
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
