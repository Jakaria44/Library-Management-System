import {
  Category,
  DensityMedium,
  FeaturedPlayList,
  Home,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navigationsAll = [
  {
    name: "Home",
    icon: <Home />,
    address: "/",
  },
  {
    name: "All Books",
    icon: <DensityMedium />,
    address: "/all-books",
  },
  {
    name: "Categories",
    icon: <Category />,
  },
  {
    name: "Featured",
    icon: <FeaturedPlayList />,
  },
];
const SideBar = () => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const path = window.location.pathname;
    const index = navigationsAll.findIndex((nav) => nav.address === path);
    setSelected(index);
  }, []);
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { xs: "auto", md: "95%" },
        flexDirection: { xs: "row", md: "column" },
        background: "#f5f5f5",
      }}
      
      position="sticky"
    >
      {navigationsAll.map((nav, i) => (
        <Link to={nav.address} key={i}>
          <button
            className="category-btn"
            style={{
              height: "8vh",
              background: i === selected && "#dddddd",
              color: i === selected && "#0099ff",
            }}
            onClick={() => setSelected(i)}
          >
            <span>
              {nav.icon}{" "}
            </span>
            <Typography variant="p" fontWeight="bold">
              <span style={{ marginLeft: "5px" }}>{nav.name} </span>
            </Typography>
          </button>
        </Link>
      ))}
    </Stack>
  );
};

export default SideBar;
