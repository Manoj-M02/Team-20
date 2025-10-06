import React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Welcome from "./pages/Welcome"
import Register from "./pages/HomeRegister";
import Login from "./pages/Login";
import Front from "./pages/Front";
import Home from "./pages/Home";
import { useAuth } from "./component/CointextAuth";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";

const App = () => {
  const PrivateRoute = ({ children }) => {
    const { token } = useAuth();

    return token ? children : <Navigate to="/login" />;
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/front" element={<Front />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
