// material-ui
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Header from "./Header";
import logo from "./../assets/IconChevronRight.svg";

import { Outlet } from "react-router-dom";
import { useMenu, useMenuDispatch } from "../contexts/MenuContextProvider.jsx";
import { actions } from "../contexts/actions.jsx";
import { drawerWidth } from "./../store/constants";
import Sidebar from "./Sidebar/Sidebar";

const IconChevronRight = logo;

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    borderRadius: 12,

    transition: theme.transitions.create(
      "margin",
      open
        ? {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }
        : {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
    ),

    [theme.breakpoints.up("md")]: {
      marginLeft: open ? 0 : -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
      marginRight: "10px",
    },
  })
);

const Structure = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  // Handle left drawer
  const leftDrawerOpened = useMenu();

  const dispatch = useMenuDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: actions.TOGGLE_SIDE_DRAWER, id: leftDrawerOpened });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened.opened
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/*/!* drawer *!/*/}
      <Sidebar
        drawerOpen={
          !matchDownMd ? leftDrawerOpened.opened : !leftDrawerOpened.opened
        }
        drawerToggle={handleLeftDrawerToggle}
      />

      {/*/!* main content *!/*/}
      <Main theme={theme} open={leftDrawerOpened.opened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default Structure;
