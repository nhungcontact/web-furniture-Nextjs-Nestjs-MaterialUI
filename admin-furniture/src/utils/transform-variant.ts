import { SkuValue } from "@/types/option";

export const transformVariant = (originalData: any[]): SkuValue[] => {
  // Convert the data
  const optionValuesMap = new Map();

  originalData.forEach((optionSet) => {
    optionSet.forEach((option) => {
      const optionValue = option._id;
      const optionSku = option.optionSku;

      if (!optionValuesMap.has(optionSku)) {
        optionValuesMap.set(optionSku, new Set());
      }

      const values = optionValuesMap.get(optionSku);
      values.add(optionValue);
    });
  });
  // Convert Map to array of objects, removing duplicates
  const flatTransformedData = Array.from(optionValuesMap.entries()).map(
    ([optionSku, values]) => {
      return {
        optionSku,
        optionValues: Array.from(values).map((optionValue) => optionValue),
      };
    },
  );
  return flatTransformedData;
};
