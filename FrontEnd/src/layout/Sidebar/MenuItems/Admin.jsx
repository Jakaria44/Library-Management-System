// assets

import { Feed, People, SsidChart } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Admin = {
  id: "Admin",
  title: "Administration",
  type: "group",
  children: [
    {
      id: "stat",
      title: "Statistics",
      type: "item",
      url: "/stat",
      icon: <SsidChart />,
      breadcrumbs: false,
    },
    {
      id: "jobapplications",
      title: "Applications",
      type: "item",
      url: "/jobapplications",
      icon: <Feed />,
      breadcrumbs: false,
    },
    {
      id: "manageemployees",
      title: "All Employees",
      type: "item",
      url: "/manageemployees",
      icon: <People />,
      breadcrumbs: false,
    },
  ],
};

export default Admin;
