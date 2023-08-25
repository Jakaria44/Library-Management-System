import { lazy } from "react";

// project imports
import AuthStructure from "../pages/AuthStructure";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Loadable from "./../ui-component/Loadable";

// login option 3 routing
// const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const Structure = Loadable(lazy(() => import("../layout/Structure.jsx")));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <AuthStructure />,
  children: [
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ],
};

export default AuthenticationRoutes;
