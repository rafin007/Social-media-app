import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid, Button, TextField, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, editPost } from "../../Actions/post";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { useHistory, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { bufferToImage } from "../../utils/bufferToImage";
// import bufferToImage from "../../utils/bufferToImage";

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
    marginTop: theme.spacing(-6),
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
  removeImage: {
    marginBottom: theme.spacing(2),
  },
}));

const EditPost = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const FILE_SIZE_MAX = 2; //max 2MB

  //errors state
  const errors = useSelector((state) => state.post.errors);

  //loading state
  const loading = useSelector((state) => state.post.loading);

  //text for picture
  const [text, setText] = useState("");

  //file for image
  const [file, setFile] = useState("");

  //file url to display the image in real time
  const [fileURL, setFileURL] = useState("");

  //newUpload state to check if a new file has been uploaded whether to display imageURL or fileURL
  const [newUpload, setNewUpload] = useState(false);

  const onChange = (event) => {
    setFile(event.target.files[0]);
    setFileURL(
      event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : ""
    );
    setNewUpload(true);
  };

  //-------------edit post logic----------------

  // get the post id from url if there is any
  const { post_id } = useParams();

  //retrieve the post by its id
  useEffect(() => {
    if (post_id) {
      dispatch(getPostById(post_id));
    }
  }, [post_id, dispatch]);

  //post state
  const post = useSelector((state) => state.post.post);

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (post) {
      setText(post.text);

      if (post.image) {
        const imageUrl = bufferToImage(post.image.data);
        //image URL to display image
        setImageURL(imageUrl);

        //create file from the blob
        // const newFile = new File([imageUrl], 'image.png');
        // setFile(newFile);
        // setFileURL(newFile ? URL.createObjectURL(newFile) : '');
      }
    }
  }, [post]);

  //----------------------------------------------

  const history = useHistory();

  // console.log(imageURL);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    //if not a newUpload then just upload the caption
    if (newUpload) {
      formData.append("upload", file);
      formData.append("text", text);

      // to check in backend if the image is removed
      if (!file) {
        formData.append("hasRemoved", true);
      }
    } else {
      formData.append("text", text);
    }

    //pass the history object to redirect to SinglePost component from post actions
    dispatch(editPost(post._id, formData, history));
  };

  //remove image
  const removeImage = () => {
    setFile("");
    setFileURL("");
    setImageURL("");
    setNewUpload(true);
  };

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={onSubmit}>
          <div className={classes.header}>
            <Typography variant="h6" color="textSecondary">
              Edit Post
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
                {newUpload ? (
                  <CardMedia
                    component="img"
                    // height="500"
                    className={classes.media}
                    image={fileURL}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    // height="500"
                    className={classes.media}
                    image={imageURL}
                  />
                )}
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
            {(imageURL || fileURL) && (
              <Button
                variant="outlined"
                color="secondary"
                component="span"
                fullWidth
                className={classes.removeImage}
                onClick={removeImage}
              >
                Remove Image
              </Button>
            )}
            <input
              accept="image/*"
              className={classes.input}
              id="outlined-button-file"
              type="file"
              onChange={onChange}
            />
            <label htmlFor="outlined-button-file" className={classes.label}>
              <Button variant="outlined" color="primary" component="span">
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

export default EditPost;
