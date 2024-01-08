import "client-only";
import useMutation from "../useMutation";
import { Shipping } from "@/types/shipping";

function useShippingRemove(id: string) {
  return useMutation<Shipping, unknown>({
    path: `/api/shippings/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/shippings`,
      shouldRemove: true,
    },
  });
}

export default useShippingRemove;
