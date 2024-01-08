import { useSort } from "@/config/navigation";
import { Button, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import React from "react";
type Props = {
  title: string;
  handleMenuItemClick: (value: string) => void;
};
export const MenuDropdownClick = ({ title, data, handleMenuItemClick }: Props) => {
  const sort = useSort();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          padding: "8px 22px",
        }}
        endIcon={
          open ? (
            <Image
              src="/images/arrow-up.png"
              width={18}
              height={18}
              alt="arrow up"
            />
          ) : (
            <Image
              src="/images/down-arrow.png"
              width={16}
              height={16}
              alt="arrow down"
            />
          )
        }
      >
        {title ?? "--"}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {sort.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => handleMenuItemClick(item.value)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
