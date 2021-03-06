import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  cancelFollowRequest,
  followUserById,
  unfollowUserById,
} from "../../../Actions/follow";
import Avatar from "../../Avatar/Avatar";
import axios from "axios";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textDecoration: "none",
    color: theme.palette.type === "dark" ? "#fff" : "#000",
  },
}));

// function useForceUpdate() {
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => ++value); // update the state to force render
// }

const User = ({ profile }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // const forceUpdate = useForceUpdate();

  //user state from auth
  const user = useSelector((state) => state.auth.user);

  //loading state
  const loading = useSelector((state) => state.auth.loading);

  const [followStatus, setFollowStatus] = useState("");

  //check if the logged in user is in user's following list/follow requests list
  useEffect(() => {
    // if (profile.user.followers.filter(follower => follower.user === user._id).length > 0) {
    //     setFollowStatus('unfollow');
    // }
    // else if (profile.user.followRequests.filter(followReq => followReq.user === user._id).length > 0) {
    //     setFollowStatus('requested');
    // }
    // else {
    //     setFollowStatus('follow');
    // }
    let mounted = true;
    if (mounted) {
      axios
        .get(`/users/checkFollow/${profile?.user._id}`)
        .then((response) => setFollowStatus(response.data.status))
        .catch((error) => console.log(error));
    }

    return () => (mounted = false);
  }, [loading, profile]);

  //confirm modal logic
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollow = async () => {
    if (followStatus === "follow") {
      dispatch(followUserById(profile.user._id));
    } else if (followStatus === "unfollow") {
      //check if the user's account is private
      if (profile.user.isPrivate) {
        openModal(true);
      } else {
        dispatch(unfollowUserById(profile.user._id));
      }
    } else if (followStatus === "requested") {
      dispatch(cancelFollowRequest(profile.user._id));
    }

    // setValue(value++);
  };

  //button text value
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

  return (
    <ListItem>
      <Link to={`/profile/${profile._id}`} className={classes.link}>
        <ListItemAvatar>
          <Avatar
            image={profile.user.avatar && profile.user.avatar}
            width={5}
            height={5}
          />
        </ListItemAvatar>
        <ListItemText
          primary={profile.user.name}
          secondary={profile.profession}
        />
      </Link>
      <ListItemSecondaryAction>
        {profile.user._id !== user._id && (
          <Button
            color={followStatus === "follow" ? "primary" : "secondary"}
            variant="outlined"
            size="small"
            disabled={loading}
            onClick={handleFollow}
          >
            {buttonText}
          </Button>
        )}
      </ListItemSecondaryAction>
      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        user={profile.user}
        criteria="unfollow"
      />
    </ListItem>
  );
};

export default User;
