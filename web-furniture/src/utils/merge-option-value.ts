import { Option } from "@/types/option";
import { GetOptionValue } from "@/types/option-value";
import { GetProduct } from "@/types/product";

export type MergeValues = {
  optionSku: Option;
  optionValues: GetOptionValue[];
};
export default function mergeOptionValue(item: GetProduct): MergeValues[] {
  const mergedOptionValues: GetOptionValue[] = item.productSkus.reduce(
    (merged: GetOptionValue[], productSku) => {
      productSku.optionValues.forEach((optionValue) => {
        const existingOption = merged.find(
          (mergedOption) => mergedOption._id === optionValue._id,
        );

        if (!existingOption) {
          // If optionValue does not exist in merged array, add it
          merged.push({ ...optionValue });
        } else {
          // If optionValue already exists in merged array, you can handle it as needed
          // For now, let's say you want to merge properties (you can adjust this part)
          Object.assign(existingOption, optionValue);
        }
      });

      return merged;
    },
    [],
  );
  //   console.log("YU", mergedOptionValues);

  // Use reduce to create a map of optionSku to optionValues
  const optionSkuMap = mergedOptionValues.reduce((acc, item) => {
    const { optionSku, ...rest } = item;

    if (!acc[optionSku._id]) {
      acc[optionSku._id] = { optionSku, optionValues: [] };
    }

    acc[optionSku._id].optionValues.push(rest);

    return acc;
  }, {});

  // Convert the map values to an array
  const mergedArray = Object.values(optionSkuMap) as MergeValues[];

  return mergedArray;
}
