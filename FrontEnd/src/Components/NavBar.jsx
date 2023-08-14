import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/a" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?size=626&ext=jpg"
          alt="logo"
          width="50px"
          height="50px"
        />
      </Link>
      <SearchBar />
      
    </Stack>
  );
};

export default NavBar;
