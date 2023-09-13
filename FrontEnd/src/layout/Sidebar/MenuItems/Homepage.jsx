// assets

import {
  Category,
  DensityMedium,
  Home,
  LocalLibrary,
  PeopleAlt,
} from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Homepage = {
  id: "",
  title: "General",
  type: "group",
  children: [
    {
      id: "",
      title: "Home",
      type: "item",
      url: "/",
      icon: <Home />,
      breadcrumbs: false,
    },
    {
      id: "allbooks",
      title: "All Books",
      type: "item",
      url: "/allbooks",
      icon: <DensityMedium />,
      breadcrumbs: false,
    },

    {
      id: "categories",
      title: "Categories",
      type: "item",
      url: "/categories",
      icon: <Category />,
      breadcrumbs: false,
    },
    {
      id: "authors",
      title: "Authors",
      type: "item",
      url: "/authors",
      icon: <PeopleAlt />,
      breadcrumbs: false,
    },
    {
      id: "publishers",
      title: "Publishers",
      type: "item",
      url: "/publishers",
      icon: <LocalLibrary />,
      breadcrumbs: false,
    },
  ],
};

export default Homepage;
