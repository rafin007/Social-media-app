import React, { useState } from "react";
import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import Avatar from "../Avatar/Avatar";
import ProfileTabs from "./ProfileTabs";
import Bio from "./Bio";
import ProfilePosts from "./ProfilePosts";
import About from "./About";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getProfileById } from "../../Actions/profile";
import {
  cancelFollowRequest,
  followUserById,
  unfollowUserById,
} from "../../Actions/follow";
import axios from "axios";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  follows: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  follow: {
    textAlign: "center",
  },
  followSystem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
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
    color: theme.palette.type === "dark" ? "#fff" : "#000",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //get the id of profile from url
  const { id } = useParams();

  //get the profile
  useEffect(() => {
    dispatch(getProfileById(id));
  }, [id, dispatch]);

  //profile state
  const profile = useSelector((state) => state.profile.profile);

  //-------------tab switching logic-------------
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let pageContent = null;

  if (value === 0) {
    pageContent = <Bio profile={profile} />;
  } else if (value === 1) {
    pageContent = <ProfilePosts profile={profile} />;
  } else {
    pageContent = <About profile={profile} />;
  }
  //------------------------

  //loading state
  const loading = useSelector((state) => state.profile.loading);

  //follow load from auth
  const followLoading = useSelector((state) => state.auth.loading);

  //user state from auth
  const user = useSelector((state) => state.auth.user);

  const [followStatus, setFollowStatus] = useState("");

  //check if the user is in logged user's following list/follow requests list
  useEffect(() => {
    // if (profile && !loading) {
    //     if (profile.user.followers.filter(follower => follower.user === user._id).length > 0) {
    //         setFollowStatus('unfollow');
    //     }
    //     else if (profile.user.followRequests.filter(followReq => followReq.user === user._id).length > 0) {
    //         setFollowStatus('requested');
    //     }
    //     else {
    //         setFollowStatus('follow');
    //     }
    // }
    if (profile) {
      axios
        .get(`/users/checkFollow/${profile.user._id}`)
        .then((response) => setFollowStatus(response.data.status))
        .catch((error) => console.log(error));
    }
  }, [followLoading, profile]);

  const [isFollowing, setIsFollowing] = useState(false);

  //check if the logged in user is following the user and whether s/he can see their posts
  useEffect(() => {
    if (followStatus === "follow") {
      setIsFollowing(false);
      setValue(0);
    } else if (followStatus === "unfollow") {
      setIsFollowing(true);
    } else if (followStatus === "requested") {
      setIsFollowing(false);
    }
  }, [followStatus]);

  //follow action
  // const handleFollow = async () => {
  //   if (followStatus === "follow") {
  // dispatch(followUserById(profile.user._id, id));
  //   } else if (followStatus === "unfollow") {
  //     dispatch(unfollowUserById(profile.user._id, id));
  //   }
  // };

  //modal logic
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollow = async () => {
    if (followStatus === "follow") {
      dispatch(followUserById(profile.user._id, id));
    } else if (followStatus === "unfollow") {
      //check if the user's account is private
      if (profile.user.isPrivate) {
        openModal(true);
      } else {
        dispatch(unfollowUserById(profile.user._id, id));
      }
    } else if (followStatus === "requested") {
      dispatch(cancelFollowRequest(profile.user._id));
    }
  };

  //follow button text
  const [buttonText, setButtonText] = useState("loading");

  useEffect(() => {
    if (followStatus === "follow") {
      setButtonText("follow");
    } else if (followStatus === "unfollow") {
      setButtonText("unfollow");
    } else if (followStatus === "requested") {
      setButtonText("requested");
    }
  }, [followStatus]);

  const history = useHistory();

  //check if it is logged in user's profile
  useEffect(() => {
    if (!loading && profile && user._id === profile.user._id) {
      history.push("/profile");
    }
  }, [loading, profile, user._id, history]);

  //JSX
  let profileContent = null;

  // if loading show spinner otherwise profile
  if (loading && profile === null) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
        className={classes.root}
      >
        <Grid item xs={6}>
          <Avatar
            image={profile && profile.user.avatar && profile.user.avatar}
            width={12}
            height={12}
          />
          <Typography variant="h5" align="center">
            {profile && profile.user.name}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            {profile && profile.profession}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.followSystem}>
          <div className={classes.follows}>
            <Link
              to={{
                pathname: isFollowing
                  ? `/followers/${profile && profile.user._id}`
                  : "",
                state: { profile },
              }}
              className={classes.link3}
            >
              <Typography variant="h6" className={classes.follow}>
                {profile &&
                  profile.user.followers &&
                  profile.user.followers.length}
                <Typography variant="body2" color="textSecondary">
                  Followers
                </Typography>
              </Typography>
            </Link>
            <Link
              to={{
                pathname: isFollowing
                  ? `/following/${profile && profile.user._id}`
                  : "",
                state: { profile },
              }}
              className={classes.link3}
            >
              <Typography variant="h6" className={classes.follow}>
                {profile &&
                  profile.user.following &&
                  profile.user.following.length}
                <Typography variant="body2" color="textSecondary">
                  Following
                </Typography>
              </Typography>
            </Link>
          </div>
          {!loading && profile && user._id === profile.user._id ? (
            <Link className={classes.link2} to="/profile">
              <Button variant="contained" color="primary">
                Edit profile
              </Button>
            </Link>
          ) : (
            <Button
              variant="contained"
              color={followStatus === "follow" ? "primary" : "secondary"}
              disabled={followLoading}
              onClick={handleFollow}
            >
              {/* {followStatus === "follow" ? "follow" : "unfollow"} */}
              {buttonText}
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <ProfileTabs
            value={value}
            handleChange={handleChange}
            isFollowing={isFollowing}
          />
        </Grid>
        {pageContent}
        <Grid item xs={12} md={6} lg={4} justify="center">
          {!loading &&
            !isFollowing &&
            profile &&
            user._id !== profile.user._id && (
              <Typography variant="body1" align="center" color="primary">
                Follow this user to see their Posts and About
              </Typography>
            )}
        </Grid>
        <ConfirmDialog
          open={open}
          handleClose={handleClose}
          user={profile && profile.user}
          id={id}
          criteria="unfollow"
        />
      </Grid>
    );
  }

  return profileContent;
};

export default Profile;
