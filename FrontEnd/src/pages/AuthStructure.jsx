import { AppBar, Container, Toolbar, useScrollTrigger } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import DarkModeSwitch from "../component/DarkModeSwitch";
import { useTheme } from "@emotion/react";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const AuthStructure = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ElevationScroll>
          <AppBar enableColorOnDark position="fixed" color="inherit">
            <Toolbar>
              <Box
                component="span"
                marginLeft="16px"
                sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
              >
                {theme.palette.mode == "light" ? (
                  <img
                    src="./../../public/LibraryLogo2.png"
                    alt="Book Breeze"
                    width="100"
                  />
                ) : (
                  <img
                    src="./../../public/LibraryLogo.png"
                    alt="Book Breeze"
                    width="100"
                  />
                )}
              </Box>
              <DarkModeSwitch />
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </Box>
      <Toolbar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default AuthStructure;
