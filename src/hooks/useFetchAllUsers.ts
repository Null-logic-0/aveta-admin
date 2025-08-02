import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getAllUsers } from "../util/http";

export function useFetchAllUsers() {
  const { token } = useAuth();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      if (!token) throw new Error("Invalid Credentials!");
      return getAllUsers(token);
    },
    retry: false,
    enabled: !!token,
  });

  return { data, isPending, isError, error };
}
