import "client-only";
import useMutation from "../useMutation";
import { DisplayOption, DisplayOptionCreateInput } from "@/types/display-option";

function useDisplayOptionCreate() {
  return useMutation<DisplayOption, DisplayOptionCreateInput>({
    path: "/api/display-options",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/display-options`,
      insertOnNotFound: "start",
    },
  });
}

export default useDisplayOptionCreate;
