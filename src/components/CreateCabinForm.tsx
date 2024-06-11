import { createCabin } from "@/services/cabins";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const CreateCabinForm = () => {
  const [show, setShow] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin added !");
    },
  });

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="container">
      <Button
        variant="secondary"
        className="w-full rounded-lg text-md font-medium"
        onClick={() => setShow((prev) => !prev)}
      >
        Create new cabin
      </Button>
      {show && (
        <form className="flex flex-col items-center space-y-2 p-2 mt-16">
          <div className="flex items-center p-2 justify-center space-x-6 w-1/2">
            <Label className="text-lg whitespace-nowrap" htmlFor="name">
              Cabin name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Cabin name..."
              name="name"
              className="w-full"
            />
          </div>

          <div className="flex items-center p-2 justify-center space-x-6 w-1/2">
            <Label className="text-lg whitespace-nowrap" htmlFor="capacity">
              Maximum Capacity
            </Label>
            <Input
              id="capacity"
              type="number"
              placeholder="Max capacity..."
              name="capacity"
            />
          </div>

          <div className="flex items-center p-2 justify-center space-x-6 w-1/2">
            <Label className="text-lg whitespace-nowrap" htmlFor="price">
              Regular Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Regular price..."
              name="price"
            />
          </div>

          <div className="flex items-center p-2 justify-between space-x-6 w-1/2">
            <Label className="text-lg whitespace-nowrap" htmlFor="discount">
              Discount
            </Label>
            <Input
              id="discount"
              type="number"
              placeholder="Discount"
              name="discount"
            />
          </div>
          <div className="flex items-center p-2 justify-between space-x-6 w-1/2">
            <Label className="text-lg whitespace-nowrap" htmlFor="description">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Description"
              name="description"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateCabinForm;
