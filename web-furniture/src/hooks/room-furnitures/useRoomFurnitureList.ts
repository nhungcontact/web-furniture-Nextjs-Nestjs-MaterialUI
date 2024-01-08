import "client-only";
import { ErrorResponse, FetchOptions, ListOptions, ListResponse } from "@/types/shared";
import useSWR from "swr";
import { RoomFurniture } from "@/types/room-furniture";

function useRoomFurnitureList(params?: ListOptions<RoomFurniture>) {
  return useSWR<
    ListResponse<RoomFurniture>,
    ErrorResponse<ListOptions>,
    FetchOptions<ListOptions<RoomFurniture>>
  >(
    {
      path: "/api/room-furnitures",
      params,
    },
    {
      keepPreviousData: true,
    },
  );
}

export default useRoomFurnitureList;
