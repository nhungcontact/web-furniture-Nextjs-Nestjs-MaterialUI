import { Box, IconButton, Typography } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
export default function ViewProduct() {
  return (
    <Box
      display={"flex"}
      alignItems={"end"}
    >
      <Typography
        variant="body1"
        fontWeight={"600"}
        marginRight={"5px"}
      >
        View{" "}
      </Typography>
      <IconButton sx={{ padding: "2px", color: "black" }}>
        <GridViewOutlinedIcon />
      </IconButton>
      <IconButton sx={{ padding: "2px", color: "black" }}>
        <TableRowsOutlinedIcon />
      </IconButton>
    </Box>
  );
}
