// Wallet.jsx
import React, { useState } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Wallet.css";
import myImage01 from "../assets/symbol-xym-logo.svg";

const SIGN_MESSAGE = "Welcome to Crypto Vault Website";

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL;

const Wallet = () => {
  const { updateWeb3State } = useWeb3Context();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleWalletConnection = async () => {
    setError("");
    try {
      // 🔑 Make sure connectWallet triggers MetaMask
      const { contractInstance, selectedAccount, signer } = await connectWallet();

      // Ask user to sign welcome message
      const signature = await signer.signMessage(SIGN_MESSAGE);

      // Send signature + address to backend for authentication
      const res = await axios.post(
        `${API_URL}/api/authentication?address=${selectedAccount}`,
        { signature }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        // Save state globally
        updateWeb3State({ contractInstance, selectedAccount });

        // Redirect on success
        navigate("/");
      } else {
        setError("Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Wallet connection or authentication failed.");
    }
  };

  const mainLayoutStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#0000",
    padding: "20px 0px",
    margin: "0",
    boxSizing: "border-box",
  };

  const walletBoxStyle = {
    backgroundColor: "white",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 3px 5px rgba(0,0,0,0.4)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    color: "#f8fafc",
    fontSize: "1rem",
  };

  const walletTitleStyle = {
    fontSize: "2.4rem",
    fontWeight: "650",
    marginBottom: "30px",
    marginTop: "18px",
    color:"#8D33E5"
  };

  const connectBtnStyle = {
    background: "#8D33E5",
    color: "#fff",
    fontWeight: "650",
    padding: "15px 15px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
    width: "100%",
    maxWidth: "260px",
    margin: "0 auto",
    display: "block",
  };

  return (
    <>
      <style jsx>{`
        .main-layout {
          box-sizing: border-box;
        }
        
        .wallet-box {
          margin: 0 auto;
          box-sizing: border-box;
        }
        
        @media (max-width: 768px) {
          .main-layout {
            padding: 15px 10px !important;
          }
          
          .wallet-box {
            padding: 30px 20px !important;
            margin: 0 auto !important;
            font-size: 0.95rem !important;
            max-width: 350px !important;
          }
          
          .wallet-title {
            font-size: 2rem !important;
            margin-bottom: 25px !important;
          }
          
          .connect-btn {
            padding: 14px 12px !important;
            font-size: 0.95rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .main-layout {
            padding: 10px 15px !important;
          }
          
          .wallet-box {
            padding: 25px 15px !important;
            margin: 0 auto !important;
            font-size: 0.9rem !important;
            max-width: 320px !important;
          }
          
          .wallet-title {
            font-size: 1.8rem !important;
            margin-bottom: 20px !important;
          }
          
          .connect-btn {
            padding: 12px 10px !important;
            font-size: 0.9rem !important;
          }
          
          .wallet-icon img {
            width: 50px !important;
            height: 46px !important;
          }
        }
        
        @media (max-width: 320px) {
          .main-layout {
            padding: 10px 10px !important;
          }
          
          .wallet-box {
            padding: 20px 12px !important;
            font-size: 0.85rem !important;
            max-width: 280px !important;
            margin: 0 auto !important;
          }
          
          .wallet-title {
            font-size: 1.6rem !important;
          }
          
          .connect-btn {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
      
      <div
        className="main-layout flex items-center justify-center min-h-screen"
        style={mainLayoutStyle}
      >
        <div
          className="wallet-box"
          style={walletBoxStyle}
        >
          <div className="wallet-icon">
            <img src={myImage01} alt="Logo" width="60" height="56" />
          </div>
          <h1
            className="wallet-title"
            style={walletTitleStyle}
          >
            Crypted Vault
          </h1>
          <button
            // className="connect-btn"
            onClick={handleWalletConnection}
            style={connectBtnStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Connect Wallet
          </button>
          {error && (
            <div
              className="wallet-error"
              style={{
                marginTop: "20px",
                color: "#f87171",
                fontWeight: "500",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;