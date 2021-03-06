import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Post from "../../Components/Post/Post";
import FloatingAction from "../../Components/FloatingAction/FloatingAction";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useEffect } from "react";
import { getAllPosts } from "../../Actions/post";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Components/Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}));

const ProfilePosts = () => {
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

  // ProfilePosts contains all the posts from this user

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  //loading state
  const loading = useSelector((state) => state.post.loading);

  //posts state
  const posts = useSelector((state) => state.post.posts);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        {loading ? (
          <Spinner />
        ) : (
          posts &&
          posts.length > 0 &&
          posts.map((post) => <Post post={post} key={post._id} />)
        )}
      </Grid>
      {action}
    </Grid>
  );
};

export default ProfilePosts;
