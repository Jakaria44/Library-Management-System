// assets

import { Checklist, CurrencyExchange, NoteAdd, People, PeopleSharp, Work, History } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Employee = {
    id: "Employee",
    title: "Employee",
    type: "group",
    children: [
        {
            id: "addbook",
            title: "Add Book",
            type: "item",
            url: "/addbook",
            icon: <NoteAdd />,
            breadcrumbs: false,
        },
        {
            id: "allusers",
            title: "Users Info",
            type: "item",
            url: "/allusers",
            icon: <PeopleSharp />,
            breadcrumbs: false,
        },
        {
            id: "allrequests",
            title: "Book Requests",
            type: "item",
            url: "/allrequests",
            icon: <Checklist />,
            breadcrumbs: false,
        },
        {
            id: "allduelists",
            title: "Fine History",
            type: "item",
            url: "/allduelists",
            icon: <CurrencyExchange />,
            breadcrumbs: false,
        },

        {
            id: "allrent",
            title: "Rent History",
            type: "item",
            url: "/allrent",
            icon: <History />,
            breadcrumbs: false,
        },
    ],
};

export default Employee;
