import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Structure from "./Components/Structure.jsx";
import Homepage from "./Components/Homepage.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import AllBooks from "./Components/AllBooks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: <LinearProgress/>,
    children: [
      {
        index : true,
        element: <Homepage />,
      },
      {
        path: "/Home",
        element: <Homepage />,
        // loader: <LinearProgress/>,
      },
      {
        path: "/AllBooks",
        element: <AllBooks />,
        // loader: <LinearProgress/>,
      },
    ]
  },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
