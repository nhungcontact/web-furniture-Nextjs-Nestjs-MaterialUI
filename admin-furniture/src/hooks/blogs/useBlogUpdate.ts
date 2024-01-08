import "client-only";
import useMutation from "../useMutation";
import { Blog, BlogUpdateInput } from "@/types/blog";

function useBlogUpdate(id: string) {
  return useMutation<Blog, BlogUpdateInput>({
    path: `/api/blogs/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/blogs`,
    },
  });
}

export default useBlogUpdate;
