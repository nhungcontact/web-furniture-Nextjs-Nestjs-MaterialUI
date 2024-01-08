import { GetProductCat } from "@/types/product";
import "client-only";
import useSWR from "swr";

function useProductListSoldHighestByCat() {
  return useSWR<GetProductCat[]>(
    {
      path: "/api/products/highest-sold-out-bycategory",
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useProductListSoldHighestByCat;
