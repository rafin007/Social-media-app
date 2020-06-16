import React, { useState } from 'react';
import { ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, Button, makeStyles } from '@material-ui/core';
import myImg from '../../../assets/images/avatar.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const useStyles = makeStyles(theme => ({
    link: {
        display: 'flex',
        textDecoration: 'none',
        color: '#000'
    }
}));

const User = ({ profile }) => {

    const classes = useStyles();

    const user = useSelector(state => state.auth.user);

    const [followStatus, setFollowStatus] = useState('');

    //check if the user is in logged user's following list
    useEffect(() => {
        if (user.following.filter(item => item._id === profile.user._id).length > 0) {
            setFollowStatus('unfollow');
        }
        else {
            setFollowStatus('follow');
        }
    }, []);

    return (
        <ListItem>
            <Link to={{
                pathname: `/profile/${profile._id}`,
                state: {
                    user_id: profile.user._id
                }
            }} className={classes.link} >
                <ListItemAvatar>
                    <Avatar alt="avatar" src={myImg} />
                </ListItemAvatar>
                <ListItemText
                    primary={profile.user.name}
                    secondary={profile.profession}
                />

            </Link>
            <ListItemSecondaryAction>
                <Button color={followStatus === 'follow' ? 'primary' : 'secondary'} variant="contained" size="small" >{followStatus}</Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default User;
