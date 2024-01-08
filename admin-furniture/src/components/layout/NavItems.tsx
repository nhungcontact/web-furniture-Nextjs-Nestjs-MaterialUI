/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
  Collapse,
  Tooltip,
  //   Box,
} from "@mui/material";
import Link from "next/link";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { MenuItemType } from "@/types/menu-item";

const NavItem = ({ item, level, pathDirect }: MenuItemType) => {
  const theme = useTheme();
  //   const [open, setOpen] = React.useState(false);

  //   const handleClick = () => {
  //     setOpen(!open);
  //   };

  //   const Icon = item.icon;
  //   const itemIcon = (
  //     <Icon
  //       stroke={1.5}
  //       size="1.3rem"
  //     />
  //   );

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "5px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.primary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      "&.Mui-selected": {
        boxShadow: theme.shadows[3],
        backgroundImage: `linear-gradient(98deg, #C6A7FE, ${theme.palette.primary.main} 94%)`,
      },
      "&.Mui-selected .MuiTypography-root, &.Mui-selected .MuiSvgIcon-root": {
        color: `${theme.palette.common.white} !important`,
      },
    },
  }));

  return (
    <>
      {!!item.allow && (
        <List
          component="div"
          disablePadding
          key={item.id}
        >
          <ListItemStyled>
            <Tooltip
              title={item.title}
              placement="top"
            >
              <ListItemButton
                component={Link}
                href={item.href ? item.href : pathDirect}
                disabled={item.disabled}
                selected={item.href ? pathDirect === item.href : false}
                target={item.external ? "_blank" : ""}
                //   onClick={item.items ? handleClick : onClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "50px",
                    p: "3px 0",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText>
                  <>{item.title}</>
                </ListItemText>
                {/* {item.items && <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>} */}
              </ListItemButton>
            </Tooltip>
          </ListItemStyled>
          <Collapse
            // in={open}
            timeout="auto"
            unmountOnExit
          >
            <List
              component="div"
              disablePadding
            >
              {item.items &&
                item.items.map((val) => (
                  <ListItemStyled key={val.id}>
                    <ListItemButton
                      component={Link}
                      href={val.href ? val.href : pathDirect}
                      disabled={val.disabled}
                      selected={val.href ? pathDirect === val.href : false}
                      target={val.external ? "_blank" : ""}
                      //   onClick={val.items ? handleClick : onClick}
                    >
                      <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItemButton>
                  </ListItemStyled>
                ))}
            </List>
          </Collapse>
        </List>
      )}
    </>
  );
};

export default NavItem;
