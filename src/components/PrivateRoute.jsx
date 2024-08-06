import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/selectors';

const PrivateRoute = ({ redirectTo = '/', children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;