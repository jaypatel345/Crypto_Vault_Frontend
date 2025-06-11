import { useweb3contexts } from "../contexts/useweb3contexts";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Wallet = () => {
  const navigateTo = useNavigate();
  const { updateWeb3State, web3State } = useweb3contexts();
  const { selectedAccount } = web3State;

  useEffect(() => {
    if (selectedAccount) {
      navigateTo("/home");
    }
  }, [selectedAccount, navigateTo]);

  const handleWalletConnection = async () => {
    const result = await connectWallet();

    if (!result) {
      console.error("connectWallet returned null");
      return;
    }

    const { contractInstance, selectedAccount } = result;

    console.log("Wallet connected:");
    console.log("Selected Account:", selectedAccount);
    console.log("Contract Instance:", contractInstance);

    updateWeb3State({ contractInstance, selectedAccount });
  };

  return (
    <h1>
      <button onClick={handleWalletConnection}>Connect wallet</button>
    </h1>
  );
};

export default Wallet;
