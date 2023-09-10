// assets

import { SsidChart } from "@mui/icons-material";

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
  ],
};

export default Admin;
