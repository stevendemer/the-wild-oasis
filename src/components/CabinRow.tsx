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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tables } from "@/types/database";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useModal } from "@/store";
import CreateCabinForm from "./CreateCabinForm";

const CabinRow = ({ cabin }: { cabin: Tables<"cabins"> }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const [showForm, setShowForm] = useState<boolean>(false);

  const { isOpen, onClose, onOpen, setData } = useModal();

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
        <TableCell className="sm:table-cell">
          <img
            className="aspect-square rounded-md object-cover"
            height="90"
            width="90"
            src={cabin.image || ""}
            alt="Cabin Image"
          />
        </TableCell>
        <TableCell className="font-semibold w-[120px] sm:table-cell">
          {cabin.name}
        </TableCell>

        <TableCell className="font-semibold whitespace-nowrap sm:table-cell">
          Fits up to {cabin.max_capacity}
        </TableCell>
        <TableCell className="font-semibold sm:table-cell">
          {cabin.regular_price}
        </TableCell>
        <TableCell className="font-semibold sm:table-cell">
          {cabin.discount || "-"}
        </TableCell>
        <TableCell className="font-regular leading-6 max-w-md sm:table-cell">
          {cabin.description || "-"}
        </TableCell>
        <TableCell className="flex flex-1 space-x-4 sm:table-cell">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="child-hover:cursor-pointer"
              align="end"
            >
              <DropdownMenuItem className="space-x-2" onClick={onDuplicate}>
                <span>
                  <HiSquare2Stack className="w-3.5 h-3.5" />
                </span>
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setData({ title: "Edit cabin", cabin });
                  onOpen();
                }}
                className="space-x-2"
              >
                <span>
                  <HiPencil className="w-3.5 h-3.5" />
                </span>
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="space-x-2"
                onClick={() => deleteCabin(cabin.id)}
              >
                <span>
                  <HiTrash className="w-3.5 h-3.5" />
                </span>
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CabinRow;
