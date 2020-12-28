import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../Actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginBottom: ".5rem",
  },
}));

export default function TransitionAlerts(props) {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  //show error whenever the error message changes
  useEffect(() => {
    setOpen(true);
  }, [props.message]);

  const handleClose = () => {
    setOpen(false);

    //clear message
    dispatch(clearMessage());
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={props.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.message}
        </Alert>
      </Collapse>
    </div>
  );
}
