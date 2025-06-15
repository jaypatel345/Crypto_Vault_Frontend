import { ethers } from "ethers";
import contractAbi from "../constants/contractAbi.json";

// Keep toast only for install check
import toast from "react-hot-toast";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      toast.error("Metamask is not installed");
      throw new Error("Metamask is not installed");
    }

    // Always prompt for accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const selectedAccount = accounts[0];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Connect to smart contract only
    const contractAddress = "0x3c8a5B9F383232C97753fd99422a4364c1559DA2";
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

    // ✅ Do NOT sign or auth here
    return { contractInstance, selectedAccount, provider, signer };

  } catch (error) {
    console.error("Wallet connection failed:", error);
    throw error; // ✅ Let caller handle toast + error display
  }
};