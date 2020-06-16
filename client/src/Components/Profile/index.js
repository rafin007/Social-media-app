import React from 'react';
import { Grid, makeStyles, Typography, Button, IconButton } from '@material-ui/core';
import Avatar from '../Avatar/Avatar';
import imageAvatar from '../../assets/images/avatar.jpg';
import ProfileTabs from './ProfileTabs';
import Bio from './Bio';
import ProfilePosts from './ProfilePosts';
import About from './About';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getProfileById } from '../../Actions/profile';
import { ArrowBackIos } from '@material-ui/icons';
import { checkFollow } from '../../Actions/follow';

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
    },
    link: {
        textDecoration: 'none',
    },
    link2: {
        textDecoration: 'none',
        color: '#fff',
        margin: '0 auto'
    }
}));

const Profile = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //get the id of profile from url
    const { id } = useParams();
    //get the profile
    useEffect(() => {
        dispatch(getProfileById(id));
    }, [id]);

    //get the user_id of this profile
    const { state } = useLocation();

    //get the follow status of the profile
    useEffect(() => {
        dispatch(checkFollow(state.user_id));
    }, [state.user_id]);

    //profile state
    const profile = useSelector(state => state.profile.profile);

    //loading state
    const loading = useSelector(state => state.profile.loading);

    //user state from auth
    const user = useSelector(state => state.auth.user);

    //followStatus state
    const followStatus = useSelector(state => state.auth.followStatus);

    //tab switching logic
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
                <Grid item xs={12} >
                    <Link to={{
                        pathname: '/home',
                        state: {
                            tab: 1
                        }
                    }} className={classes.link} >

                        <IconButton aria-label="go back" color="primary" size="small" >
                            <ArrowBackIos />
                            back
                        </IconButton>
                    </Link>
                </Grid>
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
                            <Typography variant="body2" color="textSecondary" >Following</Typography>
                        </Typography>
                    </div>
                    {!loading && profile && user._id === profile.user._id ? (
                        <Link className={classes.link2} >
                            <Button variant="contained" color="primary" >Edit profile</Button>
                        </Link>) : (
                            <Button variant="contained" color={followStatus && followStatus === 'follow' ? 'primary' : 'secondary'} >{followStatus && followStatus}</Button>
                        )}
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
