import React from 'react';
import { ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Button, makeStyles } from '@material-ui/core';
import myImg from '../../../assets/images/avatar.jpg';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    link: {
        display: 'flex',
        textDecoration: 'none',
        color: '#000'
    }
}));

const User = ({ profile }) => {

    const classes = useStyles();

    return (
        <ListItem>
            <Link to={`/profile/${profile._id}`} className={classes.link} >
                <ListItemAvatar>
                    <Avatar alt="avatar" src={myImg} />
                </ListItemAvatar>
                <ListItemText
                    primary={profile.user.name}
                    secondary={profile.profession}
                />

            </Link>
            <ListItemSecondaryAction>
                <Button color="primary" variant="contained" size="small" >Follow</Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default User;
