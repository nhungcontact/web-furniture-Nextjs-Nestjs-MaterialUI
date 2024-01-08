import "client-only";
import useMutation from "../useMutation";
import { OptionCreateInput, Option } from "@/types/option";

function useOptionCreate() {
  return useMutation<Option, OptionCreateInput>({
    path: "/api/options",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/options`,
      insertOnNotFound: "start",
    },
  });
}

export default useOptionCreate;
