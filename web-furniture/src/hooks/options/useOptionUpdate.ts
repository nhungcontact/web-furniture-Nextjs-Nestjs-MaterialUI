import "client-only";
import useMutation from "../useMutation";
import { OptionUpdateInput, Option } from "@/types/option";

function useOptionUpdate(id: string) {
  return useMutation<Option, OptionUpdateInput>({
    path: `/api/options/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/options`,
    },
  });
}

export default useOptionUpdate;
