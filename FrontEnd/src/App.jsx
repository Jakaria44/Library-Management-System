import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Routes from "./Routes/Routes";
import { MenuContextProvider } from "./contexts/MenuContextProvider.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import NavigationScroll from "./layout/NavigationScroll";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <MenuContextProvider>
        <ThemeContextProvider>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeContextProvider>
      </MenuContextProvider>
    </StyledEngineProvider>
  );
};

export default App;
