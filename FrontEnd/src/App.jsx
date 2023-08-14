import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <>
      <NavBar />

      <Stack sx={{ flexDirection: { xs: "column", md: "row" } } }>
        <Box
          sx={{
            height: { xs: "auto", md: "108vh" },
            background: "#f5f5f5",
          }}
          
        >
          <SideBar />
        </Box>
        <Box p={2} sx={{ height: "90vh", flex: 2 }}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}

export default App;
