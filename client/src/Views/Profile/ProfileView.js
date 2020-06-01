import React, { Fragment } from 'react';
import { Grid, Paper, makeStyles, Typography, Button } from '@material-ui/core';
import Avatar from '../../Components/Avatar/Avatar';
import imageAvatar from '../../assets/images/avatar.jpg';
import ProfileTabs from './ProfileTabs';
import Bio from './Bio';
import ProfilePosts from './ProfilePosts';

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

const ProfileView = () => {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let pageContent = null;

    if (value === 0) {
        pageContent = <Bio />
    }
    else if (value === 1) {
        pageContent = <ProfilePosts />
    }
    else {
        pageContent = 'About';
    }

    return (
        <Grid container direction="row" justify="space-between" alignItems="stretch" className={classes.root} >
            <Grid item xs={6} >
                <Avatar owner={imageAvatar} width={14} height={14} />
                <Typography variant="h5" align="center" >
                    Arefin Mehedi
                </Typography>
                <Typography variant="body1" color="textSecondary" align="center" gutterBottom >
                    Software engineer
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.followSystem} >
                <div className={classes.follows} >
                    <Typography variant="h6" className={classes.follow} >
                        206
                        <Typography variant="body2" color="textSecondary" >Followers</Typography>
                    </Typography>
                    <Typography variant="h6" className={classes.follow} >
                        206
                        <Typography variant="body2" color="textSecondary" >Followings</Typography>
                    </Typography>
                </div>
                <Button variant="contained" color="primary" >Follow</Button>
            </Grid>
            <ProfileTabs value={value} handleChange={handleChange} />
            {pageContent}
        </Grid>
    );
}

export default ProfileView;
