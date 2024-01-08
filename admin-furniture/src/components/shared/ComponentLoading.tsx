// LoadingOverlay.js
import { Backdrop, CircularProgress } from "@mui/material";
type Props = {
  open: boolean;
};
const ComponentLoading = ({ open }: Props) => {
  return (
    // <Grid
    //   container
    //   sx={{
    //     justifyContent: "center",
    //     alignItems: "center",
    //     position: "absolute",
    //     width: "100%",
    //     height: "100%",
    //     left: 0,
    //     top: 0,
    //     flexDirection: "column",
    //     rowGap: "10px",
    //     backgroundColor: "rgba(255, 255, 255, 0.5)",
    //   }}
    // >
    //   <CircularProgress size="3rem" />
    //   <Typography>Wait a moment....</Typography>
    // </Grid>
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default ComponentLoading;
