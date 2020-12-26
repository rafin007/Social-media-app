import React, { useRef, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Avatar from "../../Components/Avatar/Avatar";
import { acceptFollowRequest, rejectFollowRequest } from "../../Actions/follow";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textDecoration: "none",
    color: theme.palette.type === "dark" ? "#fff" : "#000",
  },
  buttons: {
    display: "flex",
    // minWidth: 130,
    justifyContent: "space-between",
  },
}));

const RequestEvaluate = ({ profile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  //accept
  const acceptRequest = () => {
    dispatch(acceptFollowRequest(profile.user._id));
    setStatus("accepted");
  };

  //reject
  const rejectRequest = () => {
    dispatch(rejectFollowRequest(profile.user._id));
    setStatus("rejected");
  };

  let buttons = (
    <>
      <Button size="small" color="primary" onClick={acceptRequest}>
        Accept
      </Button>
      <Button size="small" color="secondary" onClick={rejectRequest}>
        Reject
      </Button>
    </>
  );

  if (status === "accepted") {
    buttons = <Typography color="primary">Accepted</Typography>;
  } else if (status === "rejected") {
    buttons = <Typography color="primary">Rejected</Typography>;
  }

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
      <ListItemSecondaryAction className={classes.buttons}>
        {buttons}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default RequestEvaluate;
