import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { auth } from './Config/firebase-config';
import Login from './Routes/Login';
function App() {
  return (
        <Login />
  );
}

export default App;
