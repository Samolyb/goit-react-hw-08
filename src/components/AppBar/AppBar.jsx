import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';
import css from '../AppBar/AppBar.module.css';

const AppBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className={css.header}>
            <nav>
                <Link className={css.home} to="/">Home</Link>
                {isLoggedIn && <Link to="/contacts">Contacts</Link>}
            </nav>
            <div>
                {isLoggedIn ? (
                    <>
                        <span>Welcome, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className={css.register} to="/register">Register</Link>
                        <Link className={css.login} to="/login">Login</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default AppBar;