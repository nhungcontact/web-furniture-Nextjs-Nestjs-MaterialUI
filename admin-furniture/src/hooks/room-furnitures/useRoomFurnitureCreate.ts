import "client-only";
import useMutation from "../useMutation";
import { RoomFurniture, RoomFurnitureCreateInput } from "@/types/room-furniture";

function useRoomFurnitureCreate() {
  return useMutation<RoomFurniture, RoomFurnitureCreateInput>({
    path: "/api/room-furnitures",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/room-furnitures`,
      insertOnNotFound: "start",
    },
  });
}

export default useRoomFurnitureCreate;
