import { useTranslations } from "next-intl";

export type NavItem = {
  label: string;
  path: string;
};
export type Sort = {
  label: string;
  value: string;
};
export function useMainMenu(): NavItem[] {
  const t = useTranslations("MainPage");

  return [
    {
      label: t("Home"),
      path: "/",
    },
    {
      label: t("Furnitures"),
      path: "/furniture",
    },
    {
      label: t("Sale"),
      path: "/sale",
    },
    {
      label: t("Blog"),
      path: "/blog",
    },
    {
      label: t("Contact"),
      path: "/contact",
    },
  ];
}

export function useSort(): Sort[] {
  const t = useTranslations("MainPage");
  return [
    {
      label: t("Price (low to hight)"),
      value: "price-asc",
    },
    {
      label: t("Price (hight to low)"),
      value: "price-desc",
    },
    {
      label: t("Name from A to Z"),
      value: "name-asc",
    },
    {
      label: t("Name from Z to A"),
      value: "name-desc",
    },
  ];
}

export function useUserMenu(): NavItem[] {
  const t = useTranslations("UserMenu");

  return [
    {
      label: t("Profile"),
      path: "/profile",
    },
    {
      label: t("Settings"),
      path: "/setting",
    },
  ];
}

export function useFooterMenu(): NavItem[] {
  const t = useTranslations("FooterMenu");

  return [
    {
      label: t("Home"),
      path: "/",
    },
    {
      label: t("About"),
      path: "/about",
    },
    {
      label: t("Policy"),
      path: "/policy",
    },
  ];
}
