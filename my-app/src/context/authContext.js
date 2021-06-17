import React from 'react';
import authSvc from "../services/authService";

export const AuthContext = React.createContext({
    isLoggedIn: () => false,
    getUser: () => {},
    login: () => {},
    logout: () => {}
});

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({children}) => {
    const svc = {
        isLoggedIn:authSvc.isLoggedIn,
        getUser:authSvc.getUser,
        login:authSvc.login,
        logout:authSvc.logout
    }

    return (
        <AuthContext.Provider value={svc}>
            {children}
        </AuthContext.Provider>
    )
}
