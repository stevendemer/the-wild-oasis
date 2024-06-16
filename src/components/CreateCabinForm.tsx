import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCreateCabin } from "@/hooks/useCreateCabin";
import { useEditCabin } from "@/hooks/useEditCabin";
import { useModal } from "@/store";
import { useEffect } from "react";

type FormValues = {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount?: number;
  image: string;
  id: number;
  created_at: string;
  description?: string;
  singleErrorInput: string;
};

const CreateCabinForm = () => {
  const { isCreating, createCabin } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isEditing || isCreating;

  const { isOpen, onClose, data } = useModal();

  const { cabin, title } = data;

  const isEdit = Boolean(cabin);

  // console.log("Data from state is ", data.title);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: cabin || {},
  });

  useEffect(() => {
    if (cabin) {
      Object.keys(cabin).forEach((key) => setValue(key, cabin[key]));
    }
  }, [cabin, setValue]);

  const onSubmit = handleSubmit((data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEdit) {
      editCabin(
        {
          newCabinData: { ...data, image },
          id: cabin.id,
          image,
        },
        {
          onSuccess: (data) => {
            reset();
            onClose();
          },
        }
      );
    } else {
      createCabin({
        ...data,
        image,
      });
    }
    if (isValid) {
      reset();
      onClose();
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose} defaultOpen={isOpen} modal>
      <DialogContent className="sm:max-w-lg space-y-4">
        <DialogHeader>
          <DialogTitle>{title || "Add new cabin"}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <form onSubmit={onSubmit} className="grid flex-1 gap-4">
            <Label className="font-regular text-md" htmlFor="name">
              Cabin name
            </Label>
            <Input
              {...register("name", { required: "Field is required" })}
              placeholder="002"
            />
            {errors.name?.message && (
              <span className="text-red-700 text-xl">
                {errors.name.message}
              </span>
            )}

            <Label className="font-regular text-md" htmlFor="capacity">
              Maximum capacity
            </Label>
            <Input
              {...register("max_capacity", {
                required: "Field is required",
                min: {
                  value: 1,
                  message: "Capacity should be at least 1",
                },
              })}
              placeholder="12"
            />
            {errors?.max_capacity?.message && (
              <span className="text-red-700 text-xl">
                {errors.max_capacity.message}
              </span>
            )}

            <Label className="text-md font-regular" htmlFor="price">
              Regular Price
            </Label>
            <Input
              {...register("regular_price", {
                required: "Field is required",
                min: {
                  value: 1,
                  message: "Price should be at least 1",
                },
              })}
              placeholder="900"
            />
            {errors?.regular_price?.message && (
              <span className="text-red-700 text-xl">
                {errors.regular_price.message}
              </span>
            )}

            <Label className="text-md font-regular" htmlFor="discount">
              Discount
            </Label>
            <Input
              {...register("discount", {
                min: {
                  value: 0,
                  message: "Discount cannot be negative",
                },
              })}
              defaultValue={0}
              placeholder="50"
              type="number"
            />
            {errors?.discount?.message && (
              <span className="text-red-700 text-xl">
                {errors.discount.message}
              </span>
            )}

            <Label className="text-md font-regular" htmlFor="description">
              Description
            </Label>
            <Input {...register("description")} placeholder="50" />
            {errors?.description?.message && (
              <span className="text-red-700 text-xl">
                {errors.description.message}
              </span>
            )}

            <Label className="text-md font-regular" htmlFor="image">
              Cabin Image
            </Label>
            <Input
              {...register("image", {
                required: "Field is required",
              })}
              className="cursor-pointer"
              type="file"
              name="image"
              accept="image/*"
            />
            {errors?.image?.message && (
              <span className="text-red-700 text-xl">
                {errors.image.message}
              </span>
            )}

            <DialogClose asChild>
              <Button
                disabled={isWorking}
                type="submit"
                size="sm"
                className="px-3"
              >
                {isEdit ? "Save changes" : "Add cabin"}
              </Button>
            </DialogClose>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCabinForm;
