import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const drawerWidth = 320;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - 65px)`,
  boxShadow: "none",
  backgroundColor: theme.palette.background.default,
  backgroundImage: "none",
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  padding: theme.spacing(0, 6),
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export default AppBarStyled;
