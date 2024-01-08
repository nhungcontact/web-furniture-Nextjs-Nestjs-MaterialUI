import {
  AppBar,
  IconButton,
  SvgIcon,
//   Toolbar,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import AppBarContent from "./app-bar/AppBarContent";
import AppBarStyled from "./app-bar/AppBarStyled";
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar'
import AppBarSearch from "./app-bar/AppBarSearch";

MainAppBar.maxHeight = 70;


type Props = {
  open: boolean;
  handleDrawerToggle: () => void;
};
const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out'
}))

function MainAppBar({ open, handleDrawerToggle }: Props) {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
  
  const mainHeader = (
    <Toolbar>
      <IconButton
        onClick={handleDrawerToggle}
        edge="start"
        color="inherit"
      >
        <SvgIcon >
          <MenuRounded />
        </SvgIcon>
      </IconButton>
      <AppBarSearch />
      <AppBarContent />
    </Toolbar>
  );

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled
          position="fixed"
          open={open}
        >
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar
          position="fixed"
          sx={{ boxShadow:"none", bgcolor: "background.default", backgroundImage: "none", color: 'text.primary', padding: theme.spacing(0, 6) }}
        >
          {mainHeader}
        </AppBar>
      )}
    </>
  );
}
export default MainAppBar;
