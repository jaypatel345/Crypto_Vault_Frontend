import {ethers} from "ethers";
import contractabi from "../contant/contractabi.json";
import toast, { Toaster } from "react-hot-toast";
export const connectWallet = async () => {
  try {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const selectedAccount = account[0];
    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const contractAddress = "0xC4Ee7011A8389d1e35aE89F84a4c48756362f064";
    const contractInstance = new ethers.Contract(contractAddress,contractabi,signer)

    console.log(selectedAccount,contractInstance);
  } catch (error) {
    toast.error("wallet connection fail");
    console.error("Error connecting wallet:", error);
  }
};
