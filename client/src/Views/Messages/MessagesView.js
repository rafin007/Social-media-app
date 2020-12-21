import React from "react";
import io from "socket.io-client";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Grid,
  TextField,
  InputAdornment,
  List,
  Typography,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { useState } from "react";
import { searchFollowingsByName, getFollowings } from "../../Actions/follow";
import Conversation from "../../Components/Conversation/Conversation";
import Spinner from "../../Components/Spinner/Spinner";
import { clearProfiles, clearSearchProfiles } from "../../Actions/profile";
import { getAllChats, saveSocketInstance } from "../../Actions/message";
import FloatingAction from "../../Components/FloatingAction/FloatingAction";
import Thread from "../../Components/Thread/Thread";

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
}));

const MessagesView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const socket = useRef(null);

  // token from auth state
  const token = useSelector((state) => state.auth.token);

  const newSocket = useSelector((state) => state.message.socket);

  useEffect(() => {
    if (!newSocket) {
      socket.current = io("http://localhost:5000", {
        query: {
          token,
        },
      });

      //save socket instance
      dispatch(saveSocketInstance(socket.current));
      console.log("socket created");
    } else {
      console.log("socket already exists");
    }
  }, [token, dispatch, newSocket]);

  const [search, setSearch] = useState("");

  //profiles state from profile
  // const profiles = useSelector((state) => state.profile.profiles);

  //searched profiles state from profile
  // const searchedProfiles = useSelector(
  //   (state) => state.profile.searchedProfiles
  // );

  //loading state from profile
  // const loading = useSelector((state) => state.profile.loading);

  //loading state from message
  const loading = useSelector((state) => state.message.chatsLoading);

  //chats state from messages
  const chats = useSelector((state) => state.message.chats);

  useEffect(() => {
    // dispatch(getFollowings());
    dispatch(getAllChats());

    // return () => {
    //   dispatch(clearProfiles());
    //   dispatch(clearSearchProfiles());
    // };
  }, [dispatch]);

  // const onSearch = (event) => {
  //   setSearch(event.target.value);
  //   dispatch(searchFollowingsByName(event.target.value));
  // };

  // let jsx = null;

  // if (search !== "") {
  //   jsx =
  //     searchedProfiles &&
  //     searchedProfiles.map((profile) => (
  //       <Conversation key={profile._id} profile={profile} />
  //     ));
  // } else {
  //   jsx =
  //     profiles &&
  //     profiles.length > 0 &&
  //     profiles.map((profile) => (
  //       <Conversation key={profile._id} profile={profile} />
  //     ));
  // }

  // console.log(chats);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h5" color="primary">
          Chats
        </Typography>
        <List>
          {loading ? (
            <Spinner />
          ) : (
            chats &&
            chats.length > 0 &&
            chats.map((thread) => <Thread key={thread._id} thread={thread} />)
          )}
        </List>
      </Grid>
      <FloatingAction action="message" />
    </Grid>
  );
};

export default MessagesView;
