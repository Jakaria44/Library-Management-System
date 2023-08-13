import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./Components/ErrorPage.jsx";
import AllBooks from "./Components/AllBooks.jsx";
import Homepage from "./Components/Homepage.jsx";
import {ChakraProvider} from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: <LinearProgress/>,
    children: [

      {
        path: "/Home",
        element:<Homepage/>
        // loader: <LinearProgress/>,
      },
      {
        path: "/allbooks",
        element: <AllBooks />,
        // loader: <LinearProgress/>,
      },
    ]
  },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>

    <RouterProvider router = {router}/>
    </ChakraProvider>
  </React.StrictMode>,
)
