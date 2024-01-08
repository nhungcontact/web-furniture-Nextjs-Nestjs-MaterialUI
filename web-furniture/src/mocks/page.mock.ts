import { useTranslations } from "next-intl";
export type Sort = {
  label: string;
  value: string;
};
export function useReasonCancel(): Sort[] {
  const t = useTranslations("MainPage");
  return [
    {
      label: t("Incorrect Order Information"),
      value: "Incorrect Order Information",
    },
    {
      label: t("Incorrect Delivery Address"),
      value: "Incorrect Delivery Address",
    },
    {
      label: t("Change of decision"),
      value: "Change of decision",
    },
    {
      label: t("Dissatisfaction with the product/service"),
      value: "Dissatisfaction with the product/service",
    },
    {
      label: t("Financial problems"),
      value: "Financial problems",
    },
    {
      label: t("Other issues"),
      value: "Other issues",
    },
  ];
}
