import { useQuery } from "@tanstack/react-query";
import { getRouteDetails } from "../../../utils/http";

export const useRouteDetails = (id?: string) =>
  useQuery({
    queryKey: ["routes", "details", id],
    queryFn: () => getRouteDetails(id!),
    enabled: id !== undefined,
  });
