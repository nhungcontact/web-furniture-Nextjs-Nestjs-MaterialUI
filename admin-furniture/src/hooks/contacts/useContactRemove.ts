import "client-only";
import useMutation from "../useMutation";
import { Comment } from "@/types/comment";

function useContactRemove(id: string) {
  return useMutation<Comment, unknown>({
    path: `/api/contacts/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/contacts`,
      shouldRemove: true,
    },
  });
}

export default useContactRemove;
