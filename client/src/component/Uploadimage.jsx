import axios from "axios";

const Uploadimage = () => {
    const handleuploadimage = async () => {
        try {
          const url = `http://localhost:3000/api/uploadimage`;
          const res = await axios.get(url);
          console.log(res.data);
        } catch (err) {
          console.error("Axios upload failed:", err.response?.data || err.message);
        }
      };

  return (
    <div>
      <button onClick={handleuploadimage}>uploadimage</button>
    </div>
  );
};

export default Uploadimage;