import axios from "axios";
import { useState } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";
import React from "react";
import "../css/Upload.css";

const UploadImage = ({ reloadEffect }) => {
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
      toast.success("IPFS Hash stored on-chain");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Smart Contract Upload Failed");
    }
  };

  const handleImageUpload = async (file) => {
    try {
      if (!file) {
        toast.error("Please select a file first");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be authenticated to upload.");
        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const url = `http://localhost:3000/api/uploadImage`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(url, formData, config);
      toast.success("Image uploaded to IPFS");
      await uploadImageHash(res.data.ipfsHash);
      reloadEffect();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-wrapper">
      <label className="upload-area">
        <span className="upload-label">Upload file </span>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="file-input"
          disabled={loading}
        />
      </label>
    </div>
  );
};

export default UploadImage;