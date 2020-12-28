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
import ConfirmDialog from "../../Components/ConfirmDialog/ConfirmDialog";
import Modal from "../../Components/Modal/Modal";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";

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

  //confirm privacy confirmation logic
  const [open, setOpen] = useState(false);

  const canceledPrivacyChange = () => {
    setIsprivate((state) => !state);

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrivacyChange = (event) => {
    //open privacy confirmation

    if (event.target.checked) {
      setIsprivate(true);
    } else {
      setIsprivate(false);
    }
    setOpen(true);

    // dispatch(switchPrivacy());
  };

  //-------------Password change modal------------------
  const [passwordModal, setPasswordModal] = useState(false);

  const passwordModalHandleCloser = () => {
    setPasswordModal(false);
  };

  const openPasswordModal = () => {
    setPasswordModal(true);
  };

  //password, name, email error and success
  const error = useSelector((state) => state.auth.error);

  const success = useSelector((state) => state.auth.success);

  //-------------Name change modal------------------
  const [nameModal, setNameModal] = useState(false);

  const nameModalHandleCloser = () => {
    setNameModal(false);
  };

  const openNameModal = () => {
    setNameModal(true);
  };

  //-------------Email change modal------------------
  const [emailModal, setEmailModal] = useState(false);

  const emailModalHandleCloser = () => {
    setEmailModal(false);
  };

  const openEmailModal = () => {
    setEmailModal(true);
  };

  const user = useSelector((state) => state.auth.user);

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
        <ListItem>
          <ListItemText primary="Change Password" onClick={openPasswordModal} />
          <Modal
            type="changePassword"
            open={passwordModal}
            handleClose={passwordModalHandleCloser}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Change Name" onClick={openNameModal} />
          <Modal
            type="changeName"
            name={user.name}
            open={nameModal}
            handleClose={nameModalHandleCloser}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Change Email" onClick={openEmailModal} />
          <Modal
            type="changeEmail"
            email={user.email}
            open={emailModal}
            handleClose={emailModalHandleCloser}
          />
        </ListItem>
      </List>
      {success && (
        <Grid>
          <CustomAlert message={success} severity="success" />
        </Grid>
      )}

      {error && (
        <Grid>
          <CustomAlert message={error} severity="error" />
        </Grid>
      )}
    </Grid>
  );
};

export default Settings;
