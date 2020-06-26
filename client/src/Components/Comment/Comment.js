import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Folder, Delete } from '@material-ui/icons';

const Comment = () => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <Folder />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary="Single-line item"
                secondary="bal"
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Comment;
