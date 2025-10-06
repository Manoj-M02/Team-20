import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Style objects
const bodyStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(-45deg, #4ADEDE, #ff6ec4, #fbc2eb, #7873f5)",
  backgroundSize: "400% 400%",
  animation: "gradientBG 12s ease infinite",
  fontFamily: "'Poppins', Arial, sans-serif",
  margin: 0,
  padding: 0,
};

const keyframeStyle = `
  @keyframes gradientBG {
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
  }
`;

const registerBoxStyle = {
  width: "350px",
  padding: "40px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(15px)",
  borderRadius: "15px",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  textAlign: "center",
};

const h2Style = {
  color: "white",
  marginBottom: "20px",
  textShadow: "0 0 10px rgba(255,255,255,0.7)",
};

const inputBoxStyle = {
  margin: "15px 0",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.2)",
  color: "rgb(236,234,234)",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(45deg, #4ADEDE, #ff6ec4)",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  transition: "0.3s",
};

const buttonHoverStyle = {
  transform: "scale(1.05)",
  boxShadow: "0 0 15px rgba(255,255,255,0.6)",
};

const loginLinkStyle = {
  marginTop: "15px",
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
};

const loginLinkHoverStyle = {
  textDecoration: "underline",
};

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonHover, setButtonHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("password", formData.password);

    try {
      await axios.post("http://localhost:7000/api/auth/register", data);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.log("error", err);
      alert("Error: " + err.response?.data?.message);
    }
  };

  return (
    <>
      {/* Add keyframes for animated background */}
      <style>{keyframeStyle}</style>
      <div style={bodyStyle}>
        <div style={registerBoxStyle}>
          <h2 style={h2Style}>📖 Digital Library Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div style={inputBoxStyle}>
              <input
                style={inputStyle}
                name="username"
                autoComplete="username"
                placeholder="👤 User Name"
                onChange={handleChange}
                required
              />
            </div>
            <div style={inputBoxStyle}>
              <input
                style={inputStyle}
                name="email"
                autoComplete="email"
                placeholder="📧 Email"
                onChange={handleChange}
                required
              />
            </div>
            <div style={inputBoxStyle}>
              <input
                style={inputStyle}
                name="password"
                autoComplete="new-password"
                type="password"
                placeholder="🔒 Password"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              style={
                buttonHover
                  ? { ...buttonStyle, ...buttonHoverStyle }
                  : buttonStyle
              }
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              Register
            </button>
            <p className="Login-text">
              Already have an account?{" "}
              <Link
                to="/login"
                style={
                  loginHover
                    ? { ...loginLinkStyle, ...loginLinkHoverStyle }
                    : loginLinkStyle
                }
                onMouseEnter={() => setLoginHover(true)}
                onMouseLeave={() => setLoginHover(false)}
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
