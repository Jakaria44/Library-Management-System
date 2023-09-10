// assets

import {
  Checklist,
  NoteAdd,
  People,
  PeopleSharp,
  Work,
} from "@mui/icons-material";

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
    {
      id: "allrequests",
      title: "All Requests",
      type: "item",
      url: "/allrequests",
      icon: <Checklist />,
      breadcrumbs: false,
    },
    {
      id: "allduelists",
      title: "Pending Fine List",
      type: "item",
      url: "/allduelists",
      icon: <Checklist />,
      breadcrumbs: false,
    },

    {
      id: "addbook",
      title: "Add Book",
      type: "item",
      url: "/addbook",
      icon: <NoteAdd />,
      breadcrumbs: false,
    },
    {
      id: "joblist",
      title: "Job list",
      type: "item",
      url: "/joblist",
      icon: <Work />,
      breadcrumbs: false,
    },
    {
      id: "manageemployees",
      title: "Manage Employees",
      type: "item",
      url: "/manageemployees",
      icon: <People />,
      breadcrumbs: false,
    },
  ],
};

export default Employee;
