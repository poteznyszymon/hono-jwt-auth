import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../src/validation/schemas";
import type { registerValues } from "../../../src/validation/schemas";
import { Loader2, Lock, Mail, User2 } from "lucide-react";
import useRegister from "../hooks/useRegister";

const RegisterForm = () => {
  const { registerUser, isLoading } = useRegister();
  const { handleSubmit, register } = useForm<registerValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: registerValues) => {
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="flex flex-col relative justify-center gap-1">
        <div className="">
          <input
            required
            {...register("username")}
            type="text"
            id="username"
            placeholder="username"
            className="border-gray-400 w-full pl-8 placeholder:text-gray-500 border p-2 rounded-md  focus:outline-2 focus:outline-blue-500"
          />

          <label htmlFor="username">
            <User2 className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          </label>
        </div>
      </div>
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

export default RegisterForm;
