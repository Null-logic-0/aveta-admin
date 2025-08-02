import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { deleteUser } from "../util/http";
import { queryClient } from "../constants/query-client.constants";

import toast from "react-hot-toast";

export function useDeleteUser({ id }: { id: number }) {
  const { token } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return deleteUser(token, id);
    },
    onSuccess: () => {
      toast.success("User has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message || "Deletion has been failed!");
    },
  });
  return { mutate, isPending };
}
