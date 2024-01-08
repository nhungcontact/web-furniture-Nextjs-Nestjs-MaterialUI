import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import { GetSkuValue } from "@/types/sku-value";
import "client-only";
import useSWR from "swr";

function useSkuValueDetail(id?: string) {
  return useSWR<
    GetSkuValue,
    ErrorResponse<GetSkuValue>,
    FetchOptions<ListOptions<GetSkuValue>> | null
  >(
    !id
      ? null
      : {
          path: `/api/sku-values/${id}`,
        },
  );
}

export default useSkuValueDetail;
