import React, { useState } from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearPosts, getAllPosts } from "../../Actions/post";
import Spinner from "../../Components/Spinner/Spinner";
import Post from "../../Components/Post/Post";
import FloatingAction from "../../Components/FloatingAction/FloatingAction";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '90vh',
    overflowY: "auto",
    paddingBottom: "3rem",
    [theme.breakpoints.up("md")]: {
      padding: "0 12rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0 20rem",
    },
  },
}));

const Posts = () => {
  //scroll to top logic
  const [shouldScroller, setShouldScroller] = useState(false);

  let action = null;

  if (shouldScroller) {
    action = <FloatingAction action="scroller" />;
  } else {
    action = <FloatingAction action="button" />;
  }

  // if scrolled down scroll to top will appear
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < 0 && currPos.y < prevPos.y) {
      setShouldScroller(true);
    } else {
      setShouldScroller(false);
    }
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  //post state from posts
  const posts = useSelector((state) => state.post.posts);

  //loading state
  const loading = useSelector((state) => state.post.loading);

  useEffect(() => {
    //clear posts component first
    dispatch(clearPosts());

    dispatch(getAllPosts());
  }, [dispatch]);

  let jsx = null;

  if (posts && posts.length > 0) {
    jsx = (
      <Grid container className={classes.root}>
        <Typography gutterBottom color="primary" variant="h5">
          Your posts
        </Typography>
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
        {action}
      </Grid>
    );
  } else {
    jsx = (
      <Grid container className={classes.root}>
        <Typography color="textPrimary" component="p">
          You haven't posted yet. Click the plus icon below to make new posts!
        </Typography>
        {action}
      </Grid>
    );
  }

  return loading ? <Spinner /> : jsx;
};

export default Posts;
