import { GetCategory } from "@/types/category";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useCategoryDetail(id?: string) {
  return useSWR<
    GetCategory,
    ErrorResponse<GetCategory>,
    FetchOptions<ListOptions<GetCategory>> | null
  >(
    !id
      ? null
      : {
          path: `/api/categories/${id}`,
        },
  );
}

export default useCategoryDetail;
