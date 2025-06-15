import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Web3Context } from "./createWeb3Context";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/constants";
import React from 'react';

const Web3Provider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    contractInstance: null,
    selectedAccount: null,
  });

  const updateWeb3State = (newState) => {
    setWeb3State((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const initializeWeb3 = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this app.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      if (!CONTRACT_ABI || !CONTRACT_ADDRESS) {
        console.error("Contract ABI or address is missing.");
        return;
      }

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      if (contract?.interface?.functions) {
        console.log("Smart contract functions:", Object.keys(contract.interface.functions));
      }

      updateWeb3State({
        selectedAccount: account,
        contractInstance: contract,
      });

      console.log("Connected Web3 account:", account);
    } catch (error) {
      console.error("Web3 initialization error:", error);
    }
  };

  useEffect(() => {
    initializeWeb3();

    const handleAccountChange = () => window.location.reload();
    const handleChainChange = () => window.location.reload();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      window.ethereum.on("chainChanged", handleChainChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
        window.ethereum.removeListener("chainChanged", handleChainChange);
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{ web3State, updateWeb3State }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
