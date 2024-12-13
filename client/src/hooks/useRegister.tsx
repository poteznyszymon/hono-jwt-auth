import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerValues } from "../../../src/validation/schemas";

const useRegister = () => {
  const queryClient = useQueryClient();
  const { mutate: registerUser, isPending: isLoading } = useMutation({
    mutationFn: async (userData: registerValues) => {
      try {
        const response = await fetch("/api/register", {
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

  return { registerUser, isLoading };
};

export default useRegister;
