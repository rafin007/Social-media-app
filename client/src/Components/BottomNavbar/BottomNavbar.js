import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { HomeOutlined, MessageOutlined, AccountCircleOutlined, NotificationsOutlined } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '7vh',
        backgroundColor: '#ededed',
        borderTop: '1px solid #ccc',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    },
}));

const SimpleBottomNavigation = (props) => {
    const classes = useStyles();

    //tab switching logic will be in main component

    const { pathname } = useLocation();

    //ORS stands for something other than main bottom navbar option (but i forgot)
    useEffect(() => {
        if (pathname !== '/home' && pathname !== '/messages' && pathname !== '/profile' && pathname !== '/notifications') {
            props.setBottomNavbar('ORS');
        }
    }, [props, pathname]);


    return (
        <BottomNavigation value={props.value} onChange={(event, newValue) => props.setBottomNavbar(newValue)} className={classes.root} >
            <BottomNavigationAction label="Home" value="home" icon={<HomeOutlined />} />
            <BottomNavigationAction label="Messages" value="messages" icon={<MessageOutlined />} />
            <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircleOutlined />} />
            <BottomNavigationAction label="Notifications" value="notifications" icon={<NotificationsOutlined />} />
        </BottomNavigation>
    );
}

export default SimpleBottomNavigation;
