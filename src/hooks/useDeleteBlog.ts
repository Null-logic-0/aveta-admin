import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { deleteBlog } from "../util/http";
import toast from "react-hot-toast";
import { queryClient } from "../constants/query-client.constants";
import { useNavigate } from "react-router";

export function useDeleteBlog({ id }: { id: number }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return deleteBlog(token, id);
    },
    onSuccess: () => {
      toast.success("Blog has been deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/blogs");
    },
    onError: (error) => toast.error(error.message || "Failed to delete blog!"),
  });
  return { mutate, isPending };
}
