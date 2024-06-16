import { useForm } from "react-hook-form";
import { useSettings } from "@/hooks/useSettings";
import { useUpdateSetting } from "@/hooks/useUpdateSetting";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "./ui/skeleton";
import Spinner from "./Spinner";
import { ChangeEvent, ChangeEventHandler } from "react";

type Inputs = {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const { reset, formState, getValues, register, handleSubmit } =
    useForm<Inputs>();

  const onSubmit = handleSubmit((data) => {});

  return (
    <Card className="mx-auto w-full container bg-muted">
      <CardHeader>
        <CardTitle className="text-xl font-bold sm:text-3xl text-center p-4">
          Create new user
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 items-center ">
          <form className="grid grid-cols-2  items-center gap-6">
            <Label htmlFor="email">Email</Label>
            <Input type="email" className="bg-gray-700" id="email" />

            <Label htmlFor="fullName">Full name</Label>
            <Input
              type="text"
              {...register("fullName")}
              className="bg-gray-700"
            />

            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              className="bg-gray-700"
              id="password"
              {...register("password", { minLength: 8 })}
            />

            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              type="password"
              className="bg-gray-700"
              id="confirmPassword"
              {...register(
                "confirmPassword",
                {
                  minLength: 8,
                },
                {
                  validate: (value: string) =>
                    value === getValues().confirmPassword ||
                    "Passwords must match",
                }
              )}
            />
          </form>
        </div>
        <span className="flex items-center max-w-lg space-x-4">
          <Button className="flex justify-center my-10 flex-1 bg-indigo-500">
            Create user
          </Button>
          <Button className="flex justify-center my-10 flex-1 bg-green-500">
            Cancel
          </Button>
        </span>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
