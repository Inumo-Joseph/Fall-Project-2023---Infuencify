import React from "react";
import useState from 'react';
import useNavigate from 'react-router-dom';

function Header() {

    let name="";
    name="USER NAME";

  return ( 
    <nav className="navbar navbar-expand-lg fixedtop navbar-scroll navbar-dark bg-primary">
        <div className="container-fluid">         
                <a className="navbar-brand">INFLUENCIFY  </a>  
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon">
    
                  </span >     
                          
                  </button>
                  
                  <div className="container d-flex justify-content-between" >
                   <form className="navbar-search">
                    <input type="search" className ="form-control me-5 searchbar" placeholder="Search">
                     </input>
                    </form>
                     </div>

                  <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                        <li className="nav-item active">
                        <a className="nav-link " href="index.html">
                            HOME
                        </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link " href="" id="navbarDropdown" data-bs-toggle= "dropdown" aria-expanded="false">
                            PROFILE
                            </a>
                                                        
                        </li> 

                        <li className="nav-item active">
                            <a className="nav-link" href="">
                                CHANNEL
                            </a>                            
                        </li> 
                        <li className="nav-item active">
                            <div className=" container">
                            <span>
                            <a>
                               {name}
                            </a> 
                            </span>
                            </div>
                                                       
                        </li> 
                    </ul>
                 </div> 
                   
        </div>
        
    </nav>
    
  );

}
export default Header