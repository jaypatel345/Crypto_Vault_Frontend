import { Web3Context } from "./createweb3contexts.jsx";
import { useContext } from "react";

export const useweb3contexts = () => {
  return useContext(Web3Context);
};