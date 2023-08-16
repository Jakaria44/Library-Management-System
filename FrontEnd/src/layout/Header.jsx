// material-ui
import { Avatar, Box, ButtonBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  useMyTheme,
  useMyThemeDispatch,
} from "../contexts/ThemeContextProvider.jsx";
import { actions } from "../contexts/actions.jsx";
import LogoSection from "./Sections/LogoSection.jsx";
import ProfileSection from "./Sections/ProfileSection.jsx";
import SearchSection from "./Sections/SearchSection.jsx";

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
            }}
            onClick={handleLeftDrawerToggle}
          >
            <MenuRoundedIcon fontSize="medium" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 2 }} />

      {/* notification & profile */}
      <Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
          }}
          onClick={() => {
            dispatch({
              type: actions.TOGGLE_THEME,
            });
          }}
        >
          {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
        </Avatar>
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      <ProfileSection />
    </>
  );
};

export default Header;
