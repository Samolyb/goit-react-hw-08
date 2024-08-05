import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from '../UserMenu/UserMenu.module.css';


const UserMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <div>
            <p className={css.username}>Welcome, {user.name}</p>
            <button className={css.button} onClick={() => dispatch(logout())}>Logout</button>
        </div>
    );
};

export default UserMenu;