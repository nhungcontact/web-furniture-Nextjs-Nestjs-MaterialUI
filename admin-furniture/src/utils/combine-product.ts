import { OptionNull } from "@/types/option";

/* eslint-disable @typescript-eslint/no-explicit-any */
const combineProduct = (options: OptionNull[]) => {
  const generateCombinations = (
    options: any[],
    index: number = 0,
    currentCombination: any[] = [],
  ) => {
    if (index === options.length) {
      // All options processed, add the current combination
      combinations.push([...currentCombination]);
      return;
    }

    const { optionSku, optionValues } = options[index];

    optionValues.forEach((value: any) => {
      // Create a copy of the current combination
      const updatedCombination = [...currentCombination];

      // Add the current option value to the combination
      updatedCombination.push(value);

      // Recursively generate combinations for the next options
      generateCombinations(options, index + 1, updatedCombination);
    });
  };

  const combinations: any[] = [];
  generateCombinations(options);

  // Now 'combinations' contains all possible combinations
  console.log(combinations);

  // Return the combinations or use them in other parts of your application
  return combinations;
};

export default combineProduct;
