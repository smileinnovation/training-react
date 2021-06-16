import authSvc from '../services/authService';

export const withAuthService = (Component) => {
    return (props) => {
        return <Component {...props} authService={authSvc} />
    }
};