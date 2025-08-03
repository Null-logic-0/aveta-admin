import { useAuth } from "./useAuth";
import { deleteEntityImage } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/query-client.constants";

import toast from "react-hot-toast";

export function useDeleteEntityImage({ id }: { id: number }) {
  const { token } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return deleteEntityImage(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entity-images"] });
      toast.success("Media has been deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete media!");
    },
  });

  return { mutate, isPending };
}
