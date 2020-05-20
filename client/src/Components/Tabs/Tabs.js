import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const CenteredTabs = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Tabs
                value={props.tabValue}
                onChange={props.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Feed" />
                <Tab label="Users" />
            </Tabs>
        </Paper>
    );
}

export default CenteredTabs;

