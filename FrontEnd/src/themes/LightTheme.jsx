import { createTheme } from "@mui/material/styles";

// assets
import colors from "./../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

export const Theme = (mode) => {
  const color = colors;

  const themeOption = {
    // these customization is only to override the default theme with the typography.
    colors: color,
    heading: mode === "light" ? color.grey900 : color.grey50,
    paper: mode === "light" ? color.paper : color.darkPaper,
    backgroundDefault: mode === "light" ? color.paper : colors?.darkBackground,
    background: mode === "light" ? color.primaryLight : colors?.darkPaper,
    backgroundComponent: mode === "light" ? color.grey500 : color.grey600,
    buttonBackground: mode==="light" ? color.primaryLight : color.grey700,
    darkTextPrimary: mode === "light" ? color.grey700 : color.grey50,
    darkTextSecondary: mode === "light" ? color.grey500 : color.grey500,
    textDark: mode === "light" ? color.grey900 : color.grey50,
    menuSelectedBack: mode === "light" ? color.grey900 : color.grey100,
    menuSelected: mode === "light" ? color.secondaryLight : color.grey900,
    divider: mode === "light" ? color.grey200 : color.grey800,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption, mode),
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default Theme;
