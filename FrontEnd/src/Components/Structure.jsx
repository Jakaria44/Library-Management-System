
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Toolbar,
  Typography
} from '@mui/material';

import MyAppBar from './Navigation/MyAppBar.jsx';
import GeneralNavigation from "./Navigation/GeneralNavigation.jsx";
import UserNavigation from "./Navigation/UserNavigation.jsx";


const drawerWidth = 240;

function Structure(props) {
  const {window} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{p: 2, display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h5">
          Library World
        </Typography>
      </Toolbar>
      <Divider/>
      <GeneralNavigation/>
      <Divider/>
      <UserNavigation/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <MyAppBar drawerWidth={drawerWidth}/>
      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  );
}

Structure.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Structure;
