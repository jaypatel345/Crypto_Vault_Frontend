import { createBrowserRouter } from 'react-router-dom';
import Wallet from '../pages/Wallet';
import Home from '../pages/Home';
import PrivateRoute from '../components/PrivateRoute';
import React from 'react';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Wallet />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);
