import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoute } from "../../../utils/http";
import toast from "react-hot-toast";

const onError = () =>
  toast.error("Произошла ошибка во время создания маршрута");

export const useCreateRoute = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createRoute,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["routes"],
      });
      toast.success("Маршрут успешно создан!");
    },
    onError,
  });
};
