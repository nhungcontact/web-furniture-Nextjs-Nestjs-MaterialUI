import { OptionValue, OptionValueCreateInput } from "@/types/option-value";
import "client-only";
import useMutation from "../useMutation";

function useOptionValueCreate() {
  return useMutation<OptionValue, OptionValueCreateInput>({
    path: "/api/option-values",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/option-values`,
      insertOnNotFound: "start",
    },
  });
}

export default useOptionValueCreate;
