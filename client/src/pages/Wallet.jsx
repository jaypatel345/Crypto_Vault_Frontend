// ✅ Wallet.jsx
import React, { useState } from 'react';
import { useWeb3Context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/Wallet.css';

const SIGN_MESSAGE = "Welcome to Crypto Vault Website";
const API_URL = "http://localhost:3000/api";

const Wallet = () => {
  const { updateWeb3State } = useWeb3Context();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleWalletConnection = async () => {
    setError(""); // ✅ Always clear error first
    try {
      const { contractInstance, selectedAccount, signer } = await connectWallet();

      // ✅ Only sign here once
      const signature = await signer.signMessage(SIGN_MESSAGE);

      const res = await axios.post(
        `${API_URL}/authentication?address=${selectedAccount}`,
        { signature }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        updateWeb3State({ contractInstance, selectedAccount });
        navigate('/home'); // ✅ Redirect after success
      } else {
        setError("Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Wallet connection or authentication failed.");
    }
  };

  return (
    <div className="main-layout">
      <div className="wallet-box">
        <div className="wallet-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="12" width="36" height="24" rx="6" fill="#38bdf8" />
            <rect x="12" y="18" width="24" height="12" rx="4" fill="#fff" />
            <circle cx="36" cy="24" r="3" fill="#7c3aed" />
          </svg>
        </div>
        <h1 className="wallet-title">Crypted Vault</h1>
        <button className="connect-btn" onClick={handleWalletConnection}>
          Connect Wallet
        </button>
        {error && <div className="wallet-error">{error}</div>}
      </div>
    </div>
  );
};

export default Wallet;