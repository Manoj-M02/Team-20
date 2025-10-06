// pages/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/auth/send-otp", { email });
      setMessage("OTP sent to your email.");
      localStorage.setItem("resetEmail", email);
      navigate("/verify-otp");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg,#43cea2,#185a9d 90%)",
    },
    form: {
      background: "#fff",
      padding: "38px 32px 28px",
      borderRadius: "18px",
      width: "100%",
      maxWidth: "350px",
      boxShadow:
        "0 8px 32px 0 rgba(52,163,155,.15),0 1.5px 2.5px rgba(24,90,157,.12)",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      marginBottom: "20px",
      color: "#185a9d",
      letterSpacing: "1.3px",
      fontWeight: "700",
      fontSize: "1.7rem",
      textAlign: "center",
    },
    input: {
      background: "#f4f8fb",
      border: "1.2px solid #dde6ec",
      borderRadius: "12px",
      padding: "13px 15px",
      fontSize: "1rem",
      marginBottom: "15px",
      outline: "none",
      transition: "border 0.2s",
    },
    button: {
      background: "linear-gradient(90deg,#43cea2 35%,#185a9d 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      padding: "12px",
      fontWeight: "700",
      fontSize: "1.08rem",
      letterSpacing: "0.2px",
      cursor: "pointer",
      boxShadow: "0 3px 20px rgba(24,90,157,.16)",
      marginBottom: "14px",
      transition: "background 0.25s, transform 0.16s",
    },
    buttonHover: {
      background: "linear-gradient(90deg,#185a9d 0%,#43cea2 90%)",
      transform: "scale(1.045)",
    },
    msg: {
      fontSize: "1.01rem",
      color: "#b80d57",
      textAlign: "center",
      minHeight: "25px",
      marginTop: "2px",
    },
  };

  const [btnHover, setBtnHover] = useState(false);


  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSendOTP}>
        <h2 style={styles.title}>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <button
          type="submit"
          style={
            btnHover
              ? { ...styles.button, ...styles.buttonHover }
              : styles.button
          }
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Send OTP
        </button>
        <p style={styles.msg}>{message}</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
