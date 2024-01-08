import * as React from "react";
import AppBarLayout from "./AppBarLayout";
type Props = {
  locale: string;
};
function HeaderLayout({ locale }: Props) {
  return (
    <>
      <AppBarLayout locale={locale} />
    </>
  );
}
export default HeaderLayout;
