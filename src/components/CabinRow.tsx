import { useDeleteCabin } from "@/hooks/useDeleteCabin";
import { useCreateCabin } from "@/hooks/useCreateCabin";
import { Tables } from "@/types/database";

const CabinRow = ({ cabin }: { cabin: Tables<"cabins"> }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id,
    name,
    max_capacity,
    discount,
    image,
    description,
    created_at,
    regular_price,
  } = cabin;

  return <div>CabinRow</div>;
};

export default CabinRow;
