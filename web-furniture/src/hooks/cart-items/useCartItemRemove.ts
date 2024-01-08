import "client-only";
import useMutation from "../useMutation";
import { Comment } from "@/types/comment";

function useCartItemRemove(id: string) {
  return useMutation<Comment, unknown>({
    path: `/api/detail-carts/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/detail-carts`,
      shouldRemove: true,
    },
  });
}

export default useCartItemRemove;
