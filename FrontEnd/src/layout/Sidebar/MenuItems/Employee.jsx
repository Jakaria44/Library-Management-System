// assets

import { ManageAccounts } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Employee = {
  id: "Employee",
  title: "Employee",
  type: "group",
  children: [
    {
      id: "employee",
      title: "Employee",
      type: "item",
      url: "/",
      icon: <ManageAccounts />,
      breadcrumbs: false,
    },
  ],
};

export default Employee;
