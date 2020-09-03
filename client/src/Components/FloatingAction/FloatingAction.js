import React from "react";
import { Fab, makeStyles } from "@material-ui/core";
import { ArrowDropUpOutlined, Add, ChatOutlined } from "@material-ui/icons";
import { Link } from "react-scroll";
import { Link as DOMLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  scroller: {
    position: "fixed",
    bottom: theme.spacing(10),
    left: "80%",
    opacity: 0.7,
  },
  button: {
    position: "fixed",
    bottom: theme.spacing(10),
    left: "80%",
  },
}));

const FloatingAction = ({ action }) => {
  const classes = useStyles();

  let jsx = null;

  if (action === "scroller") {
    jsx = (
      <Link to="root" smooth={true} duration={600} className={classes.scroller}>
        <Fab color="primary" aria-label="scroll">
          <ArrowDropUpOutlined fontSize="large" />
        </Fab>
      </Link>
    );
  } else if (action === "button") {
    jsx = (
      <DOMLink to="/create">
        <Fab color="primary" aria-label="add" className={classes.button}>
          <Add />
        </Fab>
      </DOMLink>
    );
  } else if (action === "message") {
    jsx = (
      <DOMLink to="/newMessage">
        <Fab
          color="primary"
          aria-label="New Message"
          className={classes.button}
        >
          <ChatOutlined />
        </Fab>
      </DOMLink>
    );
  }

  return jsx;
};

export default FloatingAction;
