import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, AccountCircle, Logout, Home, Forum } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext.js';
import '../Styles/HeaderTrainer.css';
import {Link} from 'react-router-dom'
function HeaderTrainer() {
  const { currentUser, logout } = useAuth(); //uses the current login information of user
  const name = currentUser.displayName; //displays there name

  const [error, setError] = useState(''); // error and navigate initialized
  const navigate = useNavigate();

  async function handleLogout() {
    //asunc fucntions logs out user
    setError(''); // set error to an empty string
    try {
      await logout(); // logout functionf from useAtuh called
      console.log('LOGGING OUT');
      navigate('/Home');
    } catch (error) {
      console.log('the error is: ', { error });
      setError('Failed to log out');
    }
  }

  return (
    //Bootstrap was primarily used to create header component
    //Headcomp css used to style color
    <nav className="navbar navbar-expand-lg bg-dark sticky-top Headcomp">
      <div className="container-fluid">
        {/* Brand logo Navigate to Home page*/}
        <div
          className="d-flex container-fluid justify-content-between "
          style={{}}
        >
          <a className="navbar-brand p-0 me-0 me-lg-2" href="../Home">
            INFUENCIFY
          </a>

          {/*Search Bar component not working */}
          <form className="d-flex" role="search">
            <input
              className="form-control "
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
          </form>

          {/*Toggler that collapses with page */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined">
              <Menu></Menu>
            </span>
          </button>
        </div>

        {/*These are all the items that will be collapsed on the toggler */}
        <div
          className="container collapse navbar-collapse"
          style={{ marginLeft: '20px' }}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              {/*  button that takes you home*/}
              <a className="nav-link active" aria-current="page" href="../Home">
                <Home></Home> Home{' '}
              </a>
            </li>
            <li className="nav-item">
              {/*  Navigates to your user page*/}
              <a className="nav-link" href="../User">
                <AccountCircle></AccountCircle> {name}
              </a>
            </li>
            {/*  Navigates to hatrooms*/}
            <li className="nav-item">
              <a className="nav-link" href="../Chat">
                <Forum></Forum> Chat-Rooms
              </a>
            </li>
            

            <li className="nav-item">
              <a className="nav-link" href="/login">
                {/*  calls handelogout function to log user out*/}
                <Logout onClick={handleLogout}></Logout> Logout
              </a>
            </li>
            <li className="nav-item"></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderTrainer;
