import { lazy } from "react";

// project imports
import Loadable from "./../ui-component/Loadable";

const Details = Loadable(lazy(() => import("../pages/Details/Details")));
const AllDueList = Loadable(lazy(() => import("../pages/Employee/AllDueList")));
const AllRentHistory = Loadable(
  lazy(() => import("../pages/Employee/AllRentHistory"))
);
const Users = Loadable(lazy(() => import("../pages/Employee/Users")));
const Requests = Loadable(lazy(() => import("../pages/Employee/Requests")));
const JobList = Loadable(lazy(() => import("../pages/Employee/JobList")));
const ManageEmployees = Loadable(
  lazy(() => import("../pages/Employee/ManageEmployees"))
);
const Statistics = Loadable(lazy(() => import("../pages/Admin/Statistics")));
const JobApplications = Loadable(
  lazy(() => import("../pages/Admin/JobApplications"))
);
const Categories = Loadable(lazy(() => import("../pages/Categories")));
const AuthorList = Loadable(lazy(() => import("../pages/AuthorList")));
const SingleCategory = Loadable(lazy(() => import("../pages/SingleCategory")));
const PublisherList = Loadable(lazy(() => import("../pages/PublisherList")));
const SinglePublisher = Loadable(
  lazy(() => import("../pages/SinglePublisher"))
);
const SingleAuthor = Loadable(lazy(() => import("../pages/SingleAuthor")));
const Collections = Loadable(lazy(() => import("../pages/Reader/Collections")));
const DueList = Loadable(lazy(() => import("../pages/Reader/DueList")));
const MyReviews = Loadable(lazy(() => import("../pages/Reader/MyReviews")));
const AddBook = Loadable(
  lazy(() => import("../pages/Employee/addbook/AddBook"))
);
const EditBook = Loadable(
  lazy(() => import("../pages/Employee/addbook/EditBook"))
);

import { loader as DetailsLoader } from "../pages/Employee/addbook/EditBook";

import { loader as bookDetailsLoader } from "./../pages/Details/Details";
// main routing
const Structure = Loadable(lazy(() => import("../layout/Structure.jsx")));

const MyFavourites = Loadable(
  lazy(() => import("../pages/Reader/MyFavourites"))
);

const HomePage = Loadable(lazy(() => import("./../pages/Home/Home")));
const Application = Loadable(lazy(() => import("../pages/Reader/Application")));

const AllBooks = Loadable(lazy(() => import("./../pages/allbooks/AllBooks")));
const ErrorPage = Loadable(lazy(() => import("./../pages/ErrorPage")));
const ReaderProfile = Loadable(
  lazy(() => import("./../pages/Reader/ReaderProfile"))
);
// ==============================| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <Structure />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/allbooks",
      element: <AllBooks />,
    },
    {
      path: "/allbooks/search",
      element: <AllBooks />,
    },
    {
      path: "/details/:id",
      element: <Details />,
      loader: bookDetailsLoader,
    },

    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/categories/:id/:name",
      element: <SingleCategory />,
    },
    {
      path: "/authors",
      element: <AuthorList />,
    },
    {
      path: "/authors/:id/:name",
      element: <SingleAuthor />,
    },
    {
      path: "/publishers",
      element: <PublisherList />,
    },
    {
      path: "/publishers/:id/:name",
      element: <SinglePublisher />,
    },
    {
      path: "/profile",
      element: <ReaderProfile />,
      errorElement: (
        <p style={{ margin: "auto" }}>Error loading user Details!</p>
      ),
    },
    {
      path: "/stat",
      // element: <VirtualizedAutocomplete />,
      element: <Statistics />,
    },
    {
      path: "/jobapplications",

      element: <JobApplications />,
    },

    {
      path: "/applications",
      element: <Application />,
    },
    // {
    //   path: "/applications",
    //   element: <MyApplications />,
    // },
    {
      path: "/collections",
      element: <Collections />,
    },

    {
      path: "/duelist",
      element: <DueList />,
    },
    {
      path: "/allusers",
      element: <Users />,
    },
    {
      path: "/allrequests",
      element: <Requests />,
    },
    {
      path: "/allduelists",
      element: <AllDueList />,
    },
    {
      path: "/allrent",
      element: <AllRentHistory />,
    },
    {
      path: "/joblist",
      element: <JobList />,
    },
    {
      path: "/manageemployees",
      element: <ManageEmployees />,
    },

    {
      path: "/addbook",
      element: <AddBook />,
    },
    {
      path: "/editbook/:id",
      loader: DetailsLoader,
      element: <EditBook />,
    },
  ],
};
export default MainRoutes;
