// assets

import { Favorite, LocalLibrary } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Reader = {
  id: "Reader",
  title: "Reader",
  type: "group",
  children: [
    {
      id: "default",
      title: "Reader",
      type: "item",
      url: "/",
      icon: <LocalLibrary />,
      breadcrumbs: false,
    },
    {
      id: "favourite",
      title: "Favourites",
      type: "item",
      url: "/",
      icon: <Favorite />,
      breadcrumbs: false,
    },
    
  ],
};

export default Reader;
