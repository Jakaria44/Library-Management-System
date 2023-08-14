import { CssBaseline } from "@mui/material";
import Routes from "./Routes/Routes";
import { MenuContextProvider } from "./contexts/MenuContextProvider.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import NavigationScroll from "./layout/NavigationScroll";

const App = () => {
  return (
    <MenuContextProvider>
      <ThemeContextProvider>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeContextProvider>
    </MenuContextProvider>
  );
};

export default App;
