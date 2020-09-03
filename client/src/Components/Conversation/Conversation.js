import React from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  makeStyles,
} from "@material-ui/core";
import Avatar from "../Avatar/Avatar";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textDecoration: "none",
    color: "#000",
  },
}));

const Conversation = ({ profile }) => {
  const classes = useStyles();

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
        <Link
          to={{
            pathname: `/chat/${profile.user._id}`,
            state: {
              profile,
            },
          }}
          className={classes.link}
        >
          <Button variant="outlined" color="primary">
            message
          </Button>
        </Link>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Conversation;
