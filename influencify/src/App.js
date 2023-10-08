import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login'
import Home from './Home'
import Usersettings from './User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* path basically makes it so that when you do the url and at end
        // when you have /register, it will lead to register page, which is
        //denoted by the Signup file. From now on, when you do '/register' 
        relating to axios or useNavigate, it will refer to the Signup page */}
        <Route path="/register" element={<Signup />}>

        </Route>

        <Route path="/login" element={<Login />}>

        </Route>
        <Route path="/home"  element={<Home />}> 
        
        </Route>
        <Route path="/user" element={<Usersettings />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
