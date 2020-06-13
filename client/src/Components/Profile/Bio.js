import React from 'react'
import { Paper, Typography, makeStyles, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Spinner from '../../Components/Spinner/Spinner';
import CustomAlert from '../../Components/CustomAlert/CustomAlert';

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

    //loading state
    const loading = useSelector(state => state.profile.loading);

    //error state
    const errors = useSelector(state => state.profile.errors);

    return (
        <Grid container className={classes.root} justify="center" >
            <Grid item xs={12} >
                <Paper elevation={3} className={classes.bioContainer}  >
                    <Typography variant="h6" gutterBottom >Bio</Typography>
                    <Typography variant="body2" color="textSecondary" align="justify" >
                        {profile && profile.bio}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={10} md={6} lg={4} className={classes.errors} className={classes.errors} >
                {errors && errors.length > 0 ? errors.map((error, i) => <CustomAlert message={error} severity="error" key={i} />) : null}
            </Grid>
        </Grid>
    )
}

export default Bio;
