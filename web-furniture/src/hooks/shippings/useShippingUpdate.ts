import "client-only";
import useMutation from "../useMutation";
import { Shipping, ShippingUpdateInput } from "@/types/shipping";

function useShippingUpdate(id: string) {
  return useMutation<Shipping, ShippingUpdateInput>({
    path: `/api/shippings/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/shippings`,
    },
  });
}

export default useShippingUpdate;
