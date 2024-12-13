import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../src/validation/schemas";
import type { loginValues } from "../../../src/validation/schemas";
import { Loader2, Lock, Mail } from "lucide-react";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { loginUser, isLoading } = useLogin();

  const { handleSubmit, register } = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginValues) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="flex flex-col relative justify-center gap-1">
        <div className="">
          <input
            required
            {...register("email")}
            type="email"
            id="email"
            placeholder="email"
            className="border-gray-400 w-full pl-8 placeholder:text-gray-500 border p-2 rounded-md  focus:outline-2 focus:outline-blue-500"
          />

          <label htmlFor="email">
            <Mail className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          </label>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1">
        <div className="relative">
          <input
            required
            {...register("password")}
            type="password"
            id="password"
            placeholder="password"
            className="border-gray-400 w-full pl-8 placeholder:text-gray-500 border p-2 rounded-md relative focus:outline-2 focus:outline-blue-500"
          />

          <label htmlFor="password">
            <Lock className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          </label>
        </div>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="w-full h-10 flex items-center justify-center disabled:bg-blue-500 bg-blue-600 font-semibold text-white py-2 rounded-md hover:bg-blue-500"
      >
        {isLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <p>Sign In</p>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
