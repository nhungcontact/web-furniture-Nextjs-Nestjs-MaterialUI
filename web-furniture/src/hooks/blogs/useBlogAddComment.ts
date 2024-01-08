import { Blog } from "@/types/blog";
import { CommentCreateInput } from "@/types/comment";
import "client-only";
import useMutation from "../useMutation";

function useBlogAddComment(id: string) {
  return useMutation<Blog, CommentCreateInput>({
    path: `/api/blogs/add-comment/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/blogs`,
    },
  });
}

export default useBlogAddComment;
