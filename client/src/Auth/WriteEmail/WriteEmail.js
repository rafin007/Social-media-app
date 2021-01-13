import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { recoverPasswordEmailSchema } from "../../Validators/AuthValidation";
import Spinner from "../../Components/Spinner/Spinner";
import Text from "../../Components/Form/Text";
import axios from "axios";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20vh",
    [theme.breakpoints.up("md")]: {
      marginTop: "15vh",
    },
  },
  link: {
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
  message: {
    marginTop: "1rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const RecoverPassword = () => {
  const [success, setSuccess] = useState({});
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const handleSubmit = async (data) => {
    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(data);

    await axios
      .post("/users/recover/password/email", body, config)
      .then((response) => {
        setSuccess(response.data);
      })
      .catch((error) => {
        setErrors(error?.response?.data?.errors.map((error) => error.msg));
      });

    setLoading(false);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Typography color="primary" variant="h6" gutterBottom align="center">
        Please input your email to recover your password
      </Typography>
      <Grid item xs={12}></Grid>
      <Grid item xs={11} md={6} lg={4}>
        <Card className={classes.card}>
          <CardContent>
            <Formik
              validateOnChange={true}
              initialValues={{
                email: "",
              }}
              validationSchema={recoverPasswordEmailSchema}
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
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <Button
                      color="primary"
                      className={classes.signin}
                      variant="contained"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      submit
                    </Button>
                  </Form>
                )
              }
            </Formik>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Link to="/" className={classes.link}>
              <Button size="small" color="primary" variant="text">
                Login
              </Button>
            </Link>
            <Link to="/signup" className={classes.link}>
              <Button size="small" color="primary" variant="text">
                Sign up
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={10} md={6} lg={4} className={classes.message}>
        {errors && errors.length > 0
          ? errors.map((error, i) => (
              <CustomAlert message={error} severity="error" key={i} />
            ))
          : null}
      </Grid>
      {success?.msg && (
        <Grid item xs={10} md={6} lg={4} className={classes.message}>
          <CustomAlert message={success.msg} severity="success" />
        </Grid>
      )}
    </Grid>
  );
};

export default RecoverPassword;
