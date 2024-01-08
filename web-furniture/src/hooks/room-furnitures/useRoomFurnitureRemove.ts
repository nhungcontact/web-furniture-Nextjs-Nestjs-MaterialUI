import "client-only";
import useMutation from "../useMutation";
import { RoomFurniture } from "@/types/room-furniture";

function useRoomFurnitureRemove(id: string) {
  return useMutation<RoomFurniture, unknown>({
    path: `/api/room-furnitures/${id}`,
    method: "DELETE",
    mutateRelatedDataList: {
      mutatePath: `/api/room-furnitures`,
      shouldRemove: true,
    },
  });
}

export default useRoomFurnitureRemove;