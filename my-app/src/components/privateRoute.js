import React  from "react"
import { withAuthService } from "./withAuthService";
import Login from '../pages/login';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const authService = rest.authService;
    if(authService.isLoggedIn()) {
        return <Component {...rest} user={authService.getUser()}/>
    } else {
        return <Login authService={authService} location={location}/>
    }
}

export default withAuthService(PrivateRoute);