import React, { useEffect, useState } from "react";
import {
  Grid,
  List,
  TextField,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles, searchProfileByName } from "../../Actions/profile";
import Spinner from "../Spinner/Spinner";
import User from "./User/User";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    width: "100%",
  },
}));

const Users = () => {
  const classes = useStyles();
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

  return (
    <Grid item xs={12}>
      <TextField
        className={classes.margin}
        id="search-users"
        placeholder="Search Users"
        autoComplete=""
        fullWidth
        variant="outlined"
        value={search}
        onChange={onSearch}
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
