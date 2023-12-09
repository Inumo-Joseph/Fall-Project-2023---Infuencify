import React from "react";
import { useEffect, useState } from "react";
import { auth, firestore } from "../Config/firebase-config";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import UpdateProfile from "./updateProfile";
import HeaderTrainer from "./Header-Trainer";
import Uploader from './Uploader'

//Taking changeColor as a parameter here. 'changeColor' is coming from the app.js file. Remember that 'changeColor' is a function that is equivalent to 'changeBackgroundColor' function.
function UserSettings({ changeColor, backgroundColor }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
const navigate=useNavigate()

  async function handleLogout() {
    setError('')
    try{
      await logout()
      navigate('/login')
    } catch (error){
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
          <strong> Email: </strong> {currentUser.email}
          <strong> Display Name: </strong> {currentUser.displayName}
          {/* <strong>Member Since: </strong> {currentUser.memberSince} */}
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





    