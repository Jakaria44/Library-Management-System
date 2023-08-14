import PropTypes from "prop-types";

// material-ui
import { Avatar, Box, ButtonBase, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  useMyTheme,
  useMyThemeDispatch,
} from "../contexts/ThemeContextProvider.jsx";
import LogoSection from "./LogoSection.jsx";
import SearchSection from "./Sections/SearchSection.jsx";
import ProfileSection from "./Sections/ProfileSection.jsx";
// import SearchSection.jsx from './SearchSection.jsx';
// import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';

// assets
// import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const mode = useMyTheme();
  const dispatch = useMyThemeDispatch();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.primary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.primary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <MenuRoundedIcon fontSize="small" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 2 }} />

      {/* notification & profile */}
      <Box>
        <IconButton
          onClick={() => {
            dispatch({
              type: "toggle",
            });
          }}
        >
          {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>
      </Box>

      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
