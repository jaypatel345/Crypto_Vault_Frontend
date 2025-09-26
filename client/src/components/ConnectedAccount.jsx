import { useWeb3Context } from "../contexts/useWeb3Context";

const ConnectedAccount = () => {
  const { web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

  // Helper to shorten Ethereum address
  const formatAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <div className="w-full flex flex-col justify-center items-center md:flex-row md:justify-between md:px-10">
      {selectedAccount ? (
        <p className="font-semibold">
          Connected Account: {formatAddress(selectedAccount)}
        </p>
      ) : (
        <p className="font-semibold text-red-500">
          No wallet connected
        </p>
      )}
    </div>
  );
};

export default ConnectedAccount;