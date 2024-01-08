import { Link as ScrollLink } from "react-scroll";

import GiteIcon from "@mui/icons-material/Gite";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Box,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";

const actions = [
  {
    icon: (
      <ScrollLink
        style={{ height: "25px" }}
        to="whylove-section"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <PeopleAltIcon />
      </ScrollLink>
    ),
    name: "WHY YOU'LL LOVE IT",
    to: "whylove-section",
  },
  {
    icon: (
      <ScrollLink
        style={{ height: "25px" }}
        to="detail-section"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <GiteIcon />
      </ScrollLink>
    ),
    name: "Details",
    to: "detail-section",
  },
  //   {
  //     icon: (
  //       <ScrollLink
  //         style={{ height: "25px" }}
  //         to="dimension-section"
  //         spy={true}
  //         smooth={true}
  //         offset={-70}
  //         duration={500}
  //       >
  //         <SportsGymnasticsIcon />
  //       </ScrollLink>
  //     ),
  //     name: "Dimensions",
  //     to: "dimension-section",
  //   },
];
function ProductDetailNavBar() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        marginBottom={2}
        sx={{ display: { xs: "none", sm: "flex", md: "flex", lg: "flex" } }}
      >
        {actions.map((action) => (
          <Typography
            key={action.name}
            variant="body1"
            textTransform={"uppercase"}
            fontWeight={600}
            m={"0 2%"}
            sx={{
              //   ":hover": {
              //     color: "#FFAE35",
              //   },
              cursor: "pointer",
            }}
            component={ScrollLink}
            to={action.to}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            {action.name}
          </Typography>
        ))}
      </Grid>
      {/* Responsive xs nav with speed dial*/}
      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: "0",
          right: "0",
          zIndex: "2000",
          display: { xs: "block", sm: "none", md: "none", lg: "none" },
        }}
      >
        <SpeedDial
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            "& .MuiButtonBase-root": {
              bgcolor: "rgba(247,169,52, 0.7)",
              color: "white",
              width: "50px",
              height: "50px",
            },
          }}
          icon={<SpeedDialIcon />}
          ariaLabel="menu"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
export default ProductDetailNavBar;
