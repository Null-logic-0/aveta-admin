import { useAuth } from "./useAuth";
import { uploadEntityImage } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import type { EntityImageInterface } from "../interfaces/entity-images.interface";
import { queryClient } from "../constants/query-client.constants";

import toast from "react-hot-toast";

export function useUploadEntityImage() {
  const { token } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EntityImageInterface) => {
      if (!token) throw new Error("Invalid credentials");
      return uploadEntityImage(token, data);
    },
    onSuccess: () => {
      toast.success("Media has been uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["entity-images"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload media!");
    },
  });

  return { mutate, isPending };
}
