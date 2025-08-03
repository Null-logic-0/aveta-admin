import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllEntityImages } from "../util/http";
import { EntityImageType } from "../enums/entity-images.enum";

type EntityImageProps = {
  type?: EntityImageType;
  limit?: number;
  page?: number;
};

export function useFetchEntityImages({ type, limit, page }: EntityImageProps) {
  const { token } = useAuth();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["entity-images", type, limit, page],
    queryFn: () => {
      if (!token) throw new Error("Invalid credentials!");
      return getAllEntityImages(token, type, limit, page);
    },
    retry: false,
    enabled: !!type || !!token,
  });
  return { data, isError, error, isPending };
}
