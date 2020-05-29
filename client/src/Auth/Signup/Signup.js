import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, makeStyles, Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { signupSchema } from '../../Validators/AuthValidation';
import { Formik, Form, Field } from 'formik';
import Text from '../../Components/Form/Text';
import SelectField from '../../Components/Form/SelectField';
import CustomAlert from '../../Components/CustomAlert/CustomAlert';
import { register } from '../../Actions/auth';
import Spinner from '../../Components/Spinner/Spinner';

//redux
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10vh',
        [theme.breakpoints.up('md')]: {
            marginTop: '5vh'
        },
    },
    signup: {
        marginTop: '1rem'
    },
    signin: {
        textDecoration: 'none',
    },
    form: {
        '& > *': {
            // margin: theme.spacing(1),
            width: '100%',
            marginBottom: '1rem',
        },
    },
    card: {
        paddingTop: '2vh'
    },
    errors: {
        marginTop: '1rem'
    }
}));



const Signup = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    //loading state
    const loading = useSelector(state => state.auth.loading);

    //get errors state
    const errors = useSelector(state => state.auth.errors);

    const submitHandler = async (data) => {

        // const {name, email, password, gender} = data;

        dispatch(register(data));
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.root} >
            <Grid item xs={12}>
                <Typography color="primary" variant="h3" gutterBottom align="center" >
                    Social media
                </Typography>
            </Grid>
            <Grid item xs={11} md={6} lg={4} >
                <Card className={classes.card} >
                    <CardContent>
                        {/* <Typography className={classes.title} color="primary" variant="h4" align="center" gutterBottom>
                            Sign up
                        </Typography> */}
                        <Formik
                            validateOnChange={true}
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                                confirmPassword: "",
                                gender: ""
                            }}
                            validationSchema={signupSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);
                                //make async call
                                submitHandler(data);
                                // setShowSnackbar(true);
                                setSubmitting(false);
                            }} >

                            {({ values, errors, isSubmitting }) => (
                                loading ? <Spinner /> : (<Form className={classes.form} >
                                    <Text placeholder="Name" name="name" />
                                    <Text placeholder="Email" name="email" />
                                    <Text placeholder="Password" name="password" type="password" />
                                    <Text placeholder="Confrim Password" name="confirmPassword" type="password" />
                                    <SelectField name="gender" label="Choose Gender" options={['Male', 'Female', 'Other']} />
                                    <Button color="primary" className={classes.signup} variant="contained" disabled={isSubmitting} type="submit" >
                                        Sign up
                                    </Button>
                                </Form>)
                            )}
                        </Formik>
                    </CardContent>
                    <CardActions>
                        <Typography variant="body1" align="center" gutterBottom style={{ margin: '0 auto' }} >
                            Already have an account?
                            <Link to="/signin" className={classes.signin}  >
                                <Button size="small" color="primary" variant="text" >Sign in</Button>
                            </Link>
                        </Typography>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={10} className={classes.errors} >
                {errors && errors.length > 0 ? errors.map((error, i) => <CustomAlert message={error} severity="error" key={i} />) : null}
            </Grid>
        </Grid>
    );
}

export default Signup;
