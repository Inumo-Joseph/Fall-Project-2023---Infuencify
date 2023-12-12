import {React, useReact, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Typography} from "@mui/material";
import { getAuth, onStateChanged} from "firebase/auth";
import {Menu, AccountCircle, Logout, Home, Forum, LibraryAdd } from "@mui/icons-material"
import { useAuth } from "../contexts/AuthContext";
import {Link} from "react-router-dom";

function HeaderTrainer() {

  const { currentUser, logout } = useAuth();
  const name =currentUser.displayName;
  const [error, setError] = useState("");
  const navigate=useNavigate()
  
  async function handleLogout() {
    setError('')
    try{
      await logout()
      console.log("LOGGING OUT");
      navigate('/Home')
    
    } catch (error){
      console.log("the error is: ", {error})
      setError('Failed to log out')
    }
  
  }

  return ( 

<nav className="navbar navbar-expand-lg bg-dark sticky-top Header">
  <div className="container-fluid">


        <div className="d-flex container-fluid justify-content-between " style={{backgroundColor: ""}}>
        <a className="navbar-brand p-0 me-0 me-lg-2" href="../Home">INFUENCIFY</a>


        <form className= "d-flex"  role="search" >
        <input className="form-control " type="search" placeholder="Search" aria-label="Search"></input>
        </form>

        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
       <span className="material-symbols-outlined">
       <Menu></Menu>
       </span>
      </button>


      </div>

    
      <div className="container collapse navbar-collapse " style={{marginLeft:""}} id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="../Home"><Home></Home> Home </a>
        </li>
        <li className="nav-item">
          
          <a className="nav-link" href="../User"> 
          <AccountCircle></AccountCircle> {name}</a>

        </li>

        <li className="nav-item">
          <a className="nav-link" href="../Chat">
            <Forum></Forum> Channels

          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="">
            <Logout onClick={handleLogout}></Logout> Logout
            </a >
        </li>
        <li className="nav-item">
        </li>

       
      </ul>

      
    </div>
  

   

  </div>
</nav>

    
  );

}

export default HeaderTrainer;

