import { createBrowserRouter } from "react-router-dom";
import Wallet from "../pages/Wallet.jsx";
import Home from "../pages/Home.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Wallet />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    future: {
      v7_startTransition: true,
    },
  },
]);
