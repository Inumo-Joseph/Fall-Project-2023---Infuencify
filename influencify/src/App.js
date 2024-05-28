
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useState,  useEffect} from"react";
//import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route, Switch, Navigate, BrowserRouter} from "react-router-dom";
import LoginOfficial from './Components_TRUE/Login.jsx'
import Home from './Routes/Home.js'
import Video from './Routes/Video.js'
import UserSettings from "./Components_TRUE/idk.jsx";
import Main from "./Components_TRUE/Main.jsx";
import './Styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Chatroom from "./Routes/Chatroom.js";
import PrivateRoute from "./Components_TRUE/PrivateRoute.js";
import ForgotPassword from "./Components_TRUE/ForgotPassword.js";
import UpdateProfile from "./Components_TRUE/updateProfile.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import Signup from "./Components_TRUE/Signup.jsx";
import User from "./Routes/User.js";
import DataAnalytics from "./Routes/DataAnalytics.js";


function App() {
  // MAIN IDEA of changing background color across all pages simultaneously based on color chosen at the user page: 
  // User page makes a call to the 'changeBackgroundColor' through the function 'changeColor', which is the same function as 'changeBackgroundColor'.
  // There is also a variable, 'newColor', which stores the color of the background that gets passed back with the call. Then the function,
  // 'changeBackgroundColor' runs and is supposed to set the 'backgroundColor' variable to the color stored in 'newColor'. Now in the home page,
  //  the background color of the page is set to 'backgroundColor'. This is my thought process of how to change the background color of pages
  // based on the color chosen at the user page. More details follow with the below comments.

  //below code creates a state called backgroundColor. This variable would be responsible for storing the color of the background.
  const [backgroundColor, setBackgroundColor]=useState("white");
  //changeBackgroundColor takes in 'newColor' as parameter which is the color of the background.
  const changeBackgroundColor=(newColor)=>{
    console.log("changing background color to: ", newColor);
   
    //setBackgroundColor is used to change the 'backgroundColor' to store the new color--> 'newColor'
    setBackgroundColor(newColor);
    console.log("newColor color is: ", newColor);
  };
 
  return (
           <div className="o">
          <AuthProvider>
          <BrowserRouter>
      <Routes>
       
        {/* 
         <Route path="/register" element={<Signup />}>
           
         </Route>
        */}
        <Route
            path="/update-profile"
            element={<PrivateRoute><UpdateProfile /></PrivateRoute>}
          ></Route>
          {/* <Route path='/aichat' element={<AiTalk/>}></Route> */}
           <Route path="/register" element={<Signup />}></Route>
           <Route path="/login" element={<LoginOfficial />}></Route>
           {/* <Route path="/dataanalytics" element={<DataAnalytics />}></Route> */}
           <Route path="/forgot-password" element={<ForgotPassword />}></Route>
           <Route
            exact
            path="/"
            element={
              <PrivateRoute><UserSettings /></PrivateRoute>
            }>
          </Route>

      
        
        <Route path="/Home"  element={<PrivateRoute><Home/></PrivateRoute>}> 
       
        </Route>
       
        
        <Route path="/user" Component={User}> 
        
        </Route>
        
        <Route path="/chat" Component={Chatroom}>

        </Route>

        <Route path="/Video/:videoId" element={<Video key={window.location.pathname}></Video>}>
        
        </Route>


        </Routes>

        


        <div root="App">
        
        </div>
        </BrowserRouter>
            </AuthProvider>
            </div>

  );
}

export default App;