import { Delete } from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

interface CartToolbarProps {
  numSelected: number;
  totalPrice?: number;
}

export default function CartToolbar(props: CartToolbarProps) {
  const { numSelected, totalPrice } = props;
  console.log(totalPrice);
  return (
    <Toolbar sx={{ "&.MuiToolbar-root": { p: 0 } }}>
      {numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}
      {!!totalPrice && totalPrice !== 0 && numSelected > 0 && (
        <Typography
          color="primary.light"
          variant="h5"
          component="div"
          //   fontWeight="bold"
        >
          ${totalPrice}
        </Typography>
      )}
    </Toolbar>
  );
}
