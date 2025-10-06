// pages/VerifyOTP.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const email = localStorage.getItem("resetEmail");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMsg("Password reset successful!");
      localStorage.removeItem("resetEmail");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.error || "Failed to reset password");
    }
  };
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #7f53ac, #657ced 90%)",
    },
    form: {
      background: "#fff",
      padding: "42px 36px 36px",
      borderRadius: "20px",
      width: "100%",
      maxWidth: "350px",
      boxShadow:
        "0 8px 40px 0 rgba(80,86,207,.11), 0 1.5px 2.5px rgba(80,86,207,.18)",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      marginBottom: "18px",
      color: "#432d85",
      letterSpacing: "1px",
      fontWeight: "700",
      fontSize: "1.7rem",
      textAlign: "center",
    },
    input: {
      background: "#f7f8fd",
      border: "1.2px solid #e4e5f1",
      borderRadius: "12px",
      padding: "13px 15px",
      fontSize: "1rem",
      marginBottom: "14px",
      outline: "none",
      transition: "border 0.2s",
      boxShadow: "none",
    },
    button: {
      background: "linear-gradient(90deg,#7f53ac 20%,#657ced 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      padding: "12px",
      fontWeight: "600",
      fontSize: "1.07rem",
      letterSpacing: "0.5px",
      cursor: "pointer",
      boxShadow: "0 4px 14px rgba(101,124,237,.13)",
      marginBottom: "10px",
      transition: "background 0.25s, transform 0.15s",
    },
    buttonHover: {
      background: "linear-gradient(90deg,#657ced 0%,#7f53ac 80%)",
      transform: "scale(1.045)",
    },
    msg: {
      fontSize: "0.98rem",
      color: "#da2757",
      textAlign: "center",
      marginTop: "6px",
      minHeight: "24px",
    },
  };
  const [btnHover, setBtnHover] = useState(false);



  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleResetPassword}>
        <h2 style={styles.title}>Verify OTP & Reset</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
          Reset Password
        </button>
        <p style={styles.msg}>{msg}</p>
      </form>
    </div>
  );
};

export default VerifyOTP;
