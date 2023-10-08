import React from 'react'
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

function Login()
{
    const [email, setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        //using axios to send particular data (right parameter) to server
        //3001 can be anything, as for register--> this is the name of the current page
        axios.post('http://localhost:3001/login', {email,password})
        .then(result=>{console.log(result)
            if (result.data ==="Success")
            {
                navigate('/home')
            }
               
            
            //below line makes it so that when you click login after clickig
            // register in register page, it will lead to login page

            // navigate('/home')//if sending data to server is successful, then
            // //user will be navigated to home page
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        {/* on click of the submit button of the form, handleSubmit will run,
        purpose of this function is to send the data to server side or backend */}
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          </form>
          <p>Don't have an account?</p>
          <Link to="/register"
            type="submit"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Register
          </Link>
          
       
      </div>
    </div>
    )
}

export default Login;