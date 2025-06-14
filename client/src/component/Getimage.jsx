import React, { useState } from "react";
import axios from "axios";
import { useweb3contexts } from "../contexts/useweb3contexts.jsx";

const GetImage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(2);
  const { web3State } = useweb3contexts(); // ✅ fixed hook call
  const { selectedAccount, contractInstance } = web3State;

  const getImageHashes = async () => {
    try {
      const ipfsHashes = await contractInstance.viewFiles(selectedAccount);
      return Object.values(ipfsHashes); // Flatten to array
    } catch (error) {
      console.error("Smart contract error:", error);
      return [];
    }
  };

  const getImage = async () => {
    const ipfsHashArray = await getImageHashes();

    if (!ipfsHashArray.length) {
      console.warn("No IPFS hashes found.");
      return;
    }

    const url = `http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`;
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json", // ✅ Required to send JSON array
      },
    };

    try {
      const res = await axios.post(url, ipfsHashArray, config);
      console.log("Decrypted image response:", res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <button onClick={getImage}>Get Image</button>
    </div>
  );
};

export default GetImage;