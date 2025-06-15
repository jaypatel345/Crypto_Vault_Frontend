import React, { useState } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/GetImage";
import "../css/Upload.css";
// ✅ REMOVE Pagination import!
// import Pagination from "../components/Pagination.jsx";

const Home = () => {
  const [reload, setReload] = useState(false);
  const { web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

  const reloadEffect = () => {
    setReload((prev) => !prev);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "48px",
        padding: "20px",
      }}
    >
      <div className="upload-container">
        <h2 className="upload-title">Upload file with Web3's Security</h2>
        <UploadImage reloadEffect={reloadEffect} />
      </div>

      <GetImage reload={reload} selectedAccount={selectedAccount} />

      {/* ✅ REMOVE Pagination here:
      <Pagination
        page={page}
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={page === 1}
      /> 
      */}
    </div>
  );
};

export default Home;