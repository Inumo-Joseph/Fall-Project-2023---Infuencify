import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components_TRUE/Signup.jsx";
import LoginOfficial from "./Components_TRUE/Login.jsx";
import Home from "./Home.js";
import UserSettings from "./Components_TRUE/idk.jsx";
import Auth from "./Auth.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import PrivateRoute from "./Components_TRUE/PrivateRoute.js";
import ForgotPassword from "./Components_TRUE/ForgotPassword.js";
import UpdateProfile from "./Components_TRUE/updateProfile.js";
// import AiTalk from "./Components_TRUE/AiTalk.jsx"; // Import AiTalk component
import AiChat from "./Components_TRUE/AiChat.jsx";
function AltApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Other routes */}
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<LoginOfficial />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route exact path="/" element={<PrivateRoute><UserSettings /></PrivateRoute>} />
          <Route path="/aichat" element={<PrivateRoute><AiTalk /></PrivateRoute>} />
        </Routes>
       
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AltApp;
