import "client-only";
import useMutation from "../useMutation";
import { RoomFurniture, RoomFurnitureUpdateInput } from "@/types/room-furniture";

function useRoomFurnitureUpdate(id: string) {
  return useMutation<RoomFurniture, RoomFurnitureUpdateInput>({
    path: `/api/room-furnitures/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/room-furnitures`,
    },
  });
}

export default useRoomFurnitureUpdate;
