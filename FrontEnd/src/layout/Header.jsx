// material-ui
import { Avatar, Box, ButtonBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DarkModeSwitch from "../component/DarkModeSwitch.jsx";
import { useMyTheme } from "../contexts/ThemeContextProvider.jsx";
import LogoSection from "./Sections/LogoSection.jsx";
import ProfileSection from "./Sections/ProfileSection.jsx";
import SearchSection from "./Sections/SearchSection.jsx";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const mode = useMyTheme();

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
        <Box
          component="span"
          marginLeft="16px"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 2 }} />

      {/* notification & profile */}
      <Box>
        {/* <Avatar
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
        </Avatar> */}
        <DarkModeSwitch />
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      <ProfileSection />
    </>
  );
};

export default Header;
