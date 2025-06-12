import axios from "axios";
import { useState } from "react";

const Uploadimage = () => {
    const [file, setFile] = useState(null);

  const handleuploadimage = async () => {
    try {
        const formData = new FormData();
        formData.append("file",file)
      const url = `http://localhost:3000/api/uploadimage`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error("Axios upload failed:", err.response?.data || err.message);
    }
  };
  console.log(file);
  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-[200px] md:w-[210px]"
      />
      <button onClick={handleuploadimage}>uploadimage</button>
    </div>
  );
};

export default Uploadimage;
