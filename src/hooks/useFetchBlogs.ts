import { useQuery } from "@tanstack/react-query";
import { fetchAllBlogs } from "../util/http";

type BlogsProps = {
  page?: number;
  limit?: number;
};
export function useFetchBlogs({ page, limit }: BlogsProps) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => fetchAllBlogs(page, limit),
    retry: false,
  });
  return { data, isError, error, isPending };
}
