import "./App.css";
import React from 'react'
import {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Login from './Login'
import Home from './Home'
import UserSettings from './User'

function AltApp()
{
// MAIN IDEA of changing background color across all pages simultaneously based on color chosen at the user page: 
  // User page makes a call to the 'changeBackgroundColor' through the function 'changeColor', which is the same function as 'changeBackgroundColor'.
  // There is also a variable, 'newColor', which stores the color of the background that gets passed back with the call. Then the function,
  // 'changeBackgroundColor' runs and is supposed to set the 'backgroundColor' variable to the color stored in 'newColor'. Now in the home page,
  //  the background color of the page is set to 'backgroundColor'. This is my thought process of how to change the background color of pages
  // based on the color chosen at the user page. More details follow with the below comments.

  let pageBackgroundColor;
  //below code creates a state called backgroundColor. This variable would be responsible for storing the color of the background.
  const [backgroundColor, setBackgroundColor]=useState("white");
  // const [otherPageBackground, setOtherPageBackground]=useState("")
  //changeBackgroundColor takes in 'newColor' as parameter which is the color of the background.
  const changeBackgroundColor=(newColor)=>{
    console.log("changing background color to: ", newColor);
   
    //setBackgroundColor is used to change the 'backgroundColor' to store the new color--> 'newColor'
    setBackgroundColor(newColor);
    pageBackgroundColor=newColor;
    console.log("The value of pageBackgroundColor is: "+ pageBackgroundColor);
    console.log("newColor color is: ", newColor);
    console.log("The value of backgroundColor is:" + backgroundColor);
  };
 
  return (
    <BrowserRouter>
      <Routes>
        {/* path basically makes it so that when you do the url and at end
        // when you have /register, it will lead to register page, which is
        //denoted by the Signup file. From now on, when you do '/register' 
        relating to axios or useNavigate, it will refer to the Signup page */}
        
        <Route path="/register" element={<Signup />}>

        </Route>
        


        <Route path="/login" element={<Login />}>

        </Route>
        {/* for the home page, we set the backgroundColor of the page to whatever color is stored in 'backgroundColor' */}

        <Route path="/home"  element={<Home backgroundColor={backgroundColor}/>}> 
        
        </Route>
        {/* Since the user page is going to be responsible for all settings, including changing the background color of the pages, we use a different format
        as comapred to the home page above. We start by setting a variable called changeColor equal to the change BackgroundColor function. This basically means
        that changeColor and changeBackgroundColor is identical, but 'changeColor' is a property that's going to be passed into the User.jsx. */}
        <Route path="/user" element={<UserSettings backgroundColor={backgroundColor} changeColor={changeBackgroundColor}/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AltApp;