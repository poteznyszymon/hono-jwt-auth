import { useOutletContext } from "react-router";
import { User } from "../../types/user";
import { Loader2, LogOut, User as UserIcon } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const HomePage = () => {
  const { logoutUser, isLoading } = useLogout();
  const { user } = useOutletContext<{ user: User }>();
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="border-b h-16 flex items-center justify-end px-20 gap-10">
        <div className="flex items-center gap-2">
          <UserIcon className="size-4" />
          <p>{user.email}</p>
        </div>
        <button
          onClick={() => logoutUser()}
          className="bg-red-200 w-28 justify-center  py-2 gap-2 text-red-700 rounded-md flex items-center hover:bg-red-300"
        >
          {!isLoading ? (
            <>
              <LogOut className="size-4" />
              <p>Logout</p>
            </>
          ) : (
            <Loader2 className="size-5 animate-spin" />
          )}
        </button>
      </nav>
      <div className="flex-1 flex justify-center items-center text-xl">
        Hello {user.username}
      </div>
    </main>
  );
};

export default HomePage;
