import { useQuery } from "@tanstack/react-query";
import { fetchSingleBlog } from "../util/http";

export function useFetchSingleBlog({ id }: { id: number }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => {
      return fetchSingleBlog(id);
    },
    retry: false,
    enabled: !!id,
  });
  return { data, isError, error, isPending };
}
