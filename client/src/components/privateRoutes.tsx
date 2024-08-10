import { Navigate } from 'react-router-dom';
import PrivateRouteProps from '../types/privateRouteProps';

function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;