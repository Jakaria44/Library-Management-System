import { ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Theme } from "../themes/LightTheme";
import { actions } from "./actions";

const ThemeContext = createContext("light");
const ThemeDispatchContext = createContext(null);

const initialTheme = localStorage.getItem("colorMode") || "light";
export function ThemeContextProvider({ children }) {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);
  useEffect(() => {
    window.localStorage.setItem("colorMode", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={Theme(theme)}>{children}</ThemeProvider>
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

function themeReducer(state, action) {
  switch (action.type) {
    case actions.TOGGLE_THEME: {
      return state === "light" ? "dark" : "light";
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const useMyTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export const useMyThemeDispatch = () => {
  const dispatch = useContext(ThemeDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useThemeDispatch must be used within a ThemeProvider");
  }
  return dispatch;
};
