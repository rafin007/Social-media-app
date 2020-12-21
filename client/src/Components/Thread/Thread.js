import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import axios from "axios";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textDecoration: "none",
    color: "#000",
  },
}));

const Thread = ({ thread }) => {
  const classes = useStyles();

  const [chat, setChat] = useState({});

  useEffect(() => {
    axios
      .get(`/chat/last/${thread._id}`)
      .then((response) => {
        setChat(response.data);
      })
      .catch((error) => console.error(error));
  }, [thread._id, thread.lastMessage]);

  let jsx = null;

  jsx = (
    <ListItem>
      <Link to="/something" className={classes.link}>
        <ListItemAvatar>
          <Avatar
            image={thread.users[0].avatar && thread.users[0].avatar}
            width={5}
            height={5}
          />
        </ListItemAvatar>
        <ListItemText
          primary={thread.users[0].name}
          secondary={
            chat &&
            chat.text &&
            chat.text.replace(/^(.{15}[^\s]*).*/, "$1") + "..."
          }
        />
      </Link>
      <ListItemSecondaryAction>
        <Moment format="YYYY/MM/DD HH:mm">{chat.date}</Moment>
      </ListItemSecondaryAction>
    </ListItem>
  );

  return jsx;
};

export default Thread;
