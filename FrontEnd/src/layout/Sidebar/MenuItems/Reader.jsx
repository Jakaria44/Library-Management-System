// assets

import { Favorite, LocalLibrary, AccountCircle } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Reader = {
  id: "reader",
  title: "Reader",
  type: "group",
  children: [
    {
      id: "profile",
      title: "Profile",
      type: "item",
      url: `/reader/profile/${localStorage.getItem("userId")}`,
      icon: <AccountCircle />,
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
