import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { deleteEducationalInformation, deleteExperienceInformation, deleteSocialInformation } from '../../Actions/profile';
import { useDispatch } from 'react-redux';

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

    const dispatch = useDispatch();

    //delete education/experience/social info by their id distinguished by their type
    const deleteHandler = (id) => {
        if (props.type === 'education') {
            dispatch(deleteEducationalInformation(id));
        }
        else if (props.type === 'experience') {
            dispatch(deleteExperienceInformation(id));
        }
        else if (props.type === 'social') {
            dispatch(deleteSocialInformation(id));
        }
    }

    return (
        <ListItem className={classes.root} >
            <ListItemText
                primary={props.title}
                secondary={props.description}
                className={classes.listText}
            />

            {/* Personal information won't have delete option */}

            {props.title !== 'Birthday' && props.title !== 'Gender' && props.title !== 'Address' && props.title !== 'Website' && props.title !== 'Profession' ? (
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => { deleteHandler(props.id) }} >
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            ) : null}
        </ListItem>
    )
}

export default AboutList;
