import React from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";

const Conversation = ({ profile }) => {
  return (
    <ListItem>
      {/* <Link to={`/profile/${profile._id}`} className={classes.link}> */}
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
      {/* </Link> */}
      <ListItemSecondaryAction>
        <Button>button</Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Conversation;
