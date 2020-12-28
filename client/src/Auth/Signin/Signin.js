import React from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { signinSchema } from "../../Validators/AuthValidation";
import Text from "../../Components/Form/Text";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../Components/Spinner/Spinner";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import { login } from "../../Actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20vh",
    [theme.breakpoints.up("md")]: {
      marginTop: "15vh",
    },
  },
  signin: {
    marginTop: "1rem",
  },
  signup: {
    textDecoration: "none",
  },
  form: {
    "& > *": {
      // margin: theme.spacing(1),
      width: "100%",
      marginBottom: "1rem",
    },
  },
  card: {
    paddingTop: "2vh",
  },
  errors: {
    marginTop: "1rem",
  },
}));

const Signin = () => {
  const classes = useStyles();

  const location = useLocation();

  const success = location?.state?.success;

  const dispatch = useDispatch();

  //loading state
  const loading = useSelector((state) => state.auth.loading);

  //errors state
  const errors = useSelector((state) => state.auth.errors);

  //submit action
  const handleSubmit = async (data) => {
    dispatch(login(data));
  };

  //get isAuthenticated state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //check if the user is authenticated and redirect accordingly
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={12}>
        <Typography color="primary" variant="h3" gutterBottom align="center">
          Social media
        </Typography>
      </Grid>
      <Grid item xs={11} md={6} lg={4}>
        <Card className={classes.card}>
          <CardContent>
            {/* <Typography className={classes.title} color="primary" variant="h4" align="center" gutterBottom>
                            Sign up
                        </Typography> */}
            <Formik
              validateOnChange={true}
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={signinSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(data);
                setSubmitting(false);
              }}
            >
              {({ values, errors, isSubmitting, handleChange }) =>
                loading ? (
                  <Spinner />
                ) : (
                  <Form className={classes.form}>
                    <Text
                      placeholder="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <Text
                      placeholder="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <Button
                      color="primary"
                      className={classes.signin}
                      variant="contained"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </Form>
                )
              }
            </Formik>

            {/* <form noValidate autoComplete="off" className={classes.form} >
                            <TextField label="Email" required type="email" />
                            <TextField label="Password" required type="password" />
                            <Button color="primary" className={classes.signin} variant="contained" >
                                Sign in
                            </Button>
                        </form> */}
          </CardContent>
          <CardActions>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              style={{ margin: "0 auto" }}
            >
              Don't have an account?
              <Link to="/signup" className={classes.signup}>
                <Button size="small" color="primary" variant="text">
                  Sign up
                </Button>
              </Link>
            </Typography>

            <Typography
              variant="body1"
              align="center"
              gutterBottom
              style={{ margin: "0 auto" }}
            >
              Forgot password?
              <Link to="/writeEmail" className={classes.signup}>
                <Button size="small" color="primary" variant="text">
                  Recover here
                </Button>
              </Link>
            </Typography>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={10} md={6} lg={4} className={classes.errors}>
        {!success && errors && errors.length > 0
          ? errors.map((error, i) => (
              <CustomAlert message={error} severity="error" key={i} />
            ))
          : null}
      </Grid>
      <Grid item xs={10} md={6} lg={4} className={classes.errors}>
        {success && <CustomAlert message={success} severity="success" />}
      </Grid>
    </Grid>
  );
};

export default Signin;
