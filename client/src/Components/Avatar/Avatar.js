import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        justifyContent: 'center',
    },
}));

export default function ImageAvatars(props) {
    const classes = useStyles();

    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Avatar alt="My avatar" src={props.owner} style={{ width: theme.spacing(props.width), height: theme.spacing(props.height) }} />
        </div>
    );
}
