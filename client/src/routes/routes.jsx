import { createBrowserRouter } from 'react-router-dom';
import Wallet from '../pages/Wallet';
import Home from '../pages/Home';
import PrivateRoute from '../components/PrivateRoute';
import React from 'react';

export const routes = createBrowserRouter([
  {
    path: '/',           //  Home is now the default route
    element: <Home />,
  },
  {
    path: '/wallet',     //  Separate page for wallet connection
    element: <Wallet />,
  },
  {
    element: <PrivateRoute />,  //  if you still want protected routes
    children: [
      {
        path: '/home',   // optional: keep /home as protected if needed
        element: <Home />,
      },
    ],
  },
]);