import axios from "axios";
import { useState } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";
import { ImageUp } from "lucide-react";

// Optional: Remove if you use contractInstance from context
// import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants"; 

const UploadImage = ({ reloadEffect }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;

  const uploadImageHash = async (ipfsHash) => {
    try {
      if (!contractInstance || !selectedAccount) {
        toast.error("Wallet not connected");
        return;
      }

      const tx = await contractInstance.uploadFile(selectedAccount, ipfsHash);
      await tx.wait();
      console.log("File uploaded to contract!");
      toast.success("IPFS Hash stored on-chain");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Smart Contract Upload Failed");
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!file) {
        toast.error("Please select a file first");
        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const url = `http://localhost:3000/api/uploadImage`;
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "x-access-token": token,
        },
      };

      const res = await axios.post(url, formData, config);
      toast.success("Image uploaded to IPFS");
      await uploadImageHash(res.data.ipfsHash); // Add IPFS hash to contract
      setFile(null);
      reloadEffect(); // Trigger refresh
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-screen flex flex-col justify-center items-center gap-6">
      <p className="font-semibold md:text-[24px]">
        Upload file with Web3's Security
      </p>
      <div className="w-full flex justify-center items-center">
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-[200px] md:w-[210px]"
        />
      </div>
      {file ? (
        <button
          onClick={handleImageUpload}
          disabled={loading}
          className="border-sky-400 border-dotted p-2 border-2 rounded-md flex flex-col justify-center items-center hover:bg-sky-200"
        >
          <ImageUp />
          {loading ? "Uploading..." : "Upload"}
        </button>
      ) : (
        <p className="text-[20px] font-semibold text-red-500">
          Choose a File To Upload
        </p>
      )}
      <br />
    </div>
  );
};

export default UploadImage;