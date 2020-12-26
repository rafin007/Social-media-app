import {
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPrivacy, switchPrivacy, switchTheme } from "../../Actions/auth";
import ConfirmDialog from "../../Components/ConfirmDialog/ConfirmDialog";

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

const Settings = () => {
  const classes = useStyles();

  const theme = useSelector((state) => state.auth.theme);

  const dispatch = useDispatch();

  //theme switching
  const [userTheme, setUserTheme] = useState(theme === "dark" ? true : false);

  const privacy = useSelector((state) => state.auth.privacy);

  //private account
  const [isPrivate, setIsprivate] = useState(privacy);

  const handleThemeChange = (event) => {
    if (event.target.checked) {
      // dark
      setUserTheme(true);
    } else {
      // light
      setUserTheme(false);
    }

    dispatch(switchTheme());
  };

  //confirm modal logic
  const [open, setOpen] = useState(false);

  const canceledPrivacyChange = () => {
    setIsprivate((state) => !state);

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrivacyChange = (event) => {
    //open modal

    if (event.target.checked) {
      setIsprivate(true);
    } else {
      setIsprivate(false);
    }
    setOpen(true);

    // dispatch(switchPrivacy());
  };

  return (
    <Grid className={classes.root}>
      <Typography variant="h5" color="primary" gutterBottom>
        Settings
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Dark mode" />
          <ListItemSecondaryAction>
            <Switch
              checked={userTheme}
              onChange={handleThemeChange}
              name="themeSwitcher"
              color="primary"
              inputProps={{ "aria-label": "Theme Switcher" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="Private account" />
          <ListItemSecondaryAction>
            <Switch
              checked={isPrivate}
              onChange={handlePrivacyChange}
              name="privacySwitcher"
              color="primary"
              inputProps={{ "aria-label": "Privacy Switcher" }}
            />
            <ConfirmDialog
              open={open}
              handleClose={handleClose}
              // setIsprivate={setIsprivate}
              // isPrivate={isPrivate}
              criteria="change privacy"
              canceledPrivacyChange={canceledPrivacyChange}
              // handlePrivacyChange={handlePrivacyChange}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  );
};

export default Settings;
