import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import React, { useRef } from "react";
import {useAuth} from '../contexts/AuthContext'

function Signup() {
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const displayNameRef=useRef();
  const {signup}=useAuth();
  const [error, setError]=useState('')
  const navigate=useNavigate()
  //we have a loading state so that the user doesnt keep clicking the button
  const [loading, setLoading]=useState(false)
  async function handleSubmit(e){
    e.preventDefault()//prevents form from refreshing
    //checking below if password is same as whats in db
    if(passwordRef.current.value!== passwordConfirmRef.current.value)
    {
      return setError('Passwords do not match')
    }
    try{

    setError('')// set error back to empty string so that we dont have error
    setLoading(true)
    await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value)//if signup does not work then error will be outputted
    navigate('/') 
    //using await, we wait for signup to finish
  } catch (error) {
    setError(error.message)
    }
    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="username" ref={displayNameRef} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}


export default Signup;
