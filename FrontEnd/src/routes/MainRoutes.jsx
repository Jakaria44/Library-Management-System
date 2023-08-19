import { lazy } from "react";

// project imports

import Details from "../pages/Details";
import LatestBooks from "../pages/LatestBooks";

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
      path: "/details/:id",
      element: <Details />,
    },
    {
      path: "/allbooks",
      element: <AllBooks />,
      loader: allBooksLoader,
    },
    {
      path: "/latestbooks",
      element: <LatestBooks />,
    },
  ],
};
export default MainRoutes;
