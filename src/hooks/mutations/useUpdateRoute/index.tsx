import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoute } from "../../../utils/http";
import toast from "react-hot-toast";

const onError = () =>
  toast.error("Произошла ошибка во время изменения маршрута");

export const useUpdateRoute = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateRoute,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["routes"],
      });
      toast.success("Маршрут успешно изменен!");
    },
    onError,
  });
};
