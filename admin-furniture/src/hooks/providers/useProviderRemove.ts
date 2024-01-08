import "client-only";
import useMutation from "../useMutation";
import { Provider } from "@/types/provider";

function useProviderRemove(id: string) {
  return useMutation<Provider, unknown>({
    path: `/api/providers/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/providers`,
      shouldRemove: true,
    },
  });
}

export default useProviderRemove;
