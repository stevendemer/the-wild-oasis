import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useLogin } from "@/hooks/useLogin";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { reset, formState, getValues, register, handleSubmit } =
    useForm<Inputs>();

  const { isLogging, login } = useLogin();

  const onSubmit = handleSubmit((data) => {
    login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center space-y-8"
      >
        <img
          className="my-8 aspect-square object-contain"
          src="/logo-dark.png"
          alt="The wild oasis"
        />
        <Label>Email</Label>
        <Input
          placeholder="test@gmail.com"
          type="email"
          {...register("email", { minLength: 5 })}
          autoComplete="username"
          disabled={isLogging}
        />
        <Label>Password</Label>
        <Input
          {...register("password", {
            required: "Password is required",
            minLength: 5,
          })}
          type="password"
          placeholder="********"
          disabled={isLogging}
        />
        <Button className="w-full" disabled={isLogging} type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
