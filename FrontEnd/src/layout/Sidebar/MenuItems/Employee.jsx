// assets

import { PeopleSharp } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Employee = {
  id: "Employee",
  title: "Employee",
  type: "group",
  children: [
    {
      id: "allusers",
      title: "All Users",
      type: "item",
      url: "/allusers",
      icon: <PeopleSharp />,
      breadcrumbs: false,
    },
  ],
};

export default Employee;
