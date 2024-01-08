import "client-only";
import useMutation from "../useMutation";
import { Blog, BlogCreateInput } from "@/types/blog";

function useBlogCreate() {
  return useMutation<Blog, BlogCreateInput>({
    path: "/api/blogs",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/blogs`,
      insertOnNotFound: "start",
    },
  });
}

export default useBlogCreate;
