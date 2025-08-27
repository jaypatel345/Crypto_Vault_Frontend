import React, { useState } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/GetImage";
import "../css/Upload.css"; // Updated CSS file name
import myImage01 from "../assets/Group 1.png";
import myImage02 from "../assets/360_F_964891898_SuTIP6H2AVZkBuUG2cIpP9nvdixORKpM.jpg";
import { Link } from "react-router-dom";

// Enhanced upload wrapper component with modern styling
const StyledUploadWrapper = ({ children }) => {
  return (
    <div className="enhanced-upload-container">
      <div className="modern-upload-section">
        <h3 className="upload-title">Upload Your Images</h3>
        <p className="upload-subtitle">
          Drag and drop or browse to upload your Images securely to the
          blockchain with end-to-end encryption
        </p>

        <div className="original-upload-wrapper">{children}</div>

        <div className="security-badges">
          <div className="badge">
            <div className="badge-icon"></div>
            End-to-End Encrypted
          </div>
          <div className="badge">
            <div className="badge-icon"></div>
            Blockchain Secured
          </div>
          <div className="badge">
            <div className="badge-icon"></div>
            Decentralized Storage
          </div>
        </div>
      </div>
    </div>
  );
};

const handleDisconnect = () => {
  localStorage.removeItem("token"); // delete token
  window.location.reload(); // optional: reload to update UI
};
// Wrapper component for better styling of original GetImage
const StyledFilesWrapper = ({ children, selectedAccount }) => {
  return (
    <div className="files-container">
      <div className="original-files-wrapper">{children}</div>

      {selectedAccount && (
        <div className="account-info">
          <p className="connected-account">
            Connected:{" "}
            <span className="account-address">
              {selectedAccount.slice(0, 6)}...{selectedAccount.slice(-4)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [reload, setReload] = useState(false);
  const { web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

  const reloadEffect = () => {
    setReload((prev) => !prev);
  };
  const [isConnected, setIsConnected] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsConnected(!!token);
  }, [reload]);

  return (
    <div className="home-container">
      {/* Header / Navigation */}
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <img src={myImage01} alt="Logo" width="86" />
            </div>
            <h1 className="logo-text">CryptoVault</h1>
          </div>

          <nav className="navigation">
            <a href="#upload" className="nav-link">
              Upload
            </a>
            <a href="#files" className="nav-link">
              My Files
            </a>
            <a href="#account" className="nav-link">
              Account
            </a>
          </nav>

          <div className="header-actions">
            {selectedAccount && (
              <div className="connection-status">
                <div
                  className={`status-indicator ${
                    isConnected ? "connected" : "disconnected"
                  }`}
                ></div>
                <span>{isConnected ? "Connected" : "Disconnected"}</span>
              </div>
            )}
            <div className="relative group">
              {/* Profile Avatar */}
              <div className="profile-dropdown">
                <img
                  src={myImage02}
                  alt="Profile Photo"
                  width="50"
                  className="profile-avatar"
                />

                {/* Dropdown Menu */}
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <Link to="/wallet">
                        <button>Connect Wallet</button>
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleDisconnect}>Disconnect Wallet</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* <div className="hero-badge"> */}
          {/* <img src={myImage} alt="My Photo" width="20"  /> */}
          {/* <span> Web3 Technology</span> */}
          {/* </div> */}

          <h2 className="hero-title">
            Secure Image Storage
            <span className="hero-title-gradient">on Blockchain</span>
          </h2>

          <p className="hero-description">
            Upload, manage, and retrieve your Images securely with blockchain
            technology. Simple, safe, and completely decentralized storage
            solution.
          </p>

          <div className="hero-buttons">
            <a href="#upload" className="btn-primary">
              Get Started →
            </a>
            <button className="btn-secondary">View Demo</button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="feature-cards">
          <div className="feature-card">
            <h3 className="feature-title">End-to-End Encryption</h3>
            <p className="feature-description">
              Your files are encrypted before upload and only you hold the keys.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Decentralized Storage</h3>
            <p className="feature-description">
              Files stored across multiple nodes for maximum reliability.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">
              Optimized for speed with instant access to your files.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="upload-section">
        <div className="section-container">
          <StyledUploadWrapper>
            <UploadImage reloadEffect={reloadEffect} />
          </StyledUploadWrapper>
        </div>
      </section>

      {/* Files Section */}
      <section id="files" className="files-section">
        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">Your Files</h3>
            <p className="section-description">
              Manage and access all your securely stored files
            </p>
          </div>

          <div className="content-card">
            <StyledFilesWrapper selectedAccount={selectedAccount}>
              <GetImage reload={reload} selectedAccount={selectedAccount} />
            </StyledFilesWrapper>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon">🛡️</div>
            <span className="footer-brand">CryptoVault</span>
          </div>

          <div className="footer-text">
            © {new Date().getFullYear()} CryptoVault. Built with Web3 Security.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
