import React, { useEffect, useState } from "react";
import { Grid, List, TextField, InputAdornment } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProfiles,
  searchProfileByName,
  clearSearchProfiles,
  clearProfiles,
} from "../../Actions/profile";
import Spinner from "../Spinner/Spinner";
import User from "./User/User";

const Users = () => {
  const dispatch = useDispatch();

  //loading state
  const loading = useSelector((state) => state.profile.loading);

  //profiles state
  const profiles = useSelector((state) => state.profile.profiles);

  //searched profiles
  const searchedProfiles = useSelector(
    (state) => state.profile.searchedProfiles
  );

  //get all the profiles when the component loads
  useEffect(() => {
    dispatch(getAllProfiles());

    return () => {
      dispatch(clearSearchProfiles());
      dispatch(clearProfiles());
    };
  }, [dispatch]);

  //search users
  const [search, setSearch] = useState("");

  const onSearch = (event) => {
    setSearch(event.target.value);
    dispatch(searchProfileByName(event.target.value));
  };

  let jsx = null;

  if (search !== "") {
    jsx =
      searchedProfiles &&
      searchedProfiles.map((profile) => (
        <User profile={profile} key={profile._id} />
      ));
  } else {
    jsx =
      profiles &&
      profiles.length > 0 &&
      profiles.map((profile) => <User profile={profile} key={profile._id} />);
  }

  //to avoid the weird mount-unmount error
  // const [didMount, setDidMount] = useState(false);

  // useEffect(() => {
  //   setDidMount(true);
  //   return () => setDidMount(false);
  // }, []);

  // if (!didMount) {
  //   return null;
  // }

  return (
    <Grid item xs={12}>
      <TextField
        id="search-users"
        placeholder="Search Users"
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
  );
};

export default Users;
