import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./pages/App.js";


import ErrorPage from "./error/Error";

import './styling/app.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);
