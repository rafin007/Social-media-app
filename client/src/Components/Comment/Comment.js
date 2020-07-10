import React, { useState, useEffect, Fragment } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import SimpleMenu from '../SimpleMenu/SimpleMenu';
import axios from 'axios';
import bufferToImage from '../../utils/bufferToImage';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

const Comment = ({ comment, postId }) => {

    //menu handler
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [user, setUser] = useState({});

    useEffect(() => {
        if (comment) {
            axios.get(`/users/${comment.user}`).then(response => {
                const profile = response.data;
                setUser({
                    name: profile.name,
                    avatar: profile.avatar && bufferToImage(profile.avatar),
                    id: profile._id
                });
            }).catch(error => console.log(error));
        }
    }, [comment]);

    //user state from auth
    const loggedUser = useSelector(state => state.auth.user);

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary={user && user.name}
                secondary={
                    <Fragment>
                        <Typography variant="body1" >{comment.text}</Typography>
                        <Typography variant="body2" ><Moment format="D MMM YYYY HH:mm" withTitle >{comment.date}</Moment></Typography>
                    </Fragment>
                }
            />
            {loggedUser._id === user.id && <ListItemSecondaryAction>
                <IconButton aria-label="settings" onClick={handleClick} >
                    <MoreVert />
                </IconButton>
                <SimpleMenu onClose={handleClose} anchorEl={anchorEl} open={Boolean(anchorEl)} criteria="Comment" commentId={comment._id} postId={postId} />
            </ListItemSecondaryAction>}
        </ListItem>
    );
}

export default Comment;
