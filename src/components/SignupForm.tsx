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
import { useSignup } from "@/hooks/useSignup";

type Inputs = {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const { isPending, signUp } = useSignup();

  const {
    reset,
    formState: { errors },
    getValues,
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit = handleSubmit((data) => {
    signUp(
      {
        email: data.email,
        password: data.password,
        full_name: data.fullName,
      },
      {
        onSettled: () => reset(),
      }
    );
  });

  return (
    <Card className="mx-auto w-full container bg-muted">
      <CardHeader>
        <CardTitle className="text-xl font-bold sm:text-3xl p-6">
          Create new user
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 items-center ">
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-2  items-center gap-6"
          >
            {errors.email?.message && (
              <span className="text-xl text-center text-red-600">
                {errors.email.message}
              </span>
            )}
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} type="email" id="email" />

            {errors.fullName?.message && (
              <span className="text-xl text-center text-red-600">
                {errors.fullName.message}
              </span>
            )}
            <Label htmlFor="fullName">Full name</Label>
            <Input type="text" {...register("fullName")} />

            {errors.password?.message && (
              <span className="text-xl text-center text-red-600">
                {errors.password.message}
              </span>
            )}
            <Label htmlFor="password">Password (min 8 characters)</Label>
            <Input
              type="password"
              id="password"
              {...register("password", { minLength: 8 })}
            />

            {errors.confirmPassword?.message && (
              <span className="text-xl text-center text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              type="password"
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
            <span className="flex items-center max-w-lg space-x-4">
              <Button
                disabled={isPending}
                className="flex justify-center my-10 flex-1 bg-indigo-700 text-slate-100 font-semibold"
                type="submit"
              >
                Create user
              </Button>
              <Button
                disabled={isPending}
                type="reset"
                onClick={() => reset()}
                className="flex justify-center my-10 flex-1 bg-yellow-700 text-slate-100 font-semibold"
              >
                Cancel
              </Button>
            </span>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
