import "client-only";
import useMutation from "../useMutation";
import { Comment, CommentCreateInput } from "@/types/comment";

function useCommentCreate() {
  return useMutation<Comment, CommentCreateInput>({
    path: "/api/comments",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/comments`,
      insertOnNotFound: "start",
    },
  });
}

export default useCommentCreate;
