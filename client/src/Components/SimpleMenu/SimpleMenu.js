import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ListItemIcon } from '@material-ui/core';
import { EditOutlined, DeleteOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { useDispatch } from 'react-redux';
import { deletePostById } from '../../Actions/post';

const SimpleMenu = ({ postId, ...props }) => {

    const history = useHistory();

    const editPost = () => {
        props.onClose();
        history.push(`/edit/${postId}`);
    }


    //confirm modal logic
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //open confirm modal
    const openConfirmModal = () => {
        props.onClose();
        handleClickOpen();
    }

    const dispatch = useDispatch();

    //delete post
    const deletePost = () => {
        dispatch(deletePostById(postId));

        handleClose();
    }


    return (
        <Menu
            id="simple-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.onClose}
        >
            <MenuItem onClick={editPost}>
                <ListItemIcon>
                    <EditOutlined fontSize="small" />
                </ListItemIcon>
                Edit Post
            </MenuItem>
            <MenuItem onClick={openConfirmModal}>
                <ListItemIcon>
                    <DeleteOutlined fontSize="small" />
                </ListItemIcon>
                Delete Post
            </MenuItem>
            <ConfirmDialog open={open} handleClose={handleClose} deletePost={deletePost} />
        </Menu>
    );
}

export default SimpleMenu;
