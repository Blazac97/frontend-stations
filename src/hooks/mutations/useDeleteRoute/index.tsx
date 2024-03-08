import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRouteById } from "../../../utils/http";
import toast from "react-hot-toast";

const onError = () =>
  toast.error("Произошла ошибка во время удаления маршрута");

export const useDeleteRoute = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: deleteRouteById,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["routes"],
      });
      toast.success("Маршрут успешно удален!");
    },
    onError,
  });
};
