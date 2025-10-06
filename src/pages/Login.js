import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../component/CointextAuth";
import { useNavigate, Link } from "react-router-dom";

// Style objects
const bodyStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(-45deg, #ff6ec4, #7873f5, #4ADEDE, #fbc2eb)",
  backgroundSize: "400% 400%",
  animation: "gradientBG 12s ease infinite",
  fontFamily: "'Poppins', sans-serif",
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

const loginBoxStyle = {
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
  color: "white",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(45deg, #ff6ec4, #7873f5)",
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

const registerLinkStyle = {
  marginTop: "15px",
  display: "block",
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
};

const registerLinkHoverStyle = {
  textDecoration: "underline",
};

const forgotTextStyle = {
  fontSize: "13px",
  marginTop: "10px",
  color: "#fff",
};

const forgotLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "14px",
};

const forgotLinkHoverStyle = {
  textDecoration: "underline",
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const [input, setInput] = useState({ email: "", password: "" });
  const [buttonHover, setButtonHover] = useState(false);
  const [registerHover, setRegisterHover] = useState(false);
  const [forgotHover, setForgotHover] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7000/api/auth/login",
        input
      );
      login(res.data.token);
      navigate("/front");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{keyframeStyle}</style>
      <div style={bodyStyle}>
        <div style={loginBoxStyle}>
          <h2 style={h2Style}>📖 Digital Library Login</h2>
          <form className="login-form" onSubmit={handleSubmit} required>
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
                type="password"
                autoComplete="current-password"
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
              Login
            </button>
            <p className="register-text">
              New user?{" "}
              <Link
                to="/register"
                style={
                  registerHover
                    ? { ...registerLinkStyle, ...registerLinkHoverStyle }
                    : registerLinkStyle
                }
                onMouseEnter={() => setRegisterHover(true)}
                onMouseLeave={() => setRegisterHover(false)}
              >
                Register here
              </Link>
            </p>
            <p style={forgotTextStyle}>
              Forgot 🔒 Password?{" "}
              <Link
                to="/forgot-password"
                style={
                  forgotHover
                    ? { ...forgotLinkStyle, ...forgotLinkHoverStyle }
                    : forgotLinkStyle
                }
                onMouseEnter={() => setForgotHover(true)}
                onMouseLeave={() => setForgotHover(false)}
              >
                Reset Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
