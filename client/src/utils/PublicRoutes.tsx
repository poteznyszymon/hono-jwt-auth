import { Loader2 } from "lucide-react";
import useVerifyUser from "../hooks/useVerifyUser";
import { Outlet, useNavigate } from "react-router";

const PublicRoutes = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useVerifyUser();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="text-indigo-100 animate-spin size-7" />
      </div>
    );
  }

  if (user) {
    navigate("/");
  }

  return <Outlet />;
};

export default PublicRoutes;
