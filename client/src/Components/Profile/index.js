import React from 'react';
import { Grid, Paper, makeStyles, Typography, Button } from '@material-ui/core';
import Avatar from '../Avatar/Avatar';
import imageAvatar from '../../assets/images/avatar.jpg';
import ProfileTabs from './ProfileTabs';
import Bio from './Bio';
import ProfilePosts from './ProfilePosts';
import About from './About';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProfileById } from '../../Actions/profile';

const useStyles = makeStyles((theme) => ({
    follows: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    follow: {
        textAlign: 'center',
    },
    followSystem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
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

const Profile = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //get the id of profile from url
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProfileById(id));
    }, []);


    //profile state
    const profile = useSelector(state => state.profile.profile);

    //loading state
    const loading = useSelector(state => state.profile.loading);

    //tab switching
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let pageContent = null;

    if (value === 0) {
        pageContent = <Bio profile={profile} />;
    }
    else if (value === 1) {
        pageContent = <ProfilePosts profile={profile} />;
    }
    else {
        pageContent = <About profile={profile} />;
    }


    //JSX
    let profileContent = null;

    // if loading show spinner otherwise profile
    if (loading && profile === null) {
        profileContent = <Spinner />;
    }
    else {
        profileContent = (
            <Grid container direction="row" justify="space-between" alignItems="stretch" className={classes.root} >
                <Grid item xs={6} >
                    <Avatar owner={imageAvatar} width={14} height={14} />
                    <Typography variant="h5" align="center" >
                        {profile && profile.user.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" align="center" gutterBottom >
                        {profile && profile.profession}
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.followSystem} >
                    <div className={classes.follows} >
                        <Typography variant="h6" className={classes.follow} >
                            {profile && profile.user.followers.length}
                            <Typography variant="body2" color="textSecondary" >Followers</Typography>
                        </Typography>
                        <Typography variant="h6" className={classes.follow} >
                            {profile && profile.user.following.length}
                            <Typography variant="body2" color="textSecondary" >Followings</Typography>
                        </Typography>
                    </div>
                    <Button variant="contained" color="primary" >Follow</Button>
                </Grid>
                <Grid item xs={12} >
                    <ProfileTabs value={value} handleChange={handleChange} />
                </Grid>
                {pageContent}
            </Grid>
        );
    }

    return profileContent;
}

export default Profile;
