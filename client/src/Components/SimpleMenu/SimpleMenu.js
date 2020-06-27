import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ListItemIcon, Typography } from '@material-ui/core';
import { EditOutlined, DeleteOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const SimpleMenu = ({ postId, ...props }) => {

    const history = useHistory();

    const editPost = () => {
        props.onClose();
        history.push(`/edit/${postId}`);
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
                <Typography variant="inherit">Edit Post</Typography>
            </MenuItem>
            <MenuItem onClick={props.onClose}>
                <ListItemIcon>
                    <DeleteOutlined fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Delete Post</Typography>
            </MenuItem>
        </Menu>
    );
}

export default SimpleMenu;
