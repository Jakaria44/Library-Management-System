import { lazy } from "react";

// project imports

import Details from "../pages/Details/Details";
import AllUsers from "../pages/Employee/AllUsers";
import Requests from "../pages/Employee/Requests";
import LatestBooks from "../pages/LatestBooks";
import Collections from "../pages/Reader/Collections";
import { loader as favouritesLoader } from "../pages/Reader/MyFavourites";
import MyReviews from "../pages/Reader/MyReviews";
import { loader as bookDetailsLoader } from "./../pages/Details/Details";
import { loader as allBooksLoader } from "./../pages/allbooks/AllBooks";
import Loadable from "./../ui-component/Loadable";
import DueList from "../pages/Reader/DueList";
// main routing
const Structure = Loadable(lazy(() => import("../layout/Structure.jsx")));

const MyFavourites = Loadable(
  lazy(() => import("../pages/Reader/MyFavourites"))
);

const MyDueList = Loadable(lazy(() => import("../pages/Reader/MyDueList")));
const MyCollections = Loadable(
  lazy(() => import("../pages/Reader/MyCollections"))
);
const Application = Loadable(lazy(() => import("../pages/Reader/Application")));

const AllBooks = Loadable(lazy(() => import("./../pages/allbooks/AllBooks")));
const HomePage = Loadable(lazy(() => import("./../pages/Home")));
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
      loader: allBooksLoader,
    },
    {
      path: "/details/:id",
      element: <Details />,
      loader: bookDetailsLoader,
    },
    {
      path: "/latestbooks",
      element: <LatestBooks />,
    },
    {
      path: "/profile",
      element: <ReaderProfile />,
      errorElement: (
        <p style={{ margin: "auto" }}>Error loading user Details!</p>
      ),
    },
    {
      path: "/favourites",
      element: <MyFavourites />,
      loader: favouritesLoader,
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
      path: "/reviews",
      element: <MyReviews />,
    },
    {
      path: "/duelist",
      element: <DueList />,
    },
    {
      path: "/allusers",
      element: <AllUsers />,
    },
    {
      path: "/allrequests",
      element: <Requests />,
    },
  ],
};
export default MainRoutes;
