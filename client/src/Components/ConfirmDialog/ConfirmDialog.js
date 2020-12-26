import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useDispatch } from "react-redux";
import { unfollowUserById } from "../../Actions/follow";
import { switchPrivacy } from "../../Actions/auth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = ({ user, ...props }) => {
  let jsx = null;

  const dispatch = useDispatch();

  const unFollowPrivateUser = () => {
    if (props.id) {
      dispatch(unfollowUserById(user._id, props.id));
    } else {
      dispatch(unfollowUserById(user._id));
    }

    props.handleClose();
  };

  //change privacy
  const changePrivacy = () => {
    dispatch(switchPrivacy());

    props.handleClose();
  };

  if (user) {
    jsx = (
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Unfollow user?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you change your mind, you'll have to request to follow{" "}
            {user.name} again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={unFollowPrivateUser} color="secondary">
            Unfollow
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else if (props.criteria === "change privacy") {
    jsx = (
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Change Privacy?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This will impact how your future followers will connect with you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.canceledPrivacyChange} color="primary">
            Cancel
          </Button>
          <Button onClick={changePrivacy} color="secondary">
            Change Privacy
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    jsx = (
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Delete this {props.criteria}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this {props.criteria}? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.deleteCriteria} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return jsx;
};

export default ConfirmDialog;
