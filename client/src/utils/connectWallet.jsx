import { ethers } from "ethers";
import contractabi from "../contant/contractabi.json";
import toast from "react-hot-toast";
import axios from "axios";

const connectWallet = async () => {
  try {
    // Request access to the user's Ethereum account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedAccount = accounts[0];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Define and sign a custom message for authentication
    const message = "welcome to my application";
    const signature = await signer.signMessage(message);

    // Send signed message to backend for verification
    const url = `http://localhost:3000/api/authentication?address=${selectedAccount}`;
    const res = await axios.post(url, { signature });

    console.log("Authentication response:", res.data);

    // Set up contract instance
    const contractAddress = "0xC4Ee7011A8389d1e35aE89F84a4c48756362f064";
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractabi,
      signer
    );

    console.log("Wallet connected:", selectedAccount);
    return { contractInstance, selectedAccount };
  } catch (error) {
    toast.error("Wallet connection failed: " + (error.message || "Unknown error"));
    console.error("Error connecting wallet:", error);
    return null;
  }
};

export default connectWallet;