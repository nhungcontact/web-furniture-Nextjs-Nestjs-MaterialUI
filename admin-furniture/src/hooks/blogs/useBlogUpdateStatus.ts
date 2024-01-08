import "client-only";
import useMutation from "../useMutation";
import { Blog, BlogUpdateInput } from "@/types/blog";

function useBlogUpdateStatus(id: string) {
  return useMutation<Blog, BlogUpdateInput>({
    path: `/api/blogs/update-status/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/blogs`,
    },
  });
}

export default useBlogUpdateStatus;
