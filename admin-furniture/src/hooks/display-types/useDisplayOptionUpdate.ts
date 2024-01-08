import { DisplayOption, DisplayOptionUpdateInput } from "@/types/display-option";
import "client-only";
import useMutation from "../useMutation";

function useDisplayOptionUpdate(id: string) {
  return useMutation<DisplayOption, DisplayOptionUpdateInput>({
    path: `/api/display-options/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/display-options`,
    },
  });
}

export default useDisplayOptionUpdate;
