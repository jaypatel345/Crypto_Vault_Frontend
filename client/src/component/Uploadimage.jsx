import axios from "axios";

const Uploadimage = () => {
  const handleuploadimage = async () => {
    const url = `http://localhost:3000/api/uploadimage`;
    const res = await axios.get(url);
    console.log(res.data);
  };

  return (
    <div>
      <button onClick={handleuploadimage}>uploadimage</button>
    </div>
  );
};

export default Uploadimage;