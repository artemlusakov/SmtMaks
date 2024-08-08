import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";


import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement:<Error/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
