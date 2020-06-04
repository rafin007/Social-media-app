import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const Expander = (props) => {

    const classes = useStyles();

    const handleChange = (panel) => (event, isExpanded) => {
        props.setExpanded(isExpanded ? panel : false);
    }

    return (
        <ExpansionPanel expanded={props.expanded === props.panel} onChange={handleChange(props.panel)} className={classes.root} >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
            >
                <Typography className={classes.heading}>{props.heading}</Typography>
                <Typography className={classes.secondaryHeading}>
                    {props.secondaryHeading}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {/* <Typography> */}
                {props.children}
                {/* </Typography> */}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default Expander;
