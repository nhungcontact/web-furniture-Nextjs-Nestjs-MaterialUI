import "client-only";
import { User, UserProductFavorite } from "@/types/user";
import useMutation from "../useMutation";

function useUserAddProductFavorite(id: string) {
  return useMutation<User, UserProductFavorite>({
    path: `/api/users/add-favorite/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/users`,
    },
  });
}

export default useUserAddProductFavorite;
