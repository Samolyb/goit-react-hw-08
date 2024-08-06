import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import PrivateRoute from '../../components/PrivateRoute';
import RestrictedRoute from '../../components/RestrictedRoute';
import Layout from '../Layout/Layout';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'));

const App = () => {
    const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return isRefreshing ? (
        <b>Refreshing user...</b>
    ) : (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="login"
                        element={
                            <RestrictedRoute redirectTo="/contacts">
                                <LoginPage />
                            </RestrictedRoute>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <RestrictedRoute redirectTo="/contacts">
                                <RegistrationPage />
                            </RestrictedRoute>
                        }
                    />
                    <Route
                        path="contacts"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <ContactsPage />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;