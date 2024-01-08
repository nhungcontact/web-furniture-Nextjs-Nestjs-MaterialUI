import "client-only";
import useMutation from "../useMutation";
import { Shipping, ShippingCreateInput } from "@/types/shipping";

function useShippingCreate() {
  return useMutation<Shipping, ShippingCreateInput>({
    path: "/api/shippings",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/shippings`,
      insertOnNotFound: "start",
    },
  });
}

export default useShippingCreate;
