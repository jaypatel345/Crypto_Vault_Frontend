import Web3Provider from './contexts/web3Provider.jsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes.jsx'
import { useState } from "react";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Web3Provider>
        
        <RouterProvider router={routes}></RouterProvider>
      </Web3Provider>
    </>
  );
}

export default App;
