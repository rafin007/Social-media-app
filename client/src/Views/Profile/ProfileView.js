import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Button,
  Menu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import Avatar from "../../Components/Avatar/Avatar";
import ProfileTabs from "./ProfileTabs";
import Bio from "./Bio";
import ProfilePosts from "./ProfilePosts";
import About from "./About";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProfile } from "../../Actions/profile";
import Spinner from "../../Components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { clearPost } from "../../Actions/post";
import { removeUserAvatar, setAvatar } from "../../Actions/auth";
import ErrorDialog from "../../Components/ErrorDialog/ErrorDialog";
import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  follows: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  follow: {
    textAlign: "center",
  },
  followSystem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
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
  link: {
    textDecoration: "none",
  },
  link2: {
    textDecoration: "none",
    color: "#fff",
    margin: "0 auto",
  },
  link3: {
    textDecoration: "none",
    color: theme.palette.type === "dark" ? "#fff" : "#000",
  },
  input: {
    display: "none",
  },
}));

const ProfileView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   *---------------- menu logic----------------
   */
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //---------------------------

  /**
   * --------------Remove avatar logic
   */
  const removeAvatar = () => {
    handleClose();
    dispatch(removeUserAvatar());
  };
  //----------------------

  //clear the post state
  useEffect(() => {
    dispatch(clearPost());
  }, [dispatch]);

  //profile state
  const profile = useSelector((state) => state.profile.profile);

  //user state from auth
  const user = useSelector((state) => state.auth.user);

  //load profile
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  //tab switching
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let pageContent = null;

  if (value === 0) {
    pageContent = <Bio profile={profile} />;
  } else if (value === 1) {
    pageContent = <ProfilePosts profile={profile} />;
  } else {
    pageContent = <About profile={profile} />;
  }

  //loading state
  const loading = useSelector((state) => state.profile.loading);

  /**
   * -------------Avatar upload logic----------------
   */
  const FILE_SIZE_MAX = 2; //max 2MB

  //error
  const [errorOpen, setErrorOpen] = useState(false);

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  //file for image
  const [file, setFile] = useState("");

  // const submitAvatar = () => {
  // }

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("upload", file);

      dispatch(setAvatar(formData));
    }
  }, [file, dispatch]);

  const onChange = (event) => {
    if (event.target.files[0].size / 1000000 > FILE_SIZE_MAX) {
      handleErrorOpen();
    } else {
      setFile(event.target.files[0]);
    }
  };

  //--------------------------------------

  //JSX
  let profileContent = null;

  //if loading show spinner otherwise profile
  if (loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
        className={classes.root}
      >
        <Grid item xs={6}>
          <div onClick={handleClick}>
            {!user.avatar ? (
              <Badge
                badgeContent={<AddCircle fontSize="large" color="primary" />}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                overlap="circle"
              >
                <Avatar width={12} height={12} />
              </Badge>
            ) : (
              <Avatar image={user && user.avatar} width={12} height={12} />
            )}
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <div className={classes.upload}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={onChange}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="outlined" color="primary" component="span">
                    Choose an image
                  </Button>
                </label>
              </div>
            </MenuItem>
            {user.avatar && (
              <MenuItem>
                <label>
                  <Button
                    variant="outlined"
                    color="secondary"
                    component="span"
                    onClick={removeAvatar}
                  >
                    Remove image
                  </Button>
                </label>
              </MenuItem>
            )}
          </Menu>

          <ErrorDialog
            open={errorOpen}
            handleClose={handleErrorClose}
            message="File must be smaller than 2MB"
          />

          <Typography variant="h5" align="center">
            {user && user.name}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            {profile && profile.profession}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.followSystem}>
          <div className={classes.follows}>
            <Link to="/followers" className={classes.link3}>
              <Typography variant="h6" className={classes.follow}>
                {user && user.followers.length}
                <Typography variant="body2" color="textSecondary">
                  Followers
                </Typography>
              </Typography>
            </Link>
            <Link to="/following" className={classes.link3}>
              <Typography variant="h6" className={classes.follow}>
                {user && user.following.length}
                <Typography variant="body2" color="textSecondary">
                  Following
                </Typography>
              </Typography>
            </Link>
          </div>
          {/* <Button variant="contained" color="primary" >Follow</Button> */}
        </Grid>
        <Grid item xs={12}>
          <ProfileTabs value={value} handleChange={handleChange} />
        </Grid>
        {pageContent}
      </Grid>
    );
  }

  return profileContent;
};

export default ProfileView;
