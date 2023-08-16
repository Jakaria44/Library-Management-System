import { createTheme } from "@mui/material/styles";

// assets
import colors from "./../assets/scss/_themes-vars.module.scss";

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

export const DarkTheme = () => {
  const color = colors;

  const themeOption = {
    mode: "dark",
    colors: color,
    heading: color.darkTextTitle,
    paper: color.darkPaper,
    darkTextPrimary: color.grey100,
    darkTextSecondary: color.grey50,
    textDark: color.grey300,
    menuSelected: color.darkSecondaryDark,
    menuSelectedBack: color.darkSecondaryDark,
    divider: color.grey200,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
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

export default DarkTheme();
