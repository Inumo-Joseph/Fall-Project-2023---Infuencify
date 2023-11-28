import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Home";
import UserSettings from "./Components/User";
import Auth from "./Auth";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/updateProfile";

function AltApp() {
  
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* path basically makes it so that when you do the url and at end
        // when you have /register, it will lead to register page, which is
        //denoted by the Signup file. From now on, when you do '/register' 
        relating to axios or useNavigate, it will refer to the Signup page */}


        {/**/ }
          <Route
            path="/update-profile"
            element={<PrivateRoute><UpdateProfile /></PrivateRoute>}
          ></Route>
          <Route path="/register" element={<Signup />}></Route>

          <Route path="/login" element={<Login />}></Route>
          {/* for the home page, we set the backgroundColor of the page to whatever color is stored in 'backgroundColor' */}
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/home"
            element={<Home/>}
          ></Route>
          {/* Since the user page is going to be responsible for all settings, including changing the background color of the pages, we use a different format
        as comapred to the home page above. We start by setting a variable called changeColor equal to the change BackgroundColor function. This basically means
        that changeColor and changeBackgroundColor is identical, but 'changeColor' is a property that's going to be passed into the User.jsx. */}
          <Route
            exact
            path="/"
            element={
              <PrivateRoute><UserSettings /></PrivateRoute>
            }>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AltApp;
