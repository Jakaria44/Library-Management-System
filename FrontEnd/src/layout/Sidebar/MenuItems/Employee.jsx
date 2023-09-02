// assets

import { Checklist, NoteAdd, PeopleSharp } from "@mui/icons-material";

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
  ],
};

export default Employee;
