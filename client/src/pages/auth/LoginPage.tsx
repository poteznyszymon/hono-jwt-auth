import LoginForm from "../../forms/LoginForm";
import { NavLink } from "react-router";

const LoginPage = () => {
  return (
    <div className="flex flex-col  min-w-[27rem] p-10  space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Welcome back
        </h1>
        <p className="text-center text-gray-500">
          Please sign in to your account
        </p>
      </div>
      <LoginForm />
      <p className="text-sm text-center text-gray-500">
        Don't have an account?{" "}
        <NavLink
          to="/register"
          className="hover:underline text-blue-500 font-semibold"
        >
          Sign Up
        </NavLink>
      </p>
    </div>
  );
};

export default LoginPage;
