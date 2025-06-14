import { useweb3contexts } from "../contexts/useweb3contexts";
import Uploadimage from "../component/uploadimage.jsx";
import Getimage from "../component/getimage.jsx";
import ConnectWalletButton from "../component/ConnectWalletButton";

const Home = () => {
  const { web3State } = useweb3contexts();
  const { selectedAccount } = web3State;

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-white bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] px-4">
      <h1 className="gradient-text text-4xl md:text-6xl font-bold mb-2 text-center">
        Crypted Vault
      </h1>

      {!selectedAccount ? (
        <ConnectWalletButton />
      ) : (
        <div className="mt-6 w-full flex flex-col items-center gap-4">
          <p className="text-lg font-medium">Connected Wallet: {selectedAccount}</p>
          <Uploadimage />
          <Getimage />
        </div>
      )}
    </div>
  );
};

export default Home;