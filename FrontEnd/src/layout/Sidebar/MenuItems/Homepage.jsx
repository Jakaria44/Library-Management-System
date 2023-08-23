// assets

import { AccessTime, DensityMedium, Home } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Homepage = {
  id: "",
  title: "General",
  type: "group",
  children: [
    {
      id: "",
      title: "Homepage",
      type: "item",
      url: "/",
      icon: <Home />,
      breadcrumbs: false,
    },
    {
      id: "allBooks",
      title: "All Books",
      type: "item",
      url: "/allbooks",
      icon: <DensityMedium />,
      breadcrumbs: false,
    },
    {
      id: "latestBooks",
      title: "Latest Books",
      type: "item",
      url: "/latestbooks",
      icon: <AccessTime />,
      breadcrumbs: false,
    },
  ],
};

export default Homepage;
