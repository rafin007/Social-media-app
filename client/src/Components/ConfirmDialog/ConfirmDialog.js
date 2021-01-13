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
import { Typography } from "@material-ui/core";

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
        aria-labelledby="alert-dialog-slide-unfollow-user"
        aria-describedby="alert-dialog-slide-confirm-unfollow-user"
      >
        <DialogTitle id="alert-dialog-slide-unfollow-user">
          Unfollow user?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-confirm-unfollow-user">
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
  } else if (props.criteria === "deleteAccount") {
    jsx = (
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-delete-account"
        aria-describedby="alert-dialog-slide-confirm-delete-account"
      >
        <DialogTitle id="alert-dialog-slide-delete-account">
          Delete Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-confirm-delete-account">
            Please be certain. Once you click{" "}
            <Typography color="secondary" component="span">
              Delete Account
            </Typography>
            , there is no going back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.deleteAccount} color="secondary">
            Delete Account
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
        aria-labelledby="alert-dialog-slide-change-privacy"
        aria-describedby="alert-dialog-slide-confirm-to-change-privacy"
      >
        <DialogTitle id="alert-dialog-slide-privacy">
          Change Privacy?
        </DialogTitle>
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
        aria-labelledby="alert-dialog-slide-delete-comment-or-post"
        aria-describedby="alert-dialog-slide-confirm-delete-comment-or-post"
      >
        <DialogTitle id="alert-dialog-slide-delete-comment-or-post">
          Delete this {props.criteria}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-delete-comment-or-post">
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
