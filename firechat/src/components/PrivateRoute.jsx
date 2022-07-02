import React,{useContext} from 'react';
import {AuthContext} from '../context/auth';
import {Navigate,Outlet} from 'react-router-dom';

function PrivateRoute() {
    const {user}= useContext(AuthContext);
    return (
        user? <Outlet/> : <Navigate to='/Login'/>
    )
}

export default PrivateRoute;
