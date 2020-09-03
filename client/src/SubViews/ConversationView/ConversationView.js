import React, { useRef } from "react";
import {
  makeStyles,
  Grid,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { Send, ArrowBackIos } from "@material-ui/icons";
import ChatMessages from "../../Components/ChatMessages/ChatMessages";
import { useState } from "react";
import Moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "90vh",
    // overflowY: "auto",
    paddingBottom: "3rem",
    [theme.breakpoints.up("md")]: {
      padding: "0 12rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0 20rem",
    },
  },
  messages: {
    overflowY: "auto",
    overflowX: "hidden",
  },
  sendButton: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
  backButton: {
    marginBottom: theme.spacing(1),
  },
}));

const ConversationView = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useLocation();

  //user state from auth
  const user = useSelector((state) => state.auth.user);

  const { receiver } = useParams();

  const ENDPOINT = "http://localhost:5000";

  const socket = useRef(null);

  //calculate the height of chat messages dynamically according to window size
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const headerHeight = document.getElementById("topHeader").clientHeight;
    const backButtonHeight = document.getElementById("chatBackButton")
      .clientHeight;
    const bottomNavbarHeight = document.getElementById("bottomNavbar")
      .clientHeight;
    const windowHeight = window.innerHeight;
    const textfieldHeight = document.getElementById("writeMessage")
      .clientHeight;
    const newHeight =
      windowHeight -
      (headerHeight +
        backButtonHeight +
        bottomNavbarHeight +
        textfieldHeight * 2);

    //set the new height to chat-messages
    setHeight(newHeight);
  }, [height]);

  //more magic
  // const text = useRef(null);
  // useEffect(() => {
  //   if (text.current.focus) {
  //     console.log("focused");
  //   }
  // }, [text]);

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("initiateConversation", { sender: user._id, receiver });

    return () => {
      socket.current.disconnect();
      socket.current.off();
    };
  }, [ENDPOINT, receiver, user._id]);

  //chat message
  const [message, setMessage] = useState("");

  //send message
  const sendMessage = () => {
    const date = Moment();
    //emit event and send message to backend
    socket.current.emit("sendMessage", {
      sender: user._id,
      receiver,
      text: message,
      date,
    });

    //set the message field back to blank
    setMessage("");
  };

  const AVATAR =
    "https://i.pinimg.com/originals/0a/dd/87/0add874e1ea0676c4365b2dd7ddd32e3.jpg";
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={12}
        container
        justify="space-between"
        alignItems="center"
        id="chatBackButton"
        className={classes.backButton}
      >
        <IconButton
          aria-label="go back"
          color="primary"
          size="small"
          onClick={history.goBack}
        >
          <ArrowBackIos />
          back
        </IconButton>
        <Link
          to={`/profile/${state.profile._id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography color="primary" variant="h6">
            {state.profile.user.name}
          </Typography>
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        className={classes.messages}
        id="chat-messages"
        style={{ height }}
      >
        <ChatMessages
          avatar={AVATAR}
          messages={[
            "Hi Jenny, How r u today?",
            "Did you train yesterday",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
          ]}
        />
        <ChatMessages
          side={"right"}
          messages={[
            "Great! What's about you?",
            "Of course I did. Speaking of which check this out",
          ]}
        />
        <ChatMessages
          avatar={AVATAR}
          messages={[
            "Im good.",
            "See u later.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
          ]}
        />
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        className={classes.writeMessage}
        id="writeMessage"
      >
        <Grid item xs={10}>
          <TextField
            fullWidth
            placeholder="Write message..."
            variant="standard"
            multiline
            size="small"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            // ref={text}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton color="primary" onClick={sendMessage}>
            <Send className={classes.sendButton} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ConversationView;
