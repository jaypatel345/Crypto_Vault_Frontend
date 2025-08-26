import React from 'react';
import Web3Provider from './contexts/web3Provider.jsx';
import { RouterProvider } from 'react-router-dom';
import  {routes}  from './routes/routes.jsx';
// Optionally import your CSS:
import './index.css';

function App() {
  return (
    <Web3Provider>
      <RouterProvider router={routes} />
    </Web3Provider>
  );
}

export default App;