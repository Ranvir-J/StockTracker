import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import "./components/TopBar/TopBar.css"
import App from './components/App/App.js';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./layout/AppLayout/AppLayout.js";
import Dashboard from "./pages/Dashboard/Dashboard.js"
import Inventory from "./pages/Inventory/Inventory.js"
import OrderHistory from './pages/OrderHistory/OrderHistory.js';
import NotFound from "./pages/NotFound/NotFound.js"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard />, errorElement: <NotFound />},
      { path: "/Inventory", element: <Inventory /> },
      { path: "/OrderHistory", element: <OrderHistory /> }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
