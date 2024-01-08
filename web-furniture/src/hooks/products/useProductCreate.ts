import "client-only";
import useMutation from "../useMutation";
import { Product, ProductCreateInput } from "@/types/product";

function useProductCreate() {
  return useMutation<Product, ProductCreateInput>({
    path: "/api/products",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/products`,
      insertOnNotFound: "start",
    },
  });
}

export default useProductCreate;
