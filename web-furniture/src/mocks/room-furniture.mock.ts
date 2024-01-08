import { Category } from "@/types/category";
import {
  RoomFurniture,
  RoomFurnitureHead,
  RoomFurnitureStatus,
} from "@/types/room-furniture";
import { ListOptions, ListResponse } from "@/types/shared";
import { extractQueryParams } from "@/utils/query";
import { faker } from "@faker-js/faker";
import { FetchMockStatic } from "@gr2m/fetch-mock";

export default function mockRoomFurnitures(fetchMock: FetchMockStatic) {
  let roomFurnitures = [] as RoomFurniture[];

  for (let index = 0; index < 46; index++) {
    const categories: Category[] = [
      {
        _id: faker.database.mongodbObjectId(),
        roomFurnitures: [faker.database.mongodbObjectId()],
        name: faker.commerce.productName(),
        photo: {
          _id: faker.database.mongodbObjectId(),
          name: faker.commerce.productName(),
          imageURL: faker.image.urlPicsumPhotos({ width: 128, height: 128 }),
          ownerID: faker.database.mongodbObjectId(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
        description: faker.commerce.productDescription(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    ];
    roomFurnitures.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      photo: {
        _id: faker.database.mongodbObjectId(),
        name: faker.commerce.productName(),
        imageURL: faker.image.urlPicsumPhotos({ width: 128, height: 128 }),
        ownerID: faker.database.mongodbObjectId(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
      categories,
      description: faker.commerce.productDescription(),
      status: RoomFurnitureStatus.ACTIVE,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }

  return fetchMock
    .get(
      "path:/api/room-furnitures",
      (path) => {
        console.log("🚀 ~ Mock response to [GET]", path);

        const options = extractQueryParams(path) as ListOptions<RoomFurniture>;
        const {
          offset = 0,
          limit = 10,
          search,
          //   sortBy = "name",
          //   sortOrder = "asc",
        } = options;

        const results = roomFurnitures.filter((item) =>
          item.name.toLocaleLowerCase().includes(search || ""),
        );
        return {
          items: results.slice(offset, offset + limit),
          total: results.length,
          options,
        } as ListResponse<RoomFurniture>;
      },
      { delay: 1000 },
    )
    .post(
      "path:/api/room-furnitures",
      (path, opt) => {
        if (!opt.body) {
          return 400;
        }

        console.log("🚀 ~ Mock response to [POST]", path);

        const jsonBody = JSON.parse(opt.body.toString());

        roomFurnitures.unshift({
          _id: faker.database.mongodbObjectId(),
          //   avatar: faker.internet.avatar(),
          ...jsonBody,
        });

        return roomFurnitures[0];
      },
      { delay: 1000 },
    )
    .put(
      "express:/api/room-furnitures/:id",
      (path, opt) => {
        if (!opt.body) {
          return 400;
        }

        console.log("🚀 ~ Mock response to [PUT]", path);

        const brandId = path.substring(path.lastIndexOf("/") + 1);
        const brandIndex = roomFurnitures.findIndex((u) => u._id == brandId);
        const jsonBody = JSON.parse(opt.body.toString());

        roomFurnitures[brandIndex] = {
          ...roomFurnitures[brandIndex],
          ...jsonBody,
        };

        return roomFurnitures[brandIndex];
      },
      { delay: 1000 },
    )
    .delete(
      "express:/api/room-furnitures/:id",
      (path) => {
        console.log("🚀 ~ Mock response to [DELETE]", path);

        const roomFurnitureId = path.substring(path.lastIndexOf("/") + 1);
        const roomFurnitureIndex = roomFurnitures.findIndex(
          (u) => u._id == roomFurnitureId,
        );
        const data = roomFurnitures[roomFurnitureIndex];

        roomFurnitures = [
          ...roomFurnitures.slice(0, roomFurnitureIndex),
          ...roomFurnitures.slice(roomFurnitureIndex + 1),
        ];

        return data;
      },
      { delay: 1000 },
    );
}

export const roomHeadCells: readonly RoomFurnitureHead[] = [
  {
    id: "name",
    label: "Room",
  },
  {
    id: "description",
    label: "Description",
  },
];
