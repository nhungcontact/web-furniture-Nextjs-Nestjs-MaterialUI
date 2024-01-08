import "client-only";
import useMutation from "../useMutation";
import { Comment, CommentUpdateInput } from "@/types/comment";

function useCommentUpdateStatus(id: string) {
  return useMutation<Comment, CommentUpdateInput>({
    path: `/api/comments/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/comments`,
    },
  });
}

export default useCommentUpdateStatus;
