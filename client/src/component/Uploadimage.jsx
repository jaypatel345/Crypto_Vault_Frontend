import axios from "axios";
import { useState } from "react";
import { useweb3contexts } from "../contexts/useweb3contexts.jsx";
import toast from "react-hot-toast";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const { web3State } = useweb3contexts();
  const { selectedAccount, contractInstance } = web3State;

  const uploadImageHash = async (ipfsHash) => {
    if (!contractInstance) {
      toast.error("Smart contract is not connected");
      console.error("contractInstance is null");
      return;
    }

    try {
      await toast.promise(contractInstance.uploadFile(ipfsHash), {
        loading: "Transaction is pending",
        success: "Transaction successful",
        error: "Transaction failed",
      });
    } catch (err) {
      console.error("Smart contract error:", err);
    }
  };

  const handleUploadImage = async () => {
    if (!file) return toast.error("Please select a file first.");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = `http://localhost:3000/api/uploadimage`; // Ensure your backend returns `ipfsHash`
      const res = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.ipfsHash) {
        toast.success("Image uploaded to IPFS");
        await uploadImageHash(res.data.ipfsHash);
        console.log("Stored hash:", res.data.ipfsHash);
      } else {
        throw new Error("No IPFS hash returned from backend");
      }
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      toast.error("Upload failed");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-[200px] md:w-[210px]"
      />
      <button onClick={handleUploadImage}>Upload Image</button>
    </div>
  );
};

export default UploadImage;
