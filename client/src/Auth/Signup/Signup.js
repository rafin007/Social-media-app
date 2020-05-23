import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, makeStyles, Grid, Card, CardContent, Typography, CardActions, Button, FormControl, InputLabel, Select, MenuItem, } from '@material-ui/core';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Text from '../../Components/Form/Text';
import SelectField from '../../Components/Form/SelectField';

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
    }
}));

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required().min(6),
    gender: yup.string().required()
});

const Signup = () => {

    const classes = useStyles();

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
                            validationSchema={validationSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);
                                //make async call
                                console.log('Submitting', data);
                                setSubmitting(false);
                            }} >

                            {({ values, errors, isSubmitting }) => (
                                <Form className={classes.form} >
                                    <Text placeholder="Name" name="name" />
                                    <Text placeholder="Email" name="email" />
                                    <Text placeholder="Password" name="password" />
                                    <Text placeholder="Confrim Password" name="confirmPassword" />
                                    <SelectField name="gender" label="Choose Gender" />
                                    <Button color="primary" className={classes.signup} variant="contained" disabled={isSubmitting} type="submit" >
                                        Sign up
                                    </Button>
                                </Form>
                            )}

                            {/* <form noValidate autoComplete="off" className={classes.form} >
                                <TextField label="Name" required />
                                <TextField label="Email" required type="email" />
                                <TextField label="Password" required type="password" />
                                <TextField label="Confirm Password" required type="password" />

                                <FormControl className={classes.formControl} required >
                                    <InputLabel>Choose Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                    // value={age}
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </form> */}
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
        </Grid>
    );
}

export default Signup;
