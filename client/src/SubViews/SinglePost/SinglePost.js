import React, { useState } from 'react';
import Post from '../../Components/Post/Post';
import { makeStyles, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../Actions/post';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';

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
}));

const SinglePost = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //get the post id from url
    const { post_id } = useParams();

    //retrieve the post
    useEffect(() => {
        dispatch(getPostById(post_id));
    }, [post_id]);

    //get the post state
    const post = useSelector(state => state.post.post);

    //loading state
    const loading = useSelector(state => state.post.loading);

    return (
        loading ? <Spinner /> :
            (
                <Grid container className={classes.root} >
                    <Grid item xs={12} >
                        <Post post={post && post} />
                    </Grid>
                </Grid>
            )
    );
}

export default SinglePost;
