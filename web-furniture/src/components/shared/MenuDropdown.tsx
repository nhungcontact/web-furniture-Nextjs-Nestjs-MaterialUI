import { Button, Checkbox, FormControlLabel, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import React from "react";
type Props = {
  title: string;
  data?: any[];
}
const ITEM_HEIGHT = 70;

function MenuDropdown({title, data}:Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        // aria-owns={open ? 'basic-menu' : undefined}
        onClick={handleClick}
        onMouseOver={handleClick}
        sx={{
          padding: "8px 22px" 
        }}
        endIcon={
          open ? <Image src="/images/arrow-up.png" width={18} height={18} alt="arrow up" />
          : <Image src="/images/down-arrow.png" width={16} height={16} alt="arrow down" />
        }
      >
        {title ?? "--"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        sx={{
          maxHeight: ITEM_HEIGHT * 4.5,
        }}
      >
        {data && data.length && data.map((item)=> (
          <MenuItem key={item}>
            <FormControlLabel control={<Checkbox />} label={item.name} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MenuDropdown;