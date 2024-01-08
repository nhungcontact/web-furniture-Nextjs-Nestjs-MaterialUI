import { useTranslations } from "next-intl";

export type NavItem = {
  label: string;
  path: string;
};

export function useMainMenu(): NavItem[] {
  const t = useTranslations("MainMenu");

  return [
    {
      label: t("Products"),
      path: "/products",
    },
    {
      label: t("People"),
      path: "/users",
    },
    {
      label: t("Contact"),
      path: "/contact",
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
