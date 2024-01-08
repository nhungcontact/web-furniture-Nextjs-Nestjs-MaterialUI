import fetchMock from "@gr2m/fetch-mock";
import mockBrands from "./brands.mock";
import mockCategoryies from "./categories.mock";
import mockProducts from "./products.mock";
import mockRoomFurnitures from "./room-furniture.mock";

mockAPI.initialized = false;

/** Mocking API Responses */
export default async function mockAPI() {
  if (mockAPI.initialized) {
    console.log(`🚀 ~ Mock API already initialized`);
    return;
  }

  const isClient = typeof window != "undefined";

  console.log(`🚀 ~ Start mocking API on ${isClient ? "browser" : "server"}`);

  fetchMock.config.fallbackToNetwork = true;
  fetchMock.config.overwriteRoutes = true;
  fetchMock.config.warnOnFallback = false;

  mockProducts(fetchMock);

  console.log("🚀 ~ Mocked products");
  mockBrands(fetchMock);
  console.log("🚀 ~ Mocked products");
  mockCategoryies(fetchMock);
  console.log("🚀 ~ Mocked products");
  mockRoomFurnitures(fetchMock);
  console.log("🚀 ~ Mocked products");

  mockAPI.initialized = true;
}
