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
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { useState } from "react";
import { searchFollowingsByName, getFollowings } from "../../Actions/follow";
import Conversation from "../../Components/Conversation/Conversation";
import Spinner from "../../Components/Spinner/Spinner";
import { clearProfiles, clearSearchProfiles } from "../../Actions/profile";

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

const NewMessage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const socket = useRef(null);

  //token from auth state
  // const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   socket.current = io("http://localhost:5000", {
  //     query: {
  //       token,
  //     },
  //   });

  //   return () => {
  //     socket.current.disconnect();
  //     socket.current.off();
  //   };
  // }, [token]);

  const [search, setSearch] = useState("");

  //profiles state from profile
  const profiles = useSelector((state) => state.profile.profiles);

  //searched profiles state from profile
  const searchedProfiles = useSelector(
    (state) => state.profile.searchedProfiles
  );

  //loading state from profile
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getFollowings());

    return () => {
      dispatch(clearProfiles());
      dispatch(clearSearchProfiles());
    };
  }, [dispatch]);

  const onSearch = (event) => {
    setSearch(event.target.value);
    dispatch(searchFollowingsByName(event.target.value));
  };

  let jsx = null;

  if (search !== "") {
    jsx =
      searchedProfiles &&
      searchedProfiles.map((profile) => (
        <Conversation key={profile._id} profile={profile} />
      ));
  } else {
    jsx =
      profiles &&
      profiles.length > 0 &&
      profiles.map((profile) => (
        <Conversation key={profile._id} profile={profile} />
      ));
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <TextField
          className={classes.margin}
          id="search-conversations"
          placeholder="Search conversations"
          autoComplete=""
          fullWidth
          variant="outlined"
          value={search}
          onChange={onSearch}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
        <List>{loading ? <Spinner /> : jsx}</List>
      </Grid>
    </Grid>
  );
};

export default NewMessage;
