import { Promotion } from "@/types/promotion";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function usePromotionDetail(id?: string) {
  return useSWR<
    Promotion,
    ErrorResponse<Promotion>,
    FetchOptions<ListOptions<Promotion>> | null
  >(
    !id
      ? null
      : {
          path: `/api/promotions/${id}`,
        },
  );
}

export default usePromotionDetail;
