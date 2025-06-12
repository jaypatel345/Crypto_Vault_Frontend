import { useweb3contexts } from "../contexts/useweb3contexts";
import Uploadimage from "../component/uploadimage.jsx";
import Getimage from "../component/getimage.jsx"
const Home = () => {
  const { web3State } = useweb3contexts();
  const { selectedAccount } = web3State;
  return (<div><Uploadimage/></div>);
};
export default Home;
