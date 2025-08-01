import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../util/http";
import type { RootState } from "../store";
import type { GetMeResponse } from "../interfaces/current-user-response.interface";

export function useAuth() {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const { isPending, isError, data, error } = useQuery<GetMeResponse>({
    queryKey: ["me"],
    queryFn: () => {
      if (!token) throw new Error("No token provided");
      return getMe(token);
    },
    enabled: !!token,
    retry: false,
  });

  return {
    isError,
    error,
    isPending,
    data,
    token,
  };
}
