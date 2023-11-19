
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from './components/Main';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { auth } from './Config/firebase-config';
import Login from './Routes/Login';
import Chatroom from "./Routes/Chatroom";
import Video from "./Routes/Video";



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
    <Router>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/chat" Component={Chatroom}/>
        <Route path="/video" Component={Video}/>
        <Route path="/main" Component={Main}/>
      </Routes>
    </Router>
  );
}

export default App;