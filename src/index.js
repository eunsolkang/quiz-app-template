import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import Add from './Add';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
      path: "/quiz",
      element: <App></App>,
  },
  {
    path: "/add",
    element: <Add></Add>,
},
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-center" hideProgressBar={true} autoClose={1500}
/>
  </React.StrictMode>
);