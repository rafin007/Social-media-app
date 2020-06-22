import React, { Fragment, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Post from '../../Components/Post/Post';

import owner from '../../assets/images/avatar.jpg';

import Post1 from '../../assets/images/post1.jpg';
import Post2 from '../../assets/images/post2.jpg';
import Post3 from '../../assets/images/post3.jpg';
import FloatingAction from '../FloatingAction/FloatingAction';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
    }
}));

const ProfilePosts = () => {

    //scroll to top logic
    const [shouldScroller, setShouldScroller] = useState(false);

    let scroller = null;

    if (shouldScroller) {
        scroller = <FloatingAction />;
    }

    // if scrolled down scroll to top will appear
    useScrollPosition(({ prevPos, currPos }) => {
        if (currPos.y < 0) {
            setShouldScroller(true);
        }
        else {
            setShouldScroller(false);
        }
    });

    // ProfilePosts contains all the posts from this user

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} >
                <Post owner={owner} image={Post2} title="arefin" />
            </Grid>

            <Grid item xs={12} >
                <Post owner={owner} image={Post1} title="arefin" />
            </Grid>

            <Grid item xs={12} >
                <Post owner={owner} image={Post3} title="arefin" />
            </Grid>

            <Grid item xs={12} >
                <Post owner={owner} image={Post2} title="arefin" />
            </Grid>

            <Grid item xs={12} >
                <Post owner={owner} image={Post1} title="arefin" />
            </Grid>
            {scroller}
        </Grid>
    );
}

export default ProfilePosts;
