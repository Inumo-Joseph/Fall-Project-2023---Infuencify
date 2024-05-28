import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App.js';
import Chatroom from './Routes/Chatroom.js';
import reportWebVitals from './reportWebVitals.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="Header">
    
  
  <React.StrictMode>
    <App/>
  {/*<Chatroom/> */}
  </React.StrictMode>
  </div>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
