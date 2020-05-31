import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Actions/auth';

const Logout = () => {

    const dispatch = useDispatch();

    dispatch(logout());

    return (
        <div>
            Logout
        </div>
    );
}

export default Logout;
