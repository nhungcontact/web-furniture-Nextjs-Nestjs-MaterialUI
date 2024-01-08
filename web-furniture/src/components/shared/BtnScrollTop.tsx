import { theme } from "@/config/theme";
import { Box, BoxProps, Typography } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

function BtnScrollTop(props: BoxProps) {
  return (
    <ScrollLink
      to="top"
      smooth
      duration={500}
    >
      <Box
        sx={{
          position: "fixed",
          right: "3%",
          bottom: "5%",
          zIndex: 1000,
          backgroundColor: "#f7a934",
          color: "primary",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          [theme.breakpoints.between("xs", "sm")]: {
            display: "none",
          },
        }}
        onClick={props.onClick}
      >
        <Typography
          variant="body1"
          color="#FFFFFF"
        >
          &#8593;
        </Typography>
      </Box>
    </ScrollLink>
  );
}

export default BtnScrollTop;
