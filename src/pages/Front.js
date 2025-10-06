import React, { useState } from "react";
import { Link } from "react-router-dom";

// Root body style
const bodyStyle = {
  margin: 0,
  padding: 0,
  background: "linear-gradient(to right, #00008b, #00f2fe), url('lib.jpeg')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100vh",
  color: "#fff",
  textAlign: "center",
  minHeight: "100vh",
};

// Component container style
const containerStyle = {
  padding: "100px 20px",
};

// Heading style (h2, matching your CSS)
const h2Style = {
  fontSize: "48px",
  marginBottom: "20px",
};

// Paragraph style
const pStyle = {
  fontSize: "20px",
  marginBottom: "40px",
};

// Button style
const btnStyle = {
  padding: "12px 25px",
  fontSize: "18px",
  backgroundColor: "#fff",
  color: "#0077cc",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "20px",
};

const btnHoverStyle = {
  backgroundColor: "#e0f0ff",
};

const footerStyle = {
  position: "fixed",
  bottom: "10px",
  width: "100%",
  color: "#ffffffaa",
  fontSize: "14px",
};

const Front = () => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>📚 Welcome to the Digital Library</h2>
          <p style={pStyle}>
            Your gateway to endless knowledge and imagination.
          </p>
          <Link
            to="/home"
            style={hover ? { ...btnStyle, ...btnHoverStyle } : btnStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Explore Books
          </Link>
        </div>
        <div style={footerStyle}>
          &copy; 2025 Digital Library | All Rights Reserved
        </div>
      </div>
    </>
  );
};

export default Front;
