 import React from "react";
import useState from 'react';
import useNavigate from 'react-router-dom';
import {Typography} from "@mui/material";
import { getAuth, onStateChanged} from "firebase/auth";
import {Menu, AccountCircle, Logout, Home} from "@mui/icons-material"


function HeaderTrainer() {

  const auth = getAuth();
    let name="";
    name=auth.currentUser;

  return ( 

<nav className="navbar navbar-expand-lg bg-dark sticky-top Header">
  <div className="container-fluid">

    <div className = "container d-flex">

    <a className="navbar-brand" href="../Home">INFUENCIFY</a>

        <form className= "d-flex"  role="search">
        <input className="form-control " type="search" placeholder="Search" aria-label="Search"></input>
        </form>

       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
       <span className="material-symbols-outlined">
       <Menu></Menu>
       </span>
      </button>
      </div>

    
    <div className="container-fluid collapse navbar-collapse " id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="../Home"><Home></Home> Home </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"> <AccountCircle></AccountCircle> {name}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><Logout></Logout></a>
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

