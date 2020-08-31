import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Post from "../../Components/Post/Post";
import FloatingAction from "../FloatingAction/FloatingAction";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../Actions/post";
import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}));

const ProfilePosts = ({ profile }) => {
  const action = <FloatingAction action="scroller" />;

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsByUserId(profile.user._id));
  }, [profile.user._id, dispatch]);

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
