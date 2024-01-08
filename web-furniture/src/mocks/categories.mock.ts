import { Category, CategoryHead } from "@/types/category";
import { ListOptions, ListResponse } from "@/types/shared";
import { extractQueryParams } from "@/utils/query";
import { faker } from "@faker-js/faker";
import { FetchMockStatic } from "@gr2m/fetch-mock";

export default function mockCategories(fetchMock: FetchMockStatic) {
  const categories = [] as Category[];

  for (let index = 0; index < 46; index++) {
    // const roomFurniture: RoomFurniture = {
    //   _id: faker.database.mongodbObjectId(),
    //   name: faker.commerce.productName(),
    //   photo: {
    //     _id: faker.database.mongodbObjectId(),
    //     name: faker.commerce.productName(),
    //     imageURL: faker.image.urlPicsumPhotos({ width: 128, height: 128 }),
    //     ownerID: faker.database.mongodbObjectId(),
    //     createdAt: faker.date.past(),
    //     updatedAt: faker.date.recent(),
    //   },
    //   description: faker.commerce.productDescription(),
    //   createdAt: faker.date.past(),
    //   updatedAt: faker.date.recent(),
    // };
    categories.push({
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
    });
  }

  return fetchMock.get(
    "path:/api/categories",
    (path) => {
      const options = extractQueryParams(path) as ListOptions<Category>;
      const { offset = 0, limit = 10 } = options;

      return {
        items: categories.slice(offset, offset + limit),
        total: categories.length,
        options,
      } as ListResponse<Category>;
    },
    { delay: 1000 },
  );
}
export const catHeadCells: readonly CategoryHead[] = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "description",
    label: "Description",
  },
];
