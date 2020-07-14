import React, { useState, useEffect, Fragment } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import SimpleMenu from '../SimpleMenu/SimpleMenu';
import axios from 'axios';
import bufferToImage from '../../utils/bufferToImage';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { editCommentOnPostById } from '../../Actions/post';

const useStyles = makeStyles(theme => ({
    update: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    listItem: {
        width: '100%',
        paddingRight: 0
    }
}));

const Comment = ({ comment, postId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

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


    //------------edit comment logic-----------------------
    const [editComment, setEditComment] = useState(false);

    //updated comment
    const [updatedComment, setUpdatedComment] = useState(comment && comment.text);

    const updateComment = () => {
        const data = {
            text: updatedComment
        }

        dispatch(editCommentOnPostById(postId, comment._id, data));

        //setEditComment back to false
        setEditComment(false);
        // handleClose();
    }

    return (
        <ListItem className={classes.listItem} >
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            {!editComment ? <ListItemText
                primary={user && user.name}
                secondary={
                    <Fragment>
                        <Typography variant="body1" >{comment.text}</Typography>
                        <Typography variant="body2" ><Moment format="D MMM YYYY HH:mm" withTitle >{comment.date}</Moment></Typography>
                    </Fragment>
                }
            /> : <div className={classes.update} >
                    <TextField variant="standard" value={updatedComment} multiline onChange={(event) => setUpdatedComment(event.target.value)} />
                    <Button variant="text" color="primary" disabled={!updatedComment} onClick={updateComment} >update</Button>
                </div>}
            {loggedUser._id === user.id && <ListItemSecondaryAction>
                {!editComment &&
                    <Fragment>
                        <IconButton aria-label="settings" onClick={handleClick} >
                            <MoreVert />
                        </IconButton>
                        <SimpleMenu onClose={handleClose} anchorEl={anchorEl} open={Boolean(anchorEl)} criteria="Comment" commentId={comment._id} postId={postId} setEditComment={setEditComment} closeMenu={handleClose} />
                    </Fragment>}
            </ListItemSecondaryAction>}
        </ListItem>
    );
}

export default Comment;
