
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route, Switch, Navigate} from "react-router-dom";
import LoginOfficial from './Components_TRUE/Login'
import Home from './Routes/Home'
import UserSettings from "./Components_TRUE/idk";
import Main from "./Components_TRUE/Main";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth } from './Config/firebase-config';
import React, { useState, useEffect } from "react";
import Chatroom from "./Routes/Chatroom";
import PrivateRoute from "./Components_TRUE/PrivateRoute";
import ForgotPassword from "./Components_TRUE/ForgotPassword";
import UpdateProfile from "./Components_TRUE/updateProfile";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./Components_TRUE/Signup";
import { useAuth } from './contexts/AuthContext'



function App() {
  // MAIN IDEA of changing background color across all pages simultaneously based on color chosen at the user page: 
  // User page makes a call to the 'changeBackgroundColor' through the function 'changeColor', which is the same function as 'changeBackgroundColor'.
  // There is also a variable, 'newColor', which stores the color of the background that gets passed back with the call. Then the function,
  // 'changeBackgroundColor' runs and is supposed to set the 'backgroundColor' variable to the color stored in 'newColor'. Now in the home page,
  //  the background color of the page is set to 'backgroundColor'. This is my thought process of how to change the background color of pages
  // based on the color chosen at the user page. More details follow with the below comments.

  //below code creates a state called backgroundColor. This variable would be responsible for storing the color of the background.
  

  return ( 
    <AuthProvider>
    <Router>
      <Routes>
        /* path basically makes it so that when you do the url and at end
        // when you have /register, it will lead to register page, which is
        //denoted by the Signup file. From now on, when you do '/register' 
        relating to axios or useNavigate, it will refer to the Signup page */
        
        {/* 
         <Route path="/register" element={<Signup />}>
           
         </Route>
        */}
        <Route
            path="/update-profile"
            element={<PrivateRoute><UpdateProfile /></PrivateRoute>}
          ></Route>
           <Route path="/register" element={<Signup />}></Route>
           <Route path="/login" element={<LoginOfficial />}></Route>
           <Route path="/forgot-password" element={<ForgotPassword />}></Route>
           <Route
            exact
            path="/"
            element={
              <PrivateRoute><UserSettings /></PrivateRoute>
            }>
          </Route>

       
        /* for the home page, we set the backgroundColor of the page to whatever color is stored in 'backgroundColor'  */
        <Route path="/Home"  Component={Main }> 
        
        </Route>
        /* Since the user page is going to be responsible for all settings, including changing the background color of the pages, we use a different format
        as comapred to the home page above. We start by setting a variable called changeColor equal to the change BackgroundColor function. This basically means
        that changeColor and changeBackgroundColor is identical, but 'changeColor' is a property that's going to be passed into the User.jsx. */
        
        <Route path="/user" Component={UserSettings}> 
        
        </Route>
        
        <Route path="/chat" Component={Chatroom}/>
        </Routes>

        <div root="App">
        
        </div>
    </Router>
    </AuthProvider>
   

  );
}

export default App;