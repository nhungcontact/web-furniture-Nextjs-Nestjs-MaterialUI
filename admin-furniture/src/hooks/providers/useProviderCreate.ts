import "client-only";
import useMutation from "../useMutation";
import { Provider, ProviderCreateInput } from "@/types/provider";

function useProviderCreate() {
  return useMutation<Provider, ProviderCreateInput>({
    path: "/api/providers",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/providers`,
      insertOnNotFound: "start",
    },
  });
}

export default useProviderCreate;
