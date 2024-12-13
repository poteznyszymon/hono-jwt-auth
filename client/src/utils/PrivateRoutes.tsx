import { Loader2 } from "lucide-react";
import useVerifyUser from "../hooks/useVerifyUser";
import { Outlet, useNavigate } from "react-router";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useVerifyUser();

  if (isLoading) {
    return (
      <div className=" min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="text-black animate-spin size-7" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
  }

  return <Outlet context={user} />;
};

export default PrivateRoutes;
