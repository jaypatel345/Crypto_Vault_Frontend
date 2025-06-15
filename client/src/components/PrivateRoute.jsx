import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
