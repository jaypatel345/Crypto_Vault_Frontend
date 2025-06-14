import connectWallet from "../utils/connectWallet.jsx";
import { useweb3contexts } from "../contexts/useweb3contexts";
import toast from "react-hot-toast";

const ConnectWalletButton = () => {
  const { updateWeb3State } = useweb3contexts();

  const handleConnect = async () => {
    const result = await connectWallet();
    if (result) {
      updateWeb3State(result); // store contractInstance and selectedAccount
      toast.success("Wallet connected!");
    } else {
      toast.error("Wallet connection failed.");
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;