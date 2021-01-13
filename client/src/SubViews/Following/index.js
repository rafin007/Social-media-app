import React from "react";
import { Grid, makeStyles, List, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import User from "../../Components/Users/User/User";
import { useDispatch, useSelector } from "react-redux";
import { getFollowings } from "../../Actions/follow";

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
  link: {
    textDecoration: "none",
  },
  link2: {
    textDecoration: "none",
    color: "#fff",
    margin: "0 auto",
  },
  link3: {
    textDecoration: "none",
    color: "#000",
  },
}));

const Following = () => {
  const classes = useStyles();

  const { user_id } = useParams();

  const { state } = useLocation();

  const dispatch = useDispatch();

  //loading state
  const loading = useSelector((state) => state.profile.loadFollow);

  //profiles state
  const profiles = useSelector((state) => state.profile.profiles);

  useEffect(() => {
    dispatch(getFollowings(user_id));
  }, [dispatch, user_id]);

  let jsx = null;

  if (profiles && profiles.length === 0) {
    jsx = (
      <Typography>
        <Typography>
          {!user_id
            ? "You are not following anyone"
            : `${state && state.profile.user.name} is not following anyone`}
        </Typography>
      </Typography>
    );
  } else if (profiles && profiles.length > 0) {
    jsx =
      profiles &&
      profiles.length > 0 &&
      profiles.map((profile) => <User key={profile._id} profile={profile} />);
  }

  return (
    <Grid container className={classes.root}>
      <Typography variant="h6" color="primary">
        {!user_id
          ? "Your followings"
          : `${state && state.profile.user.name}'s followings`}
      </Typography>
      {/* <Grid item xs={12}>
        <Link
          to={`/profile/${state ? state.profile._id : ""}`}
          className={classes.link}
        >
          <IconButton aria-label="go back" color="primary" size="small">
            <ArrowBackIos />
            {state ? state.profile.user.name : "back"}
          </IconButton>
        </Link>
      </Grid> */}
      <Grid item xs={12}>
        <List>{loading ? <Spinner /> : jsx}</List>
      </Grid>
    </Grid>
  );
};

export default Following;
