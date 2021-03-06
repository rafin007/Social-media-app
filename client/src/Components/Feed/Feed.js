import React, { Fragment, useState, useEffect } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import Post from "../Post/Post";
import FloatingAction from "../FloatingAction/FloatingAction";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts, clearPosts } from "../../Actions/post";
import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  spinner: {
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },
  text: {
    marginTop: theme.spacing(2),
  },
}));

const Feed = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //get feed posts
  useEffect(() => {
    dispatch(getFeedPosts());

    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);

  //user state from auth to make sure the user has indeed loaded
  const user = useSelector((state) => state.auth.user);

  //posts state
  const posts = useSelector((state) => state.post.posts);

  //loading state
  const loading = useSelector((state) => state.post.loading);

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

  let jsx = null;

  if (user && posts.length > 0) {
    jsx = posts.map((post) => {
      return (
        <Grid item xs={12} key={post._id}>
          <Post post={post} />
        </Grid>
      );
    });
  } else {
    jsx = (
      <Typography color="textPrimary" className={classes.text}>
        You're not following any users. Head on to the users tab to follow
        someone!
      </Typography>
    );
  }

  //to avoid the weird mount-unmount error
  // const [didMount, setDidMount] = useState(false);

  // useEffect(() => {
  //   setDidMount(true);
  //   return () => setDidMount(false);
  // }, []);

  // if (!didMount) {
  //   return null;
  // }

  // feed contains all the posts user's followings
  return (
    <Fragment>
      {loading ? (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      ) : (
        jsx
      )}

      {action}
    </Fragment>
  );
};

export default Feed;
