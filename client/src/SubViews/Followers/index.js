import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    },
    link: {
        textDecoration: 'none',
    },
    link2: {
        textDecoration: 'none',
        color: '#fff',
        margin: '0 auto'
    },
    link3: {
        textDecoration: 'none',
        color: '#000'
    }
}));

const Followers = () => {

    const classes = useStyles();

    const [profiles, setProfiles] = useState([]);

    const { user_id } = useParams();

    useEffect(() => {
        if (user_id) {
            axios.get(`/users/followers/${user_id}`).then(response => setProfiles(response.data)).catch(error => console.log(error));
        }
    }, []);

    console.log(profiles);

    return (
        <Grid container className={classes.root} >
            <Grid item xs={12} >
                hello
            </Grid>
        </Grid>
    );
}

export default Followers;
