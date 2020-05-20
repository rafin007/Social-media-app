import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Tabs from '../../Components/Tabs/Tabs';
import Feed from '../../Components/Feed/Feed';
import Users from '../../Components/Users/Users';

const useStyles = makeStyles(theme => ({
    root: {
        // height: '90vh',
        overflowY: 'auto',
        paddingBottom: '3rem',
        [theme.breakpoints.up('md')]: {
            padding: '0 12rem'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 20rem'
        }
    }
}));

const HomeView = () => {

    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    let pageContent = null;

    if (tabValue === 0) {
        pageContent = <Feed />;
    }
    else {
        pageContent = <Users />;
    }

    return (
        <Grid container spacing={1} className={classes.root} >
            <Grid item xs={12} >
                <Tabs handleTabChange={handleTabChange} tabValue={tabValue} />
            </Grid>
            {pageContent}
        </Grid>
    );
}

export default HomeView;
