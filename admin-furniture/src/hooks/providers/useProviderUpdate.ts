import "client-only";
import useMutation from "../useMutation";
import { Provider, ProviderUpdateInput } from "@/types/provider";

function useProviderUpdate(id: string) {
  return useMutation<Provider, ProviderUpdateInput>({
    path: `/api/providers/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/providers`,
    },
  });
}

export default useProviderUpdate;
