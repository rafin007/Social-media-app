import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ListItemIcon } from '@material-ui/core';
import { EditOutlined, DeleteOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { useDispatch } from 'react-redux';
import { deletePostById, deletePostCommentById } from '../../Actions/post';

const SimpleMenu = ({ postId, commentId, ...props }) => {

    const history = useHistory();

    //edit comment or post
    const edit = () => {
        if (commentId) {
            //edit comment
            console.log('edit comment');
            //close simple menu
            props.closeMenu();
            //update dom for editing comment
            props.setEditComment(true);
        }
        else {
            //edit post
            props.onClose();
            history.push(`/edit/${postId}`);
        }
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

    //remove comment or post
    const remove = () => {
        if (commentId) {
            //delete comment
            // console.log('delete comment');
            dispatch(deletePostCommentById(postId, commentId));
        }
        else {
            dispatch(deletePostById(postId));
        }

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
            <MenuItem onClick={edit}>
                <ListItemIcon>
                    <EditOutlined fontSize="small" />
                </ListItemIcon>
                Edit {props.criteria}
            </MenuItem>
            <MenuItem onClick={openConfirmModal}>
                <ListItemIcon>
                    <DeleteOutlined fontSize="small" />
                </ListItemIcon>
                Delete {props.criteria}
            </MenuItem>
            <ConfirmDialog open={open} handleClose={handleClose} deleteCriteria={remove} criteria={props.criteria} />
        </Menu>
    );
}

export default SimpleMenu;
