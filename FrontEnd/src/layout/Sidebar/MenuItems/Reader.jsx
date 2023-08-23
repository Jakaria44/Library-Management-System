// assets

import {
  AccountCircle,
  AutoStories,
  Description,
  Favorite,
  ReceiptLongSharp,
  Reviews,
} from "@mui/icons-material";

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
      url: "/profile",
      icon: <AccountCircle />,
      breadcrumbs: false,
    },
    {
      id: "favourites",
      title: "Favourites",
      type: "item",
      url: "/favourites",
      icon: <Favorite />,
      breadcrumbs: false,
    },
    {
      id: "reviews",
      title: "My Reviews",
      type: "item",
      url: "/reviews",
      icon: <Reviews />,
      breadcrumbs: false,
    },
    {
      id: "applications",
      title: "My Applications",
      type: "item",
      url: "/applications",
      icon: <Description />,
      breadcrumbs: false,
    },
    {
      id: "collections",
      title: "My Collections",
      type: "item",
      url: "/collections",
      icon: <AutoStories />,
      breadcrumbs: false,
    },
    {
      id: "duelist",
      title: "My Due List",
      type: "item",
      url: "/duelist",
      icon: <ReceiptLongSharp />,
      breadcrumbs: false,
    },
  ],
};

export default Reader;
