import { jsonForm } from "@/utils/form";
import { SearchOutlined } from "@mui/icons-material";
import { Box, Button, InputAdornment, InputBase, TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { FormEvent } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// export interface DialogTitleProps {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// function BootstrapDialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

export default function SearchLayout() {
  const router = useRouter();
  const t = useTranslations("MainPage");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const json = jsonForm(event.currentTarget);
    router.push(`/search?search=${json.search}`);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form
        onSubmit={handleSearch}
        id="search"
      >
        <Box
          display={"flex"}
          alignItems={"center"}
        >
          <TextField
            name="search"
            fullWidth
            size="small"
            placeholder={t("Search")}
            sx={{
              "& .MuiOutlinedInput-input": {
                "::placeholder": {
                  color: "black",
                  fontSize: "15px",
                },
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
            //   InputProps={{
            //     endAdornment: (
            //       <InputAdornment position="end">
            //         <Image
            //           src="/images/magnifying-glass.png"
            //           height={22}
            //           width={22}
            //           alt="Search"
            //         />
            //       </InputAdornment>
            //     ),
            //   }}
            variant="outlined"
          />
          <Button
            type="submit"
            form="search"
            sx={{ p: 0, py: 1, minWidth: "50px", borderRadius: 0, boxShadow: "none" }}
            variant="contained"
          >
            <SearchOutlined />
          </Button>
        </Box>
      </form>

      {/* <IconButton
        aria-label="menu"
        onClick={handleClickOpen}
      >
        <SearchIcon />
      </IconButton> */}
      {/* <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog> */}
    </Box>
  );
}
