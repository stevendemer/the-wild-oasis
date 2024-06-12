import { createCabin } from "@/services/cabins";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ErrorMessage } from "@hookform/error-message";

type FormValues = {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  image: string;
  id: number;
  created_at: string;
  description: string;
  singleErrorInput: string;
};

const CreateCabinForm = () => {
  const client = new QueryClient();

  const [show, setShow] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New cabin added !");
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  //   const { isCreating, createCabin } = useCreateCabin();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    mutate({
      ...data,
      image,
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-lg text-md"
          onClick={() => setShow((prev) => !prev)}
        >
          Add new cabin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg space-y-4">
        <DialogHeader>
          <DialogTitle>Add new cabin</DialogTitle>
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
                required: "Field is required",
                min: {
                  value: 0,
                  message: "Discount cannot be negative",
                },
              })}
              placeholder="50"
            />
            {errors?.discount?.message && (
              <span className="text-red-700 text-xl">
                {errors.discount.message}
              </span>
            )}

            <Label className="text-md font-regular" htmlFor="description">
              Description
            </Label>
            <Input
              {...register("description", {
                required: "Field is required",
              })}
              placeholder="50"
            />
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

            <Button
              disabled={isPending}
              type="submit"
              size="sm"
              className="px-3"
            >
              Submit
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCabinForm;
