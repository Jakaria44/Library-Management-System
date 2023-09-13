// assets

import {
  AccountCircle,
  AutoStories,
  Description,
  Favorite,
  ReceiptLongSharp,
  Reviews,
  Work,
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
      id: "applications",
      title: "My Requests",
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
      title: "My Fines",
      type: "item",
      url: "/duelist",
      icon: <ReceiptLongSharp />,
      breadcrumbs: false,
    },
    {
      id: "joblist",
      title: "All Jobs",
      type: "item",
      url: "/joblist",
      icon: <Work />,
      breadcrumbs: false,
    },
  ],
};

export default Reader;
