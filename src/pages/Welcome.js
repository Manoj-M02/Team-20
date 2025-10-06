import React, { useState } from "react";
import { Link } from "react-router-dom";

// Style objects as you defined
const bodyStyle = {
  margin: 0,
  padding: 0,
  background: "url('library-bg.jpg') no-repeat center center / cover",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
  color: "white",
};

const overlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const welcomeBoxStyle = {
  textAlign: "center",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0px 0px 20px rgba(255,255,255,0.3)",
};

const h1Style = {
  fontSize: "2.5em",
  marginBottom: "10px",
};

const pStyle = {
  fontSize: "1.2em",
  marginBottom: "20px",
};

const buttonsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const btnStyle = {
  textDecoration: "none",
  background: "#ff9800",
  color: "white",
  padding: "12px 25px",
  borderRadius: "8px",
  fontSize: "1.1em",
  transition: "background 0.3s",
  display: "inline-block", // Ensure proper button display
};

const btnHoverStyle = {
  background: "#e68900",
};

const Welcome = () => {
  const [hovered, setHovered] = useState({ login: false, register: false });

  return (
    <div style={bodyStyle}>
      <div style={overlayStyle}>
        <div style={welcomeBoxStyle}>
          <h1 style={h1Style}>📚 Digital Library</h1>
          <p style={pStyle}>
            Welcome! Please log in or register to explore our digital library.
          </p>
          <div style={buttonsStyle}>
            <Link
              to="/login"
              style={{
                ...btnStyle,
                ...(hovered.login ? btnHoverStyle : {}),
              }}
              onMouseEnter={() =>
                setHovered((prev) => ({ ...prev, login: true }))
              }
              onMouseLeave={() =>
                setHovered((prev) => ({ ...prev, login: false }))
              }
            >
              👤 User Login
            </Link>
            <Link
              to="/register"
              style={{
                ...btnStyle,
                ...(hovered.register ? btnHoverStyle : {}),
              }}
              onMouseEnter={() =>
                setHovered((prev) => ({ ...prev, register: true }))
              }
              onMouseLeave={() =>
                setHovered((prev) => ({ ...prev, register: false }))
              }
            >
              👤 User Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
