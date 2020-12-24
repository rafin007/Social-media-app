import React from "react";
import {
  Grid,
  makeStyles,
  List,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import User from "../../Components/Users/User/User";
import { ArrowBackIos } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { getFollowers } from "../../Actions/follow";

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

const Followers = () => {
  const classes = useStyles();

  const { user_id } = useParams();

  const { state } = useLocation();

  const dispatch = useDispatch();

  //loading state
  const loading = useSelector((state) => state.profile.loading);

  //profiles state
  const profiles = useSelector((state) => state.profile.profiles);

  useEffect(() => {
    dispatch(getFollowers(user_id));
  }, [dispatch, user_id]);

  return (
    <Grid container className={classes.root}>
      <Typography variant="h5" color="primary">
        {!user_id
          ? "Your followers"
          : `${state && state.profile.user.name}'s followers`}
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
        <List>
          {loading ? (
            <Spinner />
          ) : (
            profiles &&
            profiles.length > 0 &&
            profiles.map((profile) => (
              <User key={profile._id} profile={profile} />
            ))
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default Followers;
