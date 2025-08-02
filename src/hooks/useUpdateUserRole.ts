import { useAuth } from "./useAuth";
import { updateUserRole } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import type { UpdateUserRoleInterface } from "../interfaces/user.interface";
import { queryClient } from "../constants/query-client.constants";

import toast from "react-hot-toast";

export function useUpdateUserRole({ id }: { id: number }) {
  const { token } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateUserRoleInterface) => {
      if (!token) throw new Error("Invalid credentials!");
      return updateUserRole(token, id, data);
    },
    onSuccess: () => {
      toast.success("User role has been changed successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to change user role!");
    },
  });

  return { mutate, isPending };
}
