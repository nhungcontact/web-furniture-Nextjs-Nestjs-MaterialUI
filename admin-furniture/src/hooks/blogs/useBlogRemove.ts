import "client-only";
import useMutation from "../useMutation";
import { Blog } from "@/types/blog";

function useBlogRemove(id: string) {
  return useMutation<Blog, unknown>({
    path: `/api/blogs/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/blogs`,
      shouldRemove: true,
    },
  });
}

export default useBlogRemove;
