import React from "react";
import useState from 'react';
import useNavigate from 'react-router-dom';

function Footer() {


  return ( 
    <div className="container">

    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <span className=" p-0 me-0 me-lg-2" href="./Home">INFUENCIFY
      </span>
      <span className="mb-3 mb-md-0 text-body-secondary">© 2023 CTP</span>

      
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3">
        <a className="text-body-secondary" href="https://github.com/Inumo-Joseph/Fall-Project-2023---Infuencify">Github</a>  
        </li>
      

       </ul>
           
       
        
    </footer>
    </div>
  );

}

export default Footer;


