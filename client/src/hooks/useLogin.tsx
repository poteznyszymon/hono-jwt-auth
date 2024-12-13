import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginValues } from "../../../src/validation/schemas";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: loginUser, isPending: isLoading } = useMutation({
    mutationFn: async (userData: loginValues) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
  });

  return { loginUser, isLoading };
};

export default useLogin;
