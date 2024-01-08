import SearchInput from "@/components/shared/SearchInput";
import { Close, Search } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import Image from "next/image";
import * as React from "react";

export default function AppBarSearch() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearchChange = () => {};
  return (
    <div>
      <IconButton
        color="inherit"
        onClick={handleClickOpen}
      >
        <SvgIcon>
          <Search />
        </SvgIcon>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Box className="display-sb">
            <SearchInput
              fullWidth
              // disableUnderline
              placeholder="Search...."
              onValueChange={handleSearchChange}
              // defaultValue={defaultValueSearch}
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "12px 14px",
                },
              }}
              inputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Image
                      src="/images/search.png"
                      alt="image"
                      width={100}
                      height={100}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              aria-label="close"
              onClick={handleClose}
              color="inherit"
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Typography
              variant="h6"
              fontWeight={600}
            >
              Quick Page Links
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
