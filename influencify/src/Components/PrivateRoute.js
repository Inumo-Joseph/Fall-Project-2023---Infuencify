import React from 'react'
import {useAuth} from "../contexts/AuthContext"
import {Navigate} from "react-router-dom"
function PrivateRoute({children})
{
    const {currentUser}=useAuth();

    return currentUser ? children: <Navigate to ="/login"/>;
}

export default PrivateRoute;