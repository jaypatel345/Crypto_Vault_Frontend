import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import React from "react";
import "../css/GetImage.css";
import Pagination from "../components/Pagination.jsx";

const GetImage = ({ reload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage] = useState(4);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;

  // ✅ Base URL from .env
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getImages = async () => {
      if (!selectedAccount || !contractInstance) {
        setImages([]);
        return;
      }

      try {
        setLoading(true);

        // Get IPFS hashes from contract
        const ipfsHashes = await contractInstance.viewFiles(selectedAccount);
        const ipfsHashArray = Array.isArray(ipfsHashes)
          ? ipfsHashes
          : Object.values(ipfsHashes);

        const token = localStorage.getItem("token");
        const url = `${API}/getImage?page=${currentPage}&limit=${imagePerPage}`;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Call backend with ipfsHashArray
        const res = await axios.post(url, { ipfsHashArray }, config);
        const imagesData = res.data.decryptedImageArr || [];
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images");
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [contractInstance, currentPage, imagePerPage, selectedAccount, reload]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (!selectedAccount || !contractInstance) {
    return <p className="error-text">Please connect your wallet to view images.</p>;
  }

  return (
    <>
      {!loading ? (
        images.length > 0 ? (
          <div className="image-row">
            {images.map((imgData, index) => (
              <img
                key={index}
                src={`data:image/*;base64,${imgData}`}
                alt={`Image ${index + 1}`}
                className="image-item"
              />
            ))}
          </div>
        ) : (
          <p className="no-images-text">No images found.</p>
        )
      ) : (
        <p className="loading-text">Loading...</p>
      )}

      <Pagination
        page={currentPage}
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={currentPage === 1 || loading}
      />
    </>
  );
};

export default GetImage;