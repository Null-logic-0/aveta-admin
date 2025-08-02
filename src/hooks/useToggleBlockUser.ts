import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { toggleBlockUser } from "../util/http";
import { queryClient } from "../constants/query-client.constants";

import toast from "react-hot-toast";

export function useToggleBlockUser({ id }: { id: number }) {
  const { token } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return toggleBlockUser(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message || "Operation failed!");
    },
  });
  return { mutate, isPending };
}
