import createMiddleware from "next-intl/middleware";
import { appLocales } from "./config/locales";

export default createMiddleware({
  locales: appLocales.map((loc) => loc.locale),
  defaultLocale: appLocales[0].locale,
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
