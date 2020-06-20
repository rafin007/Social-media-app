import React, { useState } from 'react';
import { Grid, makeStyles, List, IconButton } from '@material-ui/core';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import User from '../../Components/Users/User/User';
import { ArrowBackIos } from '@material-ui/icons';

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

const Following = () => {

    const classes = useStyles();

    const [profiles, setProfiles] = useState([]);

    const [loading, setLoading] = useState(true);

    const { user_id } = useParams();

    const { state } = useLocation();

    useEffect(() => {
        if (user_id) {
            axios.get(`/users/following/${user_id}`).then(response => {
                setProfiles(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
        }
        else {
            axios.get('/users/following').then(response => {
                setProfiles(response.data);
                setLoading(false);
            }).catch(error => console.log(error));
        }
    }, []);

    return (
        <Grid container className={classes.root} >
            <Grid item xs={12} >
                <Link to={`/profile/${state ? state.profile._id : ''}`} className={classes.link} >
                    <IconButton aria-label="go back" color="primary" size="small" >
                        <ArrowBackIos />
                        {state ? state.profile.user.name : 'back'}
                    </IconButton>
                </Link>
            </Grid>
            <Grid item xs={12} >
                <List>
                    {loading ? <Spinner /> : profiles && profiles.length > 0 && profiles.map(profile => <User key={profile._id} profile={profile} />)}
                </List>
            </Grid>
        </Grid>
    );
}

export default Following;
