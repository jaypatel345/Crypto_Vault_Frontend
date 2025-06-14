import React, { useState } from "react";
import axios from "axios";
import { useweb3contexts } from "../contexts/useweb3contexts.jsx";

const GetImage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(2);
  const [images, setImages] = useState([]);
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
      setImages([]);
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
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err.response?.data || err.message);
      setImages([]);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div>
      <button onClick={getImage}>Get Image</button>
      <div>
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={img} alt={`Decrypted ${index}`} style={{ maxWidth: "200px", margin: "10px" }} />
          ))
        ) : (
          <p>No images to display</p>
        )}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default GetImage;