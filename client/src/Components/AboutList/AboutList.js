import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    // root: {
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     width: '100%'
    // },
    // listText: {
    //     // marginRight: theme.spacing(5),
    // }
}));

const AboutList = (props) => {

    const classes = useStyles();

    return (
        <ListItem className={classes.root} >
            <ListItemText
                primary={props.title}
                secondary={props.description}
                className={classes.listText}
            />

            {/* Personal information won't have delete option */}

            {props.title !== 'Birthday' && props.title !== 'Gender' && props.title !== 'Address' && props.title !== 'Website' ? (
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            ) : null}
        </ListItem>
    )
}

export default AboutList;
