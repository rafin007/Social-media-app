import React from 'react'
import { Paper, Typography, makeStyles, Button, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBio } from '../../Actions/profile';
import Spinner from '../../Components/Spinner/Spinner';
import CustomAlert from '../../Components/CustomAlert/CustomAlert';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    bioContainer: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2)
    },
    buttons: {
        marginTop: theme.spacing(2),
        display: 'flex',
    },
    root: {
        paddingBottom: theme.spacing(3)
    },
    bio: {
        width: '100%'
    },
    errors: {
        marginTop: theme.spacing(5)
    }
}));

const Bio = ({ profile }) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [bio, setBio] = useState('');

    //loading state
    const loading = useSelector(state => state.profile.loading);

    //error state
    const errors = useSelector(state => state.profile.errors);

    const submitBio = async () => {
        const data = {
            bio
        };

        dispatch(addBio(data));
    }

    useEffect(() => {
        if (!loading && profile) {
            setBio(profile.bio);
        }
    }, [loading, profile]);

    return (
        <Grid container className={classes.root} justify="center" >
            <Grid item xs={12} >
                <Paper elevation={3} className={classes.bioContainer}  >
                    <Typography variant="h6" gutterBottom >Bio</Typography>
                    {/* <Typography variant="body2" color="textSecondary" align="justify" contentEditable="true" >
                        {profile && profile.bio ? profile.bio : 'Add a bio..'}
                    </Typography> */}
                    {loading ? <Spinner /> : (<TextField
                        id="outlined-textarea"
                        label=""
                        placeholder="Your bio..."
                        multiline
                        variant="outlined"
                        className={classes.bio}
                        value={bio}
                        onChange={(event) => { setBio(event.target.value) }}
                    />)}
                </Paper>
            </Grid>
            <Grid item xs={12} className={classes.buttons} >
                {/* <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<EditOutlined />}
                    style={{ marginRight: '1rem' }}
                >
                    Edit
                </Button> */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submitBio}
                    disabled={loading}
                >
                    Save
                </Button>
            </Grid>
            <Grid item xs={10} md={6} lg={4} className={classes.errors} className={classes.errors} >
                {errors && errors.length > 0 ? errors.map((error, i) => <CustomAlert message={error} severity="error" key={i} />) : null}
            </Grid>
        </Grid>
    )
}

export default Bio;
