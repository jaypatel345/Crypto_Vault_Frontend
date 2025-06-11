import { useweb3contexts } from "../contexts/useweb3contexts";

const Home = () => {
  const { web3State } = useweb3contexts();
  const { selectedAccount } = web3State;
  console.log(selectedAccount);
  return <div>Home</div>;
};
export default Home;
