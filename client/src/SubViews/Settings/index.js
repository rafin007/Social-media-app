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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../../Actions/auth";

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
  const [checked, setChecked] = useState(theme === "dark" ? true : false);

  //private account
  const [isPrivate, setIsprivate] = useState(false);

  const handleChange = (event) => {
    if (event.target.checked) {
      // dark
      setChecked(true);
    } else {
      // light
      setChecked(false);
    }

    dispatch(switchTheme());
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
              checked={checked}
              onChange={handleChange}
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
              onChange={() => setIsprivate((state) => !state)}
              name="themeSwitcher"
              color="primary"
              inputProps={{ "aria-label": "Theme Switcher" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  );
};

export default Settings;
