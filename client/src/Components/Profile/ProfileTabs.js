import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(3)
    },
}));

export default function CenteredTabs(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Tabs
                value={props.value}
                onChange={props.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Bio" />
                <Tab label="Posts" disabled={!props.isFollowing} />
                <Tab label="About" disabled={!props.isFollowing} />
            </Tabs>
        </Paper>
    );
}
