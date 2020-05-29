import React, { useState, useEffect } from 'react';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import Div100vh from 'react-div-100vh';
import Drawer from '../../Components/Drawer/Drawer';
import Routes from '../Routes/Routes';

const useStyles = makeStyles(theme => ({
    root: {
        // overflowY: 'auto',
        // paddingBottom: '5rem'
    }
}));

const Main = () => {

    const history = useHistory();

    //main contains components after the user has logged in

    const classes = useStyles();

    //bottom navbar
    const [bottomNavbar, setBottomNavbar] = useState('');

    useEffect(() => {
        if (bottomNavbar === 'home') {
            history.push('/home');
        }
        else if (bottomNavbar === 'messages') {
            history.push('/messages');
        }
        else if (bottomNavbar === 'profile') {
            history.push('/profile');
        }
        else if (bottomNavbar === 'notifications') {
            history.push('/notifications');
        }
    }, [bottomNavbar, history]);

    return (
        <div className={classes.root} >
            <Drawer>
                <Routes />
            </Drawer>
            <BottomNavbar value={bottomNavbar} setBottomNavbar={setBottomNavbar} />
        </div>
    );
}

export default Main;
