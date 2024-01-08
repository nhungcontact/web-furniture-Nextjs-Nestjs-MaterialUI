import "client-only";
import useMutation from "../useMutation";
import { OptionValue, OptionValueUpdateInput } from "@/types/option-value";

function useOptionValueUpdate(id: string) {
  return useMutation<OptionValue, OptionValueUpdateInput>({
    path: `/api/option-values/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/option-values`,
    },
  });
}

export default useOptionValueUpdate;
