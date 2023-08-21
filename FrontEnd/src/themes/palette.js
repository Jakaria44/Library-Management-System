/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme, mode) {
    return {
        mode,

        common: {
            black: theme.colors?.darkPaper,
        },
        ...(mode === 'light'
            ? {
                  primary: {
                      light: theme.colors?.primaryLight,
                      main: theme.colors?.primaryMain,
                      dark: theme.colors?.primaryDark,
                      200: theme.colors?.primary200,
                      800: theme.colors?.primary800,
                  },
                  secondary: {
                      light: theme.colors?.secondaryLight,
                      main: theme.colors?.secondaryLight,
                      dark: theme.colors?.secondaryDark,
                      200: theme.colors?.secondary200,
                      800: theme.colors?.secondary800,
                  },
                  error: {
                      light: theme.colors?.errorLight,
                      main: theme.colors?.errorMain,
                      dark: theme.colors?.errorDark,
                  },

                  background: {
                      paper: theme.background,
                      default: theme.backgroundDefault,
                  },
                  itemBackground: theme.colors?.secondaryLight,
                  itemBackgroundHover: theme.colors?.secondaryDark,
                  itemColor: theme.colors?.primaryDark,
                  itemHover: theme.colors?.primaryLight,
              }
            : {
                  primary: {
                      light: theme.colors?.primaryLight,
                      main: theme.colors?.primaryLight,
                      dark: theme.colors?.primaryDark,
                      200: theme.colors?.primary200,
                      800: theme.colors?.primary800,
                  },
                  // secondary: {
                  //   light: theme.colors?.secondaryLight,
                  //   main: theme.colors?.secondaryDark,
                  //   dark: theme.colors?.secondaryDark,
                  //   200: theme.colors?.secondary200,
                  //   800: theme.colors?.secondary800,
                  // },
                  error: {
                      light: theme.colors?.errorLight,
                      main: theme.colors?.errorDark,
                      dark: theme.colors?.errorDark,
                  },
                  text: {
                      primary: theme.colors?.primaryLight,
                      secondary: theme.colors?.grey500,
                      dark: theme.colors?.primaryLight,
                      hint: theme.colors?.primaryLight,
                  },
                  background: {
                      paper: theme.background,
                      default: theme.backgroundDefault,
                  },
                  itemBackground: theme.colors?.secondaryDark,
                  itemBackgroundHover: theme.colors?.darkBackground,
                  itemColor: theme.colors?.primaryLight,
                  itemHover: theme.colors?.primaryLight,
              }),
        text: {
            primary: theme.darkTextPrimary,
            secondary: theme.darkTextSecondary,
            dark: theme.textDark,
            hint: theme.colors?.grey100,
        },
        orange: {
            light: theme.colors?.orangeLight,
            main: theme.colors?.orangeMain,
            dark: theme.colors?.orangeDark,
        },
        warning: {
            light: theme.colors?.warningLight,
            main: theme.colors?.warningMain,
            dark: theme.colors?.warningDark,
        },
        success: {
            light: theme.colors?.successLight,
            200: theme.colors?.success200,
            main: theme.colors?.successMain,
            dark: theme.colors?.successDark,
        },
        grey: {
            50: theme.colors?.grey50,
            100: theme.colors?.grey100,
            500: theme.darkTextSecondary,
            600: theme.heading,
            700: theme.darkTextPrimary,
            900: theme.textDark,
        },
        dark: {
            light: theme.colors?.darkTextPrimary,
            main: theme.colors?.darkLevel1,
            dark: theme.colors?.darkLevel2,
            800: theme.colors?.darkBackground,
            900: theme.colors?.darkPaper,
        },
        component: {
            background: theme.backgroundComponent,
        },
        heading: {
            main: theme.heading,
        },
    };
}
