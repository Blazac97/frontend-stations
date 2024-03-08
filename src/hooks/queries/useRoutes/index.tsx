import { useQuery } from "@tanstack/react-query";
import { getRoutesList } from "../../../utils/http";

export const useRoutes = () =>
  useQuery({
    queryKey: ["routes", "list"],
    queryFn: getRoutesList,
  });
