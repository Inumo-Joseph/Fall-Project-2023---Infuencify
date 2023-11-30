import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import React, { useRef } from "react";
import {useAuth} from '../contexts/AuthContext'
import Header from "../Components/Header"
function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const displayNameRef=useRef();
  //using useAuth to get information about credentials, in this case current user
  const {currentUser, updatePassword, updateEmail, updateDisplayName}=useAuth();//getting functions from another file, which require the auth from firebase to work 
  const [error, setError]=useState('')
  const navigate=useNavigate()
  //we have a loading state so that the user doesnt keep clicking the button
  const [loading, setLoading]=useState(false)



  function handleSubmit(e){
    e.preventDefault()//prevents form from refreshing
    //checking below if password is same as whats in db
    if(passwordRef.current.value!== passwordConfirmRef.current.value)
    {
      return setError('Passwords do not match')
    }

    const promises=[]
    //if email is different fom current email, if we changed then we add that promise
    if(emailRef.current.value!==currentUser.email)
    {
        promises.push(updateEmail(emailRef.current.value))
    }

    if(displayNameRef.current.value!==currentUser.displayName)
    {
      promises.push(updateDisplayName(displayNameRef.current.value))
    }
    //password was entered

    if(passwordRef.current.value)
    {
        promises.push(updatePassword(passwordRef.current.value))
    }
//when all prmises finish then will be navigated back to home page
    Promise.all(promises).then(()=>{
        navigate('/')
    }).catch((error)=>{
      console.log("The error is: ", error)
        setError('Failed to update account')
    }).finally(()=>{
        setLoading(false)
    })

  }
  return (
    <>
    <Header></Header>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required 
              defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName || ''}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}  placeholder="Leave blank to keep same"/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef}   placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );

}
export default UpdateProfile