/* eslint-disable @typescript-eslint/no-explicit-any */
// import Link from "next/link";
import { List } from "@mui/material";
import YourComponent from "./MenuItems";
import NavGroup from "./NavGroups";
type Props = {
  openDrawer: boolean;
};
function DrawerContent({ openDrawer }: any & Props) {
  const MenuItems = YourComponent();

  return (
    <List
      sx={{ width: "100%", maxWidth: 320 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {!!MenuItems &&
        !!MenuItems.length &&
        MenuItems.map((item) => {
          console.log("MenuItems", MenuItems);

          // Check if at least one menuItem has allow === true
          const showNavGroup = item.menuItems.some((navitem) => navitem.allow);

          return showNavGroup ? (
            <NavGroup
              item={item}
              key={item.subheader}
              openDrawer={openDrawer}
              // toggleMobileSidebar={toggleMobileSidebar}
            />
          ) : null;
        })}
    </List>
  );
}
export default DrawerContent;
