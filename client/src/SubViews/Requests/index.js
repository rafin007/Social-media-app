import React from "react";
import { Grid, makeStyles, List, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getFollowRequests } from "../../Actions/follow";
import RequestEvaluate from "./RequestEvaluate";

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
  link4: {
    textDecoration: "none",
    color: "#2196F3",
  },
}));

const Requests = () => {
  const classes = useStyles();

  //   const { user_id } = useParams();

  //   const { state } = useLocation();

  const dispatch = useDispatch();

  //loading state
  const loading = useSelector((state) => state.profile.loading);

  //profiles state
  const profiles = useSelector((state) => state.profile.profiles);

  useEffect(() => {
    dispatch(getFollowRequests());
  }, [dispatch]);

  const isPrivate = useSelector((state) => state.auth.user.isPrivate);

  if (isPrivate && profiles && profiles.length === 0) {
    return (
      <Grid className={classes.root}>
        <Typography>You do not have any follow requests pending</Typography>
      </Grid>
    );
  } else if (!isPrivate) {
    return (
      <Grid className={classes.root}>
        <Typography>
          Please turn on private account in{" "}
          <Link
            to="/settings"
            // style={{ color: theme.palette.primary, textDecoration: "none" }}
            className={classes.link4}
          >
            settings
          </Link>{" "}
          to further receive follow requests
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container className={classes.root}>
      <Typography variant="h6" color="primary">
        {/* {!user_id
          ? "Your followers"
          : `${state && state.profile.user.name}'s followers`} */}
        Your follow requests
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
              //   <User key={profile._id} profile={profile} />
              <RequestEvaluate key={profile._id} profile={profile} />
            ))
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default Requests;
