import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Post from '../Post/Post';

import owner from '../../assets/images/avatar.jpg';

import Post1 from '../../assets/images/post1.jpg';
import Post2 from '../../assets/images/post2.jpg';
import Post3 from '../../assets/images/post3.jpg';

const Feed = () => {

    // feed contains all the posts from all users
    return (
        <Fragment>
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
        </Fragment>
    );
}

export default Feed;
