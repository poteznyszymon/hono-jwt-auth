import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
