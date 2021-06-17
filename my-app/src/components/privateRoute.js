import React, { useContext }  from "react"
import { AuthContext } from "../context/authContext";
import Login from '../pages/login';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const authService = useContext(AuthContext);
    if(authService.isLoggedIn()) {
        return <Component {...rest} user={authService.getUser()}/>
    } else {
        return <Login authService={authService} location={location}/>
    }
}

export default PrivateRoute;