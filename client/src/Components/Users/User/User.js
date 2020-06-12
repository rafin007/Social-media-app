import React from 'react';
import { ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { FolderOutlined } from '@material-ui/icons';

const User = () => {

    //@TODO => Make User List component

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <FolderOutlined />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary="Single-line item"
                secondary="some other text"
            />

            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <FolderOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default User;
