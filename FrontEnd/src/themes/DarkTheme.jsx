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
    colors: color,
    heading: color.secondaryLight,
    paper: color.darkPaper,
    backgroundDefault: color.darkBackground,
    background: color.darkPaper,
    menuSelected: color.darkprimaryMain,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey900,
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

export default DarkTheme;
