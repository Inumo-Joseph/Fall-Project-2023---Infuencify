import React from "react";
import { useEffect, useState } from "react";
import { auth, firestore } from "../Config/firebase-config.js";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import UpdateProfile from "./updateProfile.js";
import HeaderTrainer from "./Header-Trainer.jsx";
import Uploader from './Uploader.jsx'

//Taking changeColor as a parameter here. 'changeColor' is coming from the app.js file. Remember that 'changeColor' is a function that is equivalent to 'changeBackgroundColor' function.
function UserSettings() {
  const [error, setError] = useState("");// state is used to display any error 
  const { currentUser, logout } = useAuth();// referencing auth so that we can access the current user and also logout. These
  // are functionalities of firebase. We are also referencing the logout function from AuthContext file by using use Auth.
const navigate=useNavigate()// will be used to automatially switch pages once user logs out

  async function handleLogout() {
    setError('')//setting error to empty string
    try{
      await logout()
      navigate('/login')//once user logs out, the page switches to the login page
    } catch (error){//in case user cant log out, error message will be displayed
      console.log("the error is: ", {error})
      setError('Failed to log out')
    }
  }

  return (
    <div>
      <HeaderTrainer></HeaderTrainer>
      <Uploader></Uploader>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* Using  currentUser to access the email and display name of the current user and show it*/}
          <strong> Email: </strong> {currentUser.email}
          <strong> Display Name: </strong> {currentUser.displayName}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
export default UserSettings;





    