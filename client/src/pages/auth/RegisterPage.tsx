import RegisterForm from "../../forms/RegisterForm";
import { NavLink } from "react-router";

const RegisterPage = () => {
  return (
    <div className="flex flex-col   min-w-[27rem] p-10 space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Create account
        </h1>
        <p className="text-center text-gray-500">
          Please sign up to get started
        </p>
      </div>
      <RegisterForm />
      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="hover:underline text-blue-500 font-semibold"
        >
          Sign In
        </NavLink>
      </p>
    </div>
  );
};

export default RegisterPage;
