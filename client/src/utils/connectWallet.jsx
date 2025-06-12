import { ethers } from "ethers";
import contractabi from "../contant/contractabi.json";
import toast from "react-hot-toast";
import axios from "axios";

 const connectWallet = async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedAccount = accounts[0];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const message = "welcome to my application";
    const signature = await signer.signMessage(message);

    // FIXED URL AND SPELLING
    const url = `http://localhost:3000/api/authentication?address=${selectedAccount}`;

    //  FIXED: send signature as JSON object
    const res = await axios.post(url, { signature });
    console.log(res.data);

    const contractAddress = "0xC4Ee7011A8389d1e35aE89F84a4c48756362f064";
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractabi,
      signer
    );

    console.log("Wallet connected:", selectedAccount, contractInstance);

    return { contractInstance, selectedAccount };
  } catch (error) {
    toast.error("Wallet connection failed");
    console.error("Error connecting wallet:", error);
    return null;
  }
};
export default connectWallet;