import { primary } from "@/config/theme";
import { User } from "@/types/user";
import stringAvatar from "@/utils/getName";
import {
  Drafts,
  Inbox,
  PersonOutlineOutlined,
  ReceiptOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
type Props = {
  getValue: (value: string) => void;
};
export default function AccountSideBar({ getValue }: Props) {
  const [selectedValue, setSelectedValue] = useState("Information");

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string,
  ) => {
    setSelectedValue(value);
    getValue(value);
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "fit-content", bgcolor: "#F8F8F8" }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
        >
          <ListItemButton
            selected={selectedValue === "Information"}
            onClick={(event) => handleListItemClick(event, "Information")}
            sx={{
              "&.Mui-selected": {
                borderLeft: "4px solid #2B4A41",
                backgroundColor: "rgba(43, 74, 65, 0.1)",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "rgba(43, 74, 65, 0.1)",
              },
            }}
          >
            <ListItemIcon>
              <PersonOutlineOutlined color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  color="primary.main"
                  fontWeight={selectedValue === "Information" ? "bold" : "400"}
                  variant="body1"
                  textTransform={"capitalize"}
                >
                  My Account
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              "&.Mui-selected": {
                borderLeft: "4px solid #2B4A41",
                backgroundColor: "background.paper",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "background.paper",
              },
            }}
            selected={selectedValue === "OrderHistory"}
            onClick={(event) => handleListItemClick(event, "OrderHistory")}
          >
            <ListItemIcon>
              <ReceiptOutlined color="secondary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  color="primary.main"
                  fontWeight={selectedValue === "OrderHistory" ? "bold" : "400"}
                  variant="body1"
                  textTransform={"capitalize"}
                >
                  My Order
                </Typography>
              }
            />
          </ListItemButton>
          {/* <ListItemButton
            sx={{
              "&.Mui-selected": {
                borderLeft: "4px solid #2B4A41",
                backgroundColor: "background.paper",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "background.paper",
              },
            }}
            selected={selectedValue === "Order"}
            onClick={(event) => handleListItemClick(event, "Order")}
          >
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  color="primary.main"
                  fontWeight={selectedValue === "Order" ? "bold" : "400"}
                >
                  My Orders
                </Typography>
              }
            />
          </ListItemButton> */}
        </List>
        {/* <List
          component="nav"
          aria-label="secondary mailbox folder"
        >
          <ListItemButton
            sx={{
              "&.Mui-selected": {
                borderLeft: "4px solid #2B4A41",
                backgroundColor: "background.paper",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "background.paper",
              },
            }}
            selected={selectedValue === "Order"}
            onClick={(event) => handleListItemClick(event, "Order")}
          >
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  color="primary.main"
                  fontWeight={selectedValue === "Order" ? "bold" : "400"}
                >
                  My Orders
                </Typography>
              }
            />
          </ListItemButton>
        </List> */}
      </Box>
    </>
  );
}
