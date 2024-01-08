import { GetProduct } from "@/types/product";

// Sort products based on the maximum quantity in productSkus
export function sortQuantitySold(products: GetProduct[]) {
  // Sort products based on the maximum quantity in productSkus
  const sortedProducts = products.sort((a, b) => {
    const maxQuantityA = Math.max(
      0, // Default value for undefined or no positive quantity
      ...a.productSkus
        .filter((sku) => sku.quantitySold && sku.quantitySold > 0)
        .map((sku) => sku.quantitySold ?? 0),
    );

    const maxQuantityB = Math.max(
      0, // Default value for undefined or no positive quantity
      ...b.productSkus
        .filter((sku) => sku.quantitySold && sku.quantitySold > 0)
        .map((sku) => sku.quantitySold ?? 0),
    );

    return maxQuantityB - maxQuantityA;
  });
  return sortedProducts;
}
