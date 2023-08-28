import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import DarkModeSwitch from "../component/DarkModeSwitch";

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
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ElevationScroll>
          <AppBar enableColorOnDark position="fixed" color="inherit">
            <Toolbar>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                CSE Library
              </Typography>
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
