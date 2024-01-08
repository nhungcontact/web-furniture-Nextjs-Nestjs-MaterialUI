/* eslint-disable @typescript-eslint/no-explicit-any */
// mui imports
import { ListSubheader, styled, Theme, Tooltip } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { Menu } from "@/types/menu-item";
import NavItem from "./NavItems";
import { usePathname } from "next/navigation";

interface ItemType {
  item: Menu;
  openDrawer: boolean;
}

const NavGroup = ({ item, openDrawer }: ItemType) => {
  console.log(item);
  const pathName = usePathname();
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader
      disableSticky
      {...props}
    />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: "700",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: "26px",
    padding: "3px 12px",
  }));
  console.log("menuItems", item.menuItems);
  return (
    <>
      {!openDrawer && (
        <ListSubheaderStyle>
          <Tooltip
            title={item.subheader}
            placement="top"
          >
            <MoreHoriz />
          </Tooltip>
        </ListSubheaderStyle>
      )}
      {openDrawer && <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>}
      {item.menuItems &&
        item.menuItems.length &&
        item.menuItems.map((item) => (
          <NavItem
            item={item}
            key={item.id}
            pathDirect={pathName}
            // onClick={toggleMobileSidebar}
          />
        ))}
    </>
  );
};
export default NavGroup;
