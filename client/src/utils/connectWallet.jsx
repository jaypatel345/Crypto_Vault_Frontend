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

    console.log("Authentication response:", res.data.token);
    const token=res.data.token;
    localStorage.setItem("token",token)

    // Set up contract instance
    const contractAddress = "0x289d8eA710C82A9EE1A8943487a719b17c0d3Dac";
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