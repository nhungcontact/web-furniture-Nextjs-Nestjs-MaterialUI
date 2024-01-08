import { Link as ScrollLink } from "react-scroll";

import GiteIcon from "@mui/icons-material/Gite";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import RateReviewIcon from "@mui/icons-material/RateReview";
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
        to="spaces-section"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <GiteIcon />
      </ScrollLink>
    ),
    name: "Spaces",
    to: "spaces-section",
  },
  {
    icon: (
      <ScrollLink
        style={{ height: "25px" }}
        to="categories-section"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <SportsGymnasticsIcon />
      </ScrollLink>
    ),
    name: "Categories",
    to: "categories-section",
  },
  {
    icon: (
      <ScrollLink
        style={{ height: "25px" }}
        to="membership-section"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <PeopleAltIcon />
      </ScrollLink>
    ),
    name: "Membership",
    to: "membership-section",
  },
  {
    icon: (
      <ScrollLink
        style={{ height: "25px" }}
        to="amenities-section"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <StarIcon />
      </ScrollLink>
    ),
    name: "Amenities",
    to: "amenities-section",
  },
  {
    icon: (
      <ScrollLink
        style={{ height: "25px" }}
        to="reviews-section"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <RateReviewIcon />
      </ScrollLink>
    ),
    name: "Reviews",
    to: "reviews-section",
  },
];
function NavBarGymDetail() {
  return (
    <Box marginTop={"48px"}>
      <Grid
        container
        justifyContent="center"
        sx={{ display: { xs: "none", sm: "flex", md: "flex", lg: "flex" } }}
      >
        {actions.map((action) => (
          <Typography
            key={action.name}
            variant="body1"
            color="#FFFFFF"
            m={"0 2%"}
            sx={{
              ":hover": {
                color: "#FFAE35",
              },
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
    </Box>
  );
}
export default NavBarGymDetail;
