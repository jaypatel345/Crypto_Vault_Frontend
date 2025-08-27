//  Wallet.jsx
import React, { useState } from 'react';
import { useWeb3Context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/Wallet.css';
import myImage01 from "../assets/Group 1.png";

const SIGN_MESSAGE = "Welcome to Crypto Vault Website";
const API_URL = "http://localhost:3000/api";

const Wallet = () => {
  const { updateWeb3State } = useWeb3Context();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleWalletConnection = async () => {
    setError(""); 
    try {
      const { contractInstance, selectedAccount, signer } = await connectWallet();

      const signature = await signer.signMessage(SIGN_MESSAGE);

      const res = await axios.post(
        `${API_URL}/authentication?address=${selectedAccount}`,
        { signature }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        updateWeb3State({ contractInstance, selectedAccount });
        navigate('/home'); // Redirect after success
      } else {
        setError("Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Wallet connection or authentication failed.");
    }
  };

  return (
    <div className="main-layout" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#E5F2FC'
    }}>
      <div className="wallet-box" style={{
        backgroundColor: 'white',
        padding: '40px 30px',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
        color: '#f8fafc'
      }}>
        <div className="wallet-icon" style={{
          
        }}>
          <img src={myImage01} alt="Logo" width="150" />
        </div>
        <h1 className="wallet-title" style={{
          fontSize: '2.4rem',
          fontWeight: '600',
          marginBottom: '30px',
          marginTop: '-8px'
        }}>Crypted Vault</h1>
        <button
          className="connect-btn"
          onClick={handleWalletConnection}
          style={{
            background: 'linear-gradient(90deg, #38bdf8, #7c3aed)',
            color: '#fff',
            fontWeight: '600',
            padding: '15px 15px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Connect Wallet
        </button>
        {error && <div className="wallet-error" style={{
          marginTop: '20px',
          color: '#f87171',
          fontWeight: '500'
        }}>{error}</div>}
      </div>
    </div>
  );
};

export default Wallet;