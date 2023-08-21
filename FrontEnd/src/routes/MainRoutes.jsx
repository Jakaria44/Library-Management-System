import { lazy } from "react";

// project imports

import Details from "../pages/Details/Details";
import LatestBooks from "../pages/LatestBooks";
import { loader as bookDetailsLoader } from "./../pages/Details/Details";
import { loader as allBooksLoader } from "./../pages/allbooks/AllBooks";
import Loadable from "./../ui-component/Loadable";
// main routing
const Structure = Loadable(lazy(() => import("../layout/Structure.jsx")));

const AllBooks = Loadable(lazy(() => import("./../pages/allbooks/AllBooks")));
const HomePage = Loadable(lazy(() => import("./../pages/Home")));
const ErrorPage = Loadable(lazy(() => import("./../pages/ErrorPage")));

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
      // errorElement: (<p style={{ margin: "auto" }}>Error loading all books!</p>)
    },
    {
      path: "/latestbooks",
      element: <LatestBooks />,
    },
  ],
};
export default MainRoutes;
