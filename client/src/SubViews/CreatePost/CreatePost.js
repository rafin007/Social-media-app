import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid, Button, TextField, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../Actions/post";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useHistory } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";

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
  card: {
    width: "100%",
    marginBottom: "1.5rem",
    [theme.breakpoints.up("md")]: {},
  },
  media: {
    height: "100%",
    // paddingTop: '100%', // 16:9
    // [theme.breakpoints.up('md')]: {
    //     paddingTop: '80%'
    // },
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    "& > *": {
      // margin: theme.spacing(1),
      width: "100%",
      // marginBottom: '1rem',
    },
  },
  input: {
    display: "none",
  },
  upload: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  label: {
    "& > *": {
      width: "100%",
    },
  },
  errors: {
    marginTop: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const CreatePost = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const FILE_SIZE_MAX = 2; //max 2MB

  //errors state
  const errors = useSelector((state) => state.post.errors);

  //loading state
  const loading = useSelector((state) => state.post.loading);

  //text for caption
  const [text, setText] = useState("");

  const history = useHistory();

  //file for image
  const [file, setFile] = useState("");

  //file url to display the image in real time
  const [fileURL, setFileURL] = useState("");

  const onChange = (event) => {
    setFile(event.target.files[0]);
    setFileURL(
      event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : ""
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("upload", file);
    formData.append("text", text);

    //pass the history object to redirect to SinglePost component from post actions
    dispatch(createPost(formData, history));
  };

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={onSubmit}>
          <div className={classes.header}>
            <Typography variant="h6" color="textSecondary">
              Create Post
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              type="submit"
              disabled={loading || !text}
              className={classes.postButton}
            >
              Post
            </Button>
          </div>
          <Divider className={classes.divider} />
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  // height="500"
                  className={classes.media}
                  image={fileURL}
                />
              </Card>
              <TextField
                placeholder="Say something interesting..."
                type="text"
                variant="outlined"
                value={text}
                onChange={(event) => setText(event.target.value)}
                label="Caption"
              />
            </Fragment>
          )}
          <Typography
            variant="body2"
            color="secondary"
            component="p"
            align="center"
            style={{ marginTop: "1rem" }}
          >
            {file &&
              file.size / 1000000 > FILE_SIZE_MAX &&
              "Image must be smaller than 2MB"}
          </Typography>
          <div className={classes.upload}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={onChange}
            />
            <label htmlFor="contained-button-file" className={classes.label}>
              <Button variant="contained" color="primary" component="span">
                Choose an image
              </Button>
            </label>
          </div>
        </form>
      </Grid>
      <Grid item xs={10} md={6} lg={4} className={classes.errors}>
        {errors && errors.length > 0
          ? errors.map((error, i) => (
              <CustomAlert message={error} severity="error" key={i} />
            ))
          : null}
      </Grid>
    </Grid>
  );
};

export default CreatePost;
