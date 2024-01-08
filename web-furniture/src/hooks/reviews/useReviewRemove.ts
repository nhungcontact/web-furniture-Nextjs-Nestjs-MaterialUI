import "client-only";
import useMutation from "../useMutation";
import { Comment } from "@/types/comment";

function useCommentRemove(id: string) {
  return useMutation<Comment, unknown>({
    path: `/api/comments/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/comments`,
      shouldRemove: true,
    },
  });
}

export default useCommentRemove;
