import useOptionDetail from "@/hooks/options/useOptionDetail";
import { DisplayOption } from "@/types/option";
import ProductOptionText from "./ProductOptionText";
import ProductOptionPhoto from "./ProductOptionPhoto";
import { MergeValues } from "@/utils/merge-option-value";

type Props = {
  item: MergeValues;
  index: number;
  getValue: (val: string, index: number) => void;
};
export default function ProductDetailSkuValue({
  item,
  index,
  getValue,
}: //   handleGetValueText,
Props) {
  return (
    <>
      {item && item.optionSku.displayOption === DisplayOption.OPTION_TEXT && (
        <ProductOptionText
          item={item}
          getValue={getValue}
          index={index}
        />
      )}
      {item && item.optionSku.displayOption === DisplayOption.OPTION_PHOTO && (
        <ProductOptionPhoto
          item={item}
          getValue={getValue}
          index={index}
        />
      )}
    </>
  );
}
