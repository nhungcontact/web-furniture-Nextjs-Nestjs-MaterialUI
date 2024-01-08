import { RoomFurniture } from "@/types/room-furniture";
import { ErrorResponse, FetchOptions, ListOptions } from "@/types/shared";
import "client-only";
import useSWR from "swr";

function useRoomFurnitureDetail(id?: string) {
  return useSWR<
    RoomFurniture,
    ErrorResponse<RoomFurniture>,
    FetchOptions<ListOptions<RoomFurniture>> | null
  >(
    !id
      ? null
      : {
          path: `/api/room-furnitures/${id}`,
        },
  );
}

export default useRoomFurnitureDetail;
